---
name: montage-v3-to-v4
description: This skill should be used when the user asks to migrate a project from Montage (WDS) v3 to v4, upgrade @wanteddev/wds to @montage-ui/* 4.x, run any Montage v4 codemod (package-name-migration, semantic-token-migration, css-variable-migration, dom-identifier-migration, list-card-migration, form-control-migration, push-badge-migration, status-migration, list-cell-variant-migration), or resume an in-progress v4 migration. Triggers include "montage v4 마이그레이션", "montage 4 적용해줘", "몬타지 v4로 올려줘", "wds 4.0으로 업그레이드", "디자인시스템 v4로 올려줘", "@montage-ui로 전환해줘", "마이그레이션 이어서 해줘", "form-control 코드모드만 돌려줘", "semantic 토큰 코드모드 돌려줘", "시멘틱 토큰 마이그레이션 해줘", "패키지명 마이그레이션만 해줘", "css 변수 코드모드 돌려줘", "dom 식별자 코드모드만 돌려줘", "list-card 코드모드만 돌려줘", "push-badge 코드모드만 돌려줘", "푸시뱃지 마이그레이션 해줘", "status 코드모드만 돌려줘", "invalid를 status로 바꿔줘", "list-cell 코드모드만 돌려줘", "리스트셀 마이그레이션 해줘", "fillWidth를 variant로 바꿔줘", "listcell caption을 description으로 바꿔줘", "migrate to montage v4", "resume the montage migration", "run the form-control codemod", "run the semantic token codemod", "run the push-badge codemod", "run the status codemod", "run the list-cell codemod". Covers v3→v4 only (earlier migrations live in the wanteddev/montage-web repo's MIGRATION.md). Orchestrates the 9 codemods strictly in sequence with run-once protection, then guides the manual migrations.
---

# montage-v3-to-v4

Migrate a consumer project from Montage (Wanted Design System) v3 (`@wanteddev/wds*` 3.x)
to v4 (`@montage-ui/*` 4.x). The migration is: 9 codemods run **strictly in sequence,
each exactly once**, followed by manual migrations the codemods cannot express, followed
by verification.

## Critical rules

1. **Never run a codemod twice on the same tree.** `form-control-migration` swaps
   `FormField→FormControl` while renaming `FormControl→FormControlField`; a second run
   renames the new root again and silently corrupts the code. `list-cell-variant-migration`
   is the same class of hazard from the other direction: v4 reuses the content variant name
   `button`, so a re-run (or a run over hand-migrated code) silently renames a legitimate
   v4 `variant="button"` to `text-button` with no type error. Treat all 9 steps as
   run-once; the state file is the source of truth.
2. **Fixed order, one step at a time.** Complete (and commit) step N before starting
   step N+1: ① `package-name-migration` ② `semantic-token-migration`
   ③ `css-variable-migration` ④ `dom-identifier-migration` ⑤ `list-card-migration`
   ⑥ `form-control-migration` ⑦ `push-badge-migration` ⑧ `status-migration`
   ⑨ `list-cell-variant-migration`. Manual steps
   reference post-codemod names, so they come after all 9.
3. **Codemods first, hand-edits after.** Do not hand-migrate any `Form*` / `Card*` usage
   (or adopt new v4 APIs) before the codemods run — `form-control-migration` corrupts
   hand-migrated files even on its first run, and a hand-authored v4
   `variant="button"` (the NEW general-Button content variant) is exactly what step ⑨
   mis-renames.
4. **Start from a clean git tree** and keep one commit per step so any step can be
   reverted in isolation.
5. **The tree does not install / typecheck / build between step ① and M1.** Step ① rewrites
   every import to `@montage-ui/*` while `package.json` still lists `@wanteddev/wds*` (M1
   owns package.json and ends with the install). The nine codemod commits are intentionally
   non-building — do NOT try to fix resolution errors during the codemod phase, and expect
   pre-commit hooks (`.husky/`, `core.hooksPath`, `lint-staged`) to fail: detect them at
   preflight and agree with the user on `--no-verify` or disabling them for the phase. An
   agreed `--no-verify` reaches the step agents ONLY through the Workflow `commitNoVerify`
   arg — without it the step agent commits without the flag and reports `failed` on the hook
   output rather than deciding on its own.
6. Run codemods through the CLI (`npx -y @montage-ui/codemod@<codemodVersion> <transform> <path>`;
   resolve the version at preflight, and on resume use the state file's recorded
   `codemodVersion`), never raw jscodeshift — steps ②–④ rewrite stylesheets only via
   the CLI. The one exception is the maintainer-only `codemodBin` override (see
   "Testing an unreleased codemod build" under Step 1), which swaps in a local CLI build;
   never use it on a real consumer migration.

## Step 0 — Preflight

Perform all checks before changing anything. **Read the state file (item 1) BEFORE the
version check (item 2)** — the version check's branches describe a first run, and after M1
rewrites `package.json` a resume looks exactly like "already migrated".

1. **State file.** Look for `.claude/montage-migration-v4.local.md` (format below). If it
   exists, this is a resume; apply these rules:
   - **Resume.** Skip every step marked `completed`, continue from the first `pending`
     step. A step or manual key missing from an older state file (e.g.
     `semantic-token-migration`, `push-badge-migration`, `status-migration`,
     `list-cell-variant-migration`, `M9`, `M10`,
     `M11`, `M12`, `M13`, `M14`, `M15`, `M16`, `M17`, `M18`, `M19`, `M20`, `M21`, `M22`, `M23`, or `M24`, added after the file was created) is `pending` —
     add it to the file and run it. `semantic-token-migration` sits at position ② BEFORE
     steps an older migration may already have completed: it still runs, and running it
     after the later steps is safe (its token namespace is disjoint from every other
     transform's inputs and outputs, and it is idempotent — see step 2 in
     `references/codemod-steps.md`). This resume shape leaves a GAP in the canonical order
     (later steps completed, an earlier inserted step pending), which the workflow script
     rejects by default — pass `allowOutOfOrderSteps: true` for it; this is the sanctioned
     missing-key case, distinct from the single-codemod path, and needs no extra user
     confirmation once you have verified the gap step's key was genuinely ABSENT from the
     state file (a key present-but-pending behind completed steps is the single-codemod or
     stale-list case instead). Never downgrade a `completed` mark on your own; only
     after the user explicitly confirms the step's changes were reverted may you reset it
     to `pending` and re-run it.
   - **Mismatch reconciliation.** Before resuming, sanity-check the marks against reality
     IN BOTH DIRECTIONS: a step marked `completed` but its renames absent from the tree
     (reverted commits), or a step marked `pending` whose renames are already present
     (hand-run between sessions — re-running step ⑥ over such a tree is the corruption
     path). Spot-check `completed` MANUAL marks the same way, but using ONLY that section's
     **[zero]** scan patterns, and only for hits that are Montage-related: a fresh
     Montage-related [zero] hit is equally a mismatch, while an unrelated-consumer-code hit
     is what the [zero] tag explicitly permits to remain (M4's `card-content`, M10's
     `storageKey` …) — re-assess such a hit, do not treat it as evidence. [decision]
     patterns match valid v4 code and keep hitting after the section is correctly done (every M2
     pattern except the [zero] `spacing[1]` scans, M6's `variant="bottom"`, M9's `surface.brand.primary`, M10's
     `<ThemeProvider` / `next-themes`, M11's `\bSegmentedControl(Item)?\b`, M12's
     `\bSelect(Multiple|Content|RenderChip)?\b` / `text-field-content`, M13's
     `\bPushBadge(Props)?\b` / `PushBadge[^>]*variant="text"` / `PushBadge[^>]*variant=\{`, M14's `\bSearchField` /
     `\bSearchField\b[^>]*size="medium"` — post-conversion `size="medium"` hits are the
     converted smalls …, M15's `\bFallbackView` /
     `\bFallbackViewImage(Props)?\b` — a kept deprecated image is a recorded decision, not a
     leftover, M16's `status=` / `aria-invalid` — both are the correct v4 shape, M17's
     `variant=\{` on the content components / `selected` on the cells /
     `list-text-wrapper|list-text-content` — all valid v4 shapes, M18's
     `\bdisableInteraction\b` — still a valid prop on every component that carried it in v3
     except `IconButton` — /
     `\b(TopNavigationButton|ModalNavigationButton)\b` / `<IconButton\b` and its slot cross-check — standalone `normal` hits
     carry `interactionOverflow`; slot hits the slot sizes (TabList / CategoryList `iconButton`
     included) correctly lack the v3 `size` / `interactionOverflow` (unless deliberately
     kept), and non-`normal` variants correctly lack `interactionOverflow`, M19's
     `\b(TopNavigationButton|ModalNavigationButton)\b` / `top-navigation` — a standalone
     `TopNavigation` keeps its identifiers — / `variant="search"`, M20's
     `<ModalNavigation([[:space:]>]|$)` / `<ModalContainer([[:space:]>]|$)` /
     `\bModalContent(Item)?\b` — every valid v4 modal
     matches, M21's `<ContentBadge([[:space:]>]|$)` / `<ContentBadge[[:space:]][^>]*variant="outlined"`
     — `variant="outlined"` is the valid v4 shape, and the DOM-change [decision] scans of
     M3 / M5 / M8 / M13 / M14 / M16 / M17 / M19 plus every M22 / M23 / M24 scan — selectors, test
     queries and props that stay valid in v4), so they are
     never mismatch evidence. Detect the pending-but-already-applied direction with the
     **presence greps** in `references/codemod-steps.md` — each step's verify grep is an
     ABSENCE check that returns zero both when the codemod ran and when the repo never used
     that API, so it cannot see this direction at all; new names present + old absent means
     the step already ran. On any mismatch, stop and
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
     silently widen the `targets` arg. **Run each step's PRE-CHECK against the new directory
     first, in canonical order** — for that directory this is a first run, so steps ⑤/⑥'s
     pre-checks apply in full (a hand-migrated file sitting there is exactly what step ⑥
     corrupts), and skipping them because "the step is already completed" is a corruption path
     the completed mark was never meant to cover. A positive step-⑥ pre-check on the new
     directory gets the same remediation as on a first run: confirm the hand-migrated files with
     the user, run the catch-up invocation with the move-out/move-back exclusion around it, and
     append those paths to the state file's `excludeFiles`. A positive step-⑤ pre-check is
     resolved the same way its abort bullet describes (reconcile the file to one API, or collapse
     duplicate specifiers) before the catch-up run. A positive step-⑨ pre-check likewise
     follows its abort bullet: there is no exclusion for it, so the flagged file must stop
     matching first — hand-rename, revert to pure v3, or park the intended v4 general-Button
     element and re-apply it after the catch-up run.
   - **Single-codemod origin.** If the file carries `origin: single-codemod`, its `targets`
     were chosen for ONE ad-hoc step, not for a migration — re-confirm them with the user in
     the one `AskUserQuestion` before starting the full run (the one sanctioned exception to
     the target lock above), then drop the `origin` key. The workflow script's recreation
     template never writes this key, so its absence from a recreated file is not evidence that
     the migration began as a full run.
   - **Version pin.** Read the recorded `codemodVersion` and pass it as the Workflow
     `codemodVersion` arg — the pin survives sessions only through this field. On a FIRST
     run, resolve a CONCRETE version before writing the state file with
     `npm view '@montage-ui/codemod@^4.0.0-0' version --json | jq -er 'if type=="array" then .[-1] elif type=="string" then . else error("npm view did not return a version") end'`.
     The `-0` floor is load-bearing: semver ranges never match a prerelease unless the range
     itself names one on the same `major.minor.patch`, so a plain `^4` finds NOTHING while 4.x
     ships only as prereleases (npm then prints an E404 error object), whereas `^4.0.0-0`
     matches the 4.0.0 prereleases and, once stable 4.x exists, still picks the highest
     version — the script's version guard accepts the prerelease suffix for the same reason.
     While only prereleases exist, "highest" is semver order, NOT publish order: 4.0.0
     prereleases carry commit-hash identifiers that sort alphabetically, so cross-check the
     resolved value against `npm view @montage-ui/codemod dist-tags time --json` and, if it is
     not the newest build, confirm the pin with the user before recording it.
     The filter must reject non-version output itself: on a miss npm writes a JSON error
     object to stdout, and a filter that echoes it (`else .`) exits 0 through the pipe, so a
     "did it fail?" check on the exit status sees success. **Check the result before using
     it**: it must match `^4\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?$`; only then write it to the
     state file. The two shorter forms are both wrong: the plain `npm view @montage-ui/codemod version`
     returns whatever `latest` points at (5.x once that ships, and this skill covers the 4.x
     transforms only — the script rejects any other major), and the range form without
     `--json` prints one line PER matching 4.x version. Recording the literal dist-tag
     `latest` would re-resolve on resume and silently break the same-build guarantee.
     **If resolution fails** (offline, proxy, or an `.npmrc` scoping `@montage-ui` to a
     registry this session cannot reach): STOP and report the registry/auth blocker. Never
     guess a plausible version and never fall back to `latest` — a wrong pin silently runs
     the wrong transform build for the whole migration. Confirm reachability with
     `npx -y @montage-ui/codemod@<resolved> --help` before step ①, then get the pinned build's
     transform list with a deliberately invalid name —
     `npx -y @montage-ui/codemod@<resolved> __probe__` — which prints
     `Invalid transform choice, pick one of:` followed by every id and exits 1 (the non-zero exit
     is expected; the run stays non-interactive). `--help` cannot serve this purpose: it prints
     only the usage block and names no transform. **Check that list contains all nine step ids.** On a RESUME this check is not a formality: a
     step key added to this skill after the pin was recorded may not exist in the pinned
     build, and the CLI then rejects it mid-migration with "Invalid transform choice" after
     earlier steps have already committed. If a step is missing from the pinned build, stop
     and settle it with the user — either finish the migration without that step and run it
     separately afterwards, or re-pin deliberately (which forfeits the same-build guarantee
     for the remaining steps). Never re-pin silently.
   - **jq-free fallback.** Both the version resolution above and step ⑥'s recovery record use
     `jq`, which many consumer repos lack. If `command -v jq` fails, resolve the version with
     `npm view '@montage-ui/codemod@^4.0.0-0' version --json | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{let v;try{v=JSON.parse(s)}catch{process.exit(1)}v=Array.isArray(v)?v[v.length-1]:v;if(typeof v!=='string'){console.error(JSON.stringify(v));process.exit(1)}console.log(v)})"`
     — same contract as the jq form: exits 1 on npm's error object, and the result still goes
     through the format check above before it reaches the state file.
     The step-⑥ recovery record needs no arg or hand-off: the `node -e` equivalent sits beside the
     jq command in the exclusion procedure, and the step agent is told to switch to it whenever
     `command -v jq` fails. Never hand-assemble either with `printf`/`echo`.
   - **Excluded files and reverted names.** Read the recorded `excludeFiles` list (empty by
     default) and pass it back as the Workflow `excludeFiles` arg on EVERY subsequent
     invocation — not only on the re-run that first established it. Use it when judging step ⑥
     hits at final verification: without it, a later session cannot tell a ring-fenced
     hand-migrated file from a genuine migration leftover and will "fix" code the user
     protected. **The workflow enforces this**: it compares the recorded `excludeFiles` with the
     invocation's and aborts before any codemod on a mismatch, so a resume that drops the arg
     fails loudly instead of quietly un-excluding those files.
     Read `revertedNames` the same way — steps ③/④ record there every `--wds-*` variable or
     `wds-*` string they deliberately reverted as consumer-owned, each as a **`file` + `name`
     pair**. The pair is what makes it safe: an entry excuses that name only in that file, so the
     same name elsewhere is still judged as a possible leftover. Neither list can be
     reconstructed if the state file is lost.
2. **Version check.** Read the project's `package.json`. **If a state file exists, item 1's
   resume rules govern** — use the version check only to confirm the recorded phase (pre-M1
   expects `@wanteddev/wds*` 3.x, post-M1 expects `@montage-ui/*` 4.x) and report a
   disagreement to the user; never reclassify a resume through the branches below. With NO
   state file:
   - `@wanteddev/wds*` at 3.x → proceed.
   - `@wanteddev/wds*` at 2.x or lower → stop; complete the v2→v3 migration first
     (MIGRATION.md in the wanteddev/montage-web repo).
   - Only `@montage-ui/*` 4.x present → likely already migrated; run
     the leftover greps from `references/codemod-steps.md` plus every M-section scan
     pattern from `references/manual-migrations.md` (steps and M-sections added after a
     consumer finished migrating — e.g. step ② `semantic-token-migration`, step ⑦
     `push-badge-migration`, step ⑧ `status-migration`, step ⑨
     `list-cell-variant-migration`, M9, M10, M11, M12, M13, M14, M15, M16, M17, M18, M19, M20, M21, M22, M23, and M24 — surface only through these scans)
     and report instead of migrating. On such a tree NEVER run step ⑨'s codemod to "fix"
     its leftover hits: hand-authored v4 `variant="button"` is valid there and the codemod
     would mis-rename it (Critical rule 1) — fix leftovers by hand against the step-⑨
     rename table.
   - BOTH `@wanteddev/wds*` and `@montage-ui/*` present → the project is partially
     hand-migrated. Run the step ⑤/⑥/⑨ pre-checks from `references/codemod-steps.md` before
     anything else and expect file exclusions in step ⑥. Step ⑨'s pre-check matters most on
     exactly this tree: a hand-authored v4 `variant="button"` lives here, and it has no
     exclusion machinery — see its three terminating paths.
   - NEITHER package present → check nested/workspace `package.json` files; if still
     absent, stop and tell the user this repo does not appear to use Montage/WDS.

   Also check for commit hooks that would block the intentionally non-building codemod
   commits (`.husky/`, `git config core.hooksPath`, `lint-staged` in package.json) and agree
   with the user up front on how to handle them; and scan `.ts` files for legacy
   angle-bracket casts, which the `tsx` parser cannot read (the file is skipped with a
   transformation error while the rest of the run succeeds — a silent partial migration):
   `grep -rnE '(=>|&&|\|\||[?=(,:[!]|return|await|yield|throw|^ *) *<[A-Za-z_$][^<>=]*(<[^<>]*(<[^<>]*>)?[^<>]*>)?[^<>=]*> *[^<>= ]' --include="*.ts" <targets>`
   (the nested group catches generic casts up to two levels — `<Array<string>>items`,
   `<Map<string, Array<number>>>m`; the loose `[^<>=]*` type body reaches unions, modifiers
   and multi-dimensional arrays — `<string | number>v`, `<readonly string[]>v`,
   `<string[][]>v`; `:`/`[` catch
   casts inside object literals and array elements; `=>`/`&&`/`||`/`?` catch casts in
   arrow bodies, logical operands, and ternary branches; `await`/`yield`/`throw`/`^ *`
   catch `await <Promise<string>>p` and a statement-initial `<string>foo;`; and the
   `[^<>= ]` trailing class accepts casts applied to LITERALS — `<Foo>{ a: 1 }`,
   `<number[]>[1, 2]`, `<string>'x'`, `<number>123` — not only identifiers and calls. All
   of these break the parser identically.
   **Expect two known false-positive shapes**: a generic arrow-function declaration
   (`const f = <T>(x: T) => x`, `<T extends object>(x: T) => x`) and a regex literal with a
   named capture group (`/#(?<id>\w+)/`) both match the pattern but parse fine — the
   Montage repo's own `packages/core/src` yielded ~9 such hits across ~290 `.ts` files when
   this was written, all of them generic arrow declarations; expect a comparable handful per
   few hundred files rather than a clean scan. Confirm
   each hit is a real CAST (a type in angle brackets applied to an expression) before
   converting anything; never rewrite a generic arrow's type parameter list.
   The scan is still a heuristic; the "treat any `ERR` as a step failure" rule is the backstop)
   — convert the genuine hits to `as` syntax in a preparatory commit before step ①.

   Also read the project's `react` / `react-dom` versions: v4 peer-requires
   `^18.0.0 || ^19.0.0` (same for `@types/react*` when TypeScript is used). On React 17 or
   lower, STOP and report that the React upgrade must land first — every codemod and
   M-section would otherwise run to completion and only fail at M1's closing install, with
   the whole migration already applied.

3. **Clean tree.** On a first run, `git status --porcelain` must be empty (the state file
   itself is the only allowed exception) — otherwise ask the user to commit/stash first.
   On a RESUME of an `autoCommit: true` run the tree must also be clean (completed steps
   were committed); if it is dirty, check whether the dirt is exactly a completed step's
   transform output missing its commit (the staged-but-uncommitted abort cause below) —
   commit it with that step's message; anything else goes to the user, never a stash.
   On a RESUME of an `autoCommit: false` run, a dirty tree is expected by design (completed
   steps' changes are uncommitted): do NOT ask to stash — stashing would strip completed
   steps' work and manufacture a state-vs-git mismatch. Instead verify the dirty files are
   consistent with the completed steps: run each completed step's post-step verification
   grep from `references/codemod-steps.md` over the dirty files, and skim `git diff` for
   hunks outside those steps' rename surfaces (imports, semantic tokens, CSS variables,
   DOM identifiers, Card/Form identifiers, PushBadge `variant`/`count`/`text`,
   `invalid`/`positive` → `status`/`aria-invalid`, ListCell-family
   `fillWidth`/`interactionPadding` → `variant`, content-variant renames, and
   `textProps`'s `caption`/`captionProps` → `description`/`descriptionProps`) — anything
   unexplained goes to the user before
   proceeding (or offer to commit the consistent dirty set as a baseline).
4. **Targets.** Identify source directories to transform (default `src`). Include
   directories containing stylesheets that reference `--wds-*` / `--semantic-*` variables
   OR `wds-*` DOM identifiers (step ④ rewrites those in stylesheets too, so a directory
   whose only Montage references are selectors like `[wds-component="card"]` must be a
   target as well) — discover them with
   `grep -rln --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist --exclude-dir=build --exclude-dir=out --exclude-dir=coverage --exclude-dir=storybook-static --include="*.css" --include="*.scss" --include="*.sass" --include="*.less" -e "--wds-" -e "--semantic-" -e "wds-component" -e "wds-ignore-" -e "wds-region-manager" . | grep -vE '(^|\./|/)(node_modules|\.next|dist|build|out|coverage|storybook-static)/' | xargs -I{} dirname {} | sort -u`
   **Never make build output a target.** The CLI's own ignore list does not protect you: it is
   consulted only for directories met while recursing, never for the path you pass, so handing it
   `dist/assets` or `.next/static/css` rewrites generated CSS (and its list is only
   `node_modules` / `.next` / `dist`, so `build`, `out`, `coverage` and `storybook-static`
   are not skipped even while recursing). That is why the exclusions above are applied
   TWICE: `--exclude-dir` on the discovery grep is the real guard, and the `grep -vE`
   stage is the backstop — and `-I{}` instead of `-n1` so paths
   containing spaces survive (and so an empty result runs nothing).
   **Both leading-segment alternatives in that filter are load-bearing** (`^` and `\./`).
   Whether the discovery grep prefixes its paths with `./` depends on which grep is on
   PATH: `/usr/bin/grep` emits `./dist/assets/main.css`, while the ugrep that Claude Code
   shadows `grep` with emits a prefix-less `dist/assets/main.css`. A filter written as
   `/(node_modules|dist|…)/` — requiring a slash BEFORE the name — therefore strips these
   directories only when they are NOT the first path segment, so under the shadowed grep
   every repo-root-level `dist/`, `build/`, `node_modules/` … survives into the target
   list. Verify the command's output before trusting it: if any line's first segment is a
   build-output directory, the filter did not fire and the list must not be used.
   **A `.` in the output is not a target.** It means a stylesheet sits at the repo root, and
   passing `.` would run every codemod over the ENTIRE repo — build output, fixtures and all.
   Drop it from the merged list and instead pass that stylesheet's own path (the CLI takes a file
   or a directory) or a narrower directory that contains it.
   and merge the resulting directories into the target list (collapse into an existing
   target when one already contains them). Use plain directory paths — the codemod CLI
   takes exactly one path per invocation and does not expand globs; each step runs once
   per target directory. **Targets must be disjoint** — a target nested inside another
   (`src` + `src/features/forms`) runs every codemod twice over the nested subtree, the
   run-once corruption path; the workflow script rejects nested targets, and equally two
   spellings of one tree (`src` + `./src` + `<repoRoot>/src`). In a monorepo,
   list ALL package source directories as targets of ONE migration (one state file) — do
   not run separate per-package migrations, or the run-once guarantee fragments per path.
   **No whitespace in a target path** (the repo-relative path — whitespace in the repo root
   itself is harmless, since steps run the CLI from the repo root). Every published `@montage-ui/codemod` build so far
   (all 4.0.0 canaries) splits the stylesheet pass's path on whitespace, so `my app/src`
   silently loses steps ②–④'s `.css/.scss/.sass/.less` rewrites (`known-issues.md`). The
   workflow rejects such a target; STOP and settle it with the user before step ① — rename
   the directory, or pin a build that carries the CLI fix and pass
   `allowWhitespaceTargets: true`.
5. **Ask the user once, on a FIRST run only** (single `AskUserQuestion`): confirm the
   target directories, and whether to auto-commit after each step (recommended; enables
   safe rollback of a failed step). Run item 6's browserslist check FIRST and include its
   question in this same `AskUserQuestion`. Do not ask again mid-migration. On a resume, do not
   re-ask — restate the `targets` and `autoCommit` recorded in the state file; a requested
   change goes through the "new migration decision" path in item 1, never a silent
   override.
6. **Browser support (FIRST run only; never edit).** v4 requires Chrome / Edge 108,
   Firefox 121, Safari / iOS Safari 15.4, Opera 94 — the styles use CSS `:has()` and `dvh`
   without the `@supports` fallbacks 3.x had, and the build output targets the same
   versions (3.x: Chrome 91, Firefox 90, Safari 15, Opera 77). Read the project's
   `browserslist` (`package.json` field or `.browserslistrc`) and resolve it with
   `npx browserslist` from the repo root — query forms like `defaults` hide entries such as
   `op_mini all`. If any resolved entry is below those versions (`op_mini` included), or the
   query does not resolve, it targets anything older:
   tell the user before Step 1 which surfaces lose their 3.x fallback — TextField /
   TextArea / SearchField focus ring and reset-button visibility (`:focus-within`), `Modal` /
   `Alert` wrapper height (`100vh`) — and fold the question "continue anyway?" into item 5's
   single `AskUserQuestion`. On a resume, do not re-ask; restate the requirement in the final
   summary. Never change `browserslist` or polyfill on your own. No browserslist → mention the
   requirement once in the final summary.

### State file format

Create `.claude/montage-migration-v4.local.md` before step ① (`mkdir -p` its directory
first — a consumer repo may have no `.claude/`, and a failed redirect leaves the migration
with no state), and ensure its path is ignored
so per-step `git add -A` commits never include it: resolve the repo-local exclude file with
`git -C <repoRoot> rev-parse --git-path info/exclude` (never hardcode `.git/info/exclude` —
in a linked worktree or submodule `.git` is a FILE and the literal path fails silently),
append the entry only if missing, then confirm with `git -C <repoRoot> check-ignore -q
<stateFile>`. Step agents repeat this check.

Consistency surfaces (canonical list — the script's comments point here rather than
re-enumerating). A new codemod step or M-section must be updated in ALL of these together:

1. this state-file template,
2. SKILL.md Critical rules item 2 (the ordered step list) and the frontmatter description,
3. SKILL.md Step 2 decision bullets, Step 3 verification checklist, and preflight item 3's
   parenthetical listing each completed step's rename surface,
4. `references/codemod-steps.md` — step table, step section, presence grep, and the
   "After all 9 steps" checklist,
5. `references/manual-migrations.md` — the M-section and its scan patterns,
6. `scripts/migration-workflow.js` — `CODEMOD_STEPS`, `MANUAL_SCAN_SECTIONS`,
   `STATE_FILE_TEMPLATE`, the step-agent prompt's `M1–M<last>` deferral range
   (procedure step 9), and the three count-bearing strings `meta.description`,
   `meta.phases[0].detail` and the `commitNoVerify` header comment's codemod count — every
   one of these is hand-written, so they drift silently when a step or M-section is added,
7. the plugin `README.md` and `README.ko.md` (both hardcode the ordered codemod list and
   the manual-migration summary).
   The `targets` / `autoCommit` / `codemodVersion` values below are EXAMPLES — fill in the
   values confirmed in preflight (`codemodVersion` is always the concrete version resolved
   there, never a dist-tag; a maintainer test run with `codemodBin` records `local` there plus
   a `codemodBin:` line holding the command; a run with `allowWhitespaceTargets: true` adds an
   `allowWhitespaceTargets: true` line — pass it back on every resume, or the workflow aborts):

```markdown
---
migration: montage-v3-to-v4
targets:
  - src
autoCommit: true
codemodVersion: 4.0.0
excludeFiles: [] # repo-relative; filled in when step ⑥ ran with user-confirmed exclusions
revertedNames: [] # steps ③/④ append file-scoped entries: "- file: <path>" + "  name: <name>"
# origin: single-codemod   # present only when created by the single-codemod path
steps:
  package-name-migration: pending
  semantic-token-migration: pending
  css-variable-migration: pending
  dom-identifier-migration: pending
  list-card-migration: pending
  form-control-migration: pending
  push-badge-migration: pending
  status-migration: pending
  list-cell-variant-migration: pending
manual:
  M1: pending
  M2: pending
  M3: pending
  M4: pending
  M5: pending
  M6: pending
  M7: pending
  M8: pending
  M9: pending
  M10: pending
  M11: pending
  M12: pending
  M13: pending
  M14: pending
  M15: pending
  M16: pending
  M17: pending
  M18: pending
  M19: pending
  M20: pending
  M21: pending
  M22: pending
  M23: pending
  M24: pending
---
```

Mark each step `completed` immediately after it succeeds, and each M-section `completed` as
its manual phase finishes. On a resume, `manual:` marks follow the same rules as `steps:`:
skip a `completed` section, work every `pending` one, treat a key missing from an older file
as `pending`, and never downgrade a `completed` mark without explicit user confirmation.
Unlike codemods, re-running an M-section is not corrupting — but it re-asks decisions the
user already made, so the marks still govern. Delete the file only after the final
verification passes.

## Step 1 — Codemod phase (use the Workflow tool)

Orchestrate the codemod phase with the Workflow tool using the bundled script — it
guarantees deterministic sequencing (each codemod is a sequential `await`; a failure
aborts the chain) and runs the manual-migration scans in parallel afterwards:

```js
Workflow({
  scriptPath:
    '${CLAUDE_PLUGIN_ROOT}/skills/montage-v3-to-v4/scripts/migration-workflow.js',
  args: {
    repoRoot: '<absolute repo root>',
    targets: ['src'],
    stateFile: '<absolute path>/.claude/montage-migration-v4.local.md',
    referencesDir: '${CLAUDE_PLUGIN_ROOT}/skills/montage-v3-to-v4/references',
    autoCommit: true,
    codemodVersion: '<concrete x.y.z resolved in preflight>',
    // codemodBin: "node '/abs/montage-web/packages/codemod/dist/cli.js'", // MAINTAINER-ONLY;
    //                   // replaces codemodVersion — see "Testing an unreleased codemod build"
    completedSteps: [], // step ids already marked completed in the state file
    // excludeFiles: [], // optional; repo-relative paths, form-control-migration only.
    //                   // First established on a re-run after step ⑥'s precheck reported
    //                   // them; from then on pass the state file's recorded list on EVERY
    //                   // invocation — omitting it silently un-excludes those files.
    // allowWhitespaceTargets: false, // optional; true ONLY when the pinned build carries the
    //                                // CLI whitespace-path fix (see known-issues.md). Checked
    //                                // on the repo-relative target, so whitespace in repoRoot
    //                                // alone never needs it. Recorded in the state file —
    //                                // pass the recorded value back on every resume.
    // commitNoVerify: false, // optional; true only when preflight agreed `--no-verify` with
    //                        // the user for this repo's pre-commit hooks
    // allowOutOfOrderSteps: false, // optional; true ONLY for a genuinely out-of-order
    //                              // completed-marks state: the single-codemod path
    //                              // (user-confirmed), or an OLDER state file that predates
    //                              // a step inserted mid-order (its key was absent — e.g.
    //                              // step ② semantic-token-migration — and resumes as
    //                              // pending behind later completed steps; sanctioned in
    //                              // preflight item 1). The script throws on a gap
    //                              // otherwise, since the usual cause is a stale list.
  },
});
```

Populate `completedSteps` from the state file read in preflight (empty on a first run) —
the script skips those steps deterministically without spawning an agent, and each step
agent re-checks the state file as a second layer.

`${CLAUDE_PLUGIN_ROOT}` is the plugin's own INSTALL directory, which is outside the repo
being migrated; expand it to an absolute path before passing it — the Workflow args must be
literal paths. If the variable is unset in this environment, fall back to the "Base directory
for this skill" line announced when the skill loaded, or to the directory of the loaded
SKILL.md. **Never resolve it against `repoRoot`.** `.claude-plugin/montage-migration` is
where these files live in the montage-web SOURCE repo (and is the right path only when the
plugin was loaded from a checkout of it, e.g. `--plugin-dir`); a consumer repo has no such
directory, so guessing that path there yields an unreadable `scriptPath` and the codemod
phase dies before step ① — while a marketplace install sits under Claude Code's own plugin
cache instead. Whatever the resolution, confirm
`<root>/skills/montage-v3-to-v4/scripts/migration-workflow.js` actually exists before
invoking the Workflow rather than trusting a constructed path.

ALWAYS pass `codemodVersion` as the concrete version
resolved in preflight (first run) or read from the state file (resume) — the script
rejects dist-tags, since the value is recorded in the state file and a dist-tag would
re-resolve on resume and break the same-build guarantee. The workflow returns per-step results plus a
`manualScan` report (assessed occurrences for manual steps M1–M24).

- If the workflow reports `aborted`, surface the failed step's error to the user, fix the
  cause, and re-run the same Workflow invocation with `completedSteps` refreshed from the
  state file — completed steps are skipped, so resuming is safe. Specific abort causes:
  - **Step ⑥ precheck found hand-migrated files**: confirm the reported file list with the
    user, then re-run with the `excludeFiles` arg set to those paths — the step agent
    performs the move-out/move-back exclusion inside the run (after its clean-tree check,
    moving back before the commit). Do NOT move files out yourself between runs; that
    dirties the tree and deadlocks the clean-tree check.
  - **Step ⑨ precheck found hand-migrated v4 `variant="button"` files**: unlike step ⑥
    there is NO exclusion machinery for this step — a mixed file cannot be ring-fenced, and
    there is no acknowledge-and-proceed flag, so **the file must stop matching before the
    re-run** or the precheck aborts identically every time. Confirm the reported files with
    the user and take one of the three terminating paths in `references/codemod-steps.md`
    step 9: hand-rename to `text-button` if the old TextButton style was intended; revert the
    file to pure v3 if it was never migrated; or, when the element is a genuinely intended v4
    general-Button slot, PARK it — record the markup, revert those elements (or drop the
    `variant` attribute) so the file stops matching, run step ⑨, and re-apply the parked
    markup during the manual phase, where post-codemod v4 adoption is sanctioned. Commit the
    cleanup as its own commit, then re-run with `completedSteps` refreshed.
  - **A codemod failed partway** (either `autoCommit` mode): the step agent restores the tree
    first — from `git checkout -- <targets>` when `autoCommit: true` (the tree was clean at step
    start), from its pre-step `git stash create` snapshot when `autoCommit: false`. If its report
    shows the restore did not happen, the partial changes MUST be reverted before re-running — a
    codemod re-run over a half-transformed tree is the corruption path (and excluding the
    partially-transformed files is the wrong fix).
  - **Step ⑤ precheck flagged files** — two distinct classes, different remediations:
    half-hand-migrated files (importing an old name AND its new counterpart) → revert the
    partial hand-migration or complete it to pure new-API names (fully hand-migrated files
    are safe for step ⑤ — a no-op); duplicate-specifier files (the SAME old name imported
    plain + aliased) → simplify to a single import specifier. Either way, commit the
    cleanup as its own commit, then re-run with `completedSteps` refreshed (procedure
    detail in `references/codemod-steps.md`).
  - **Dirty tree where the state file marks a step `completed` but its commit is missing**
    (a step agent staged but failed to commit): if the dirty files are exactly that step's
    transform output, commit them with that step's commit message
    (`chore(montage): v4 codemod — <step id>`) before re-running — do not stash.
  - **State file missing at a step's start**: the step agent reports `failed` rather than
    assuming `pending`. Do not recreate the file silently — reconcile with the user first
    (the recorded `targets` / `autoCommit` / `codemodVersion` cannot be recovered from args).
  - **A locked field disagrees with the state file** — the step agent compares all three, not
    just targets. `targets`: surface BOTH lists to the user and follow the target-lock/addition
    path in preflight item 1; never re-run with a widened list to "fix" it. `codemodVersion`:
    re-run with the recorded version — changing the pin mid-migration forfeits the same-build
    guarantee, so a deliberate change needs the user's decision first. `autoCommit`: re-run with
    the recorded value, since every step's failure handling and clean-tree expectation branches
    on it and flipping it mid-migration leaves earlier steps' commits inconsistent with later
    ones.
  - **Step ⑥ reported an incomplete move-back** (non-empty hash diff, or files still in the
    temp dir): the run keeps the recovery record and skips the state update and commit.
    Surface the unrestored paths to the user and restore them before anything else — never
    re-run step ⑥ over that tree.
  - **Step ⑥ reported a stale or mismatched `excludeFiles` list** (a listed path does not
    exist, or the precheck flagged a file the list omits): re-confirm the list with the user
    and re-run with a corrected `excludeFiles`; a subset list silently under-excludes and a
    stale path silently un-excludes a hand-migrated file.
  - **A `.claude/montage-migration-v4.exclusions.json` record exists** (usually alongside
    DELETIONS in the dirty set, but not always — the record is written BEFORE the first
    `mv`, so a run killed in that window leaves the record with an untouched tree): a
    previous step-⑥ run died between its move-out and move-back. The step agent's procedure
    step 0 fires on the record's mere existence and attempts the recovery itself — it
    restores every recorded path from the record's `excl` directory, verifies each `hash`,
    deletes the record, and reports `failed` with the outcome. **Read that outcome** and
    finish by hand only where it reports the restore incomplete (a record that still exists
    means it did not finish). Never commit those deletions; they are the user's ring-fenced
    hand-migrated files, and the generic dirty-tree bullets below would erase them.
  - **Dirty tree with `autoCommit: true` at a step's start**: commit or reconcile the
    unrelated changes with the user (never stash), then re-run.
  - **Dirty path not explainable by a completed step's rename surface, with
    `autoCommit: false`**: the step agent judges the dirty set against the completed steps'
    rename surfaces and aborts on anything unexplained. Do NOT stash and do NOT blanket-commit
    — with `autoCommit: false` the completed steps' output is legitimately uncommitted, so
    both would destroy or entangle real migration work. Handle it exactly as preflight item 3
    prescribes: re-run each completed step's verification grep from
    `references/codemod-steps.md` over the dirty files, skim `git diff` for hunks outside
    those steps' rename surfaces, surface anything still unexplained to the user, then re-run.
  - **Step ③/④ reported ambiguous consumer-owned names**: the blind rename touched a string or
    variable that may or may not be Montage-derived, and the step agent has no user channel, so
    it stopped WITHOUT committing rather than deciding. **Do NOT re-run the step.** Its codemod
    already transformed the tree; both transforms are blind prefix/substring passes, so a second
    run would re-apply exactly the renames the user chose to keep. Finish the step by hand
    instead — the same shape as the pending-but-already-applied path in item 1: confirm each name
    with the user (`AskUserQuestion`), apply the agreed reverts, run that step's verification grep
    from `references/codemod-steps.md`, commit with that step's message
    (`chore(montage): v4 codemod — <step id>`), append every reverted name to the state file's
    `revertedNames`, and mark the step `completed`. Only then re-invoke the Workflow, with that
    step INCLUDED in `completedSteps` so it is skipped. Names the agent reverted on its own arrive
    in `verifyFindings` (the run aborted before it could write them) — append those to
    `revertedNames` too, and carry the whole list into the final verification instead of
    re-judging it.
  - **A pre-commit hook rejected a step's commit**: the step agent does not retry with
    `--no-verify` and does not touch the hook config. Settle the policy with the user, then
    re-run with `commitNoVerify: true` (or with the hooks disabled for the phase).
  - **State-file verification failed on a scan-only re-run** (`aborted:
"state-file-verification"`, all 9 steps already completed): read `stateCheckError` — the
    script produces seven distinct causes with different remediations, so never assume which.
    (a) The verification agent returned nothing — re-run. (b) State file missing — reconcile
    with the user, never recreate silently. (b′) The verification agent omitted a locked field
    (`stateTargets`, `autoCommit`, `codemodVersion`, `codemodBin`, `excludeFiles`, `stepMarks`)
    — re-run; if the state file itself lacks the key, reconcile it with the user rather than
    adding a guessed value. (c) `targets` disagree (the script compares the recorded list
    itself, after the same normalization as the invocation's) — follow the target-lock
    path in preflight item 1. (d) A LOCKED FIELD disagrees (`codemodVersion` / `codemodBin` or `autoCommit`
    differs from the recorded value, or the file records `allowWhitespaceTargets: true` and
    this run did not pass it; quoting of the recorded `codemodBin` is ignored) — re-run with the recorded value; changing the pin
    mid-migration forfeits the same-build guarantee and flipping `autoCommit` changes the
    failure handling every step branches on. (e) `completedSteps` claims all nine are done while
    the state file still marks some `pending` — the list is stale; refresh it from the state
    file and re-run, since those steps must still RUN. (f) The state file's recorded
    `excludeFiles` disagree with the invocation's — re-run passing the recorded list
    verbatim; omitting or shortening it silently un-excludes files the user ring-fenced.
- **Regardless of `aborted`, inspect every step's `verifyFindings` for a state-file
  recreation report.** A recreation does NOT abort the run (the step still returns
  `completed`), so it never reaches the list above. The recreated `targets`, `autoCommit`,
  `codemodVersion` come from the invocation's args and every `manual:` mark was reset to
  `pending` by the template — confirm all of it with the user, and restore the M-section
  marks that were already `completed`, before continuing.
- **Fallback without the Workflow tool:** execute the exact per-step procedure embedded in
  `scripts/migration-workflow.js` (read it) inline — one step at a time, same order, same
  state-file checks. Never parallelize the codemod steps. After all 9 steps, produce the
  manual worklist yourself: run each M-section's scan patterns from
  `references/manual-migrations.md` (read-only, whole repo minus
  `.git`/node_modules/.next/dist/build output/lockfiles) and use those hits as Step 2's
  worklist in place of the workflow's `manualScan` report.

Details per step (commands, pre-checks, post-step verification greps, hazards):
`references/codemod-steps.md`.

### Testing an unreleased codemod build (maintainers only)

To exercise transforms that are not on npm yet (or a fix to one), build the montage-web
checkout's codemod package (`pnpm -F @montage-ui/codemod build`) and pass
`codemodBin: "node '<abs path>/packages/codemod/dist/cli.js'"` INSTEAD of `codemodVersion`.
The script then skips the registry version guard, records `codemodVersion: local` plus the
command as `codemodBin:` in the state file (both locked for the migration exactly like a
version pin), and every step agent runs that command verbatim in place of
`npx -y @montage-ui/codemod@<version>`. Before step ①, run `<codemodBin> __probe__` and check
the printed transform list contains all nine ids, the same check preflight runs against a
registry pin. Use it only on a throwaway branch or a test fixture: a local build carries no
same-build guarantee across machines, and a consumer migration must pin a published version.

### Running a single codemod

When the user asks to run just one codemod (not the full migration): run preflight IN FULL
— state file, version check, clean tree, targets, AND the one `AskUserQuestion` (item 5):
the step procedure branches on `autoCommit` at every stage, so it cannot be invented. If no
state file exists (no in-progress migration), CREATE it from the State file format template
first — all steps `pending`, concrete `codemodVersion` resolved at preflight, plus
`origin: single-codemod` so a later full migration surfaces the target list for
re-confirmation instead of silently inheriting a list chosen for one step; the step procedure's missing-file
failure applies only to resumes of a previously started migration. If earlier steps in
the canonical order are not marked `completed` in the state file, surface that and get
explicit user confirmation before running out of order — manual steps and later codemods assume
post-codemod names. Such a state file leaves a GAP in the canonical order, and the next full
Workflow run refuses to start on it: pass `allowOutOfOrderSteps: true` only after confirming the
gap is this deliberate one and not a stale `completedSteps` list. Then execute that one step exactly as the workflow's step agent would: **read the full
12-step procedure (numbered 0–11) out of `scripts/migration-workflow.js` and follow every
step — do not work from a summary.** The ones an abridged run typically drops are the ones
that prevent unrecoverable damage: the clean-tree / dirty-set check (2), the exclusion
move-out plus its recovery record (4), the pre-step snapshot (5), the restore-on-partial-failure
(7), and the verified move-back (8). Use the state file's recorded `codemodVersion`, never a
fresh `latest`, and mark the step `completed` only after its verification grep from
`references/codemod-steps.md`. The run-once rule applies with full force — this ad-hoc path is exactly
where double-runs happen.

## Step 2 — Manual migrations

Work through `references/manual-migrations.md` (M1–M24) using the workflow's `manualScan`
hits as the worklist. On a resume where all 9 codemod steps are already `completed` but no
workflow ran this session, there is no `manualScan` report — rebuild the worklist first:
re-run the same Workflow invocation with `completedSteps` listing all 9 (every step is
skipped deterministically; the run only regenerates the scans — but it still verifies the
state file exists and its `targets` match, and aborts with `stateCheckError` otherwise), or run each pending
M-section's scan patterns from `references/manual-migrations.md` yourself. Never work
M-sections without a scan-derived worklist. The scans run before M1, so v4 was not
installed when they ran: after M1's install, re-check every hit whose note starts with
`VERIFY AFTER M1:` against the installed v4 (`node_modules/@montage-ui/*`) before acting on
it. Apply mechanical fixes directly; ask the user
before behavioral decisions (the bullets below are decision summaries only —
`references/manual-migrations.md` is the source of truth for the full fix rules; update
both together when an M-section changes):

- **M3 (CSS variable / DOM identifier leftovers):** per dynamic construction site — whether
  the interpolated name is a Montage token at all, and what its post-migration form is (a
  split token like `'--wds-column-' + 'spacing'` must become `--grid-column-spacing`, not
  `--column-spacing`). Steps ③/④ already reverted the consumer-owned names they were sure
  about and recorded them in the state file's `revertedNames`; treat those as settled.
  `@montage-ui/nextjs` apps: the emotion cache key changed `wds` → `montage` (class prefixes,
  `data-emotion`) — ask whether to move such selectors to `data-component` / `data-role` or
  keep `key: 'wds'`.
  `data-ignore-dismissable-layer` survives step ④ as a name but no Montage overlay renders it
  any more — per hit, keep it where the consumer SETS it on its own element, rework it where
  code READS it to detect a Montage overlay.
- **M2 (theme tokens):** per occurrence — wrap the arithmetic in `calc()` on the `var()`
  string, or import the raw value from `lightOriginTheme`; confirm which, since a raw import
  bypasses the CSS-variable indirection (and thus runtime theme switching).
- **M4 (cross-file Card/ListCard):** whether a shared child component is actually rendered
  inside `ListCard` — the codemod defaults every undeterminable context to the Card family,
  so switching it changes which component family renders; confirm before swapping.
- **M5 (FormControl messages):** message typography moved `label2` → `caption1`; an explicit
  `variant` / `weight` on a message component now fights the new default — per occurrence,
  drop the override or keep it deliberately.
- **M6 (Modal bottom sheet):** per occurrence — accept the new close-on-dismiss default
  (delete `onVisibilityChange` workarounds) or pin with `peekHeight`.
- **M7 (TextField):** whether any field should adopt `size="medium"` (40px) now that the
  single size maps to Large. A selector that reached into the field through
  `text-field-wrapper`'s children or siblings (`text-field-wrapper[^,{]*[>+~]`) needs its path
  rechecked — leading/trailing content now sit in `text-field-leading-content` /
  `text-field-trailing-content` groups and the trailing button in its own wrapper — and a
  `TextFieldContent` `timer` that relied on v3's brand color and `label1` bold now renders
  like `text`: restore it with `color` / `sx` or accept it, per occurrence. A removed
  `text-field-invalid` selector is a mechanical **[zero]** deletion.
- **M8 (TextArea):** replacing a removed `characterCounter` requires converting an
  uncontrolled TextArea to a controlled one (the consumer now supplies the current length),
  then choosing where the counter lives — per occurrence. `FormControlMessageAccessory` in a
  message's `accessory` prop fits ONLY when the TextArea sits inside a `FormControl` AND that
  message always has text: a message with empty children renders nothing, accessory
  included, and the message components throw outside `FormControl`. Otherwise (no message to
  show, or no `FormControl`) keep the counter where v3 drew it — a hand-written counter in the
  TextArea's `leadingContent` / `trailingContent` via `<TextAreaContent variant="custom">`.
  Also decide whether any TextArea should adopt `size="medium"`.
- **M9 (Semantic tokens):** what replaces a deleted accent token that painted a
  background — the codemod's `foreground.*` replacement is the wrong intent there, and the
  replacement values differ from the originals (visual change), so decide per occurrence
  with the user, keeping the fill OPAQUE: `surface.cautionary/positive/negative.primary`
  are 8% tints, not substitutes. Opaque v4 fills exist only for brand
  (`surface.brand.primary` / `.strong` / `.heavy`) and the `surface.accent.<color>Opaque` hues (lime,
  cyan, lightBlue, violet, purple, pink); for orange / redOrange / green / red there is no
  opaque surface token, so keep the codemod's opaque `foreground.*` token (check its value
  against M9's value table and QA) or pick another semantic token with the design team —
  never fall back to `atomic.*`. The `surface.brand.primary` → `foreground.brand.primary`
  reclassification for text/icon usages is value-identical and mechanical once the usage
  is confirmed.
  A group path used as a CSS value (`semantic.line.normal`, `background.normal`, …) is NOT a
  decision: v3 returned the group object, which serialized to an invalid CSS value (emotion
  emits `normal:#…;neutral:…;`, a plain template string `[object Object]`), so the
  declaration was dropped — a pre-existing bug —
  so without asking rewrite it to the group's `normal` leaf (the border/background now
  paints where v3 drew none), or delete the declaration when the group has no `normal`
  (`*.status`, `accent.*`), and list every hit in the final summary.
- **M10 (ThemeProvider cookie storage):** first check whether the app enables dark mode at
  all. Without `enableDarkMode` the theme is forced to light and the provider never writes the
  cookie, so the cookie decisions below do not apply: delete `storageKey` (no `cookie.key`
  move needed) and review only the `next-themes` and `nonce` items and any passed `cookie` options (still
  validated — an invalid one logs a console error). With dark mode on: the
  theme cookie is shared with sibling subdomains BY DEFAULT (`cookie.domain` defaults to
  `'auto'`) — decide whether to keep that or opt out with `domain: 'none'` (host-only) — and
  whether to pass `nonce` under CSP. `storageKey` → `cookie.key` is mechanical only when the old key is already a valid cookie
  name — v4 ignores a non-token key with a console error and falls back to the default, so a key
  containing `:` `/` `@` `=` or a space must be renamed (see M10). Direct `next-themes` `useTheme` calls are
  NOT — they break silently (no error, no type error), but only the ones that resolved
  against Montage's provider may be rewritten; check each call's provider context, then map
  `resolvedTheme` → `theme` and the raw choice → `themeOriginValue`. Calls bound to the
  app's own `<NextThemeProvider>` stay as they are, dependency included.
  End users' stored theme resets once on this release; that is expected, not a defect.
  Confirm every app under that root domain uses the same `key` / `domain` / `path` — a mixed
  setup shadows the shared cookie and no scan catches it. This applies to an opted-out app too:
  a `domain: 'none'` app on the same host as a default `'auto'` app keeps having its host-only
  cookie deleted by the `'auto'` one, so opting out is only safe when no `'auto'` app shares
  the host.
- **M11 (SegmentedControl):** `variant="outlined"` has no replacement — every occurrence
  becomes the solid form (white sliding thumb, no dividers, no brand tint), so confirm the
  visual change per occurrence. Icon-only usages need `iconOnly` on the root plus an
  `aria-label` per item, and the root stops filling its parent's width (`fit-content`) —
  decide where the width now comes from. `leadingContent` → `leadingIcon` is mechanical;
  dropping `trailingContent` is not.
- **M12 (Select / SelectMultiple):** the four removed `SelectContent` variants have no
  like-for-like replacement (`variant="custom"` plus your own `sx`), and a `<SelectContent>`
  with NO `variant` silently changes meaning (text slot → icon wrapper) — decide per
  occurrence. Hand-assembled `render` Chips → `SelectRenderChip` is a visual change
  (solid → outlined), so confirm each one — and KEEPING a hand-built `solid` Chip is a
  visual change too: v3 wrapped `render`'s output in `ChipProvider
solid="semantic.label.alternative"`, which v4 dropped, so its text turns darker; per hit,
  restore the color on the Chip or accept it. A `select(-multiple)?-(placeholder|values|wrapper)`
  selector needs its path rechecked against the v4 tree (the placeholder/values wrapper is
  gone and `leadingContent` moved into the inner row). Whether any field adopts
  `size="medium"` (40px) is the user's call too. Renaming a Select's `data-component="text-field-content"`
  selector to `select-content` is mechanical once the hit is confirmed to be a Select's.
- **M13 (PushBadge):** a non-literal `variant={expr}` step ⑦ could not map needs its values
  traced per occurrence — a `'new'` branch becomes `'text'` AND the element needs `text="N"`,
  which no rename supplies. `variant="max-count"` is an opt-in decision, never the mapping
  for the old `variant="number"`: it clamps numeric `text` at `maxCount` (default 99), so
  adopting it on a counter that legitimately shows 3-digit values changes what renders.
  Deleting a stale `count` from an element that also has `text` is mechanical; deciding which
  of the two was intended is not.
- **M14 (SearchField):** the `size` value rename (`medium`→`large`, `small`→`medium`) is
  mechanical BUT hand-edit order-sensitive — `medium` is both a rename source and target,
  so convert each file in one pass (`medium`→`large` before `small`→`medium`) and build
  the `medium` worklist from the scan BEFORE converting: an unconverted v3 `size="medium"`
  stays type-valid in v4 with a different rendering, so the typechecker never finds it.
  The `readOnly` visual state is gone the same type-invisible way — the attribute still
  compiles and still blocks typing, but the reset button now shows on focus and clears the
  value, so each usage needs a decision (switch to `disabled`, or accept the behavior).
  Adopting the new `variant="outlined"` is opt-in, and direct-child selectors into the
  field's DOM need the new `[data-role='search-field-wrapper']` level added.
- **M15 (FallbackView):** `FallbackViewButton` → `FallbackViewActionAreaButton` is
  mechanical and type-visible (the old export is gone), but the required
  `FallbackViewActionArea` wrapper is not — the rename alone compiles, and with a single
  button it even renders identically, so the miss only shows up at two or more buttons
  (they fall back to the content's `24px` column gap). Picking the wrapper's `variant`
  (`single` / `horizontal` / `vertical`) is per occurrence. Dropping a deprecated
  `FallbackViewImage` is the v4 design but a visual decision, and it also removes the
  content's vertical padding, which now applies only while an image is present — where the
  old spacing mattered, restore it with `sx` instead of keeping the image. The mobile
  `FallbackViewActionAreaButton` now defaults to `size="medium"` (desktop description
  `body1-reading` → `body2-reading`) — ask before pinning `size="small"` for the v3 look.
- **M16 (`invalid` / `positive` → `status`):** the prop rename itself is type-visible (the
  old props are gone), so what survives step ⑧ is the type-invisible surface: `invalid` /
  `positive` reaching a field through `{...props}` or a props object built outside the JSX,
  and `TextField` usages that set BOTH — v4's `status` is exclusive, so one of the two
  states has to go (the codemod folds them with `negative` winning, matching v3's border).
  Picker `status` is also auto-promoted to `negative` on unparseable values in uncontrolled
  mode, which `status="normal"` cannot override — per occurrence, decide whether to keep the
  promotion or take control with `onChange`. A Picker's custom `input` no longer receives
  `status` / `size` — ask whether it should mirror the picker state. `aria-invalid`'s default
  rendering flipped (checkbox family: no longer always `"false"`; text fields / Selects: now
  always present) — a review item for attribute selectors and test assertions.
- **M17 (ListCell 개편):** `MenuItem` / `Option`'s enabled `fillWidth` has NO replacement
  prop (their `variant` means `normal`/`radio`/`checkbox`) — per occurrence, reproduce the
  full-width interaction with `sx` or drop it. Responsive `fillWidth` keys were deleted and
  `variant` is not responsive — where per-breakpoint layout was intended, write the `sx`
  branch by hand. A `selected` cell without a `trailingContent` now shows a default check
  icon — keep it or pass `trailingContent={null}` per occurrence, except where
  `leadingContent` already holds a Checkbox / Radio / Switch AND no explicit
  `trailingContent` is passed: there the right-hand check duplicates the leading
  affordance and `trailingContent={null}` is mandatory, not a decision. A cell that
  already passes its own `trailingContent` never renders the default — never overwrite it
  with `null`. A consumer-passed `selected` on `MenuItem` / `Option` (normal) /
  `AutocompleteOption` now drives the check icon directly — `selected={true}` adds a check,
  `selected={false}` removes it while `aria-checked` / `aria-selected` stays true — so decide
  per hit. `AutocompleteOption` also stopped ignoring a passed `trailingContent`: v3 forced
  it in every state (check when active, nothing otherwise), so such an option now shows
  that content on inactive options too, and instead of the check when active — keep or
  delete per hit.
  Dynamic content
  `variant={expr}` was skipped SILENTLY by step ⑨ — trace whether the expression can
  produce `badge`/`button`/`chevron` and rewrite its sources. `textProps`'s `caption` /
  `captionProps` became `description` / `descriptionProps`: step ⑨ rewrote every object
  literal, so what is left is what it REPORTED (a non-literal or spread-carrying
  `textProps`, or a ternary branch it could not read — there the object branch is still
  rewritten), props objects built outside the JSX, and consumer wrappers forwarding their
  own `caption` — a **[decision]** scan, because `ActionArea`'s `caption` prop is valid v4
  API and must never be renamed. The renamed `list-item-trailing-content` /
  `menu-item-active-icon-check` / `autocomplete-option-active-icon-check` /
  `list-text-caption` DOM identifiers are a
  mechanical **[zero]** rename of every consumer selector and test query that references
  them (stylesheets included) — they match nothing until renamed. Typography (label
  body1→body2·medium, description label1→label2), the `ListText` `p`→`div` DOM change, and
  the opacity→disable-token disabled restyle are review-and-QA items, not code rewrites.
  The trailing / selected-icon renames also moved to a different element (a new wrapper `div`
  instead of the consumer element / the `svg`), and v3 `variant="chevron"` lost `role="button"`
  / `tabIndex` with the arrow now a sibling — per hit with an `onClick`, ask where it belongs.
- **M18 (IconButton interaction):** `disableInteraction` → `interactionEffect="none"` is
  mechanical and type-visible on inline JSX, but `{...props}` carrying it onto an
  `IconButton` compiles and falls through to the DOM `<button>`, where React drops it (a
  dev-only console warning is the sole trace) — the button regains its hover / press
  feedback — so the repo-wide `\bdisableInteraction\b` scan is a **[decision]** scan: the
  prop still exists on the other components that carried it in v3 (`Button`, `TextButton`,
  `Chip`, … — see M18 for the full list) and only `IconButton` hits are work. `TopNavigationButton`'s icon buttons (also
  `ModalNavigationButton`'s icon variants, incl. the `close-button` that replaces v3
  `ModalClose` — see M19) now dim the
  icon instead of drawing the interaction layer, with no opt-out prop — a visual-QA item,
  not a rewrite. The `normal` variant's `size` is now the box, not the icon: add
  `interactionOverflow` to standalone `IconButton`s to keep the v3 layout. An `IconButton`
  passed as a component slot resource (tabled in M18, incl. the TabList / CategoryList
  `iconButton`) whose variant the slot sizes inherits the slot's `interactionOverflow` even
  when it sets its own `size` — so in the overflow slots (ListCell family, TextField /
  TextArea / Select content, TabList, CategoryList, SectionHeader) a kept numeric v3 `size` is
  still the ICON size and renders exactly as in v3, while deleting it switches to the slot's
  (usually smaller) preset icon. An unsized slot `IconButton` (24px in v3) gets that preset
  with no edit at all. Per occurrence keep the v3 pixels (keep a numeric size, add `size={24}`
  to an unsized one) or adopt the v4 slot size (delete `size`, leave unsized ones), and flag
  the smaller icons for visual QA. `SectionHeader`'s preset is `xlarge` (a 24px
  icon) — the same as v3's `size={24}` and v3's omitted `size` — so there either choice keeps
  the v3 pixels. (A slot hit whose variant the slot does not size is handled as standalone or QA
  only — see M18.) A **[decision]** scan over every `<IconButton` hit.
- **M19 (TopNavigation / ModalNavigation):** `ModalClose` → `<ModalNavigationButton
variant="close-button">` (a text-label `ModalClose` becomes `text-button` with a hand-wired
  close), `TopNavigationButton` / `ModalNavigationButton` `variant="icon"` / `"text"` →
  `"icon-button"` / `"text-button"`, and `ModalNavigation` `variant="display"` → `"emphasized"`
  are mechanical **[zero]** rewrites (`TopNavigation` keeps `display`). The modal navigation's
  `top-navigation*` DOM identifiers and CSS variables became `modal-navigation*`, but a
  standalone `TopNavigation` keeps them — a **[decision]** scan, rename only hits that reach a
  modal. A search navigation's `SearchField` now defaults to `size="medium"`; an explicit size
  (including M14's converted `large`) still wins — a per-hit decision. `ModalNavigationButton`
  throws outside a `ModalNavigation`, while v3 `ModalClose` worked anywhere in the container —
  a `ModalClose` hit elsewhere moves into the navigation or becomes a hand-wired `IconButton`.
  The new `modal-navigation-content` level breaks renamed direct-child selectors, and a
  title-less `emphasized` navigation no longer renders the `h2` the dialog's
  `aria-labelledby` pointed at — ask whether that modal needs an `aria-label`.
- **M20 (Modal layout and spacing):** `ModalContainer` `size="small"` → `size="medium"` (now
  the v3 small's 360px; with `resize="fixed"` the height grows 400→480px — accept or pin via `sx`) and a bare `--modal-content-margin` → `--modal-content-margin-x` /
  `-y` are **[zero]** rewrites. The rest are **[decision]** per hit: `ModalNavigation` now
  defaults to `emphasized` in `popup` / `bottom` (`normal` is supported only in `full`; an
  explicit `normal` in `popup` / `bottom` warns — ask whether to delete it or switch to
  `floating` / `search`); `ModalContent` now owns the side padding (`ModalContentItem` lost
  it) and its vertical padding defaults to `none` in `popup` / `top-only` in `bottom` /
  `full` — restore with `horizontalPadding` / `verticalPadding`; a `gap` v3 ignored now applies,
  and the DEFAULT gap changed too (e.g. medium 20→24px, xlarge 32→24px), so QA every
  `ModalContent` even without a `gap` prop. A `padding` override on `ModalContent` (`sx`,
  `style`, a styled wrapper) now also wipes the side margin — replace it with
  `verticalPadding` / `horizontalPadding`. An `ActionArea` inside `ModalContent` is inset
  twice — zero its own inset with `sx={{ '--action-area-margin-x': '0px' }}` rather than
  `horizontalPadding="none"`. A title-less `ModalNavigation` (e.g. a close-only bar) takes the
  `emphasized` default in `popup` / `bottom`; its buttons stay at the edges, but flag it for
  QA — 4.0.0 prerelease builds without the title spacer bunch them in the CENTER (a
  design-system bug fixed in later builds, not consumer code to patch).
- **M21 (ContentBadge outlined background):** `variant="outlined"` now renders a `transparent`
  background instead of `background.neutral.primary`, so the parent's background shows through.
  No prop changes and no type error — a **[decision]** per hit: on a `background.neutral.primary`
  surface accept it (no visual change); on an image, a colored surface, or a `surface.*` /
  `background.neutral.secondary` area ask whether to accept the see-through badge or restore an
  opaque fill via `sx` (`theme.semantic.background.neutral.primary`). Flag every hit for visual QA.
- **M22 (overlay dismiss behavior):** dismissal moved to the Radix layer stack — only the top
  layer closes, and a `Modal` / `Alert` (unless `disableAriaHiddenOthers`) or an open Picker
  popup sets `pointer-events: none` on `<body>`, so EVERY non-layer element outside the
  overlay's DOM stops receiving clicks — body-level widgets AND content portaled to `<body>` from
  inside the overlay (`Portal` / `createPortal`, react-select `menuPortalTarget`, …); Montage
  layers, `Autocomplete` / `PopperContent`, `Snackbar` / `Toast` keep working. Tests that click
  elsewhere while a Picker is open fail, and a click on the Picker's own input only closes the
  popup. Fixes, in order: render inside the overlay DOM; `pointer-events: auto` + a z-index above
  the overlay; for DOM not rendered by React also `data-ignore-dismissable-layer="true"` (else
  the click dismisses the overlay); `disableAriaHiddenOthers` (not on `useAlert` / Pickers).
  A custom `ModalDimmer` / `AlertDimmer` handler can no longer veto the close — move a veto
  to `disableOutsideClickClose` and close side effects to `onOpenChange`.
  `aria-modal` now follows `disableAriaHiddenOthers` and, on a handle sheet, the dimmed snap.
  Ask the user which fix each hit gets — never pick one or toggle `disableAriaHiddenOthers` on
  your own. Popper `collisionPadding` now defaults to 20 (popups stay 20px inside the viewport,
  flip earlier, and their max size is capped by the available space) — ask before adding
  `collisionPadding={0}` to restore the v3 placement.
- **M23 (other DOM changes):** `ActionArea` caption / compact wrappers (a `cancel` caption no
  longer renders — ask), `Avatar` img / fallback a11y attributes and fallback SVG, `AvatarGroup`
  capped at 5 children (ask how to show the rest), `SectionMessage` `leadingContent={null}`
  dropping the icon, and Picker field icons moved into `text-field-trailing-content`;
  `ActionAreaButton` defaults (`cancel` main → solid, `alternative` → assistive — ask before
  pinning the v3 look); a decorative `Avatar` left without `alt` is now announced — ask
  whether to pass `alt=""`.
- **M24 (Button size spec):** radius / padding / typography changed per size; height is held
  by a new `min-height`, but buttons get narrower and `assistive` text is bold; a Button in a
  flex `stretch` row now grows to the row height, and a `height`-only override needs a
  matching `min-height`. `Chip` text is one typography step smaller at every size. Visual
  only — ask before restoring v3 sizes with `sx` or a larger `size`.

M1 (package.json + configs) ends with a dependency install to refresh the lockfile.
**Right after that install, run the project's own formatter and lint autofix over the files
the migration changed** (`git diff --name-only --diff-filter=d <pre-migration commit>`),
**formatter first, then lint autofix, as two separate commands** — `prettier --write <files>`,
then `eslint --fix <files>` (or the repo's `format` script, then its `lint:fix` script) — and
commit the result as its own commit (`chore(montage): v4 format cleanup`), separate from the
codemod commits. Never run `eslint --fix` alone or first: codemod builds up to 4.0.1 can
print a JSX text child that follows a changed element inside `return ( … )` onto the opening
tag's line with the next line over-indented (`onClick={handleDelete}>삭제` + a 12-space
`{…}` line). Prettier alone repairs that layout, but in a repo that runs
`eslint-plugin-prettier` together with `react/jsx-indent`, `eslint --fix` splits prettier's
repair into a "Delete `삭제`" and an "Insert `삭제⏎`" fix, drops the insert because it
overlaps `react/jsx-indent`'s fix range, and applies only the delete — **the text node is
silently deleted**. Guard the step with the text-loss check:

1. Before the formatter, snapshot the tree: `SNAP=$(git stash create)`; if it prints nothing
   (clean tree — `autoCommit: true`), use `SNAP=HEAD`. `git stash create` writes a commit
   object without touching the working tree or the stash list.
2. Run the formatter, then the lint autofix.
3. Run `node <root>/skills/montage-v3-to-v4/scripts/text-loss-check.mjs "$SNAP" --all-words`
   from the repo root (`<root>` resolves exactly like the Workflow's `${CLAUDE_PLUGIN_ROOT}`
   in Step 1). It lists, per file, every word whose count dropped across the format step.
   Formatting never removes words, so each hit is either a lint autofix that legitimately
   deletes code (an unused import removed by an `unused-imports` rule — confirm in
   `git diff "$SNAP" -- <file>`) or a lost text node: restore the text from
   `git diff "$SNAP" -- <file>` by hand before committing. Do not commit the format cleanup
   until the check is clean or every remaining hit was confirmed as an intended removal.

The codemods print with recast's defaults, so their output does not follow
the project's style: new string literals come out double-quoted (`package-name-migration`'s
import sources, the ternaries `status-migration` and `list-cell-variant-migration` build,
`css-variable-migration`'s rewritten literals), and `status-migration` moves an `invalid={!!x}`
operand verbatim into a ternary test (`!!x ? "negative" : "normal"`), which ESLint's
`no-extra-boolean-cast` flags — the `eslint --fix` here removes the redundant `!!`, so no
hand edit is needed. `<pre-migration commit>` is the commit the migration started from: with
`autoCommit: true`, the parent of step ①'s commit
(`git log -1 --format=%H --grep='v4 codemod — package-name-migration'` then append `^`); with
`autoCommit: false`, `HEAD` (every migration change is still uncommitted). Without a second
revision, `git diff` compares that commit with the working tree, so uncommitted M-section edits
are included; `--diff-filter=d` keeps deleted files (e.g. a removed config) out of the list
handed to the formatter. This cannot run earlier: until M1's install the tree does not
resolve, and the formatter / ESLint config may itself depend on the renamed packages. A repo
with no formatter or lint autofix skips the step — the final lint run (Step 3) still reports
what is left.
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
     Two carve-outs apply to [zero] patterns as well as to the codemod greps, because the
     patterns are literally the same: a hit inside a file listed in the state file's
     `excludeFiles` (step ⑥ ring-fenced it — M5's scan reuses step ⑥'s pattern, so it reaches
     those files too; report and NEVER edit them), and a hit matching a `revertedNames` entry
     **in both `file` and `name`** (steps ③/④ reverted it deliberately as consumer-owned — an
     expected survivor, not an M3 leftover; the same name in a file that is not in the list stays
     a leftover candidate). Read both lists from the state file before judging any hit.
   - The 9 codemod verify greps are zero-criterion WITH their documented exceptions
     (step ①: `@wanteddev/montage-mcp` hits are the correct post-migration name; step ⑥:
     hits inside a file listed in the state file's `excludeFiles` — read it before judging
     them; step ⑧: a `status={…}` whose FOLDED EXPRESSION mentions a bare `invalid` /
     `positive` (`status={hasError || invalid ? …}`) is the transform's own correct output —
     never edit it and never count it against the criterion, since deleting that identifier
     breaks the ternary. Only a SECOND `invalid` / `positive` ATTRIBUTE on the element is an
     M16 leftover. Step ⑨ has THREE greps that are not zero-criterion here — re-read its
     verification classes before judging any of them: (a) the `variant="(badge|button)"`
     content grep is a JUDGED criterion at this stage for its `button` half only (the
     `badge` half stays zero-criterion — `badge` is never valid v4 on these content
     components, whose value is `content-badge`): the manual phase may have introduced
     legitimate v4 general-Button usages, and renaming one to `text-button` is the exact
     corruption Critical rule 1 names; (b) the dynamic `variant=\{` content grep is
     REPORT-ONLY, never a criterion — valid v4 code with a dynamic variant matches it
     forever; (c) the `caption` half of the `captionProps|caption` grep is JUDGED —
     `ActionArea`'s `caption` prop and consumer objects with `caption:` keys are valid code
     that must never be renamed; only its `captionProps` half is zero-criterion.
     `FormControl` is NOT an exception to list here: step ⑥'s grep is
     `\bForm(Field|Label|Message|ErrorMessage)`, which cannot match inside `FormControl*`
     at all, so a `FormControl` "hit" never comes from it — old inner-slot `FormControl`
     usages are covered by the separate namespace/subpath inspection in step ⑥).
     Steps ②, ③, ④ and ⑨ are different — their leftovers are M-section-owned (M9 for ②, M3
     for ③/④, M17 for ⑨'s `fillWidth` / `interactionPadding` hits, including the
     `MenuItem` / `Option` ones the transform deliberately skipped: M17's scan for them is
     **[zero]** and both of its fix branches remove the prop), not permanent exceptions: a
     Montage-related hit at final verification means
     that M-section is incomplete, so reopen it rather than accepting the hit — and for
     step ⑨ never "resolve" such a hit by converting it to `variant="full"`, which is not
     valid on `MenuItem` / `Option`. All four
     share one carve-out: a hit assessed as non-Montage code — a false positive REVERTED
     during that step's own diff review (steps ③/④ mandate reverting consumer-owned
     `--wds-*` variables and non-identifier strings, so those names legitimately survive),
     or unrelated consumer code — may remain and is listed in the final summary; only a
     genuine Montage reference reopens M9/M3/M17.
   - Comment hits are a carve-out for every grep above (codemod and [zero] alike): the JS/TS
     transforms never rewrite comments, so a commented-out v3 usage (`{/* <FormLabel> */}`,
     `// theme.semantic.label.normal`) still matches. It is not a leftover and never reopens
     an M-section or a step — list it in the final summary with file and line (or, if the
     commented code is meant to come back, update it to the v4 name by hand). Stylesheet
     comments are the exception: steps ②–④'s text pass rewrites them, so a CSS-comment hit
     is judged like any other (see the comment-hit rule in `references/codemod-steps.md`). Re-read each step's verification note
     in `references/codemod-steps.md` before judging its hits.
2. Project checks: install, typecheck, lint, build, unit tests — whatever the project
   defines. Then run the text-loss check over the whole migration:
   `node <root>/skills/montage-v3-to-v4/scripts/text-loss-check.mjs <pre-migration commit>`
   (same `<root>` and `<pre-migration commit>` as the M1 format step; no `--all-words` — the
   codemods rename ASCII identifiers, so only non-ASCII words are compared and a Korean UI
   reports no rename noise). Every hit is a pass blocker until assessed: UI text the
   migration deleted (restore it) or a removal made on purpose during Step 2 (list it in the
   summary). For an English-only UI the default compares nothing — run it with
   `--all-words` and assess the hits, which then include every codemod rename.
3. Remind the user to visually QA TextField / TextArea / bottom-sheet Modal / Card list /
   SegmentedControl / Select / PushBadge / SearchField / FallbackView screens (v4 changed their
   rendering and behavior, not just names) — former `variant="outlined"` SegmentedControls in
   particular (see M11),
   TextFields and Selects in dense layouts, whose focus ring now draws 4px OUTSIDE the field
   (see M7 / M12),
   former `variant="new"` badges, which are no longer forced square (`min-width` + padding; a
   wide glyph can come out wider, see M13), SearchFields whose radius and typography shifted with the size
   rename (see M14), fallback views, whose content padding now applies only
   while an image is present — so it is gone from every image-less view, including each one
   where M15's decision dropped the deprecated image (see M15) — and TextFields that used to
   show BOTH the negative border and the positive icon, which `status` can no longer express
   at once (see M16) — plus every ListCell-family list (ListCell / Accordion / Select and
   Autocomplete options / Menu items: label typography dropped to body2·medium with bold
   selection, the sub-label (`textProps.caption`, now `description`) to label2,
   icons 24→20, inset radius 12→16, disabled restyled from
   opacity to disable tokens, and `selected` cells without a trailingContent now show a
   default check icon, which must be suppressed with `trailingContent={null}` wherever
   `leadingContent` already carries a selection control and no explicit `trailingContent`
   is passed — see M17) and screens that used the
   deleted accent tokens (their replacement values differ — see M9), and every top
   navigation and modal navigation / close button, whose icon buttons now dim the icon on hover / press instead of drawing the
   interaction layer (see M18); and every screen M18's `<IconButton\b` scan changed, plus every
   slot `IconButton` hit, for its layout (see M18); and every modal navigation, whose padding
   is now 24px in `popup` / `bottom` (20px in `full`) and whose `display` variant became `emphasized`, and every search
   navigation, whose unsized `SearchField` shrank from 48px to 40px (see M19); and every modal,
   whose radius, content margins, `ModalContent` padding defaults and `popup` / `bottom`
   navigation title alignment changed, including title-less (close-only) navigations,
   any `ActionArea` nested in `ModalContent`, modals ending in `ModalContent` with no
   `ActionArea` (bottom spacing gone) and every default-size popup's copy, whose line breaks
   shift with the 400 → 360px width (see M20); and every outlined `ContentBadge`, whose
   background is now transparent (see M21); and every screen with a `Modal` / `Alert` / Picker
   open over a body-level widget or over content portaled to `<body>` (dropdowns, pickers,
   third-party widgets) — click-test it (see M22); and every `cancel` / `compact` `ActionArea` with a
   caption, every `cancel` / `alternative` `ActionAreaButton` and every `AvatarGroup` that can
   exceed five (see M23); and every error-only `TextArea`, whose bottom area no longer renders
   (see M8); and every popup near a viewport edge, now kept 20px inside it (see M22); and every
   layout sensitive to `Button` width or height, and every sized `Chip` (see M24); and mobile `FallbackView` buttons (see M15).
4. Delete the state file, then summarize: steps run, commits created, manual fixes
   applied, items intentionally left (with reasons), and a **"pre-existing v3 bugs now
   visible"** list — code that was silently broken in v3 and starts rendering after the
   migration, so the user is not surprised by it: every M9 group-path CSS value (v3 serialized
   the group object into an invalid value — emotion's `normal:#…;…` or a plain
   `[object Object]` — and dropped the declaration) — file:line, old path → new token (a border /
   background now appears: QA it, or delete the declaration to keep the v3 look) or
   "declaration deleted" (no `normal` leaf; the screen is unchanged). Write "none" when the
   list is empty. Also state the v4 browser requirement (Chrome / Edge 108, Firefox 121, Safari /
   iOS Safari 15.4, Opera 94) unless this session's preflight item 6 confirmed a
   `browserslist` already at or above it — i.e. on every resume, when no `browserslist` was
   found, and when the user chose to continue with older targets.

## Additional resources

- **`references/codemod-steps.md`** — the 9 codemods in order: exact commands,
  idempotency analysis, pre-checks, post-step verification greps, hazards.
- **`references/manual-migrations.md`** — manual migrations M1–M24 with scan patterns and
  fix rules.
- **`scripts/migration-workflow.js`** — Workflow-tool script for the codemod phase; also
  the canonical per-step procedure for inline fallback execution.
- **`scripts/text-loss-check.mjs`** — lists words that disappeared from JS/TS files since a
  git revision; guards the M1 format step and Step 3 against deleted JSX text nodes.
- **`known-issues.md`** — accepted trade-offs in this skill (deferred version bumps, the
  SKILL.md length budget, the line-based-heuristic scans). Maintainer-facing: read it before
  "fixing" something that was decided deliberately.
