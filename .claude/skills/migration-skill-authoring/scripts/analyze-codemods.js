export const meta = {
  name: 'analyze-migration-codemods',
  description:
    'Analyze codemod transforms for behavior, idempotency, and ordering constraints before authoring a migration skill',
  whenToUse:
    'Invoked by the migration-skill-authoring skill: one analysis agent per transform + one CLI/docs agent',
  phases: [{ title: 'Analyze', detail: 'one agent per transform + CLI/docs facts' }],
}

// The harness may deliver `args` as a JSON string instead of an object — normalize first.
const input = typeof args === 'string' ? JSON.parse(args) : (args ?? {})

// Required args:
//   repoRoot:   absolute path of this design-system repo
//   transforms: array of { key, files, extra? }
//     key   — transform name as registered in constants.ts (e.g. 'foo-migration')
//     files — comma/`and`-joined absolute paths of the transform source (+ map files)
//     extra — transform-specific questions (rename-chain suspects, map interactions, ...)
//   migrationSection: the MIGRATION.md heading covering this version (e.g. '## 5.0.0')
// Optional args:
//   skipDocsAgent: true to skip the CLI/docs agent (e.g. update mode, CLI unchanged)

const TRANSFORM_SCHEMA = {
  type: 'object',
  required: [
    'transform',
    'summary',
    'detection',
    'importGated',
    'idempotency',
    'ordering',
    'manualFollowUps',
    'cliCommand',
  ],
  properties: {
    transform: { type: 'string' },
    summary: { type: 'string', description: 'What the codemod does, 2-4 sentences' },
    detection: {
      type: 'string',
      description:
        'Exactly what the codemod matches: which imports gate it, which patterns it rewrites, which file types it touches, whether a stylesheet text pass is registered for it',
    },
    importGated: {
      type: 'boolean',
      description: 'true if the transform only fires when specific gating imports are present',
    },
    idempotency: {
      type: 'object',
      required: ['safeToRerun', 'secondRunEffect', 'evidence'],
      properties: {
        safeToRerun: { type: 'boolean' },
        secondRunEffect: {
          type: 'string',
          description:
            'Concretely what happens on a second run over already-migrated code. Trace rename chains: does any rename VALUE appear as another rename KEY? Also state what happens on hand-migrated code.',
        },
        evidence: { type: 'string', description: 'file:line references backing the claim' },
      },
    },
    ordering: {
      type: 'array',
      items: { type: 'string' },
      description:
        'Constraints relative to the other transforms of this version AND to manual steps, each with a reason. Say explicitly when order does not matter and why.',
    },
    manualFollowUps: {
      type: 'array',
      items: { type: 'string' },
      description: 'Things the codemod cannot do that consumers must fix by hand afterwards',
    },
    cliCommand: { type: 'string', description: 'Exact npx command for a src directory' },
    testFiles: { type: 'array', items: { type: 'string' } },
  },
}

const DOCS_SCHEMA = {
  type: 'object',
  required: ['invocation', 'batchMode', 'notes'],
  properties: {
    invocation: { type: 'string', description: 'Canonical non-interactive CLI usage line' },
    batchMode: {
      type: 'string',
      description: 'Whether the CLI can batch transforms or takes one per invocation; how many path args it honors; whether globs are expanded',
    },
    styleTextTransforms: {
      type: 'string',
      description: 'Which transforms are registered in STYLE_TEXT_TRANSFORMS (stylesheet pass)',
    },
    latestPublishedVersion: {
      type: 'string',
      description: 'Latest published version per CHANGELOG.md and current lerna.json version',
    },
    recommendedOrder: {
      type: 'string',
      description: 'Ordering implied by the MIGRATION.md section order and constants.ts',
    },
    notes: { type: 'array', items: { type: 'string' } },
  },
}

phase('Analyze')

const tasks = input.transforms.map((t) => () =>
  agent(
    `You are analyzing a jscodeshift codemod in the Montage design system repo at ${input.repoRoot}.

Target transform: ${t.key}
Read these files completely: ${t.files}
Also read the shared helpers they import from ${input.repoRoot}/packages/codemod/src/helpers/, ${input.repoRoot}/packages/codemod/src/constants.ts, ${input.repoRoot}/packages/codemod/src/cli.ts, and the "${input.migrationSection}" section of ${input.repoRoot}/MIGRATION.md.
Find and read any test files for this transform (Glob/Grep for "*${t.key}*" under ${input.repoRoot}/packages/codemod).

${t.extra || ''}

Answer with file:line evidence. A consumer-facing skill will run this codemod EXACTLY ONCE in a fixed order in consumer repos, so the idempotency and ordering analysis must be correct, not guessed. Idempotency is a source-level fact: trace whether any rename VALUE appears as another rename KEY (double-swap corruption), and whether running against hand-migrated code corrupts. Your final output is raw data for the orchestrator, not prose for a human.`,
    { label: `analyze:${t.key}`, phase: 'Analyze', schema: TRANSFORM_SCHEMA },
  ),
)

if (!input.skipDocsAgent) {
  tasks.push(() =>
    agent(
      `You are analyzing the CLI and docs of the @montage-ui/codemod package in the repo at ${input.repoRoot}.

Read: packages/codemod/package.json, packages/codemod/src/cli.ts, packages/codemod/src/constants.ts, packages/codemod/README.md, packages/codemod/README.ko.md, lerna.json, and the "${input.migrationSection}" section of MIGRATION.md (all under ${input.repoRoot}). Check CHANGELOG.md briefly for the latest published version.

Determine from SOURCE (not docs — the help text has been wrong before): exact non-interactive invocation, how many path positionals are honored, whether globs are expanded, which transforms get the stylesheet text pass (STYLE_TEXT_TRANSFORMS), extensions and ignore patterns, and any ordering implied for this version's transforms. Your final output is raw data for the orchestrator.`,
      { label: 'analyze:cli-docs', phase: 'Analyze', schema: DOCS_SCHEMA },
    ),
  )
}

const results = await parallel(tasks)
const transformResults = results.slice(0, input.transforms.length)
const transforms = transformResults.filter(Boolean)
const missing = input.transforms.filter((t, i) => !transformResults[i]).map((t) => t.key)
const docs = input.skipDocsAgent ? 'skipped' : results[input.transforms.length] || null

log(
  `Analyzed ${transforms.length}/${input.transforms.length} transforms` +
    (missing.length ? ` — MISSING: ${missing.join(', ')} (re-run before deriving the design)` : ''),
)

// missing lists transforms whose analysis agent failed; docs is null when the docs
// agent failed (vs 'skipped' when skipDocsAgent was set). Never derive ordering or
// idempotency from a result with missing entries.
return { transforms, missing, docs }
