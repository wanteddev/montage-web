---
name: migration-skill-authoring
description: This skill should be used when the user asks to create a new Montage migration skill for the montage-web-migration plugin (e.g. a future v4-to-v5), add or update content in an existing one (e.g. montage-v3-to-v4) after new breaking changes or codemods land, validate a migration skill, or says "마이그레이션 스킬 만들어줘", "마이그레이션 스킬 업데이트해줘", "v3-to-v4 스킬에 내용 추가해줘", "마이그레이션 스킬 검증해줘", "create/update/validate the migration skill". The pipeline (codemod analysis, ordering/idempotency derivation, authoring conventions, adversarial validation) is Workflow-orchestrated.
---

# migration-skill-authoring

Author or update consumer-facing migration skills in
`.claude-plugin/montage-migration/skills/`. The pipeline: **analyze the codemods with a
Workflow (never trust MIGRATION.md prose alone) → derive ordering and run-once
constraints from source facts → author the four-file deliverable per convention →
validate with a Workflow, fix, and re-run until clean**.

`skills/montage-v3-to-v4/` is the reference implementation; all conventions live in
`references/authoring-conventions.md`.

## Core principles

1. **Idempotency and ordering come from transform SOURCE, not docs.** The one migration
   fact that matters most — "does re-running corrupt code?" — is a rename-chain property
   of the transform (a rename VALUE appearing as another rename KEY). It must be traced
   in code, with file:line evidence.
2. **Codemods run strictly in sequence, each exactly once per tree.** Every skill encodes
   this with a state file, per-step verification, and defense-in-depth warnings for any
   non-idempotent transform.
3. **Every factual claim ships validated.** Grep patterns are empirically executed
   (macOS BSD grep included), rename tables are diffed against the transform maps, and
   consistency surfaces are cross-checked — by adversarial agents, before the skill ships.

## Mode A — Create a new version skill

### Prerequisites

- The MIGRATION.md section for the target version is written.
- The codemods exist in `packages/codemod/src/transforms/<vN>/` and are registered in
  `MIGRATION_TRANSFORMS` in `packages/codemod/src/constants.ts`.

If either is missing, stop and surface it — the skill is authored FROM these, never ahead
of them.

### Step 1 — Analyze the codemods

Enumerate the version's transforms from `constants.ts`, then run the analysis Workflow:

```js
Workflow({
  scriptPath: "<this skill's base directory>/scripts/analyze-codemods.js",
  args: {
    repoRoot: "<absolute repo root>",
    migrationSection: "## <N>.0.0",
    transforms: [
      { key: "<transform-name>",
        files: "<absolute transform path(s), plus any *-map.ts files it imports>",
        extra: "<transform-specific questions>" },
      ...
    ]
  }
})
```

Resolve `<this skill's base directory>` from the "Base directory for this skill" line
announced when this skill loaded. If the result's `missing` array is non-empty (or
`docs` is null when the docs agent was not skipped), re-run the analysis for those
transforms before Step 2 — never derive ordering or idempotency from partial analysis.

Write a pointed `extra` per transform: rename-chain suspects (any A→B where B is also
renamed), map-file interactions with other transforms' outputs, whether it touches
attribute names vs values, string literals vs identifiers.

### Step 2 — Derive the design from the analysis

- **Canonical order**: MIGRATION.md section order, adjusted only by hard constraints the
  analysis surfaced. Record every constraint WITH its reason.
- **Run-once machinery**: flag every non-idempotent transform (and every
  hand-migration-collision hazard) for defense-in-depth treatment — see the consistency
  surfaces table in `references/authoring-conventions.md`.
- **Manual steps (M-sections)**: everything the codemods cannot reach, each with scan
  patterns and an unambiguous owner (exactly one phase fixes it; safety-net scans say so).

### Step 3 — Author the deliverable

Follow `references/authoring-conventions.md` exactly: the four files (SKILL.md,
`references/codemod-steps.md`, `references/manual-migrations.md`,
`scripts/migration-workflow.js`), the state-file spec, the workflow script conventions,
the writing conventions, and the grep pattern rules. Copy the montage-v3-to-v4 structure
and adapt content — do not invent a new shape.

### Step 4 — Validate until clean

```js
Workflow({
  scriptPath:
    "<this skill's base directory>/scripts/validate-migration-skill.js",
  args: {
    repoRoot: '<absolute repo root>',
    skillDir: '<absolute path of the authored skill>',
    migrationSection: '## <N>.0.0',
    transformsDir: '<absolute path of packages/codemod/src/transforms/vN>',
  },
});
```

Fix every `critical`/`major` finding, then RE-RUN the validation Workflow — a real fix
can introduce a new real defect, so `critical`/`major` always warrants another pass.

**Stop re-running once a round returns no `critical`/`major` and its `minor` findings are
only heuristic refinement.** The validation reviewers are adversarial and will almost
always surface _something_; `clean: true` is the ideal, not a required terminal state.
Each round is expensive (four large sub-agents), so converge deliberately:

- Fix `minor` findings that are genuine defects (a wrong rename-table entry, a broken
  grep that silently finds nothing, a state-schema contradiction, a claim that
  contradicts the transform source) — these are cheap and worth another pass with the
  `critical`/`major` fixes.
- Do NOT loop for `minor` findings that just make an already-hedged heuristic
  incrementally tighter — "this scan pattern also misses `'wds-' + kind`", "widen this
  regex to also match `props.theme`", etc. The scan patterns are declared line-based
  heuristics ("a clean scan is 'nothing obvious', not proof of absence"); chasing every
  regex edge case with more regex contradicts that framing and never terminates. Apply
  the ones you judge worthwhile in a single final edit and do not re-validate solely to
  confirm them.
- A `minor` you are deliberately not acting on (e.g. a version bump the user deferred)
  needs a one-line note in your report, not another round.

Practically: expect ONE re-run after the first substantive fix pass, occasionally two if
that pass surfaced new `critical`/`major`. If a round yields only heuristic-refinement
`minor`s, you are done — stop and report. The structure reviewer already runs the
mechanical checks (workflow-script syntax wrap + `node --check`, prettier); run them
manually (procedure in the conventions doc) after your final edits instead of triggering
a whole validation round just to confirm formatting.

### Step 5 — Ship

Update the plugin `README.md`/`README.ko.md` skill listing, bump
`.claude-plugin/montage-migration/.claude-plugin/plugin.json` (minor) and
`.claude-plugin/marketplace.json`. Suggest a trigger test:
`claude --plugin-dir .claude-plugin/montage-migration`.

## Mode B — Update an existing migration skill

For new breaking changes, a new codemod, or corrections landing in a version that already
has a skill:

1. **Impact analysis first.** Read the consistency surfaces table in
   `references/authoring-conventions.md` — a new step or M-section touches EVERY listed
   surface (SKILL.md, both references, the workflow script's `CODEMOD_STEPS` /
   `MANUAL_SCAN_SECTIONS` / `STATE_FILE_TEMPLATE`, both READMEs). Partial updates are how
   the files start contradicting each other.
2. **Analyze only what changed** — run `scripts/analyze-codemods.js` with just the new or
   modified transforms (`skipDocsAgent: true` if the CLI is untouched). A changed
   transform's idempotency must be re-traced from source, not assumed stable. For a step
   inserted anywhere but last, the `extra` MUST also ask: "does this transform behave
   correctly on code already migrated by the steps that canonically follow it?" —
   consumers who completed later steps will run it on a post-migration tree.
3. **Respect state-schema stability.** Consumers may be mid-migration with a live state
   file: never rename existing step keys or M-numbers (renamed transforms are the one
   exception — see the conventions doc); add new steps at the position the constraint
   analysis dictates with value `pending`. Then encode the semantics INTO the consumer
   deliverable, not just here: the consumer SKILL.md's Step 0 resume item and the
   workflow step-agent prompt must both state that a step key missing from an older
   state file is `pending` (so resuming consumers pick up the new step), and if the new
   step lands before steps consumers may have completed, the resume item must say the
   new step still runs and what to verify first. Add the new step's post-step
   verification grep to the consumer skill's "already migrated" preflight path and final
   verification, so consumers who FINISHED the migration get flagged when they invoke
   the skill again.
4. **Re-run the FULL validation Workflow** (Step 4 above) — not just on the delta; the
   consistency reviewer exists precisely for update-mode drift (renumbering a step, for
   instance, leaves stale cross-references the delta alone would not reveal). Apply Step
   4's convergence rule: re-run after each `critical`/`major` fix pass, but stop once a
   round returns only heuristic-refinement `minor`s — do not loop toward `clean: true`.
5. **Bump versions** (plugin.json minor for new content, patch for corrections) and
   update READMEs if behavior changed.

## Additional resources

- **`references/authoring-conventions.md`** — the deliverable structure, consistency
  surfaces, sequencing/run-once design, workflow-script and writing conventions, verified
  CLI facts, grep pattern rules, mechanical validation.
- **`scripts/analyze-codemods.js`** — analysis Workflow (per-transform facts + CLI/docs).
- **`scripts/validate-migration-skill.js`** — validation Workflow (fact-check,
  consistency, quality, structure); re-run until `clean: true`.
