export const meta = {
  name: 'validate-migration-skill',
  description:
    'Adversarially validate an authored migration skill: 4 reviewers, then per-file dedup + reproduction verification that drops every finding it cannot reproduce',
  whenToUse:
    'Invoked by the migration-skill-authoring skill after authoring or updating a migration skill; re-run until no critical/major survives verification',
  phases: [
    { title: 'Review', detail: '4 parallel reviewers (fact-check, consistency, quality, structure)' },
    { title: 'Verify', detail: 'per-file dedup + reproduce each finding; unreproducible findings are dropped' },
  ],
}

// The harness may deliver `args` as a JSON string instead of an object — normalize first.
const input = typeof args === 'string' ? JSON.parse(args) : (args ?? {})

// Required args:
//   repoRoot: absolute path of this design-system repo
//   skillDir: absolute path of the migration skill under validation
//             (e.g. <repoRoot>/.claude-plugin/montage-migration/skills/montage-v3-to-v4)
//   migrationSection: the MIGRATION.md heading covering this version (e.g. '## 4.0.0')
//   transformsDir: absolute path of this version's transforms
//             (e.g. <repoRoot>/packages/codemod/src/transforms/v4)
// Optional args:
//   pluginRoot: absolute path of the plugin (defaults to <skillDir>/../..)
//   knownIssuesFile: absolute path of the accepted-trade-offs list
//             (defaults to <skillDir>/known-issues.md; may not exist)

if (!input.repoRoot || !input.skillDir || !input.transformsDir) {
  throw new Error('repoRoot, skillDir and transformsDir are required absolute paths')
}

const pluginRoot = input.pluginRoot || input.skillDir.split('/skills/')[0]
const knownIssuesFile = input.knownIssuesFile || `${input.skillDir}/known-issues.md`

const SKILL_FILE_LIST = [
  `${input.skillDir}/SKILL.md`,
  `${input.skillDir}/references/codemod-steps.md`,
  `${input.skillDir}/references/manual-migrations.md`,
  `${input.skillDir}/scripts/migration-workflow.js`,
]
const SKILL_FILES = SKILL_FILE_LIST.join(', ')
const PLUGIN_FILE_LIST = [
  `${pluginRoot}/README.md`,
  `${pluginRoot}/README.ko.md`,
  `${pluginRoot}/.claude-plugin/plugin.json`,
  `${input.repoRoot}/.claude-plugin/marketplace.json`,
]

// Three defects made previous runs untrustworthy, and each rule below exists for one of
// them: confident findings read off a STALE DUPLICATE of the skill (a previous run produced
// three false criticals that way), style nits rated `major`, and the same defect reported by
// two reviewers with two severities. Keep all three blocks in every reviewer prompt.
const PATH_RULES = `PATH DISCIPLINE — non-negotiable, and the single largest source of false findings:
- The skill under review consists of EXACTLY these files: ${SKILL_FILES}. Supporting files: ${PLUGIN_FILE_LIST.join(', ')}.
- Read and cite ONLY those absolute paths. This repository is checked out MORE THAN ONCE on this machine — git worktrees live under a \`.claude/worktrees/<branch>/\` subtree, and \`${input.repoRoot}\` may itself BE such a worktree whose parent checkout holds an OLDER copy of these same files at the same relative path. Reading the wrong copy produces findings that are confident, specific, and entirely false.
- Never search above \`${input.repoRoot}\`. Never use a path you were not given here. Never re-resolve a file by name, glob, or memory when its absolute path is in the list above. If any search returns a path outside the list, discard the hit — do not "reconcile" it.
- For EVERY file you cite, run \`wc -l <absolute path from the list>\` FIRST and put that count in the finding's \`fileLines\`. The verification phase re-runs \`wc -l\` and REFUTES any finding whose \`fileLines\` disagrees, on the grounds that you read a different file — so this field is your own protection.`

const SEVERITY_RULES = `SEVERITY — rate by CONSEQUENCE for a fresh Claude instance executing the skill in a consumer repo, not by how wrong the text feels:
- critical: following the docs corrupts code, loses work, or leaves a corruption GUARD silently inert (a scan that cannot match, a check that never runs).
- major: a fresh instance is likely to take a wrong action, or a documented claim about runtime behavior is false.
- minor: duplication, drift, or imprecision with no wrong-action path; missing cross-reference; wording.
Style, file length, word budget, description length, and "this could be leaner" are minor by definition — never rate them higher. If a finding's only harm is that a human reviewer would find it untidy, it is minor.`

const EVIDENCE_RULES = `EVIDENCE — every finding needs an \`evidence\` field containing either the exact command you ran WITH its observed output, or a verbatim quote with file:line from the allowed paths. Claims about runtime behavior (a grep pattern, a regex, the CLI, a transform) must be EXECUTED: \`/usr/bin/grep -E\` against a fixture you write, \`node -e\` for a regex, the real transform for a codemod claim. A finding you cannot back this way must not be reported at all — an unbacked finding is worse than a missed one, because it costs a maintainer a full investigation.

ACCEPTED TRADE-OFFS — read \`${knownIssuesFile}\` if it exists (it may not; that is fine). Every entry is a deliberate, accepted decision. Do not report it again, and do not report a restatement of it under a different framing.`

const FINDINGS_SCHEMA = {
  type: 'object',
  required: ['findings'],
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        required: ['severity', 'file', 'fileLines', 'issue', 'fix', 'evidence'],
        properties: {
          severity: { type: 'string', enum: ['critical', 'major', 'minor'] },
          file: { type: 'string', description: 'Absolute path from the allowed list' },
          fileLines: {
            type: 'number',
            description: 'Output of `wc -l` on that absolute path — proves which copy was read',
          },
          line: { type: 'number' },
          issue: { type: 'string', description: 'What is wrong, with evidence' },
          fix: { type: 'string', description: 'Concrete suggested fix' },
          evidence: {
            type: 'string',
            description: 'Command + observed output, or verbatim file:line quote',
          },
        },
      },
    },
  },
}

const VERIFIED_SCHEMA = {
  type: 'object',
  required: ['verified'],
  properties: {
    verified: {
      type: 'array',
      items: {
        type: 'object',
        required: ['verdict', 'severity', 'file', 'issue', 'fix', 'reason'],
        properties: {
          verdict: { type: 'string', enum: ['CONFIRMED', 'REFUTED'] },
          severity: { type: 'string', enum: ['critical', 'major', 'minor'] },
          file: { type: 'string' },
          line: { type: 'number' },
          issue: { type: 'string' },
          fix: { type: 'string' },
          reason: {
            type: 'string',
            description: 'How it was reproduced, or exactly what refuted it',
          },
          mergedFrom: {
            type: 'array',
            items: { type: 'string' },
            description: 'Reviewers that reported this same defect, when duplicates were merged',
          },
        },
      },
    },
  },
}

phase('Review')

const REVIEWERS = ['fact-check', 'consistency', 'quality', 'structure']

const results = await parallel([
  () =>
    agent(
      `Adversarially FACT-CHECK migration documentation against source code. Try to refute every checkable claim.

Docs: ${SKILL_FILES}
Ground truth: ${input.transformsDir}/*.ts, ${input.repoRoot}/packages/codemod/src/cli.ts, ${input.repoRoot}/packages/codemod/src/constants.ts, ${input.repoRoot}/packages/codemod/src/helpers/index.ts, and the "${input.migrationSection}" section of ${input.repoRoot}/MIGRATION.md.

Check especially: (1) idempotency claims — trace rename chains in the transform source; (2) CLI invocation claims (positional handling, glob expansion, stylesheet pass registration) — from cli.ts source, not help text; (3) every rename table vs MIGRATION.md and the transform maps, including entries the docs may have MISSED from the maps; (4) every grep pattern — empirically run each one with /usr/bin/grep -E on a synthetic fixture: does it execute without error on BSD grep, does it catch multi-line imports, does it catch *Props/*Skeleton leftovers, does it avoid matching post-migration names?; (5) every claim the docs make ABOUT the workflow script ("the script rejects X", "the script compares Y") — read the actual guard in ${input.skillDir}/scripts/migration-workflow.js and execute its predicate with \`node -e\` before believing or refuting the doc.

${PATH_RULES}

${SEVERITY_RULES}

${EVIDENCE_RULES}

Report only findings you verified. Your final output is raw data for the orchestrator.`,
      { label: 'validate:fact-check', phase: 'Review', schema: FINDINGS_SCHEMA },
    ),
  () =>
    agent(
      `Check INTERNAL CONSISTENCY of a migration skill package. Try hard to find contradictions.

Files: ${SKILL_FILES}, plus ${PLUGIN_FILE_LIST.join(', ')}.

Verify these consistency surfaces are identical everywhere they appear: (1) codemod step order — SKILL.md rules + state template + workflow example, codemod-steps.md table + sections, script CODEMOD_STEPS + STATE_FILE_TEMPLATE, READMEs; (2) M-section numbering/topics — manual-migrations.md headings vs script MANUAL_SCAN_SECTIONS vs SKILL.md mentions vs state template; (3) state file path and YAML schema, including which keys each template writes; (4) Workflow args in SKILL.md example vs what the script reads (every arg the script reads must be documented, and vice versa); (5) npx command shape; (6) ownership of each manual fix (exactly one phase owns it; safety-net scans must say so); (7) abort causes documented in SKILL.md vs the ones the script can actually produce.

${PATH_RULES}

${SEVERITY_RULES}

${EVIDENCE_RULES}

Report every mismatch you can quote both sides of. Your final output is raw data for the orchestrator.`,
      { label: 'validate:consistency', phase: 'Review', schema: FINDINGS_SCHEMA },
    ),
  () =>
    agent(
      `Review a Claude Code SKILL package for QUALITY as if you were the plugin-dev skill-reviewer.

Files: ${SKILL_FILES}

Check: frontmatter description (third person, Korean AND English triggers, resume + single-codemod phrases, version scoping); details pushed to references; imperative writing; whether a FRESH Claude instance in a consumer repo could execute safely — every instruction actionable (no "exclude it" / "confirm with the user" without a documented mechanism at the layer that must do it), corruption hazards stated at every layer (SKILL.md rule, reference table, script precheck/verify), behavioral decisions routed to the user, resume semantics unambiguous (state-vs-git mismatch handling, targets locked).

${PATH_RULES}

${SEVERITY_RULES}

${EVIDENCE_RULES}

Report concrete gaps only — no praise. Your final output is raw data for the orchestrator.`,
      { label: 'validate:quality', phase: 'Review', schema: FINDINGS_SCHEMA },
    ),
  () =>
    agent(
      `Validate PLUGIN STRUCTURE and mechanical health.

Skill dir: ${input.skillDir}
Plugin root: ${pluginRoot}
Marketplace: ${input.repoRoot}/.claude-plugin/marketplace.json

Check: plugin.json valid and version bumped for this change (a deliberately deferred bump belongs in ${knownIssuesFile} — check there before reporting it); SKILL.md frontmatter parses (name matches directory, kebab-case); every file referenced from SKILL.md exists; any file under references/ or scripts/ NOT referenced from SKILL.md gets flagged (the convention is exactly: references/codemod-steps.md, references/manual-migrations.md, scripts/migration-workflow.js); the workflow script parses — extract the body after the meta export, wrap it in "async function main(){...}" with stub globals (args/agent/parallel/log/phase), write to a temp .mjs and run node --check; meta export is a pure literal with name/description/phases; npx prettier --check on the skill's .md files passes; README.md and README.ko.md both list the skill.

${PATH_RULES}

${SEVERITY_RULES}

${EVIDENCE_RULES}

Report failures only. Your final output is raw data for the orchestrator.`,
      { label: 'validate:structure', phase: 'Review', schema: FINDINGS_SCHEMA },
    ),
])

const completed = results.filter(Boolean).length
const raw = results.flatMap((r, i) =>
  r ? (r.findings || []).map((f) => ({ ...f, reviewer: REVIEWERS[i] })) : [],
)

log(`${raw.length} raw findings from ${completed}/4 reviewers — verifying`)

if (raw.length === 0) {
  return { findings: [], refuted: [], rawCount: 0, reviewersCompleted: completed, clean: completed === 4 }
}

// Group by the file each finding names so one verifier sees every claim about that file —
// that is what makes cross-reviewer dedup possible (the same defect reported by two
// reviewers lands in the same group). A barrier is required here for exactly that reason.
// Groups are capped so the run stays inside the agent budget; the overflow group is merged,
// never dropped.
const MAX_GROUPS = 8
const groups = new Map()
for (const f of raw) {
  const key = String(f.file || 'unknown').split('/').filter(Boolean).pop() || 'unknown'
  if (!groups.has(key)) groups.set(key, [])
  groups.get(key).push(f)
}
let grouped = [...groups.entries()].sort((a, b) => b[1].length - a[1].length)
if (grouped.length > MAX_GROUPS) {
  const kept = grouped.slice(0, MAX_GROUPS - 1)
  const merged = grouped.slice(MAX_GROUPS - 1)
  kept.push([
    merged.map(([k]) => k).join('+'),
    merged.flatMap(([, v]) => v),
  ])
  log(`${merged.length} small groups merged into one verifier batch (nothing dropped)`)
  grouped = kept
}

phase('Verify')

const verifiedGroups = await parallel(
  grouped.map(([key, items]) => () =>
    agent(
      `You are the adversarial VERIFIER for review findings about "${key}". DEFAULT TO REFUTED — a finding survives only if you reproduce it yourself.

Findings to verify (JSON, as reported, including each reviewer's claimed \`fileLines\`):
${JSON.stringify(items, null, 2)}

Procedure, in order:
1. STALE-READ CHECK FIRST. For each distinct file named in the findings, resolve it to one of the allowed absolute paths below and run \`wc -l\` on it. If a finding's \`fileLines\` disagrees with the real count, mark it REFUTED with reason "stale-file-read: reviewer read a different copy (claimed N lines, actual M)" and do NOT try to salvage the claim — a previous run produced three false criticals this way. Some findings name a pseudo-path (e.g. "scripts-arg-surface") describing a relationship between two real files; do not refuse those — resolve them to the real files they concern and verify normally.
2. DEDUP. Merge findings that state the SAME underlying defect (frequently one from \`consistency\` and one from \`quality\`). Keep the clearest statement, list the other reviewers in \`mergedFrom\`, and emit ONE entry.
3. REPRODUCE each surviving finding against the real file. Quote file:line for a textual claim. For any claim about behavior, EXECUTE it: \`/usr/bin/grep -E\` on a fixture you write, \`node -e\` for a regex or a script predicate, the real codemod CLI for a transform claim. CONFIRMED requires a reproduction you can state in \`reason\`; anything else is REFUTED with what you actually observed.
4. RE-RATE severity per the rubric below, independently of what the reviewer claimed — reviewers systematically over-rate. Downgrade style/length/budget findings to minor.

Allowed absolute paths (read nothing else, never search above ${input.repoRoot}, and never re-resolve a file by name when its path is here):
${[...SKILL_FILE_LIST, ...PLUGIN_FILE_LIST].join('\n')}
Ground truth for behavior claims: ${input.transformsDir}/*.ts, ${input.repoRoot}/packages/codemod/src/cli.ts, ${input.repoRoot}/packages/codemod/src/constants.ts, ${input.repoRoot}/MIGRATION.md ("${input.migrationSection}").
Accepted trade-offs (REFUTE anything restating an entry here, reason "accepted-trade-off"): ${knownIssuesFile} — read it if it exists.

${SEVERITY_RULES}

Return every finding you were given, each with a verdict — REFUTED ones included, so the orchestrator can see what was dropped and why. Your final output is raw data for the orchestrator.`,
      { label: `verify:${key}`, phase: 'Verify', schema: VERIFIED_SCHEMA },
    ),
  ),
)

const order = { critical: 0, major: 1, minor: 2 }
const assessed = verifiedGroups.filter(Boolean).flatMap((g) => g.verified || [])
const confirmed = assessed
  .filter((f) => f.verdict === 'CONFIRMED')
  .sort((a, b) => order[a.severity] - order[b.severity])
const refuted = assessed.filter((f) => f.verdict === 'REFUTED')
const lostGroups = grouped.length - verifiedGroups.filter(Boolean).length

const blocking = confirmed.filter((f) => f.severity !== 'minor').length
log(
  `${confirmed.length} confirmed (${blocking} critical/major), ${refuted.length} refuted, ${raw.length} raw` +
    (lostGroups > 0 ? ` — WARNING: ${lostGroups} verifier group(s) returned nothing; their findings are unassessed` : ''),
)

return {
  findings: confirmed,
  refuted: refuted.map((f) => ({ file: f.file, issue: f.issue, reason: f.reason })),
  rawCount: raw.length,
  reviewersCompleted: completed,
  unassessedGroups: lostGroups,
  clean: blocking === 0 && completed === 4 && lostGroups === 0,
}
