# Codemod Steps (v3 → v4)

The 6 v4 codemods, in canonical execution order. Run each step **exactly once**, strictly
in this order, completing (and ideally committing) one step before starting the next.

```sh
# <codemodVersion> = the concrete version recorded in the state file
# (resolved at preflight on a first run) — never a dist-tag
npx -y @montage-ui/codemod@<codemodVersion> <transform> <target>
```

- One transform per invocation — the CLI has no batch mode. Passing both the transform name
  and the path makes the run fully non-interactive.
- Always run a CONCRETE version — resolve it once at preflight with
  `npm view '@montage-ui/codemod@^4' version --json | jq -r 'if type=="array" then .[-1] else . end'`.
  This skill covers the 4.x transform line only (the workflow script rejects any other
  major), and the two shorter forms both fail: the unscoped
  `npm view @montage-ui/codemod version` returns the `latest` dist-tag (5.x the day that
  ships), while the range form WITHOUT `--json` prints one `pkg@x.y.z 'x.y.z'` line per
  matching version — verbatim it fails the script's exact-version guard, and taking the
  first line pins the OLDEST 4.x for the rest of the migration. Record it in the state file's
  `codemodVersion`; on resume, use the recorded value. `npx -y ...@latest` executes
  whatever is published at that moment, so a dist-tag breaks the same-build guarantee
  across steps and sessions (the workflow script rejects dist-tags outright).
- **One file-or-directory path per invocation.** The CLI reads only the first path
  argument — extra positional paths are silently dropped, and globs are NOT expanded
  (despite the help text; a shell-expanded glob passes only its first match). For multiple
  target directories, run the SAME transform once per directory before moving to the next
  step — separate trees, so this does not violate the run-once rule, which is per-tree.
  For that reasoning to hold, **targets must be disjoint**: a target nested inside
  another (`src` and `src/features/forms`) makes the codemod run TWICE over the nested
  subtree — the run-once corruption path. The workflow script rejects nested targets, and
  also two spellings of the SAME tree (`src` + `./src` + `src/` + `<repoRoot>/src`), which
  would run every codemod twice just as surely; it canonicalizes to repo-relative paths and
  rejects `..` segments before comparing.
- jscodeshift processes `.tsx/.ts/.jsx/.js` and ignores `node_modules` / `.next` / `dist`.
  Steps 2, 3 and 4 additionally rewrite `.css/.scss/.sass/.less` files under the same path
  as plain text.
- **Every transform parses with the `tsx` parser** (`api.jscodeshift.withParser('tsx')`, all
  six), and the CLI passes `--extensions=tsx,ts,jsx,js` with no per-extension override. A
  `.ts` file using legacy angle-bracket casts (`const y = <string>value;`) therefore fails to
  parse — the CLI reports `Transformation error (Unterminated JSX contents…)` and leaves THAT
  file untransformed while the rest of the run succeeds: a silent partial migration. Scan for
  them at preflight and convert to `as` syntax in a preparatory commit before step ①:
  `grep -rnE '(=|\(|,|return) *<[A-Za-z_$][A-Za-z0-9_$.]*(\[\])?> *[A-Za-z_$(]' --include="*.ts" <targets>`.
  Treat any per-file transformation error in a step's output the same way: the step is NOT
  complete until every reported file is either fixed and re-run, or hand-migrated.
- Always run through the CLI (`npx -y @montage-ui/codemod@<codemodVersion> <transform> <target>`,
  the exact shape at the top of this file), never raw jscodeshift — the stylesheet text pass
  only runs via the CLI wrapper.
- If stylesheets live outside the source target (e.g. a top-level `styles/` directory),
  add that directory to the target list AT PREFLIGHT, before step 1 runs, so steps 2–4
  cover it (again: one invocation per directory). Discover them by BOTH the variable and the
  DOM-identifier surface — `-e "--wds-" -e "--semantic-" -e "wds-component" -e "wds-ignore-"
-e "wds-region-manager"` — because step ④ rewrites `wds-component` / `wds-ignore-*` /
  `wds-region-manager` in stylesheets too, so a directory whose only Montage references are
  DOM-identifier selectors (`[wds-component="card"]`, `#wds-region-manager`) is otherwise
  never discovered and step ④ silently never runs on it. A directory discovered mid-migration
  must NOT be silently added to a running migration's `targets` — the state file's list is
  locked; follow the target-addition path in SKILL.md's preflight item 1 (user
  confirmation → run each already-completed step's codemod CLI directly on ONLY the new
  directory with the recorded `codemodVersion`, bypassing the skip-if-completed check —
  the `completed` mark is per-migration, not per-directory, and stays untouched → run
  each step's verify grep scoped to that directory → append it to the state file's
  `targets`).

## Why the order and the run-once rule matter

| Step | Transform                  | Re-run on migrated code                                                                                               |
| ---- | -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1    | `package-name-migration`   | safe (no-op)                                                                                                          |
| 2    | `semantic-token-migration` | safe (no-op — the rename map is prefix-free and no new path matches an old key)                                       |
| 3    | `css-variable-migration`   | safe (no-op) for every Montage-shipped variable; a consumer-defined `--wds-wds-*` name would be stripped again        |
| 4    | `dom-identifier-migration` | safe (no-op)                                                                                                          |
| 5    | `list-card-migration`      | safe (no-op), EXCEPT on half-hand-migrated files and files importing the same old name via two specifiers (see below) |
| 6    | `form-control-migration`   | **CORRUPTS CODE** — never re-run (see below)                                                                          |

Even for the "safe" steps, treat every step as run-once: the state file is the single
source of truth, and mixed states (a step applied to half the tree) are hard to diagnose.
The hard inter-step constraints are between codemods and MANUAL steps: manual fixes
reference post-codemod names, so all 6 codemods run first, manual migrations after
(see `manual-migrations.md`). Step 2 has no ordering constraint against the other five
(its `semantic.*` / `--semantic-*` namespace is disjoint from every other transform's
inputs and outputs, and it is not import-gated) — its position follows the MIGRATION.md
section order.

## Presence greps — "was this step already run?"

Every step's post-step verification is an ABSENCE check, so it returns zero both when the
codemod ran and when the repo never used that API. That makes it useless for the
`pending`-but-already-applied mismatch direction (SKILL.md preflight item 1) — the direction
that walks into the step ⑥ double-swap. Pair it with the matching PRESENCE grep: new names
present + old names absent means the transform already ran (by codemod or by hand).

| Step | Presence grep (new names)                                                                                       |
| ---- | --------------------------------------------------------------------------------------------------------------- |
| ①    | `grep -rn "@montage-ui/" <targets>`                                                                             |
| ②    | `grep -rnE -- "semantic\.(foreground\|surface\|effect)\.\|--semantic-(foreground\|surface\|effect)-" <targets>` |
| ③    | `grep -rnE -- "--grid-(column\|row)-spacing" <targets>` (see the caveat below)                                  |
| ④    | `grep -rn "data-component" <targets>`                                                                           |
| ⑤    | `grep -rnE "\b(ListCard\|CardBody\|CardRow)" <targets>`                                                         |
| ⑥    | `grep -rnE "\bFormControl(\b\|Field\|Label\|Message\|NegativeMessage\|PositiveMessage)" <targets>`              |

Read the pair together, never either alone: both zero means the repo simply never used that
API (nothing to conclude); new present + old present means a HALF-migrated tree — stop and
reconcile with the user, never re-run the codemod over it.

**Step ⑥ caveat — a bare `FormControl` is ambiguous.** A v3 tree using only the plain
`FormField` root migrates to a plain `FormControl` with no sub-components, so BOTH step ⑥
greps return zero on it — "both zero" therefore does NOT mean "never used that API" here.
That is why the presence pattern includes bare `\bFormControl\b`; a bare hit can be the
correct new root OR a surviving v3 inner slot, so the step-⑥ pre-check (not this table) is
the authoritative test for the already-applied direction.

**Step ③ caveat — the weakest signal of the six.** `css-variable-migration` covers the
69 `KNOWN_WDS_VARIABLES`: 67 come out with the `--wds-` prefix simply stripped
(`--modal-translate`, `--switch-width`, `--card-content-item-*`, …) and the remaining two,
`--wds-column-spacing` / `--wds-row-spacing`, are renamed to `--grid-*-spacing`. Only
`--grid-column-spacing` / `--grid-row-spacing` are unambiguous evidence; the stripped
component names are indistinguishable from consumer-defined variables. If a repo never used
the grid variables, step ③ has NO reliable presence signal — say so and fall back to the
step-③ commit / `git log -S"--wds-"` rather than guessing. Do NOT use
`--spacing-` / `--radius-` / `--dimension-` / `--zIndex-` / `--opacity-` / `--primitive-` /
`--atomic-` here: those are the theme-token CSS variables emitted by the library build (the
M2 topic), not codemod output, and `--atomic-*` / `--semantic-*` already exist in v3 — they
would fire on a completely unmigrated tree.

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

## Step 2 — `semantic-token-migration`

Rewrites the v3 semantic color token paths to the v4 property/intent/variant structure
(`label.normal` → `foreground.neutral.primary`, `material.dimmer` → `effect.dimmer.primary`,
…) across three surfaces, driven by a 60-entry rename map (baseline: the v3 release
line's token set). The full old→new tables — including the deleted accent tokens'
replacement mappings — are bundled in `manual-migrations.md` under "M9 → Rename tables";
use them for every hand-rewrite this step or M9 calls for:

- **Member-expression chains** — any `<base>.semantic.<old-path>` regardless of base
  (`theme`, `wdsTheme`, `props.theme`, any alias) plus destructured chains rooted at a
  bare `semantic` identifier. Old paths are matched longest-first (depth 4 → 2) and
  rebuilt even when the new path has a different depth.
- **String literals / template literals** — `'semantic.<old-path>'` dot tokens
  (`color="semantic.label.normal"`, `getColorByToken('semantic.…')`) and
  `--semantic-<old-dashed>` CSS variables. A trailing guard preserves `-rgb` suffixed
  variables (`--semantic-background-elevated-normal-rgb` →
  `--semantic-surface-elevated-primary-rgb`) and blocks partial-identifier matches.
- **Stylesheets** (`.css/.scss/.sass/.less`, CLI text pass) — the `--semantic-*`
  CSS-variable form ONLY. A dot-path token string inside a stylesheet is NOT converted —
  flag any such hit for manual step M9.

Cautions:

- NOT import-gated — it fires on shape alone, so a non-Montage object accessed as
  `<x>.semantic.<old-path>` or an unrelated string containing `semantic.<old-path>` /
  `--semantic-<old-dashed>` is rewritten too. Review the diff.
- Deleted accent tokens (`accent.foreground.red/redOrange/orange/green/blue`,
  `accent.background.redOrange`) are mapped to their `foreground.*` replacements. A
  background-color usage of those replacements needs a hand-switch to a `surface.*`
  token — manual step M9; do NOT re-map here.
- `primary.normal` always becomes `surface.brand.primary` (the guide-table mapping).
  Text/icon-color usages should be `foreground.brand.primary` (identical value) — that
  reclassification is manual step M9; do NOT re-map here.
- Group-level references (`theme.semantic.label` passed or iterated whole), dynamically
  built names (`` `--semantic-${x}` ``, `'semantic.' + path`), and computed access
  (`semantic['label']['normal']`) are never matched → manual M9.
- Safe to re-run (byte-level no-op on migrated code — no rename value matches another
  rename key, verified in the transform source), and safe on hand-migrated v4 token
  code. The run-once rule still applies: mixed states are hard to diagnose.

Post-step verification — two greps, both expected to reach zero apart from the M9 classes
below:

```
grep -rnE "semantic\.(label|status|fill|material|inverse)\b|semantic\.interaction\b|semantic\.primary\.|semantic\.accent\.|semantic\.background\.(normal|elevated|transparent|status)|semantic\.line\.(normal|solid|primary|status)" <targets>
grep -rnE -- "--semantic-(label|status|fill|material|inverse|interaction|primary|accent|background-(normal|elevated|transparent|status)|line-(normal|solid|primary|status))" <targets>
```

(Both greps scan stylesheets too — neither carries an `--include` filter. A dot-path hit
inside a stylesheet is an M9 item, because the CLI's stylesheet text pass renames only the
`--semantic-*` variable form. Both patterns match no v4 name — the new structure
has no top-level `label`/`status`/`fill`/`material`/`inverse`/`interaction`/`primary`/
`accent` group, `background` keeps only `neutral`, and `line` keeps none of
`normal`/`solid`/`primary`/`status`.) Remaining hits should only be group-level
references, root-object aliases/destructures (`const sem = theme.semantic`,
`const { label } = theme.semantic` — these escape both greps at the usage site; note
any you spot in the diff), dynamically built names, computed access, or dot-path token
strings inside stylesheets — all owned by manual step M9; report them, do not fix them
here.

## Step 3 — `css-variable-migration`

Renames `--wds-*` CSS custom properties: strips the `--wds-` prefix, with two exceptions —
`--wds-column-spacing` → `--grid-column-spacing`, `--wds-row-spacing` → `--grid-row-spacing`.
Rewrites string literals and template literals in JS/TS plus stylesheets as text.

Cautions:

- NOT import-gated — it renames ANY `--wds-*` token by prefix, including consumer-defined
  variables that were never Montage's. Review the diff and REVERT the rewrites of variables
  the consumer clearly owns; route ambiguous namespaces to the user before this step's
  commit. No later scan looks for them, and once committed the original names are gone.
- The pattern is lowercase-only (`--wds-[a-z0-9-]+`): a camelCase custom property like
  `--wds-myVar` gets partially rewritten (`--myVar`). All shipped Montage variables are
  lowercase, but grep the diff for partially-rewritten camelCase properties
  (`git diff | grep -E '^\+.*--[a-z0-9-]*[A-Z]'` — the class includes digits because the
  rename pattern does: `--wds-my2Var` also comes out partially rewritten) and REPAIR
  them in this step — rename the
  declaration and every usage consistently to the consumer's intended post-migration
  name. This step owns the fix; M3's note is only a safety net.
- Card sub-component variables come out as **intermediate names**: `--wds-card-content-item-*`
  → `--card-content-item-*`, which v4 core does NOT ship (it ships `--card-row-*`). The
  manual rename `--card-content-item-*` → `--card-row-*` (manual step M4) only works AFTER
  this step — this is a hard ordering constraint.
- Dynamically built names (`'--wds-' + name`, `` `--wds-${x}` ``) are not matched → manual M3.

Post-step verification: `grep -rn -- "--wds-" <targets>` — remaining hits should only be
dynamically-built names (manual M3).

## Step 4 — `dom-identifier-migration`

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
  (analytics event names, doc strings) get rewritten too. Review the diff and REVERT
  non-identifier rewrites: a renamed analytics event name is a silent production-behavior
  change. Route ambiguous strings to the user before this step's commit — no later scan
  covers them.
- Renames attribute NAMES only, never VALUES: `wds-component="card-content"` becomes
  `data-component="card-content"`; the value rename `card-content` → `card-body` is manual
  step M4. Keep M4 after this step so the selectors you edit already carry the `data-`
  prefix — a soft preference, not a hard constraint: the transform is a blind substring pass
  over the attribute name and does not depend on the value, and M4's own scans (`card-content`,
  `--card-content-item-`) match before and after. The one HARD constraint here is step 3
  before M4's `--card-content-item-*` → `--card-row-*` rename.

Post-step verification: `grep -rn -E "wds-(component|ignore-|region-manager)" <targets>` —
remaining hits should only be dynamically-built strings (manual M3).

## Step 5 — `list-card-migration`

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
  together with any new counterpart, using the subset of the rename surface that can produce
  a duplicate specifier: every
  `\bCard(List|Content)`-prefixed value or Props type (`CardContent`, `CardContentItem`,
  `CardListContent`, their `*Skeleton` and `*Props` forms, `CardList`,
  `CardListSkeleton`) against the new names (`ListCard*`, `CardBody*`, `CardRow*` and
  their Props). That subset is sufficient: the `CardThumbnail*` / `CardTitle*` /
  `CardCaption*` family only renames when a `CardList` / `CardListSkeleton` import is
  present, which the pattern already matches, so it is covered transitively. The nine
  GLOBAL_RENAMES entries (`CardList*`, `CardContent*Props`) fire unconditionally; the
  context-sensitive ones fire whenever their tree root is present — either way an old/new
  pair in one file produces a duplicate specifier. Clean them up first. Concrete two-pass
  check (mirrors step 6's style):

  ```sh
  # files referencing an OLD Card name AND a NEW counterpart — every hit is mixed
  comm -12 \
    <(grep -rlE '\bCard(List|Content)' <targets> | sort) \
    <(grep -rlE '\b(ListCard|CardBody|CardRow)' <targets> | sort)
  ```

  For the same-old-name-twice case, list aliased imports of the rename surface and
  inspect each hit's file for a second (plain) specifier of the same name:

  ```sh
  grep -rnE "\bCard(List|Content|Thumbnail|Title|Caption)\w* as \w+" <targets>
  ```

  **False-positive triage before aborting.** Both greps are name-based, so they also match a
  locally defined or third-party `CardBody` / `CardRow`, and hits in `.md` / `.snap` / `.css`
  files. For each flagged file confirm that BOTH the old and the new name resolve to an
  import from `@montage-ui/core` or `@wanteddev/wds`; if not, it is NOT a mixed file — drop
  it from the list and note it. Skipping this triage deadlocks the phase: there is nothing to
  clean up in a false positive, so every re-run aborts identically.
  Abort on BOTH surviving classes — genuine old/new pairs AND same-old-name-twice
  (plain + aliased) files: each needs its own cleanup (below) before the codemod may run.

  **Cleanup remediation**
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
them by hand now, as part of this step. Before fixing a hit, confirm the identifier
actually comes from a montage source (a namespace/subpath/re-export of
`@montage-ui/core` / `@wanteddev/wds`): a same-named identifier defined locally or
imported from another library is NOT a migration leftover — leave it alone.

### Rename tables (v3 → v4)

Use these for every hand-fix in this step and for manual step M4 — the consumer repo has no
other source for the mapping. They mirror the transform's three maps exactly.

**Unconditional** (context-independent; components and Props types alike):

| 기존                           | 변경                    |
| ------------------------------ | ----------------------- |
| `CardList`                     | `ListCard`              |
| `CardListContent`              | `ListCardContent`       |
| `CardListSkeleton`             | `ListCardSkeleton`      |
| `CardListProps`                | `ListCardProps`         |
| `CardListContentProps`         | `ListCardContentProps`  |
| `CardListSkeletonProps`        | `ListCardSkeletonProps` |
| `CardContentProps`             | `CardBodyProps`         |
| `CardContentItemProps`         | `CardRowProps`          |
| `CardContentItemSkeletonProps` | `CardRowSkeletonProps`  |

**Inside a `Card` / `CardSkeleton` tree** (also the fallback when the context is
undeterminable — including non-JSX identifier references):

| 기존                      | 변경              |
| ------------------------- | ----------------- |
| `CardContent`             | `CardBody`        |
| `CardContentItem`         | `CardRow`         |
| `CardContentItemSkeleton` | `CardRowSkeleton` |

**Inside a `CardList` / `CardListSkeleton` tree** (post-rename: a `ListCard` tree):

| 기존                      | 변경                        |
| ------------------------- | --------------------------- |
| `CardThumbnail`           | `ListCardThumbnail`         |
| `CardThumbnailContent`    | `ListCardThumbnailContent`  |
| `CardThumbnailSkeleton`   | `ListCardThumbnailSkeleton` |
| `CardContent`             | `ListCardBody`              |
| `CardContentItem`         | `ListCardRow`               |
| `CardContentItemSkeleton` | `ListCardRowSkeleton`       |
| `CardTitle`               | `ListCardTitle`             |
| `CardCaption`             | `ListCardCaption`           |
| `CardTitleSkeleton`       | `ListCardTitleSkeleton`     |
| `CardCaptionSkeleton`     | `ListCardCaptionSkeleton`   |

`CardThumbnail*` / `CardTitle*` / `CardCaption*` are ALSO valid v4 Card-family names — they
rename only in list context, which is why the verify grep cannot chase them to zero.

## Step 6 — `form-control-migration`

Import-gated like step 5: the transform fires only on names imported from exactly
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
step 5's half-hand-migrated check:

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
# 1. record each flagged file's path + content hash (compared after the move-back)
HASHES=$(mktemp)
for f in <flagged files>; do echo "$f $(git hash-object "$f")"; done > "$HASHES"

# 2. fresh temp dir (never reuse a fixed path — stale leftovers would be moved back in)
EXCL=$(mktemp -d)

# 2b. persist a recovery record BEFORE the first mv — $EXCL and $HASHES are shell locals
#     inside one agent run, so a killed/timed-out agent would leave the user's
#     hand-migrated files in an unrecorded /var/folders path, invisible to git.
#     Reuse $HASHES from step 1 (never re-hash: a file touched between the two loops would
#     record a hash that disagrees with the move-back check). Serialize with jq, never by
#     interpolating paths into printf — a quote or backslash in a filename would corrupt
#     the record, and a corrupted record is unreadable exactly when it is needed.
mkdir -p .claude
# each $HASHES line is "<path> <40-char sha1>" — take the hash from the END so
# paths containing spaces survive
jq -Rn --arg excl "$EXCL" \
  '{excl: $excl, files: [inputs | select(length > 41) | {path: .[:length-41], hash: .[length-40:]}]}' \
  < "$HASHES" > .claude/montage-migration-v4.exclusions.json
# add it to the resolved info/exclude alongside the state file — it must never be committed
# HARD GATE: no mv may run unless the record was actually written (no `set -e` here, and a
# missing .claude/ would otherwise leave the files in an unrecorded temp dir, unrecoverable)
[ -s .claude/montage-migration-v4.exclusions.json ] || exit 1

# 3. move each flagged file out, preserving its relative path
for f in <flagged files>; do
  mkdir -p "$EXCL/$(dirname "$f")"
  mv "$f" "$EXCL/$f"
done

# 4. run the codemod on the targets as usual — <codemodVersion> is the migration's
#    recorded value from the state file, same build as every other step
npx -y @montage-ui/codemod@<codemodVersion> form-control-migration <target>

# 5. move the files back to their exact original paths
(cd "$EXCL" && find . -type f) | while read -r f; do
  mv "$EXCL/$f" "$f"
done
```

Verify the moved-back files by re-running step 1's path+hash command and diffing against
the recording (`diff "$HASHES" <(for f in <flagged files>; do echo "$f $(git hash-object "$f")"; done)`
— must be empty). Confirm the temp directory is empty before the move-out, and contains
no files after the move-back (the directory skeleton remains):
`[ -z "$(find "$EXCL" -type f)" ]`. Only then delete
`.claude/montage-migration-v4.exclusions.json`. If that file still exists at the start of
any later run, a previous exclusion never completed: restore each recorded path from
`excl` and verify its `hash` BEFORE doing anything else, and surface it to the user.

Verification note: with `autoCommit: false` a plain `git status` no-diff check on the
moved-back files is meaningless — they legitimately carry earlier steps' uncommitted
changes (at minimum step 1's import renames) and show as modified. The hash comparison
above (step 1 vs step 5) is the correct check in both modes; only under
`autoCommit: true` does "no diff" coincide with it.

Cautions:

- Global identifier rename within gated files — unrelated identifiers named `FormControl`/
  `FormField` (object keys, `styles.FormControl`) get renamed too. Review the diff.
- Namespace imports (`M.FormField`), re-exports, and subpath imports are skipped by the
  codemod — no M-section covers them; fix them by hand in this step's verification,
  WITHOUT re-running the codemod. Before fixing a hit, confirm the identifier actually
  comes from a montage source — a same-named identifier defined locally or imported from
  another library is NOT a migration leftover; leave it alone.
- New v4 API adoption (`FormControlPositiveMessage`, `FormControlMessageAccessory`,
  `size`/`labelPlacement`) must happen only AFTER this step, for the same double-swap reason.

Post-step verification (expect zero hits):
`grep -rn -E "\bForm(Field|Label|Message|ErrorMessage)" <targets>`
(prefix pattern on purpose — a `\bFormField\b` form would miss `FormFieldProps` leftovers
in gate-skipped files; the prefix form matches no new `FormControl*` name.)
This grep never matches a `FormControl*` name (`\bForm` has no word boundary inside
`FormControlMessage`), so do not add them to it and do not treat "`FormControl` is expected"
as an exception to a hit you actually see — old inner-slot `FormControl` usages are covered
by the separate namespace/subpath inspection below, not by this grep.
Hits inside the EXCLUDED files are EXPECTED: those files are
hand-migrated, so their `FormField` / `FormLabel` / `FormMessage` mentions are comments,
strings, or deliberate back-compat type aliases (`export type FormFieldProps =
FormControlProps`) — the second pre-check flags exactly that shape. Report them and never
edit an excluded file; "fixing" one silently rewrites code the user ring-fenced. The list
lives in the state file's `excludeFiles:` key — read it before judging hits, including in a
later session where the `excludeFiles` arg is no longer in scope.

One residual the main grep cannot see (step 5 has the same class of acknowledgment): in
gate-skipped files, an OLD inner-slot `FormControl` usage (e.g.
`import * as M from '@wanteddev/wds'` + `<M.FormControl>`, or a subpath import) survives
under the literal name `FormControl` — grep-indistinguishable from a correct new root,
but it means the field slot in v4 and must be renamed to `FormControlField` by hand.
Additionally inspect namespace imports of montage sources
(`grep -rnE "import \* as \w+ from ['\"](@montage-ui/core|@wanteddev/wds)['\"]"` — both
quote styles; prettier defaults to single quotes but consumer configs vary) and montage
subpath imports for `.FormControl` member usages.

## After all 6 steps

Proceed to `manual-migrations.md` (all M-sections, M1–M11), then final verification:

1. Each step's verify grep zero, with its documented exceptions (step ①:
   `@wanteddev/montage-mcp`; step ⑥: hits inside the state file's `excludeFiles`).
   Steps ②/③/④ are NOT plain zero-criterion: their leftovers are M-section-owned (M9 for ②,
   M3 for ③/④), so a Montage-related hit means that section is incomplete — reopen it. All
   three share one carve-out: a hit assessed as non-Montage code — a false positive REVERTED
   during that step's own diff review (steps ③/④ mandate those reverts, so the original
   `--wds-*` / `wds-*` names legitimately survive), or unrelated consumer code — may remain
   and is listed in the summary. Every M-section **[zero]**
   pattern zero for Montage-related hits; every **[decision]** hit assessed — [decision]
   patterns match valid v4 code and never reach zero. SKILL.md Step 3 is the canonical
   statement of these criteria; this list is a pointer, not a substitute.
2. Dependency install with the renamed `@montage-ui/*` packages succeeded.
3. Project typecheck / lint / build / tests pass.
4. Visual QA on TextField / TextArea / Modal bottom-sheet / Card list / SegmentedControl
   screens (former `variant="outlined"` in particular, see M11) and screens that used the
   deleted accent tokens (see M9) — behavioral and visual changes, not just renames.
