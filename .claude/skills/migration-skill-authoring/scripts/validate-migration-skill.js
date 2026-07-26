export const meta = {
  name: 'validate-migration-skill',
  description:
    'Adversarially validate an authored migration skill: fact-check vs codemod sources, cross-file consistency, skill quality, structure',
  whenToUse:
    'Invoked by the migration-skill-authoring skill after authoring or updating a migration skill; re-run until zero findings',
  phases: [{ title: 'Validate', detail: '4 parallel reviewers' }],
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

const FINDINGS_SCHEMA = {
  type: 'object',
  required: ['findings'],
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        required: ['severity', 'file', 'issue', 'fix'],
        properties: {
          severity: { type: 'string', enum: ['critical', 'major', 'minor'] },
          file: { type: 'string' },
          line: { type: 'number' },
          issue: { type: 'string', description: 'What is wrong, with evidence' },
          fix: { type: 'string', description: 'Concrete suggested fix' },
        },
      },
    },
  },
}

const SKILL_FILES = `${input.skillDir}/SKILL.md, ${input.skillDir}/references/codemod-steps.md, ${input.skillDir}/references/manual-migrations.md, ${input.skillDir}/scripts/migration-workflow.js`

phase('Validate')

const results = await parallel([
  () =>
    agent(
      `Adversarially FACT-CHECK migration documentation against source code. Try to refute every checkable claim.

Docs: ${SKILL_FILES}
Ground truth: ${input.transformsDir}/*.ts, ${input.repoRoot}/packages/codemod/src/cli.ts, ${input.repoRoot}/packages/codemod/src/constants.ts, ${input.repoRoot}/packages/codemod/src/helpers/index.ts, and the "${input.migrationSection}" section of ${input.repoRoot}/MIGRATION.md.

Check especially: (1) idempotency claims — trace rename chains in the transform source; (2) CLI invocation claims (positional handling, glob expansion, stylesheet pass registration) — from cli.ts source, not help text; (3) every rename table vs MIGRATION.md and the transform maps, including entries the docs may have MISSED from the maps; (4) every grep pattern — empirically run each one with /usr/bin/grep -E on a synthetic fixture: does it execute without error on BSD grep, does it catch multi-line imports, does it catch *Props/*Skeleton leftovers, does it avoid matching post-migration names? Report only verified findings. Your final output is raw data for the orchestrator.`,
      { label: 'validate:fact-check', phase: 'Validate', schema: FINDINGS_SCHEMA },
    ),
  () =>
    agent(
      `Check INTERNAL CONSISTENCY of a migration skill package. Try hard to find contradictions.

Files: ${SKILL_FILES}, plus ${input.repoRoot}/.claude-plugin/montage-migration/README.md, README.ko.md, .claude-plugin/plugin.json.

Verify these consistency surfaces are identical everywhere they appear: (1) codemod step order — SKILL.md rules + state template + workflow example, codemod-steps.md table + sections, script CODEMOD_STEPS + STATE_FILE_TEMPLATE, READMEs; (2) M-section numbering/topics — manual-migrations.md headings vs script MANUAL_SCAN_SECTIONS vs SKILL.md mentions vs state template; (3) state file path and YAML schema; (4) Workflow args in SKILL.md example vs what the script reads (every arg the script reads must be documented, and vice versa); (5) npx command shape; (6) ownership of each manual fix (exactly one phase owns it; safety-net scans must say so). Report every mismatch. Your final output is raw data for the orchestrator.`,
      { label: 'validate:consistency', phase: 'Validate', schema: FINDINGS_SCHEMA },
    ),
  () =>
    agent(
      `Review a Claude Code SKILL package for QUALITY as if you were the plugin-dev skill-reviewer.

Files: ${SKILL_FILES}

Check: frontmatter description (third person, Korean AND English triggers, resume + single-codemod phrases, version scoping); SKILL.md lean with details in references; imperative writing; whether a FRESH Claude instance in a consumer repo could execute safely — every instruction actionable (no "exclude it" without a documented mechanism), corruption hazards stated at every layer (SKILL.md rule, reference table, script precheck/verify), behavioral decisions routed to the user, resume semantics unambiguous (state-vs-git mismatch handling, targets locked). Report concrete gaps only — no praise. Your final output is raw data for the orchestrator.`,
      { label: 'validate:quality', phase: 'Validate', schema: FINDINGS_SCHEMA },
    ),
  () =>
    agent(
      `Validate PLUGIN STRUCTURE and mechanical health.

Skill dir: ${input.skillDir}
Plugin root: ${input.repoRoot}/.claude-plugin/montage-migration
Marketplace: ${input.repoRoot}/.claude-plugin/marketplace.json

Check: plugin.json valid and version bumped for this change; SKILL.md frontmatter parses (name matches directory, kebab-case); every file referenced from SKILL.md exists; any file under references/ or scripts/ NOT referenced from SKILL.md gets flagged (the convention is exactly: references/codemod-steps.md, references/manual-migrations.md, scripts/migration-workflow.js); the workflow script parses — extract the body after the meta export, wrap it in "async function main(){...}" with stub globals (args/agent/parallel/log/phase), write to a temp .mjs and run node --check; meta export is a pure literal with name/description/phases; npx prettier --check on the skill's .md files passes; README.md and README.ko.md both list the skill. Report failures only. Your final output is raw data for the orchestrator.`,
      { label: 'validate:structure', phase: 'Validate', schema: FINDINGS_SCHEMA },
    ),
])

const REVIEWERS = ['fact-check', 'consistency', 'quality', 'structure']
const order = { critical: 0, major: 1, minor: 2 }
const completed = results.filter(Boolean).length
const findings = results
  .flatMap((r, i) => (r ? r.findings.map((f) => ({ ...f, reviewer: REVIEWERS[i] })) : []))
  .sort((a, b) => order[a.severity] - order[b.severity])

log(`${findings.length} findings from ${completed}/4 reviewers`)

return { findings, clean: findings.length === 0 && completed === 4 }
