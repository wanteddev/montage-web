export const meta = {
  name: 'montage-v3-to-v4-migration',
  description:
    'Run the 5 Montage v4 codemods strictly in sequence (never re-running a completed step), then scan for manual migration targets in parallel',
  whenToUse:
    'Invoked by the montage-v3-to-v4 skill to migrate a consumer repo from Montage (WDS) v3 to v4',
  phases: [
    { title: 'Codemods', detail: '5 v4 codemods, strictly sequential' },
    { title: 'Scan', detail: 'parallel read-only scans for manual migrations' },
  ],
}

// Required args (pass via Workflow tool `args`):
//   repoRoot:      absolute path of the repo being migrated
//   targets:       array of source directories to transform, e.g. ['src'] — plain paths,
//                  no globs (the codemod CLI takes one directory per invocation)
//   stateFile:     absolute path of the migration state file
//   referencesDir: absolute path of this skill's references/ directory
//   autoCommit:    boolean — commit after each completed step
// Optional args:
//   codemodVersion: npm dist-tag or version for @montage-ui/codemod (default 'latest')

const CODEMOD_STEPS = [
  {
    id: 'package-name-migration',
    title: 'Package name migration (@wanteddev/* → @montage-ui/*)',
    precheck: 'None.',
    verify:
      'grep for "@wanteddev/" in .ts/.tsx/.js/.jsx inside the targets. Import declarations must have zero hits. Remaining hits in `export ... from`, require(), dynamic import(), jest.mock()/vi.mock(), or `declare module` lines are NOT covered by the codemod — fix those by hand NOW as part of this step (they are code, unlike the config-file work of manual step M1). Hits in package.json/configs belong to manual step M1; leave them.',
  },
  {
    id: 'css-variable-migration',
    title: 'CSS variable migration (--wds-* prefix removal)',
    precheck: 'None.',
    verify:
      'grep for "--wds-" in the targets including .css/.scss/.sass/.less — remaining hits should only be dynamically-built names (template interpolation / string concat), which belong to manual step M3. Then skim the diff for false positives: the rename is a blind prefix substitution, so consumer-defined --wds-* variables were also renamed (declarations and usages stay consistent inside the targets, but note them in verifyFindings). Expect intermediate --card-content-item-* names in the output — they are handled later by manual step M4; do NOT revert them.',
  },
  {
    id: 'dom-identifier-migration',
    title: 'DOM identifier migration (wds-component → data-component, region manager ids)',
    precheck: 'None.',
    verify:
      'grep for "wds-component", "wds-ignore-", "wds-region-manager" in the targets including stylesheets — remaining hits should only be dynamically-built strings (manual step M3). Skim the diff for false positives: replacement is a blind substring pass over any string literal (analytics event names, doc strings). Attribute VALUES like data-component="card-content" are intentionally unchanged — manual step M4 handles them; do NOT rename values here.',
  },
  {
    id: 'list-card-migration',
    title: 'Card / ListCard naming migration (CardList → ListCard, CardContent → CardBody/ListCardBody)',
    precheck:
      'grep the targets for files importing BOTH an old Card name (CardContent, CardContentItem, CardList) AND its new counterpart (CardBody, ListCardBody, CardRow, ListCard) from @montage-ui/core or @wanteddev/wds. Such half-hand-migrated files can end up with duplicate import specifiers — report them as "failed" with the file list so they can be cleaned up first, unless there are none.',
    verify:
      'grep -E "\\bCard(List|Content)" over the targets — expect zero hits (prefix pattern: \\bCardContent\\b would miss CardContentProps/CardContentItemSkeleton leftovers; the prefix form matches no new name, ListCard* included). Also grep for non-JSX identifier references (e.g. component={CardBody}) in files that render ListCard; report them in verifyFindings for manual step M4 review.',
  },
  {
    id: 'form-control-migration',
    title: 'Form Control naming migration (FormField → FormControl → FormControlField swap)',
    precheck:
      'THIS CODEMOD CORRUPTS ALREADY-MIGRATED CODE. Find files referencing FormControl WITHOUT also referencing FormField — use two file-level greps and diff the file lists (a single-line import-statement grep misses multi-line imports; see the "Step 5" pre-check in the codemod-steps.md reference next to manual-migrations.md). Inspect each: if the file already uses the NEW v4 API (root <FormControl> wrapping <FormControlField>, or imports FormControlField/FormControlLabel), it was hand-migrated — report "failed" with the file list; those files must be excluded (codemod-steps.md documents the move-out/move-back exclusion procedure) before this codemod may run. A v3 file importing only the old FormControl slot (no other Form* imports, <FormControl> used inside another file\'s FormField) is safe.',
    verify:
      'grep -E "\\bForm(Field|Label|Message|ErrorMessage)" over the targets — expect zero hits (prefix pattern: \\bFormField\\b would miss FormFieldProps leftovers; the prefix form matches no FormControl* name). NOTE: "FormControl" hits are EXPECTED after this step (it is the new root name); do not flag them and NEVER re-run this codemod to "fix" them.',
  },
]

const MANUAL_SCAN_SECTIONS = [
  { id: 'M1', title: 'Package references outside import declarations' },
  { id: 'M2', title: 'Theme tokens now return var(--...) strings (JS arithmetic breakage)' },
  { id: 'M3', title: 'CSS variable / DOM identifier leftovers (dynamic names, E2E, configs)' },
  { id: 'M4', title: 'Card / ListCard follow-ups (non-JSX refs, data-component values)' },
  { id: 'M5', title: 'FormControl follow-ups (message typography variant/weight)' },
  { id: 'M6', title: 'Modal bottom sheet behavior change (onVisibilityChange removal, peekHeight)' },
  { id: 'M7', title: 'TextField changes (size, TextFieldButton variant, wrapper DOM)' },
]

const STEP_RESULT_SCHEMA = {
  type: 'object',
  required: ['step', 'status', 'filesChanged', 'committed', 'verifyFindings'],
  properties: {
    step: { type: 'string' },
    status: { type: 'string', enum: ['completed', 'skipped', 'failed'] },
    filesChanged: { type: 'number' },
    committed: { type: 'boolean' },
    commitHash: { type: 'string' },
    verifyFindings: {
      type: 'array',
      items: { type: 'string' },
      description: 'Leftover patterns or anomalies found by the post-step verification greps',
    },
    error: { type: 'string' },
  },
}

const SCAN_RESULT_SCHEMA = {
  type: 'object',
  required: ['section', 'hits', 'summary'],
  properties: {
    section: { type: 'string' },
    summary: { type: 'string' },
    hits: {
      type: 'array',
      items: {
        type: 'object',
        required: ['file', 'line', 'snippet', 'note'],
        properties: {
          file: { type: 'string' },
          line: { type: 'number' },
          snippet: { type: 'string' },
          note: {
            type: 'string',
            description:
              'Assessment: what fix this occurrence needs, or why it is a false positive',
          },
        },
      },
    },
  },
}

const codemodVersion = args.codemodVersion || 'latest'
const targets = JSON.stringify(args.targets)

const STATE_FILE_TEMPLATE = `---
migration: montage-v3-to-v4
targets:
${args.targets.map((t) => '  - ' + t).join('\n')}
autoCommit: ${args.autoCommit}
steps:
  package-name-migration: pending
  css-variable-migration: pending
  dom-identifier-migration: pending
  list-card-migration: pending
  form-control-migration: pending
manual:
  M1: pending
  M2: pending
  M3: pending
  M4: pending
  M5: pending
  M6: pending
  M7: pending
---`

const stepResults = []
let aborted = null

for (const step of CODEMOD_STEPS) {
  const result = await agent(
    `You are executing ONE step of the Montage v3 → v4 migration in the repo at ${args.repoRoot}.
Work only on this step. Do not run any other codemod.

Step: ${step.id} — ${step.title}
Targets (JSON array; one codemod invocation per element): ${targets}
State file: ${args.stateFile}
Auto-commit: ${args.autoCommit}

Procedure (follow exactly, in order):

1. Read the state file. If it marks steps.${step.id} as "completed", do NOTHING and report status "skipped". This is critical: running a codemod twice corrupts code (e.g. the form-control codemod renames FormControl → FormControlField on a second run).
2. If autoCommit is true, run \`git -C ${args.repoRoot} status --porcelain\` and confirm the working tree is clean apart from the state file. If it is dirty, report status "failed" with the reason — do not run the codemod on top of unrelated changes.
3. Pre-check: ${step.precheck}
4. For each element of the targets array, run:
   \`npx -y @montage-ui/codemod@${codemodVersion} ${step.id} <target>\`
   from ${args.repoRoot}. The command is non-interactive when both the transform name and the path are passed. Capture the output; jscodeshift prints per-file errors — treat any "ERR" as a failure.
5. If the codemod failed partway: when autoCommit is true (tree was clean at step start), restore this step's partial changes with \`git -C ${args.repoRoot} checkout -- <each target>\` and report status "failed" with the error. When autoCommit is false, do NOT restore anything (earlier steps' uncommitted changes would be lost) — just report "failed" with the error and stop.
6. Post-step verification: ${step.verify} Record findings in verifyFindings; apply only the fixes the verification instructions explicitly assign to this step — leave everything marked M1–M7 to the manual phase.
7. Update the state file: set steps.${step.id} to "completed". If the file is missing, create it from this template first (and append its path to .git/info/exclude so it never enters commits):
${STATE_FILE_TEMPLATE}
8. If autoCommit is true: \`git -C ${args.repoRoot} add -A && git commit -m "chore(montage): v4 codemod — ${step.id}"\` and record the commit hash. The state file is excluded via .git/info/exclude, so it must not appear in the commit.

Report filesChanged from \`git diff --stat\` (or the commit stat). Your final output is structured data for the orchestrator, not prose.`,
    { label: `codemod:${step.id}`, phase: 'Codemods', schema: STEP_RESULT_SCHEMA },
  )

  stepResults.push(result)

  if (!result || result.status === 'failed') {
    aborted = step.id
    log(`Aborting migration at step ${step.id} — fix the reported error, then resume; completed steps will be skipped.`)
    break
  }
  log(`${step.id}: ${result.status} (${result.filesChanged} files)`)
}

let scanResults = []

if (!aborted) {
  scanResults = await parallel(
    MANUAL_SCAN_SECTIONS.map((section) => () =>
      agent(
        `You are scanning (READ-ONLY — do not edit any file) the repo at ${args.repoRoot} for Montage v3 → v4 manual-migration targets.

Section: ${section.id} — ${section.title}

1. Read the section "${section.id}" in ${args.referencesDir}/manual-migrations.md for the scan patterns and fix rules.
2. Run the section's scan patterns over the repo. Scan the WHOLE repo (configs, E2E tests, stylesheets), not just source targets, but skip node_modules, .next, dist, build output, and lockfiles.
3. For each hit, assess it against the fix rules: does it actually need the manual migration, or is it a false positive (e.g. theme token used inside a CSS template literal is fine)? Record file, line, a one-line snippet, and your assessment.
4. Do not fix anything. Your final output is structured data for the orchestrator.`,
        { label: `scan:${section.id}`, phase: 'Scan', schema: SCAN_RESULT_SCHEMA },
      ),
    ),
  )
}

return {
  aborted,
  steps: stepResults.filter(Boolean),
  manualScan: scanResults.filter(Boolean),
}
