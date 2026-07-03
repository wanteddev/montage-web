---
name: montage-v3-to-v4
description: This skill should be used when the user asks to migrate a project from Montage (WDS) v3 to v4, upgrade @wanteddev/wds to @montage-ui/* 4.x, run any Montage v4 codemod (package-name-migration, css-variable-migration, dom-identifier-migration, list-card-migration, form-control-migration), or resume an in-progress v4 migration. Triggers include "montage v4 마이그레이션", "montage 4 적용해줘", "몬타지 v4로 올려줘", "wds 4.0으로 업그레이드", "디자인시스템 v4로 올려줘", "@montage-ui로 전환해줘", "마이그레이션 이어서 해줘". Covers v3→v4 only (earlier migrations live in the repo's MIGRATION.md). Orchestrates the 5 codemods strictly in sequence with run-once protection, then guides the manual migrations.
---

# montage-v3-to-v4

Migrate a consumer project from Montage (Wanted Design System) v3 (`@wanteddev/wds*` 3.x)
to v4 (`@montage-ui/*` 4.x). The migration is: 5 codemods run **strictly in sequence,
each exactly once**, followed by manual migrations the codemods cannot express, followed
by verification.

## Critical rules

1. **Never run a codemod twice on the same tree.** `form-control-migration` swaps
   `FormField→FormControl` while renaming `FormControl→FormControlField`; a second run
   renames the new root again and silently corrupts the code. Treat all 5 steps as
   run-once; the state file is the source of truth.
2. **Fixed order, one step at a time.** Complete (and commit) step N before starting
   step N+1: ① `package-name-migration` ② `css-variable-migration`
   ③ `dom-identifier-migration` ④ `list-card-migration` ⑤ `form-control-migration`.
   Manual steps reference post-codemod names, so they come after all 5.
3. **Codemods first, hand-edits after.** Do not hand-migrate any `Form*` / `Card*` usage
   (or adopt new v4 APIs) before the codemods run — `form-control-migration` corrupts
   hand-migrated files even on its first run.
4. **Start from a clean git tree** and keep one commit per step so any step can be
   reverted in isolation.
5. Run codemods through the CLI (`npx -y @montage-ui/codemod@latest <transform> <path>`),
   never raw jscodeshift — steps ② and ③ rewrite stylesheets only via the CLI.

## Step 0 — Preflight

Perform all checks before changing anything:

1. **Version check.** Read the project's `package.json`:
   - `@wanteddev/wds*` at 3.x → proceed.
   - `@wanteddev/wds*` at 2.x or lower → stop; complete the v2→v3 migration first
     (MIGRATION.md in the wanteddev/montage-web repo).
   - Only `@montage-ui/*` 4.x present and no state file → likely already migrated; run
     the leftover greps from `references/codemod-steps.md` and report instead of migrating.
   - BOTH `@wanteddev/wds*` and `@montage-ui/*` present → the project is partially
     hand-migrated. Run the step ④/⑤ pre-checks from `references/codemod-steps.md` before
     anything else and expect file exclusions in step ⑤.
2. **State file.** Look for `.claude/montage-migration-v4.local.md` (format below). If it
   exists, this is a resume: skip every step marked `completed` and continue from the
   first `pending` step. Never downgrade a `completed` mark. Before resuming, sanity-check
   the marks against reality (e.g. a step marked `completed` but its renames absent from
   the tree — the user may have reverted commits): on any mismatch, stop and reconcile
   with the user; never re-run a marked step automatically. On resume, the `targets`
   recorded in the state file are locked — if the user requests different targets, that is
   a new migration decision to surface, not a silent override.
3. **Clean tree.** `git status --porcelain` must be empty (the state file itself is the
   only allowed exception). Otherwise ask the user to commit/stash first.
4. **Targets.** Identify source directories to transform (default `src`). Include
   directories containing stylesheets that reference `--wds-*` variables. Use plain
   directory paths — the codemod CLI takes exactly one path per invocation and does not
   expand globs; each step runs once per target directory. In a monorepo, list ALL
   package source directories as targets of ONE migration (one state file) — do not run
   separate per-package migrations, or the run-once guarantee fragments per path.
5. **Ask the user once** (single `AskUserQuestion`): confirm the target directories, and
   whether to auto-commit after each step (recommended; enables safe rollback of a failed
   step). Do not ask again mid-migration.

### State file format

Create `.claude/montage-migration-v4.local.md` before step ①, and append the path to
`.git/info/exclude` (repo-local ignore) so per-step `git add -A` commits never include it:

```markdown
---
migration: montage-v3-to-v4
targets:
  - src
autoCommit: true
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
---
```

Mark each step `completed` immediately after it succeeds. Delete the file only after the
final verification passes.

## Step 1 — Codemod phase (use the Workflow tool)

Orchestrate the codemod phase with the Workflow tool using the bundled script — it
guarantees deterministic sequencing (each codemod is a sequential `await`; a failure
aborts the chain) and runs the manual-migration scans in parallel afterwards:

```js
Workflow({
  scriptPath: "<this skill's base directory>/scripts/migration-workflow.js",
  args: {
    repoRoot: '<absolute repo root>',
    targets: ['src'],
    stateFile: '<absolute path>/.claude/montage-migration-v4.local.md',
    referencesDir: "<this skill's base directory>/references",
    autoCommit: true,
    completedSteps: [], // step ids already marked completed in the state file
  },
});
```

Populate `completedSteps` from the state file read in preflight (empty on a first run) —
the script skips those steps deterministically without spawning an agent, and each step
agent re-checks the state file as a second layer.

Resolve `<this skill's base directory>` from the "Base directory for this skill" line
announced when this skill loaded. Optionally pass `codemodVersion` (npm version or
dist-tag, default `latest`) — pin it when a migration may span multiple sessions so
resumed runs use the same codemod build. The workflow returns per-step results plus a
`manualScan` report (assessed occurrences for manual steps M1–M7).

- If the workflow reports `aborted`, surface the failed step's error to the user, fix the
  cause, and re-run the same Workflow invocation with `completedSteps` refreshed from the
  state file — completed steps are skipped, so resuming is safe.
- **Fallback without the Workflow tool:** execute the exact per-step procedure embedded in
  `scripts/migration-workflow.js` (read it) inline — one step at a time, same order, same
  state-file checks. Never parallelize the codemod steps.

Details per step (commands, pre-checks, post-step verification greps, hazards):
`references/codemod-steps.md`.

## Step 2 — Manual migrations

Work through `references/manual-migrations.md` (M1–M7) using the workflow's `manualScan`
hits as the worklist. Apply mechanical fixes directly; ask the user before behavioral
decisions:

- **M6 (Modal bottom sheet):** per occurrence — accept the new close-on-dismiss default
  (delete `onVisibilityChange` workarounds) or pin with `peekHeight`.
- **M7 (TextField):** whether any field should adopt `size="medium"` (40px) now that the
  single size maps to Large.

M1 (package.json + configs) ends with a dependency install to refresh the lockfile.
Mark each M-section `completed` in the state file as it finishes.

## Step 3 — Final verification

1. Leftover greps all clean: re-run EVERY post-step verification grep from
   `references/codemod-steps.md` and every M-section scan pattern from
   `references/manual-migrations.md` — the union is the checklist; do not improvise a
   shorter list.
2. Project checks: install, typecheck, lint, build, unit tests — whatever the project
   defines.
3. Remind the user to visually QA TextField / bottom-sheet Modal / Card list screens
   (v4 changed their rendering and behavior, not just names).
4. Delete the state file, then summarize: steps run, commits created, manual fixes
   applied, items intentionally left (with reasons).

## Additional resources

- **`references/codemod-steps.md`** — the 5 codemods in order: exact commands,
  idempotency analysis, pre-checks, post-step verification greps, hazards.
- **`references/manual-migrations.md`** — manual migrations M1–M7 with scan patterns and
  fix rules.
- **`scripts/migration-workflow.js`** — Workflow-tool script for the codemod phase; also
  the canonical per-step procedure for inline fallback execution.
