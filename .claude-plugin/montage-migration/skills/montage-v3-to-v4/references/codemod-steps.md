# Codemod Steps (v3 → v4)

The 5 v4 codemods, in canonical execution order. Run each step **exactly once**, strictly
in this order, completing (and ideally committing) one step before starting the next.

```sh
# <codemodVersion> = the concrete version recorded in the state file
# (resolved at preflight on a first run) — never a dist-tag
npx -y @montage-ui/codemod@<codemodVersion> <transform> <target>
```

- One transform per invocation — the CLI has no batch mode. Passing both the transform name
  and the path makes the run fully non-interactive.
- Always run a CONCRETE version — resolve it once at preflight
  (`npm view @montage-ui/codemod version`) and record it in the state file's
  `codemodVersion`; on resume, use the recorded value. `npx -y ...@latest` executes
  whatever is published at that moment, so a dist-tag breaks the same-build guarantee
  across steps and sessions (the workflow script rejects dist-tags outright).
- **One file-or-directory path per invocation.** The CLI reads only the first path
  argument — extra positional paths are silently dropped, and globs are NOT expanded
  (despite the help text; a shell-expanded glob passes only its first match). For multiple
  target directories, run the SAME transform once per directory before moving to the next
  step — separate trees, so this does not violate the run-once rule, which is per-tree.
- jscodeshift processes `.tsx/.ts/.jsx/.js` and ignores `node_modules` / `.next` / `dist`.
  Steps 2 and 3 additionally rewrite `.css/.scss/.sass/.less` files under the same path as
  plain text.
- Always run through the CLI (`npx @montage-ui/codemod`), never raw jscodeshift — the
  stylesheet text pass only runs via the CLI wrapper.
- If stylesheets live outside the source target (e.g. a top-level `styles/` directory),
  add that directory to the target list AT PREFLIGHT, before step 1 runs, so steps 2 and 3
  cover it (again: one invocation per directory). A directory discovered mid-migration
  must NOT be silently added to a running migration's `targets` — the state file's list is
  locked; follow the target-addition path in SKILL.md's preflight item 2 (user
  confirmation → run each already-completed step's codemod CLI directly on ONLY the new
  directory with the recorded `codemodVersion`, bypassing the skip-if-completed check —
  the `completed` mark is per-migration, not per-directory, and stays untouched → run
  each step's verify grep scoped to that directory → append it to the state file's
  `targets`).

## Why the order and the run-once rule matter

| Step | Transform                  | Re-run on migrated code                                                                                               |
| ---- | -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1    | `package-name-migration`   | safe (no-op)                                                                                                          |
| 2    | `css-variable-migration`   | safe (no-op)                                                                                                          |
| 3    | `dom-identifier-migration` | safe (no-op)                                                                                                          |
| 4    | `list-card-migration`      | safe (no-op), EXCEPT on half-hand-migrated files and files importing the same old name via two specifiers (see below) |
| 5    | `form-control-migration`   | **CORRUPTS CODE** — never re-run (see below)                                                                          |

Even for the "safe" steps, treat every step as run-once: the state file is the single
source of truth, and mixed states (a step applied to half the tree) are hard to diagnose.
The hard inter-step constraints are between codemods and MANUAL steps: manual fixes
reference post-codemod names, so all 5 codemods run first, manual migrations after
(see `manual-migrations.md`).

## Step 1 — `package-name-migration`

Rewrites `import` declaration sources `@wanteddev/*` → `@montage-ui/*` (11-entry map),
including subpath imports (`@wanteddev/wds/style.css` → `@montage-ui/core/style.css`).
Exception: `@wanteddev/wds-mcp` → `@wanteddev/montage-mcp` (stays in the `@wanteddev`
scope — do not blanket-rename it to `@montage-ui` in package.json).

Not covered by the codemod. Ownership split: JS/TS code references are fixed NOW as part
of this step's verification; config files and stylesheets are manual step M1.

- Fix in this step (code): `export { X } from '@wanteddev/...'` / `export * from ...`
  re-export barrels (different AST node), `require()`, dynamic `import()`,
  `jest.mock()` / `vi.mock()` first arguments, `declare module '@wanteddev/wds'`
  augmentations.
- Leave for M1 (config/styles): package.json, tsconfig paths, next.config
  `transpilePackages`, bundler aliases, ESLint config, `@import` / `url()` references in
  stylesheets.

Post-step verification:

```
grep -rn "@wanteddev/" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
  --include="*.mjs" --include="*.cjs" --include="*.mts" --include="*.cts" <targets>
```

(Do not anchor on `^import` — multi-line imports put `from '@wanteddev/...'` on its own
line.) Hits on `@wanteddev/montage-mcp` are EXPECTED — that is the codemod's own
post-migration name for `wds-mcp`; do not change them. Every other remaining hit is a
construct the codemod cannot reach (re-export, require, dynamic import, mock,
`declare module` — plus ANY import in `.mjs/.cjs/.mts/.cts` files, extensions the CLI
never passes to jscodeshift) — fix them by hand now, in the same commit. EXCEPT hits
inside config-file option values (next.config `transpilePackages`, test-config aliases,
tsconfig paths): those belong to manual step M1 even when the file has a JS/TS extension.

## Step 2 — `css-variable-migration`

Renames `--wds-*` CSS custom properties: strips the `--wds-` prefix, with two exceptions —
`--wds-column-spacing` → `--grid-column-spacing`, `--wds-row-spacing` → `--grid-row-spacing`.
Rewrites string literals and template literals in JS/TS plus stylesheets as text.

Cautions:

- NOT import-gated — it renames ANY `--wds-*` token by prefix, including consumer-defined
  variables that were never Montage's. Review the diff.
- The pattern is lowercase-only (`--wds-[a-z0-9-]+`): a camelCase custom property like
  `--wds-myVar` gets partially rewritten (`--myVar`). All shipped Montage variables are
  lowercase, but grep the diff for partially-rewritten camelCase properties
  (`git diff | grep -E '^\+.*--[a-z-]*[A-Z]'`) and REPAIR them in this step — rename the
  declaration and every usage consistently to the consumer's intended post-migration
  name. This step owns the fix; M3's note is only a safety net.
- Card sub-component variables come out as **intermediate names**: `--wds-card-content-item-*`
  → `--card-content-item-*`, which v4 core does NOT ship (it ships `--card-row-*`). The
  manual rename `--card-content-item-*` → `--card-row-*` (manual step M4) only works AFTER
  this step — this is a hard ordering constraint.
- Dynamically built names (`'--wds-' + name`, `` `--wds-${x}` ``) are not matched → manual M3.

Post-step verification: `grep -rn -- "--wds-" <targets>` — remaining hits should only be
dynamically-built names (manual M3).

## Step 3 — `dom-identifier-migration`

Renames 4 DOM identifier tokens in string literals, template literals, JSX attribute names,
and stylesheets:

| 기존                           | 변경                              |
| ------------------------------ | --------------------------------- |
| `wds-component`                | `data-component`                  |
| `wds-ignore-first-focus`       | `data-ignore-first-focus`         |
| `wds-ignore-dismissable-layer` | `data-ignore-dismissable-layer`   |
| `wds-region-manager(-bottom)`  | `montage-region-manager(-bottom)` |

Cautions:

- Blind substring replacement over ANY string literal — unrelated strings containing a token
  (analytics event names, doc strings) get rewritten too. Review the diff.
- Renames attribute NAMES only, never VALUES: `wds-component="card-content"` becomes
  `data-component="card-content"`; the value rename `card-content` → `card-body` is manual
  step M4 and therefore MUST come after this step.

Post-step verification: `grep -rn -E "wds-(component|ignore-|region-manager)" <targets>` —
remaining hits should only be dynamically-built strings (manual M3).

## Step 4 — `list-card-migration`

Renames the CardList family to ListCard and Card sub-components context-sensitively based
on the nearest JSX ancestor (`CardList`/`CardListSkeleton` → `ListCard*` names;
`Card`/`CardSkeleton` or undeterminable → new `Card*` names). Handles alias imports,
`leadingContent`/`trailingContent` prop JSX, mixed-context files (splits imports into
`CardBody` + `ListCardBody`), and Props types.

Cautions:

- Import-gated on a file-level import from exactly `@montage-ui/core` or `@wanteddev/wds` —
  deep/subpath component imports, namespace imports, and re-exports are skipped entirely.
- Non-JSX identifier references (`component={CardContent}`) always become the Card-family
  name (`CardBody`) — if actually used in ListCard context, fix by hand (manual M4).
- Cross-file context is invisible: a child-component file importing only Card sub-components
  defaults to Card names even when the parent mounts it inside a `ListCard` — review shared
  child components (manual M4).
- Half-hand-migrated files (importing BOTH an old name and its new name) can end up with a
  duplicate import specifier — check before running for files importing any old name
  together with any new counterpart, using the FULL rename surface: every
  `\bCard(List|Content)`-prefixed value or Props type (`CardContent`, `CardContentItem`,
  `CardListContent`, their `*Skeleton` and `*Props` forms, `CardList`,
  `CardListSkeleton`) against the new names (`ListCard*`, `CardBody*`, `CardRow*` and
  their Props). The global renames hit ALL of these unconditionally, so any old/new pair
  in one file produces a duplicate specifier. Clean them up first. **Cleanup remediation**
  (when the pre-check aborts the workflow with a file list): for each flagged file, either
  revert the partial hand-migration or complete it to pure new-API names — fully
  hand-migrated files are SAFE for this codemod (re-run on migrated names is a no-op, per
  the idempotency table). Commit that cleanup as its own commit so the tree is clean, then
  re-run the workflow with `completedSteps` refreshed from the state file.
- **Duplicate specifiers for the same old name** (`import { CardContent }` plus
  `import { CardContent as CC }` from a montage source — the same applies to the
  list-context names `CardThumbnail*` / `CardTitle*` / `CardCaption*` and their Skeleton
  forms, where the leftover fails silently as a wrong-family name instead of a duplicate
  specifier) are a second exception: the
  transform's import lookup checks `@montage-ui/core` imports before `@wanteddev/wds` and,
  within the winning source, keeps the LAST matching specifier in file order — so the
  first run leaves the other specifier's import and its JSX usages untouched (the plain
  import in the example above; source order first, file order second), and a re-run
  over that codemod-produced state mis-renames list-context leftovers to Card-family
  names (`CardBody` instead of `ListCardBody`). Simplify such files to a single specifier
  BEFORE running; if the first run already left leftovers, fix them by hand from the
  verify-grep hits — never by re-running.

Post-step verification (expect zero hits): `grep -rn -E "\bCard(List|Content)" <targets>`
(prefix pattern on purpose — `\bCardContent\b` would miss `CardContentProps` /
`CardContentItemSkeleton` leftovers in gate-skipped files; the prefix form catches every
name that is exclusively old — `CardList*`, `CardContent*` — and matches none of the new
ones, `ListCard*` included. `CardThumbnail*` / `CardTitle*` / `CardCaption*` are still
valid v4 Card-family names and cannot be grepped to zero; their list-context leftovers
surface via a `CardList` hit in the same gate-skipped file, or via M4's cross-file
review). Remaining hits live in gate-skipped files (namespace / re-export / deep-subpath
imports) or duplicate-specifier files (see pre-check) — no M-section covers them; fix
them by hand now, as part of this step.

## Step 5 — `form-control-migration`

Import-gated like step 4: the transform fires only on names imported from exactly
`@montage-ui/core` or `@wanteddev/wds` (per-name specifier lookup) — namespace, re-export,
and subpath imports do not trigger it.

Renames the Form family, including a two-way swap:

| 기존               | 변경                         |
| ------------------ | ---------------------------- |
| `FormField`        | `FormControl`                |
| `FormControl`      | `FormControlField`           |
| `FormLabel`        | `FormControlLabel`           |
| `FormMessage`      | `FormControlMessage`         |
| `FormErrorMessage` | `FormControlNegativeMessage` |

(+ the same renames for `*Props` types.)

**⚠️ NOT idempotent — this is the step that corrupts code when run twice.** After the first
run, files import `FormControl` (the new root). A second run matches that import again and
renames every `FormControl` to `FormControlField` — the root wrapper silently becomes the
inner field slot, and duplicate import specifiers appear. The same corruption hits
`FormControlProps` → `FormControlFieldProps`.

The same failure fires on the FIRST run against code that was already **hand-migrated** to
the new v4 API. Pre-check before running — two-pass, because a single line-based
`import {...FormControl...}` grep misses multi-line (prettier-formatted) imports:

```sh
# files referencing FormControl or FormControlProps, minus files that also reference
# FormField/FormFieldProps — the (Props)? alternate is required: \bFormControl\b alone
# misses a type-only `import type { FormControlProps }` file, which the codemod still
# corrupts (FormControlProps → FormControlFieldProps) on its first run
comm -23 \
  <(grep -rlE '\bFormControl(Props)?\b' <targets> | sort) \
  <(grep -rlE '\bFormField(Props)?\b' <targets> | sort)
```

For each resulting file, inspect it: if it already uses the
new v4 API (root `<FormControl>` wrapping `<FormControlField>`, imports any
`FormControl*` sub-component, or imports only the `FormControlProps` type with no JSX at
all — a type-only consumer is hand-migrated too), it is hand-migrated and must be
excluded. A v3 file importing only `FormControl` (the old inner slot, unusual but
possible) is safe to transform.

The subtraction above assumes a `FormField` reference implies v3 code — that assumption
has a hole: a hand-migrated file whose only `FormField` mention is a comment, string, or
back-compat type alias escapes it. Run a SECOND pre-check for such mixed files, mirroring
step 4's half-hand-migrated check:

```sh
# files referencing a NEW FormControl* sub-component name AND still containing FormField:
# a pure v3 file never references the new names, so every hit is mixed — inspect it
comm -12 \
  <(grep -rlE '\bFormControl(Field|Label|Message|NegativeMessage|PositiveMessage|MessageAccessory)' <targets> | sort) \
  <(grep -rlE '\bFormField(Props)?\b' <targets> | sort)
```

For each hit, check whether the `FormField` occurrences are real v3 code (then the file is
half-migrated — reconcile it to one API before running) or only comments/strings/aliases
(then the file is hand-migrated and must be excluded). Residual risk stays: a
hand-migrated file mentioning `FormField` only in a comment while importing none of the
new sub-component names escapes both greps — this is why the exclusion decision routes
through user confirmation.

**Exclusion procedure** — the CLI has no exclude flag, so temporarily move hand-migrated
files out of the target tree. Who and when: the exclusions are USER-confirmed (the
pre-check reports the flagged files; the orchestrator confirms them with the user and,
when running via the workflow script, re-runs it with the `excludeFiles` arg set), and
the move-out happens INSIDE the step run — after the step's tree-state check (the
clean-tree check when autoCommit is true; the dirty-set recording otherwise), before the
codemod; the move-back happens after the codemod, BEFORE the state update and the step
commit, so the tree state is assessed without the temporary deletions and no commit ever
contains them. Run from the repo root with repo-relative paths:

```sh
# 1. fresh temp dir (never reuse a fixed path — stale leftovers would be moved back in)
EXCL=$(mktemp -d)

# 2. move each flagged file out, preserving its relative path
for f in <flagged files>; do
  mkdir -p "$EXCL/$(dirname "$f")"
  mv "$f" "$EXCL/$f"
done

# 3. run the codemod on the targets as usual — <codemodVersion> is the migration's
#    recorded value from the state file, same build as every other step
npx -y @montage-ui/codemod@<codemodVersion> form-control-migration <target>

# 4. move the files back to their exact original paths
(cd "$EXCL" && find . -type f) | while read -r f; do
  mv "$EXCL/$f" "$f"
done
```

Verify with `git status` that the moved-back files show no diff. Confirm the temp
directory is empty before the move-out, and contains no files after the move-back
(the directory skeleton remains): `[ -z "$(find "$EXCL" -type f)" ]`.

Cautions:

- Global identifier rename within gated files — unrelated identifiers named `FormControl`/
  `FormField` (object keys, `styles.FormControl`) get renamed too. Review the diff.
- Namespace imports (`M.FormField`), re-exports, and subpath imports are skipped by the
  codemod — no M-section covers them; fix them by hand in this step's verification,
  WITHOUT re-running the codemod.
- New v4 API adoption (`FormControlPositiveMessage`, `FormControlMessageAccessory`,
  `size`/`labelPlacement`) must happen only AFTER this step, for the same double-swap reason.

Post-step verification (expect zero hits):
`grep -rn -E "\bForm(Field|Label|Message|ErrorMessage)" <targets>`
(prefix pattern on purpose — a `\bFormField\b` form would miss `FormFieldProps` leftovers
in gate-skipped files; the prefix form matches no new `FormControl*` name.)
`FormControl` hits are EXPECTED — it is the new root name; do not "fix" them.

One residual the main grep cannot see (step 4 has the same class of acknowledgment): in
gate-skipped files, an OLD inner-slot `FormControl` usage (e.g.
`import * as M from '@wanteddev/wds'` + `<M.FormControl>`, or a subpath import) survives
under the literal name `FormControl` — grep-indistinguishable from a correct new root,
but it means the field slot in v4 and must be renamed to `FormControlField` by hand.
Additionally inspect namespace imports of montage sources
(`grep -rnE "import \* as \w+ from '(@montage-ui/core|@wanteddev/wds)'"`) and montage
subpath imports for `.FormControl` member usages.

## After all 5 steps

Proceed to `manual-migrations.md` (all M-sections, M1–M8), then final verification:

1. All leftover greps clean (see each step + M-sections).
2. Dependency install with the renamed `@montage-ui/*` packages succeeded.
3. Project typecheck / lint / build / tests pass.
4. Visual QA on TextField / TextArea / Modal bottom-sheet / Card list screens (behavioral
   changes).
