---
name: montage-v3-to-v4
description: This skill should be used when the user asks to migrate a project from Montage (WDS) v3 to v4, upgrade @wanteddev/wds to @montage-ui/* 4.x, run any Montage v4 codemod (package-name-migration, css-variable-migration, dom-identifier-migration, list-card-migration, form-control-migration), or resume an in-progress v4 migration. Triggers include "montage v4 마이그레이션", "montage 4 적용해줘", "몬타지 v4로 올려줘", "wds 4.0으로 업그레이드", "디자인시스템 v4로 올려줘", "@montage-ui로 전환해줘", "마이그레이션 이어서 해줘", "form-control 코드모드만 돌려줘", "migrate to montage v4", "resume the montage migration", "run the form-control codemod". Covers v3→v4 only (earlier migrations live in the wanteddev/montage-web repo's MIGRATION.md). Orchestrates the 5 codemods strictly in sequence with run-once protection, then guides the manual migrations.
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
5. Run codemods through the CLI (`npx -y @montage-ui/codemod@<codemodVersion> <transform>
<path>`; resolve the version at preflight, and on resume use the state file's recorded
   `codemodVersion`), never raw jscodeshift — steps ② and ③ rewrite stylesheets only via
   the CLI.

## Step 0 — Preflight

Perform all checks before changing anything:

1. **Version check.** Read the project's `package.json`:
   - `@wanteddev/wds*` at 3.x → proceed.
   - `@wanteddev/wds*` at 2.x or lower → stop; complete the v2→v3 migration first
     (MIGRATION.md in the wanteddev/montage-web repo).
   - Only `@montage-ui/*` 4.x present and no state file → likely already migrated; run
     the leftover greps from `references/codemod-steps.md` plus every M-section scan
     pattern from `references/manual-migrations.md` (M-sections added after a consumer
     finished migrating — e.g. M8 — surface only through these scans) and report instead
     of migrating.
   - BOTH `@wanteddev/wds*` and `@montage-ui/*` present → the project is partially
     hand-migrated. Run the step ④/⑤ pre-checks from `references/codemod-steps.md` before
     anything else and expect file exclusions in step ⑤.
   - NEITHER package present → check nested/workspace `package.json` files; if still
     absent, stop and tell the user this repo does not appear to use Montage/WDS.
2. **State file.** Look for `.claude/montage-migration-v4.local.md` (format below). If it
   exists, this is a resume; apply these rules:
   - **Resume.** Skip every step marked `completed`, continue from the first `pending`
     step. A step or manual key missing from an older state file (e.g. `M8`, added after
     the file was created) is `pending` — add it to the file and run it. Never downgrade
     a `completed` mark on your own; only after the user explicitly confirms the step's
     changes were reverted may you reset it to `pending` and re-run it.
   - **Mismatch reconciliation.** Before resuming, sanity-check the marks against reality
     IN BOTH DIRECTIONS: a step marked `completed` but its renames absent from the tree
     (reverted commits), or a step marked `pending` whose renames are already present
     (hand-run between sessions — re-running step ⑤ over such a tree is the corruption
     path). Spot-check `completed` MANUAL marks the same way: a fresh hit from a
     completed M-section's scan patterns is equally a mismatch. On any mismatch, stop and
     reconcile with the user; never re-run a marked step automatically. For the
     pending-but-applied direction: once the user confirms the codemod was hand-run, run
     that step's verification grep from `references/codemod-steps.md`, fix leftovers per
     that step's instructions, then mark it `completed` — never run the codemod itself.
   - **Target lock & addition.** The `targets` recorded in the state file are locked — a
     request for different targets is a new migration decision to surface, never a silent
     override. A mid-migration TARGET ADDITION (e.g. a stylesheet directory discovered
     late) has one sanctioned path: with user confirmation, catch the new directory up by
     running each already-`completed` step's codemod CLI directly on ONLY that directory
     with the recorded `codemodVersion` — the step's `completed` mark stays untouched (it
     is per-migration; a new directory is a new tree, so this is not a re-run and the
     "skip if completed" rule is intentionally bypassed here) — run each step's verify
     grep scoped to the new directory, then append the directory to `targets` in the
     state file and pass the updated list on subsequent Workflow invocations. Never
     silently widen the `targets` arg.
   - **Version pin.** Read the recorded `codemodVersion` and pass it as the Workflow
     `codemodVersion` arg — the pin survives sessions only through this field. On a FIRST
     run, resolve a CONCRETE version before writing the state file
     (`npm view @montage-ui/codemod version`) — recording the literal dist-tag `latest`
     would re-resolve on resume and silently break the same-build guarantee.
3. **Clean tree.** On a first run, `git status --porcelain` must be empty (the state file
   itself is the only allowed exception) — otherwise ask the user to commit/stash first.
   On a RESUME of an `autoCommit: false` run, a dirty tree is expected by design (completed
   steps' changes are uncommitted): do NOT ask to stash — stashing would strip completed
   steps' work and manufacture a state-vs-git mismatch. Instead verify the dirty files are
   consistent with the completed steps (or offer to commit them as a baseline).
4. **Targets.** Identify source directories to transform (default `src`). Include
   directories containing stylesheets that reference `--wds-*` variables. Use plain
   directory paths — the codemod CLI takes exactly one path per invocation and does not
   expand globs; each step runs once per target directory. In a monorepo, list ALL
   package source directories as targets of ONE migration (one state file) — do not run
   separate per-package migrations, or the run-once guarantee fragments per path.
5. **Ask the user once, on a FIRST run only** (single `AskUserQuestion`): confirm the
   target directories, and whether to auto-commit after each step (recommended; enables
   safe rollback of a failed step). Do not ask again mid-migration. On a resume, do not
   re-ask — restate the `targets` and `autoCommit` recorded in the state file; a requested
   change goes through the "new migration decision" path in item 2, never a silent
   override.

### State file format

Create `.claude/montage-migration-v4.local.md` before step ①, and ensure its path is in
`.git/info/exclude` (repo-local ignore; append only if missing — step agents check this
too) so per-step `git add -A` commits never include it
(this template is kept in sync with `STATE_FILE_TEMPLATE` and `MANUAL_SCAN_SECTIONS` in
`scripts/migration-workflow.js` — adding a step or M-section means updating all of them).
The `targets` / `autoCommit` / `codemodVersion` values below are EXAMPLES — fill in the
values confirmed in preflight (`codemodVersion` is always the concrete version resolved
there, never a dist-tag):

```markdown
---
migration: montage-v3-to-v4
targets:
  - src
autoCommit: true
codemodVersion: 4.0.0
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
    codemodVersion: '<concrete x.y.z resolved in preflight>',
    completedSteps: [], // step ids already marked completed in the state file
  },
});
```

Populate `completedSteps` from the state file read in preflight (empty on a first run) —
the script skips those steps deterministically without spawning an agent, and each step
agent re-checks the state file as a second layer.

Resolve `<this skill's base directory>` from the "Base directory for this skill" line
announced when this skill loaded. ALWAYS pass `codemodVersion` as the concrete version
resolved in preflight (first run) or read from the state file (resume) — the script
rejects dist-tags, since the value is recorded in the state file and a dist-tag would
re-resolve on resume and break the same-build guarantee. The workflow returns per-step results plus a
`manualScan` report (assessed occurrences for manual steps M1–M8).

- If the workflow reports `aborted`, surface the failed step's error to the user, fix the
  cause, and re-run the same Workflow invocation with `completedSteps` refreshed from the
  state file — completed steps are skipped, so resuming is safe. Specific abort causes:
  - **Step ⑤ precheck found hand-migrated files**: confirm the reported file list with the
    user, then re-run with the `excludeFiles` arg set to those paths — the step agent
    performs the move-out/move-back exclusion inside the run (after its clean-tree check,
    moving back before the commit). Do NOT move files out yourself between runs; that
    dirties the tree and deadlocks the clean-tree check.
  - **A codemod failed partway with `autoCommit: false`**: the step agent restores the
    tree from its pre-step snapshot before reporting. If its report shows the restore did
    not happen, the partial changes MUST be reverted before re-running — a codemod re-run
    over a half-transformed tree is the corruption path (and excluding the
    partially-transformed files is the wrong fix).
  - **Step ④ precheck flagged files** — two distinct classes, different remediations:
    half-hand-migrated files (importing an old name AND its new counterpart) → revert the
    partial hand-migration or complete it to pure new-API names (fully hand-migrated files
    are safe for step ④ — a no-op); duplicate-specifier files (the SAME old name imported
    plain + aliased) → simplify to a single import specifier. Either way, commit the
    cleanup as its own commit, then re-run with `completedSteps` refreshed (procedure
    detail in `references/codemod-steps.md`).
  - **Dirty tree where the state file marks a step `completed` but its commit is missing**
    (a step agent staged but failed to commit): if the dirty files are exactly that step's
    transform output, commit them with that step's commit message
    (`chore(montage): v4 codemod — <step id>`) before re-running — do not stash.
  - **A step report says the state file was recreated**: treat it as a user-confirmation
    point — the recreated `targets` came from the invocation's args, not the lost
    original; confirm with the user that they match the original migration before
    continuing.
- **Fallback without the Workflow tool:** execute the exact per-step procedure embedded in
  `scripts/migration-workflow.js` (read it) inline — one step at a time, same order, same
  state-file checks. Never parallelize the codemod steps. After all 5 steps, produce the
  manual worklist yourself: run each M-section's scan patterns from
  `references/manual-migrations.md` (read-only, whole repo minus
  `.git`/node_modules/.next/dist/build output/lockfiles) and use those hits as Step 2's
  worklist in place of the workflow's `manualScan` report.

Details per step (commands, pre-checks, post-step verification greps, hazards):
`references/codemod-steps.md`.

### Running a single codemod

When the user asks to run just one codemod (not the full migration): run preflight first
(version check, state file, clean tree, targets). If no state file exists (no in-progress
migration), CREATE it from the State file format template first — all steps `pending`,
concrete `codemodVersion` resolved at preflight; the step procedure's missing-file
failure applies only to resumes of a previously started migration. If earlier steps in
the canonical order are not marked `completed` in the state file, surface that and get
explicit user confirmation before running out of order — manual steps and later codemods assume
post-codemod names. Then execute that one step exactly as the workflow's step agent would
(its 11-step procedure is embedded in `scripts/migration-workflow.js`): state-file check,
pre-check, run (with the state file's recorded `codemodVersion`, not a fresh `latest`),
post-step verification grep from `references/codemod-steps.md`, mark the step
`completed`. The run-once rule applies with full force — this ad-hoc path is exactly
where double-runs happen.

## Step 2 — Manual migrations

Work through `references/manual-migrations.md` (M1–M8) using the workflow's `manualScan`
hits as the worklist. On a resume where all 5 codemod steps are already `completed` but no
workflow ran this session, there is no `manualScan` report — rebuild the worklist first:
re-run the same Workflow invocation with `completedSteps` listing all 5 (every step is
skipped deterministically; the run only regenerates the scans), or run each pending
M-section's scan patterns from `references/manual-migrations.md` yourself. Never work
M-sections without a scan-derived worklist. Apply mechanical fixes directly; ask the user
before behavioral decisions:

- **M6 (Modal bottom sheet):** per occurrence — accept the new close-on-dismiss default
  (delete `onVisibilityChange` workarounds) or pin with `peekHeight`.
- **M7 (TextField):** whether any field should adopt `size="medium"` (40px) now that the
  single size maps to Large.
- **M8 (TextArea):** replacing a removed `characterCounter` requires converting an
  uncontrolled TextArea to a controlled one and moving the counter UI from inside the
  field to the form-control message line — confirm per occurrence, and whether any
  TextArea should adopt `size="medium"`.

M1 (package.json + configs) ends with a dependency install to refresh the lockfile.
Mark each M-section `completed` in the state file as it finishes.

## Step 3 — Final verification

1. Re-run EVERY post-step verification grep from `references/codemod-steps.md` and every
   M-section scan pattern from `references/manual-migrations.md` — the union is the
   checklist; do not improvise a shorter list. Pass criteria are NOT uniform:
   - Each M-section pattern carries a **[zero]** or **[decision]** tag, defined in
     `manual-migrations.md`'s preamble — [zero] means zero Montage-related hits
     (unrelated consumer code sharing the substring may remain, listed in the summary);
     [decision] patterns match valid v4 code, and pass means every hit was assessed
     during Step 2. NEVER edit valid v4 code just to force a count to zero.
   - The 5 codemod verify greps are zero-criterion WITH their documented exceptions
     (step ①: `@wanteddev/montage-mcp` hits are the correct post-migration name; step ⑤:
     `FormControl` is the new root name) — re-read each step's verification note in
     `references/codemod-steps.md` before judging its hits.
2. Project checks: install, typecheck, lint, build, unit tests — whatever the project
   defines.
3. Remind the user to visually QA TextField / TextArea / bottom-sheet Modal / Card list
   screens (v4 changed their rendering and behavior, not just names).
4. Delete the state file, then summarize: steps run, commits created, manual fixes
   applied, items intentionally left (with reasons).

## Additional resources

- **`references/codemod-steps.md`** — the 5 codemods in order: exact commands,
  idempotency analysis, pre-checks, post-step verification greps, hazards.
- **`references/manual-migrations.md`** — manual migrations M1–M8 with scan patterns and
  fix rules.
- **`scripts/migration-workflow.js`** — Workflow-tool script for the codemod phase; also
  the canonical per-step procedure for inline fallback execution.
