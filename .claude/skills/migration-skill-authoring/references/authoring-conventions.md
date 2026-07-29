# Migration Skill Authoring Conventions

Conventions for every `montage-vN-to-vM` skill in the `montage-web-migration` plugin
(`.claude-plugin/montage-migration/`). `skills/montage-v3-to-v4/` is the reference
implementation — when in doubt, mirror it.

## The deliverable

| File                              | Role                                                                                                                       |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `SKILL.md`                        | Lean orchestration (~1,000–1,500 words): critical rules, preflight, Workflow invocation, manual phase, final verification  |
| `references/codemod-steps.md`     | The codemods in canonical order: command, idempotency analysis, pre-checks, post-step verification greps, hazards          |
| `references/manual-migrations.md` | Manual migrations (M-sections) with scan patterns and fix rules                                                            |
| `scripts/migration-workflow.js`   | Workflow-tool script: sequential codemod steps + parallel manual scans; also the canonical per-step procedure for fallback |

Plus: plugin `README.md` / `README.ko.md` skill listing, `plugin.json` version bump
(minor for a new skill or new content), `marketplace.json` version bump.

Optional fifth file: `known-issues.md` in the skill dir — one short entry per deliberate,
accepted trade-off (a deferred version bump, a knowingly exceeded length budget, a scan
whose noise is accepted). The validation Workflow reads it and refuses to re-report those,
which is what keeps successive validation runs comparable instead of re-litigating the same
backlog every round.

## Consistency surfaces

The same facts are stated in several places and MUST stay identical. When adding or
changing a step or M-section, update every row:

| Fact                   | Stated in                                                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codemod step order     | SKILL.md critical rules + state-file template, codemod-steps.md table + section order, script `CODEMOD_STEPS` + `STATE_FILE_TEMPLATE`, both READMEs |
| M-section numbering    | manual-migrations.md headings, script `MANUAL_SCAN_SECTIONS`, SKILL.md mentions, state-file template `manual:` keys                                 |
| State file path/schema | SKILL.md (definition), script step-agent prompt (inlined template), READMEs (mention)                                                               |
| CLI command shape      | SKILL.md critical rules, codemod-steps.md intro, script step-agent prompt                                                                           |
| Corruption hazards     | SKILL.md critical rule, codemod-steps.md idempotency table + step section, script `precheck`/`verify`, README                                       |
| Resume semantics       | SKILL.md Step 0 resume item (missing key = pending, state-vs-git mismatch, targets locked), script step-agent prompt step ①                         |

## Sequencing and run-once design

- **Canonical order**: MIGRATION.md section order is the default. Verify against the
  analysis: the only HARD constraints usually run codemod → manual (manual steps are
  written in terms of post-codemod names, e.g. `--card-content-item-*` → `--card-row-*`
  only exists after `css-variable-migration`). State every constraint with its reason in
  codemod-steps.md.
- **Idempotency is a source-level fact, not an assumption.** Trace rename chains in the
  transform source: if any rename VALUE appears as another rename KEY (the
  `FormField→FormControl→FormControlField` shape), the transform corrupts on re-run and on
  hand-migrated code. Such transforms need defense-in-depth — a warning at EVERY layer
  listed in the consistency table, a pre-check that detects hand-migrated files, and an
  actionable exclusion procedure (move-out/move-back; the CLI has no exclude flag).
- **State file**: `.claude/montage-migration-v<major>.local.md` in the consumer repo
  (e.g. `montage-migration-v4.local.md` — matches the reference implementation). YAML
  frontmatter with `migration` / `targets` / `autoCommit` / `steps` (key = transform name,
  value `pending|completed`) / `manual` (M-keys). Registered in `.git/info/exclude` at
  preflight so per-step `git add -A` commits never include it; deleted only after final
  verification.
- **State schema stability**: step keys are transform names — never rename them; a
  consumer mid-migration resumes by key. A step key missing from an older state file is
  treated as `pending` — this rule must be stated IN the consumer skill (its Step 0
  resume item and the workflow step-agent prompt), not only here. If a transform itself
  is renamed in `constants.ts`, the key must follow (it doubles as the CLI positional):
  treat it as a new key and add a key-migration note to the consumer skill's resume item
  mapping the old completed mark to the new key.
- **Run-once is per tree**: multiple target directories get one CLI invocation each
  within the same step — that is not a re-run.

## Workflow script conventions

- Codemod steps: a sequential `for` loop of `await agent(...)` — a failed/null result
  aborts the chain and the return carries `aborted: <step id>`. Never `parallel()` the
  codemod steps.
- Deterministic skip: the script cannot read files, so the orchestrator (main loop)
  reads the state file at preflight and passes `completedSteps` (step-id array) via
  args; the loop skips those steps without spawning an agent. The step agent's own
  state-file check stays as the second layer.
- Manual scans: `parallel()` read-only agents, one per M-section, reading the section's
  patterns from `referencesDir` (pass it via args, do not duplicate patterns in the
  script).
- Each `CODEMOD_STEPS` entry: `id` (transform name), `title`, `precheck`, `verify`. The
  step-agent prompt is the canonical 8-step procedure: ① state check (skip if completed)
  ② clean-tree check (autoCommit only) ③ precheck ④ run codemod per target ⑤ failure
  handling (restore only when autoCommit, else stop) ⑥ verification ⑦ state update
  (template inlined in the prompt — the sub-agent cannot see SKILL.md) ⑧ commit.
- `targets` travels as a JSON array into prompts; the npx command takes ONE directory per
  invocation.
- Structured output: use `schema` on every agent; step results
  `{step, status, filesChanged, committed, commitHash?, verifyFindings, error?}`, scan
  results `{section, summary, hits: [{file, line, snippet, note}]}`.
- Workflow scripts run in an async context with injected globals (`args`, `agent`,
  `parallel`, `log`, `phase`) and allow top-level `return`; no `Date.now()` /
  `Math.random()` / fs access. `export const meta = {...}` must be a pure literal.

## Writing conventions

- SKILL.md body in **imperative English**; frontmatter description in third person
  ("This skill should be used when...") with BOTH Korean and English trigger phrases.
  Include resume phrases ("마이그레이션 이어서 해줘") and single-codemod phrases (running
  one codemod ad hoc is exactly when run-once protection gets bypassed).
- Scope the description: name the versions it covers and where other migrations live.
- Keep SKILL.md lean; details go to references. State a fact in SKILL.md only if it is an
  invariant the orchestrator needs before reading references.
- Behavioral decisions (e.g. Modal `peekHeight` vs new default) are the USER's — the
  skill instructs asking, not deciding.

## Codemod CLI facts (verified against `packages/codemod/src/cli.ts`, 2026-07)

Re-verify these when the CLI changes:

- `npx -y @montage-ui/codemod@<version> <transform> <path>` — non-interactive only when
  BOTH positionals are present; transform names WITHOUT the `vN/` prefix.
- One transform per invocation; no batch mode.
- ONE file-or-directory path per invocation. Extra positional paths are silently dropped;
  globs are NOT expanded (the CLI help text claims otherwise — it lies).
- jscodeshift runs with `--extensions=tsx,ts,jsx,js` and ignores
  `node_modules`/`.next`/`dist`.
- The stylesheet text pass (`.css/.scss/.sass/.less`) runs ONLY via the CLI wrapper and
  ONLY for transforms registered in `STYLE_TEXT_TRANSFORMS` — check that map for the new
  version's transforms; document per step whether stylesheets are covered.
- Import-gated transforms match import sources against `MONTAGE_SOURCES` exactly —
  subpath/namespace/re-export imports are skipped; document as manual follow-ups.

## Grep pattern rules

Every scan/verification pattern must survive macOS BSD grep. Each rule below is a bug
that shipped once:

1. **Bracket ranges**: `[+\-*/]` is an invalid range in POSIX ERE (BSD grep exits 2 —
   the scan silently finds nothing). Write `[-+*/]` (dash first). `\b`/`\s`/`\w` are fine
   on GNU and BSD grep.
2. **Never line-anchor import greps**: `^(import|export).*from '@x'` misses multi-line
   (prettier-formatted) imports. Grep the bare token and eyeball hits.
3. **"references X without Y" checks must be file-level two-pass**, not a single-line
   import grep: `comm -23 <(grep -rlE '\bX\b' … | sort) <(grep -rlE '\bY\b' … | sort)`.
4. **Prefer prefix patterns over trailing `\b`** for leftover detection:
   `\bCardContent\b` misses `CardContentProps`/`CardContentItemSkeleton`; use
   `\bCard(List|Content)` — and confirm the prefix form matches NO new (post-migration)
   name before adopting it.
5. **Explicit `--include=` per extension**: `--include="*.js*"` also matches `.json`
   (package.json noise).
6. **Declare patterns as heuristics**: line-based greps miss multi-line JSX props and
   non-literal forms; a clean scan is "nothing obvious", not proof of absence.

## Mechanical validation

- Workflow script syntax: top-level `return` is valid in the Workflow DSL but not plain
  ESM — check by wrapping:

  ```sh
  # split off the meta export, wrap the body in an async fn, then:
  node --check wrapped.mjs
  ```

- `npx prettier --check` on every touched `.md`/`.json` (the repo hook formats on write,
  but verify).
- Trigger test: `claude --plugin-dir .claude-plugin/montage-migration` and ask with each
  trigger phrase.
- Validation hygiene: pass the checkout you are EDITING as `repoRoot` (in a worktree, the
  worktree path). The same skill exists at the same relative path in the parent checkout, and
  a reviewer that reads the stale copy reports false defects with full confidence. The
  validation Workflow defends against this — findings carry the `wc -l` of every file they
  cite and verifiers refute on mismatch — but only for the paths it was given.
- ESLint: `.claude-plugin` and `.claude` are in `eslint.config.mjs` `globalIgnores` — new
  script files there are not linted; keep it that way rather than adding tsconfig
  coverage.
