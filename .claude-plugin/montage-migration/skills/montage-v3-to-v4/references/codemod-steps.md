# Codemod Steps (v3 → v4)

The 5 v4 codemods, in canonical execution order. Run each step **exactly once**, strictly
in this order, completing (and ideally committing) one step before starting the next.

```sh
npx -y @montage-ui/codemod@latest <transform> <target>
```

- One transform per invocation — the CLI has no batch mode. Passing both the transform name
  and the path makes the run fully non-interactive.
- `@latest` is acceptable for a single-session run, but `npx -y` executes whatever is
  published at that moment — for a migration that may span multiple sessions (or to
  reduce supply-chain exposure), pin a specific version
  (`npx -y @montage-ui/codemod@<x.y.z> ...`, or the `codemodVersion` workflow arg) so
  every step runs the same codemod build.
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
  add that directory to the target list so steps 2 and 3 cover it (again: one invocation
  per directory).

## Why the order and the run-once rule matter

| Step | Transform                  | Re-run on migrated code                                      |
| ---- | -------------------------- | ------------------------------------------------------------ |
| 1    | `package-name-migration`   | safe (no-op)                                                 |
| 2    | `css-variable-migration`   | safe (no-op)                                                 |
| 3    | `dom-identifier-migration` | safe (no-op)                                                 |
| 4    | `list-card-migration`      | safe (no-op), EXCEPT on half-hand-migrated files (see below) |
| 5    | `form-control-migration`   | **CORRUPTS CODE** — never re-run (see below)                 |

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
grep -rn "@wanteddev/" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" <targets>
```

(Do not anchor on `^import` — multi-line imports put `from '@wanteddev/...'` on its own
line.) Every remaining hit is a construct the codemod cannot reach (re-export, require,
dynamic import, mock, `declare module`) — fix them by hand now, in the same commit.

## Step 2 — `css-variable-migration`

Renames `--wds-*` CSS custom properties: strips the `--wds-` prefix, with two exceptions —
`--wds-column-spacing` → `--grid-column-spacing`, `--wds-row-spacing` → `--grid-row-spacing`.
Rewrites string literals and template literals in JS/TS plus stylesheets as text.

Cautions:

- NOT import-gated — it renames ANY `--wds-*` token by prefix, including consumer-defined
  variables that were never Montage's. Review the diff.
- The pattern is lowercase-only (`--wds-[a-z0-9-]+`): a camelCase custom property like
  `--wds-myVar` gets partially rewritten (`--myVar`). All shipped Montage variables are
  lowercase, but grep the diff if the codebase has camelCase `--wds-` properties.
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
  duplicate import specifier — check for files importing both `CardContent` and
  `CardBody`/`ListCardBody` before running; clean them up first.

Post-step verification (expect zero hits): `grep -rn -E "\bCard(List|Content)" <targets>`
(prefix pattern on purpose — `\bCardContent\b` would miss `CardContentProps` /
`CardContentItemSkeleton` leftovers in gate-skipped files; the prefix form catches all old
names and matches none of the new ones, `ListCard*` included).

## Step 5 — `form-control-migration`

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
# files referencing FormControl at all, minus files that also reference FormField
comm -23 \
  <(grep -rlE '\bFormControl\b' <targets> | sort) \
  <(grep -rlE '\bFormField\b' <targets> | sort)
```

For each resulting file, inspect it: if it already uses the
new v4 API (root `<FormControl>` wrapping `<FormControlField>`, or imports any
`FormControl*` sub-component), it is hand-migrated and must be excluded. A v3 file
importing only `FormControl` (the old inner slot, unusual but possible) is safe to
transform.

**Exclusion procedure** — the CLI has no exclude flag, so temporarily move hand-migrated
files out of the target tree:

```sh
# 1. move each flagged file out, preserving its relative path
mkdir -p /tmp/montage-mig-excluded
for f in <flagged files>; do
  mkdir -p "/tmp/montage-mig-excluded/$(dirname "$f")"
  mv "$f" "/tmp/montage-mig-excluded/$f"
done

# 2. run the codemod on the targets as usual
npx -y @montage-ui/codemod@latest form-control-migration <target>

# 3. move the files back to their exact original paths
(cd /tmp/montage-mig-excluded && find . -type f) | while read -r f; do
  mv "/tmp/montage-mig-excluded/$f" "$f"
done
```

Verify with `git status` that the moved-back files show no diff, and confirm the temp
directory is empty before continuing.

Cautions:

- Global identifier rename within gated files — unrelated identifiers named `FormControl`/
  `FormField` (object keys, `styles.FormControl`) get renamed too. Review the diff.
- Namespace imports (`M.FormField`), re-exports, and subpath imports are skipped → manual.
- New v4 API adoption (`FormControlPositiveMessage`, `FormControlCharacterCounter`,
  `size`/`labelPlacement`) must happen only AFTER this step, for the same double-swap reason.

Post-step verification (expect zero hits):
`grep -rn -E "\bForm(Field|Label|Message|ErrorMessage)" <targets>`
(prefix pattern on purpose — a `\bFormField\b` form would miss `FormFieldProps` leftovers
in gate-skipped files; the prefix form matches no new `FormControl*` name.)
`FormControl` hits are EXPECTED — it is the new root name; do not "fix" them.

## After all 5 steps

Proceed to `manual-migrations.md` (M1–M7), then final verification:

1. All leftover greps clean (see each step + M-sections).
2. Dependency install with the renamed `@montage-ui/*` packages succeeded.
3. Project typecheck / lint / build / tests pass.
4. Visual QA on TextField / Modal bottom-sheet / Card list screens (behavioral changes).
