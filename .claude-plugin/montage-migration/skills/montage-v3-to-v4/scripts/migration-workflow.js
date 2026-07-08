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
//   codemodVersion: EXACT npm version (x.y.z) for @montage-ui/codemod, resolved at
//                    preflight (npm view @montage-ui/codemod version) or read from the
//                    state file on resume. Dist-tags and ranges are rejected: the value
//                    is recorded in the state file, and anything non-exact would
//                    re-resolve on resume, breaking the same-build guarantee.
// Optional args:
//   completedSteps: step ids already marked "completed" in the state file (default []).
//                   Read the state file in preflight and pass the list so completed
//                   steps are skipped deterministically, without spawning an agent.
//   excludeFiles:   repo-relative paths of hand-migrated files the USER confirmed must be
//                   excluded from form-control-migration (default []). Populated on a
//                   re-run after step 5's precheck reported them; the step agent performs
//                   the move-out/move-back exclusion procedure around the codemod run.

const CODEMOD_STEPS = [
  {
    id: 'package-name-migration',
    title: 'Package name migration (@wanteddev/* → @montage-ui/*)',
    precheck: 'None.',
    verify:
      'grep for "@wanteddev/" in .ts/.tsx/.js/.jsx AND .mjs/.cjs/.mts/.cts inside the targets. Import declarations in .ts/.tsx/.js/.jsx must have zero hits, EXCEPT `@wanteddev/montage-mcp` — that is the codemod\'s own post-migration name for wds-mcp; leave it alone. Import declarations in .mjs/.cjs/.mts/.cts are legitimate leftovers (the CLI runs jscodeshift with --extensions=tsx,ts,jsx,js only) — fix them by hand NOW, they are not codemod failures. Remaining hits in `export ... from`, require(), dynamic import(), jest.mock()/vi.mock(), or `declare module` lines are NOT covered by the codemod — fix those by hand NOW as part of this step (they are code, unlike the config-file work of manual step M1). Hits in package.json/configs belong to manual step M1; leave them.',
  },
  {
    id: 'css-variable-migration',
    title: 'CSS variable migration (--wds-* prefix removal)',
    precheck: 'None.',
    verify:
      'grep for "--wds-" in the targets including .css/.scss/.sass/.less — remaining hits should only be dynamically-built names (template interpolation / string concat), which belong to manual step M3. Then skim the diff for false positives: the rename is a blind prefix substitution, so consumer-defined --wds-* variables were also renamed (declarations and usages stay consistent inside the targets, but note them in verifyFindings). Also grep the diff for partially-rewritten camelCase custom properties (the pattern is lowercase-only, so --wds-myVar comes out as --myVar) and REPAIR them in this step — rename the declaration and every usage consistently; this step owns that fix, M3 is only a safety net. Expect intermediate --card-content-item-* names in the output — they are handled later by manual step M4; do NOT revert them.',
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
      'grep the targets for files importing BOTH an old Card name AND a new counterpart from @montage-ui/core or @wanteddev/wds, using the FULL rename surface: old = every \\bCard(List|Content)-prefixed value or Props type (CardContent, CardContentItem, CardListContent, *Skeleton and *Props forms, CardList, CardListSkeleton); new = ListCard*, CardBody*, CardRow* and their Props. The global renames hit all of these unconditionally, so any old/new pair in one file produces a duplicate import specifier — report such files as "failed" with the file list so they can be cleaned up first, unless there are none. Also flag files importing the SAME old name via two specifiers (plain + alias, e.g. `CardContent` and `CardContent as CC`; also the list-context names CardThumbnail*/CardTitle*/CardCaption* and Skeleton forms, where the leftover fails silently as a wrong-family name): the lookup checks @montage-ui/core before @wanteddev/wds and keeps only the last specifier in file order within the winning source, leaving the other one and its usages untouched, and a re-run mis-renames the leftovers — such files must be simplified to a single specifier first.',
    verify:
      'grep -E "\\bCard(List|Content)" over the targets — expect zero hits (prefix pattern: \\bCardContent\\b would miss CardContentProps/CardContentItemSkeleton leftovers; the prefix form matches no new name, ListCard* included). Remaining hits live in gate-skipped files (namespace imports, re-exports, deep/subpath imports — the codemod only transforms files importing from exactly @montage-ui/core or @wanteddev/wds) — no M-section covers them; fix them by hand NOW as part of this step. Also grep for non-JSX identifier references (e.g. component={CardBody}) in files that render ListCard; report them in verifyFindings for manual step M4 review.',
  },
  {
    id: 'form-control-migration',
    title: 'Form Control naming migration (FormField → FormControl → FormControlField swap)',
    precheck:
      'THIS CODEMOD CORRUPTS ALREADY-MIGRATED CODE. Find files referencing FormControl or FormControlProps WITHOUT also referencing FormField/FormFieldProps — two file-level greps, `\\bFormControl(Props)?\\b` minus `\\bFormField(Props)?\\b`, and diff the file lists (a single-line import-statement grep misses multi-line imports; the (Props)? alternates matter — `\\bFormControl\\b` alone misses a type-only FormControlProps import, which the codemod still corrupts to FormControlFieldProps; see the "Step 5" pre-check in the codemod-steps.md reference next to manual-migrations.md). Then run the SECOND pre-check from the same section — intersect (comm -12) files matching the new sub-component names `\\bFormControl(Field|Label|Message|NegativeMessage|PositiveMessage|MessageAccessory)` with files matching `\\bFormField(Props)?\\b`: a pure v3 file never references the new names, so every hit is mixed — half-migrated code must be reconciled to one API first; FormField appearing only in comments/strings means the file is hand-migrated and needs exclusion. Inspect each: if the file already uses the NEW v4 API (root <FormControl> wrapping <FormControlField>, imports ANY FormControl* sub-component — FormControlField, FormControlLabel, FormControlMessage, FormControlNegativeMessage, FormControlPositiveMessage, FormControlMessageAccessory — or imports only the FormControlProps type with no JSX at all), it was hand-migrated and must be excluded via the move-out/move-back procedure (codemod-steps.md). Files already listed in the user-confirmed excluded-files list are handled in procedure step 4 — proceed. Any hand-migrated file NOT in that list: report "failed" with the file list so the orchestrator can confirm the exclusions with the user and re-run the workflow with excludeFiles set. A v3 file importing only the old FormControl slot (no other Form* imports, <FormControl> used inside another file\'s FormField) is safe.',
    verify:
      'grep -E "\\bForm(Field|Label|Message|ErrorMessage)" over the targets — expect zero hits (prefix pattern: \\bFormField\\b would miss FormFieldProps leftovers; the prefix form matches no FormControl* name). Remaining hits live in gate-skipped files (namespace imports like M.FormField, re-exports, subpath imports) — no M-section covers them; fix them by hand NOW as part of this step, WITHOUT re-running the codemod. NOTE: "FormControl" hits are EXPECTED after this step (it is the new root name); do not flag them and NEVER re-run this codemod to "fix" them. Residual the grep cannot see: in gate-skipped files (namespace/subpath imports) an OLD inner-slot FormControl survives under the same literal name but means the v4 field slot — additionally inspect namespace imports of montage sources (import * as X from @montage-ui/core or @wanteddev/wds) and subpath imports for .FormControl member usages, and rename true inner-slot usages to FormControlField by hand.',
  },
]

// Kept in sync with the M-sections in references/manual-migrations.md, the state-file
// templates in SKILL.md and STATE_FILE_TEMPLATE below — update all of them together.
const MANUAL_SCAN_SECTIONS = [
  { id: 'M1', title: 'Package references outside import declarations' },
  { id: 'M2', title: 'Theme tokens now return var(--...) strings (JS arithmetic breakage)' },
  { id: 'M3', title: 'CSS variable / DOM identifier leftovers (dynamic names, E2E, configs)' },
  { id: 'M4', title: 'Card / ListCard follow-ups (non-JSX refs, data-component values)' },
  { id: 'M5', title: 'FormControl follow-ups (message typography variant/weight)' },
  { id: 'M6', title: 'Modal bottom sheet behavior change (onVisibilityChange removal, peekHeight)' },
  { id: 'M7', title: 'TextField changes (size, TextFieldButton variant, wrapper DOM)' },
  {
    id: 'M8',
    title:
      'TextArea changes (TextAreaContent variants, characterCounter → FormControlMessageAccessory, size)',
  },
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

const codemodVersion = args.codemodVersion
if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(String(codemodVersion))) {
  throw new Error(
    `codemodVersion must be an exact x.y.z version (got ${JSON.stringify(codemodVersion)}) — resolve dist-tags/ranges at preflight (npm view @montage-ui/codemod version) or read the state file's recorded value on resume`,
  )
}
if (!Array.isArray(args.targets) || args.targets.length === 0) {
  throw new Error('targets must be a non-empty array of directory paths')
}
for (const t of args.targets) {
  if (/[*?{}[\]]/.test(String(t))) {
    throw new Error(
      `target ${JSON.stringify(t)} contains glob metacharacters — the codemod CLI does not expand globs (it silently uses only the first path); pass plain directory paths`,
    )
  }
}
const targets = JSON.stringify(args.targets)
const excludeFilesJson = JSON.stringify(args.excludeFiles || [])

// Kept in sync with the templates in SKILL.md ("State file format") and the M-list in
// MANUAL_SCAN_SECTIONS above — adding a step or M-section means updating all three.
const STATE_FILE_TEMPLATE = `---
migration: montage-v3-to-v4
targets:
${args.targets.map((t) => '  - ' + t).join('\n')}
autoCommit: ${args.autoCommit}
codemodVersion: ${codemodVersion}
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
  M8: pending
---`

const completedSteps = args.completedSteps || []

const stepResults = []
let aborted = null

for (const step of CODEMOD_STEPS) {
  if (completedSteps.includes(step.id)) {
    // Deterministic orchestrator-level skip. The step agent's own state-file check
    // (procedure step 1) stays as the second layer, guarding runs launched with a
    // stale completedSteps list.
    log(`${step.id}: skipped (state file marks it completed)`)
    stepResults.push({
      step: step.id,
      status: 'skipped',
      filesChanged: 0,
      committed: false,
      verifyFindings: [],
    })
    continue
  }

  // On state-file recreation the agent must mark every step that already ran in THIS
  // invocation (sequential + abort-on-failure ⇒ all prior steps ran or were skipped as
  // completed) plus the preflight-time completedSteps — an all-pending recreation would
  // trigger corrupting re-runs on a later resume.
  const stepsDoneByNow = JSON.stringify([
    ...new Set([
      ...completedSteps,
      ...CODEMOD_STEPS.slice(0, CODEMOD_STEPS.indexOf(step) + 1).map((s) => s.id),
    ]),
  ])

  // Structural gate: only the form-control-migration agent ever receives exclusions —
  // any other step moving files out would silently skip their transformation.
  const stepExcludeFiles =
    step.id === 'form-control-migration' ? excludeFilesJson : '[]'

  const result = await agent(
    `You are executing ONE step of the Montage v3 → v4 migration in the repo at ${args.repoRoot}.
Work only on this step. Do not run any other codemod.

Step: ${step.id} — ${step.title}
Targets (JSON array; one codemod invocation per element): ${targets}
State file: ${args.stateFile}
Auto-commit: ${args.autoCommit}
References: ${args.referencesDir}/codemod-steps.md — read this step's section before the pre-check; it holds the full pre-check commands, hazards, and (for form-control-migration) the exclusion procedure.
User-confirmed excluded files (form-control-migration only; repo-relative): ${stepExcludeFiles}

Procedure (follow exactly, in order):

1. Read the state file. If it does NOT exist, report status "failed" with reason "state file missing at step start" — do not assume pending; SKILL.md preflight creates the file before step 1, so a missing file means lost migration state that the orchestrator must reconcile with the user. If it marks steps.${step.id} as "completed", do NOTHING and report status "skipped". This is critical: running a codemod twice corrupts code (e.g. the form-control codemod renames FormControl → FormControlField on a second run). Also compare the state file's \`targets\` list with the targets above: on any mismatch, report status "failed" with BOTH lists — targets recorded in the state file are locked; a different list means completed steps never ran on the new directories (silent under-migration) or would re-run on migrated ones (corruption).
2. If autoCommit is true, run \`git -C ${args.repoRoot} status --porcelain\` and confirm the working tree is clean apart from the state file. If it is dirty, report status "failed" with the reason — do not run the codemod on top of unrelated changes. If autoCommit is false, still record \`git status --porcelain\` now: the dirty set should consist of earlier completed steps' transform output (plus the state file); report anything unexplained in verifyFindings BEFORE running — the codemod would transform unrelated edits and entangle them with migration changes.
3. Pre-check: ${step.precheck}
4. If the excluded-files list above is non-empty (only ever populated for form-control-migration), move those files out of the tree NOW — after step 2 has run (the clean-tree check when autoCommit is true, the status recording otherwise) — following the exclusion procedure in codemod-steps.md: \`EXCL=$(mktemp -d)\`, run from the repo root with the repo-relative paths as listed, verify $EXCL is empty first. They are moved back in step 8 — before the state update and commit.
5. If autoCommit is false, record a pre-step snapshot: \`git -C ${args.repoRoot} stash create\` and note the printed hash (it captures the tree including earlier steps' uncommitted changes; if it prints nothing the tree is clean).
6. For each element of the targets array, run:
   \`npx -y @montage-ui/codemod@${codemodVersion} ${step.id} <target>\`
   from ${args.repoRoot}. The command is non-interactive when both the transform name and the path are passed. Capture the output; jscodeshift prints per-file errors — treat any "ERR" as a failure.
7. If the codemod failed partway, NEVER leave a half-transformed tree (re-running a codemod over one is the documented corruption path for steps 4–5, and excluding the partially-transformed files later is the WRONG fix): when autoCommit is true (tree was clean at step start), restore with \`git -C ${args.repoRoot} checkout -- <each target>\`; when autoCommit is false, restore the targets from the snapshot recorded in step 5 (\`git -C ${args.repoRoot} checkout <snapshot-hash> -- <each target>\` — this reverts only this step's changes; earlier steps' uncommitted work is inside the snapshot; if no hash was printed the tree was clean, so plain \`git checkout -- <each target>\` is equivalent). Move any excluded files back per step 8, then report status "failed" with the error.
8. If files were moved out in step 4: move each back to its exact original path, confirm \`git status\` shows no diff for them, and confirm the temp dir is empty. Do this BEFORE the state update and commit — a commit must never contain their deletions.
9. Post-step verification: ${step.verify} Record findings in verifyFindings; apply only the fixes the verification instructions explicitly assign to this step — leave everything marked M1–M8 to the manual phase.
10. Update the state file: set steps.${step.id} to "completed". If the file is missing, recreate it from the template below FIRST — but set every step in this list to "completed" before writing (they all ran, either in earlier sessions or earlier in THIS run; an all-pending file would trigger corrupting re-runs on a later resume): ${stepsDoneByNow}. Report the recreation AND the recreated targets list in verifyFindings — the targets come from this invocation's args, not the lost original, so the orchestrator must confirm them with the user. Ensure the file's path is present in .git/info/exclude (append only if missing) so it never enters commits. Template:
${STATE_FILE_TEMPLATE}
11. If autoCommit is true: \`git -C ${args.repoRoot} add -A && git -C ${args.repoRoot} commit -m "chore(montage): v4 codemod — ${step.id}"\` and record the commit hash. The state file is excluded via .git/info/exclude, so it must not appear in the commit.

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

1. Read the file preamble (everything before the first "## M" heading) AND the section "${section.id}" in ${args.referencesDir}/manual-migrations.md — the preamble holds operational caveats (patterns starting with "-" must be passed via \`--\` or -e, portability notes) without which some scans silently fail.
2. Run the section's scan patterns over the repo. Scan the WHOLE repo (configs, E2E tests, stylesheets), not just source targets, but skip .git, node_modules, .next, dist, build output, and lockfiles.
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
