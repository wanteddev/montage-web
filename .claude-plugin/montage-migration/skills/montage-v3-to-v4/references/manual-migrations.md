# Manual Migrations (v3 → v4)

Changes the codemods cannot apply automatically. Run these AFTER all 7 codemod steps
completed (see `codemod-steps.md`). Each section lists scan patterns to locate affected
code — scan first, then apply fixes only where a real occurrence exists.

Scan patterns use `grep -E` syntax with `\b`/`\s`/`\w` shorthands — supported by GNU grep,
macOS BSD grep, and ripgrep alike, but ONLY OUTSIDE bracket expressions (translate the
shorthands to POSIX classes for busybox or other minimal greps). **Inside `[...]` always use
a POSIX class**: BSD/GNU `grep -E` treat `[\w.]` as the literal 3-character set
`{backslash, w, dot}`, while ripgrep's Rust regex honors `\w` there — the same pattern
silently yields different worklists per tool, which is how a scan comes back empty instead of
failing. Write `[[:alnum:]_.]` instead. Patterns beginning with `-` (e.g. `--wds-`) must be passed after
a `--` separator or via `-e` (`grep -rn -e "--wds-"`), or grep parses them as options and
exits without scanning. The patterns are line-based heuristics: multi-line JSX props and
non-literal forms (`variant={'bottom'}`, responsive objects) escape them, so treat a clean
scan as "nothing obvious", not proof of absence.

Every scan pattern carries a pass-criterion tag, used by the final verification:

- **[zero]** — must reach zero Montage-related hits once its owning phase is done. A hit
  assessed as unrelated consumer code (same substring, not a Montage API) may remain — list
  it in the final summary; NEVER edit unrelated code just to force the count to zero.
- **[decision]** — matches valid v4 code by design; the pass criterion is that every hit
  was assessed (and, where required, decided with the user) during the manual phase, not a
  zero count.

## M1. Package references outside import declarations

The `package-name-migration` codemod only rewrites `import` declaration sources in JS/TS
files — nothing else. Everything below must be updated by hand.

| 기존                           | 변경                        |
| ------------------------------ | --------------------------- |
| `@wanteddev/wds`               | `@montage-ui/core`          |
| `@wanteddev/wds-icon`          | `@montage-ui/icon`          |
| `@wanteddev/wds-nextjs`        | `@montage-ui/nextjs`        |
| `@wanteddev/wds-lottie`        | `@montage-ui/lottie`        |
| `@wanteddev/wds-codemod`       | `@montage-ui/codemod`       |
| `@wanteddev/wds-theme`         | `@montage-ui/theme`         |
| `@wanteddev/wds-engine`        | `@montage-ui/engine`        |
| `@wanteddev/wds-dummy`         | `@montage-ui/dummy`         |
| `@wanteddev/wds-brand`         | `@montage-ui/brand`         |
| `@wanteddev/eslint-plugin-wds` | `@montage-ui/eslint-plugin` |

Exception: `@wanteddev/wds-mcp` maps to `@wanteddev/montage-mcp` — it stays in the
`@wanteddev` scope (GitHub Package Registry); do not blanket-rename it to `@montage-ui/*`.

Check and update:

- `package.json` — `dependencies` / `devDependencies` / `peerDependencies` / `resolutions` / `overrides` / `pnpm.overrides`. Replace each `@wanteddev/wds*` entry with its `@montage-ui/*` counterpart at version `^4.0.0`, then run the project's package manager install to refresh the lockfile. EXCEPTION: `@wanteddev/wds-mcp` → `@wanteddev/montage-mcp` keeps its OWN version line (it is not one of the `@montage-ui/*` packages and is published to the GitHub Package Registry) — resolve it separately against the GitHub Package Registry — `npm view @wanteddev/montage-mcp version --registry=https://npm.pkg.github.com/` with the project's `@wanteddev:registry` / auth token configured in `.npmrc`; the default registry 404s for it — instead of pinning it to `^4.0.0`, which would likely be unresolvable and fail the install.
- Code the codemod cannot reach — these must already have been fixed during Step 1's
  post-step verification (they are code, not config); the scan here is a safety net, and
  any hit is a Step 1 escape:
  - `export { X } from '@wanteddev/...'` / `export * from '@wanteddev/...'` re-export barrels
  - `require('@wanteddev/...')`, dynamic `import('@wanteddev/...')`
  - `jest.mock('@wanteddev/...')` / `vi.mock('@wanteddev/...')`
  - `declare module '@wanteddev/wds'` TypeScript module augmentations
  - import declarations in `.mjs/.cjs/.mts/.cts` files (extensions the CLI never passes
    to jscodeshift)
- `@import` / `url()` package references inside stylesheets — Step 1's verification only
  scans JS/TS, so these are genuine M1 work.
- ESLint config — `@wanteddev/eslint-plugin-wds` → `@montage-ui/eslint-plugin`: legacy `extends` becomes `plugin:@montage-ui/recommended` (or `/strict`), flat config imports `montagePlugin from '@montage-ui/eslint-plugin'`, and rule prefixes become `@montage-ui/<rule>`.
- `next.config.*` — `transpilePackages`, `modularizeImports`, webpack aliases.
- Test config — `jest.config.*` / `vitest.config.*` `moduleNameMapper` / `alias` / `deps.inline` entries.
- `tsconfig.json` — `paths` mappings, `types` entries.
- `.storybook/*`, bundler aliases (webpack/vite/rspack), `.npmrc` scope config.

Scan pattern (all file types, not only JS/TS) — **[zero]**:

```
@wanteddev/(wds|eslint-plugin-wds)
```

Any remaining hit after this step is a bug — either an unrenamed `@montage-ui/*` package,
or an unrenamed `@wanteddev/wds-mcp` (which the pattern also matches and which must become
`@wanteddev/montage-mcp`, NOT `@montage-ui/*`). Only the post-rename
`@wanteddev/montage-mcp` legitimately escapes the pattern.

## M2. Theme tokens now return `var(--...)` strings

`theme.primitive`, `theme.opacity`, `theme.spacing`, `theme.radius`, `theme.dimension`,
`theme.zIndex` return `var(--...)` strings instead of raw values (`'16px'`, `0.88`, `1300`).
Usage inside CSS contexts (template literals, inline style objects) keeps working — **only
JS arithmetic on the raw value breaks**, returning `NaN` or string concatenation garbage.

`theme.breakpoint` is NOT converted (CSS variables cannot be used in `@media` queries) —
leave media-query code untouched.

Scan patterns (`.ts`/`.tsx`/`.js`/`.jsx`) — all **[decision]** (they locate candidates
for arithmetic breakage; each hit needs inspection, not deletion):

```
parse(Int|Float)\(\s*theme\.
theme\.(spacing|radius|dimension|primitive)\[[^]]+\]\s*[-+*/]
theme\.opacity\[[^]]+\]\s*[-+*/]
theme\.zIndex\.\w+\s*[-+*/]
[-+*/]\s*theme\.(spacing|radius|dimension|opacity|primitive)\[
[-+*/]\s*theme\.zIndex\.
```

Also review destructured/aliased usages the patterns above miss (e.g.
`const { spacing } = theme` followed by `parseInt(spacing[16])`). Locate the
destructuring sites with (**[decision]**, like every M2 pattern):

```
const\s*\{[^}]*\b(spacing|radius|dimension|opacity|zIndex|primitive)\b[^}]*\}\s*=\s*[[:alnum:]_.]*[Tt]heme
```

(the POSIX `[[:alnum:]_.]*` tail — NOT `[\w.]*`, which BSD/GNU `grep -E` read as the literal
set `{backslash, w, dot}` and which therefore matches only a bare `theme` base — also matches
`props.theme`, `this.props.theme`, and `useTheme()` bases, verified under BSD grep; an alias
whose name does not end in `theme` still escapes, so treat the scan as a heuristic) then
inspect each file for arithmetic on the destructured names.

Fixes:

- CSS-computable arithmetic → `calc()` (`var()` works inside `calc`):

  ```ts
  // AS-IS
  const half = parseInt(theme.spacing[16]) / 2;
  style={{ width: parseInt(theme.dimension[40]) - 4 }}
  style={{ zIndex: theme.zIndex.modal + 1 }}
  opacity: ${theme.opacity[88] * 0.5};

  // TO-BE
  const half = `calc(${theme.spacing[16]} / 2)`;
  style={{ width: `calc(${theme.dimension[40]} - 4px)` }}
  style={{ zIndex: `calc(${theme.zIndex.modal} + 1)` }}
  opacity: calc(${theme.opacity[88]} * 0.5);
  ```

- Genuinely needs a JS number (measurements, non-CSS APIs, chart libs) → import raw values:

  ```ts
  import { lightOriginTheme } from '@montage-ui/core';

  lightOriginTheme.spacing[16]; // '16px' — raw value
  ```

  One import is enough: `lightOriginTheme` and `darkOriginTheme` share the exact same
  `opacity` / `primitive` / `spacing` / `radius` / `dimension` / `zIndex` objects (only
  `semantic` differs), so never branch on the active theme for these six groups.

- `rgba(0, 0, 0, ${theme.opacity[43]})` and `addOpacity(color, theme.opacity[N])` keep
  working as-is — the alpha slot of `rgba()` resolves `var()` fine. No change needed.
- React inline style `zIndex` is now a string. Props typed `zIndex: number` need widening
  to `number | string` or a raw-value fallback. Scan **[decision]**: `zIndex` props on
  custom components fed from `theme.zIndex.*`.

## M3. CSS variable / DOM identifier leftovers

The `css-variable-migration` and `dom-identifier-migration` codemods rewrite string
literals, template literals, and stylesheets. They cannot rewrite:

- Dynamically built names whose static part is exactly `--wds-`: `` `--wds-${name}` ``,
  `'--wds-' + name`, `el.style.setProperty('--wds-' + key, v)`. Careful: a LONGER static
  head IS rewritten (`` `--wds-card-${x}` `` → `` `--card-${x}` ``), and a split grid
  token like `'--wds-column-' + 'spacing'` gets wrongly stripped to `--column-spacing`
  instead of `--grid-column-spacing` — review every dynamic construction site.
- Selectors living outside the transformed directories: E2E specs (Playwright/Cypress),
  snapshot files, CSS-in-JS in other packages, HTML files, styled-components in `.md`/MDX.
  The same out-of-target class exists for the IDENTIFIER renames of steps ⑤/⑥ (a `CardList`
  or `FormField` reference in an E2E spec or snapshot outside `<targets>`): M4 owns the
  Card/ListCard ones, M5 the Form ones — run those sections' scans over the whole repo, not
  just the targets.
- Dynamically built DOM-identifier strings whose static part stops short of a full token:
  `'wds-' + kind`, `` `wds-ignore-${x}` `` — review every dynamic construction site, same
  as the `--wds-` case above. The full-token [zero] scans below do not reach the
  shortest-head form; locate it with **[decision]**: `["']wds-["'] *\+` and
  ``\`wds-[^\`]*\$\{`` (expect noise from unrelated `wds-` strings; assess each hit).
- camelCase custom properties: the rename pattern is lowercase-only, so `--wds-myVar` comes
  out partially rewritten as `--myVar`. The diff review for these is owned by step 3's
  (`css-variable-migration`) post-step verification (where the diff is at hand); this note
  is a safety net — if step 3's diff was never reviewed, grep it now. Because the partially
  rewritten name no longer contains `wds`, none of the [zero] patterns below reach it; scan
  the repo instead with **[decision]**: `--[a-z0-9-]*[A-Z]` (stylesheets and JS/TS; digits
  included, since `--wds-my2Var` breaks the same way) and, for each hit, confirm the
  declaration and every usage agree on one name. Expect heavy noise: the pattern matches
  every legitimately camelCase custom property, Montage's own `--zIndex-*` theme variables
  included. Only a name whose declaration and usages DISAGREE is a real hit — a consistent
  camelCase variable is valid code and must not be renamed to force the scan quiet.

False-positive review of the codemod diff (blind substring replacement rewrites unrelated
strings — analytics event names, documentation strings, consumer-defined `--wds-*`
variables) is OWNED by steps 3/4's (`css-variable-migration` / `dom-identifier-migration`)
post-step verification, where the diff is at hand; the note here is a safety net for
inline runs that skipped it — if the step 3/4 commits were never diff-reviewed, do it now.

Scan patterns (all file types) — all **[zero]** once M3's renames are applied:

```
--wds-
wds-component
wds-ignore-first-focus
wds-ignore-dismissable-layer
wds-region-manager
```

Rename rules for anything found:

| 기존                                                 | 변경                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| `--wds-column-spacing` / `--wds-row-spacing` (grid)  | `--grid-column-spacing` / `--grid-row-spacing`               |
| all other `--wds-*`                                  | drop the `--wds-` prefix (`--wds-x` → `--x`)                 |
| `wds-component` attribute                            | `data-component`                                             |
| `wds-ignore-first-focus`                             | `data-ignore-first-focus`                                    |
| `wds-ignore-dismissable-layer`                       | `data-ignore-dismissable-layer`                              |
| `#wds-region-manager` / `#wds-region-manager-bottom` | `#montage-region-manager` / `#montage-region-manager-bottom` |

## M4. Card / ListCard follow-ups

The `list-card-migration` codemod resolves Card vs ListCard context from the nearest JSX
ancestor. Two classes of usage need manual review:

- **Non-JSX identifier references** (`component={CardContent}`, `React.createElement(CardContent)`,
  maps of components): context cannot be inferred, so the codemod converts to the Card-family
  name (`CardBody`). If the value is actually rendered inside a `ListCard`, replace with the
  `ListCard*` equivalent (`ListCardBody`, `ListCardRow`, ...) by hand.
  Scan **[decision]**: `\bCard(Body|Row|Title|Caption|Thumbnail)\w*` used outside JSX tags
  in files that also render `ListCard`. The `\b` anchor is required — unanchored, the
  pattern matches inside `ListCardBody` / `ListCardRow` too, so every correct
  post-migration name in the scanned files comes back as a hit and buries the real ones.
- **Cross-file context**: a child-component file that imports only Card sub-components (no
  `ListCard` import in the same file) is converted to Card-family names even when a parent
  file mounts it inside a `ListCard`. Review shared child components rendered inside
  `ListCard` and switch them to `ListCard*` names by hand. Concrete procedure
  (**[decision]**):
  1. `grep -rlE '\bCard(Body|Row|Title|Caption|Thumbnail)'` over the whole repo (M-section
     scans are repo-wide; `<targets>` would miss importers living outside the transformed
     directories) minus the files that also match `\bListCard` — these are Card-family-only
     files.
  2. For each such file's exported component, grep for its importers; flag any importer
     that renders `ListCard` around the imported component — those usages need the
     `ListCard*` names.

  Use the **Rename tables (v3 → v4)** at the end of step 5 in `codemod-steps.md` for every
  hand-rewrite here — the consumer repo has no other source for the old→new mapping, and
  the Card-family and ListCard-family names differ per context.

- **DOM identifiers of renamed sub-components** (selectors in CSS/tests/E2E):

  ```
  data-component="card-content"               → data-component="card-body"
  data-component="card-content-item"          → data-component="card-row"
  data-component="card-content-item-skeleton" → data-component="card-row-skeleton"
  --card-content-item-*                       → --card-row-*
  ```

  Scan patterns **[zero]**: `card-content` and `--card-content-item-` (`card-content` is
  a bare substring — consumer code coincidentally containing it is the unrelated-hit case
  the [zero] definition allows to remain).

- **Old Card names outside the transformed directories** (E2E specs, snapshots, MDX,
  CSS-in-JS in other packages): the codemod never saw them, so they still carry v3 names.
  Scan **[zero]** over the WHOLE repo, not just `<targets>`: `\bCard(List|Content)` — the
  same pattern step ⑤ verifies with, plus the montage-source confirmation caveat (a locally
  defined or third-party name is not a leftover). Rewrite hits against the rename tables in
  `codemod-steps.md` step 5.
  Note: after `dom-identifier-migration`, old `wds-component="card-content"` selectors have
  become `data-component="card-content"` — this step renames the _value_ part.

## M5. FormControl follow-ups

- **Old Form names outside the transformed directories** (E2E specs, snapshots, MDX,
  CSS-in-JS in other packages): the codemod never saw them.
  Scan **[zero]** over the WHOLE repo, not just `<targets>`:
  `\bForm(Field|Label|Message|ErrorMessage)` — step ⑥'s verify pattern, plus the
  montage-source confirmation caveat. Apply the step ⑥ rename table by hand; never re-run
  the codemod to reach them. **This section owns only the hits OUTSIDE `<targets>`** — in-target
  gate-skipped hits were already fixed during step ⑥'s verification. And because the pattern is
  step ⑥'s, it also reaches the files ring-fenced in the state file's `excludeFiles`: hits there
  are EXPECTED (hand-migrated files legitimately mention the old names in comments, strings, or
  back-compat type aliases) — list them in the summary and NEVER edit an excluded file. Read
  `excludeFiles` from the state file before judging any hit.
- Message typography changed from `label2` to `caption1`. Code that passed explicit
  `variant` / `weight` to `FormMessage` / `FormErrorMessage` (now `FormControlMessage` /
  `FormControlNegativeMessage`) may fight the new default — review each occurrence.
  Scan **[decision]**: `FormControl(Message|NegativeMessage)\b[^><]*\b(variant|weight)=` (the `[^><]`
  class stops at a nested element, so the recommended new API —
  `accessory={<FormControlMessageAccessory ... variant="character-counter" />}` — does
  NOT match; trade-off: a legacy line whose earlier prop embeds a JSX element before
  `variant=` is missed, acceptable under the line-based-heuristics caveat above).
- New API available (informational, no action required): `FormControlPositiveMessage`,
  `FormControlMessageAccessory` (passed via the message components' `accessory` prop;
  `variant="character-counter"` by default), root `size` (`'large' | 'medium'`) and
  `labelPlacement` (`'top' | 'leading'`) props.

## M6. Modal (bottom sheet) behavior change

`variant="bottom"` + `handle` behavior changed:

- ESC / handle swipe-down / dimmer click now **close the sheet immediately** unless
  `ModalContainer` has `peekHeight` set. Previously the sheet pinned to the bottom.
- To keep the old pin-to-bottom behavior, set `peekHeight` on `ModalContainer`.
- `onVisibilityChange` was removed — the workaround of calling `onClose` inside it is no
  longer needed; delete the prop and rely on the new default.

Scan patterns: `onVisibilityChange` **[zero]** (the prop is removed) and
`variant="bottom"` **[decision]** (still the correct v4 prop — hits only locate the
bottom-sheet Modals whose dismiss behavior needs a decision).

For each bottom-sheet Modal, decide: default close-on-dismiss (delete workaround code) or
`peekHeight` (restore pinning).

## M7. TextField changes

- **`size` prop introduced** (`'large'` default, `'medium'` = 40px height). The former
  single size maps to Large, but Large's details changed: radius 12→14px, input typography
  body1→body2, icon 22→20px. Code that hard-coded a 40px height should switch to
  `size="medium"`. Visual QA recommended on all TextField/DatePicker/TimePicker screens.
  Scan **[decision]**: `\bTextField[^>]*height=` for the hard-coded heights, plus
  `\bTextField(Button|Content)?\b` file-level to locate the usages the line greps in this
  section miss (the alternation is required — `\bTextField\b` alone matches neither
  `TextFieldButton` nor `TextFieldContent`).
- **`TextFieldButton` `variant` prop removed** (was `"normal" | "assistive"`). Delete the
  prop. The trailing button now renders inside the field.
  Scan **[zero]**: `TextFieldButton[^>]*variant=`.
- **`TextFieldContent` `variant="text-button"` removed**. Replace with another variant.
  Scan **[zero]**: `TextFieldContent[^>]*variant="text-button"` (do NOT scan the bare
  substring `text-button` — v4 TextButton still legitimately renders
  `data-component="text-button"` and `data-role="text-button-loading"`, so bare-substring hits
  on those selectors are valid v4 code; and do not scan the unanchored `variant="text-button"`
  either — `SelectContent` lost the same value but belongs to M12, whose replacement is
  `variant="custom"` plus your own `sx`, not another TextField variant).
- **Negative-state trailing icon removed** — the circle-exclamation icon no longer renders.
  Code compensating for its width can be simplified.
- **`[data-role='text-field-wrapper']` styling moved** — `padding` and inset `box-shadow`
  now live on the TextField root. Custom styles targeting the wrapper must move to the root
  element (`sx` or root selector).
  Scan **[decision]**: `text-field-wrapper`.

## M8. TextArea changes

- **`TextAreaContent` variant renames**: `variant="badge"` → `variant="content-badge"`,
  `variant="chip"` → `variant="custom"`. The full v4 set is `custom` | `button` |
  `content-badge` | `icon` | `icon-button` | `primary-icon-button` | `segmented-control`.
  Only `content-badge`, `primary-icon-button` and `segmented-control` are NEW —
  `custom` / `button` / `icon` / `icon-button` all existed in v3 (`icon-button` merely
  became the default, see below), so seeing one in the codebase is not evidence of a
  migration.
  Scan **[zero]**: `TextAreaContent[^>]*variant="(badge|chip)"`.
- **`variant="characterCounter"` removed** — the character counter no longer renders
  inside the TextArea bottom area. Replace with `FormControlMessageAccessory` passed via
  the `accessory` prop of `FormControlMessage` / `FormControlNegativeMessage` /
  `FormControlPositiveMessage` (see M5). The old API tracked the current input length
  internally (children = max length, rendered `{length}/{maxLength}`); the new accessory
  takes `length` and `maxLength` props — the consumer must supply the current length,
  which requires a controlled TextArea (`value` / `onChange`).
  Scan **[zero]**: `characterCounter` (camelCase only — the new accessory's
  `variant="character-counter"` is kebab-case and must NOT match).
- **Default variant changed** from `characterCounter` to `icon-button` — a
  `<TextAreaContent>` WITHOUT an explicit `variant` was a character counter in v3 and
  must migrate to `FormControlMessageAccessory` too; the scan above misses it.
  Scan **[decision]**: `\bTextAreaContent\b` file-level, then review every JSX usage for
  a missing `variant` (multi-line props escape line greps).
- **`size` prop introduced** (`'large'` default, `'medium'`). The former single size maps
  to Large, but Large's details changed: radius 12→14px, input typography
  body1-reading→body2-reading, icon 22→20px. Visual QA recommended on TextArea screens.
  Scan **[decision]**: `\bTextArea[^>]*height=` plus `\bTextArea(Content)?\b` file-level — the
  `TextAreaContent` scan above finds no plain `<TextArea>` at all, so without this one the size
  decision has no worklist.
- **Invalid-state icon removed** — the bottom-area icon (`data-role='text-area-invalid'`)
  no longer renders; code compensating for it can be simplified.
- **Bottom-area DOM restructured** — character-counter `data-role`s
  (`text-area-content-character-counter-length` / `-divider` / `-max-length`) are gone;
  custom CSS targeting them or the bottom-area structure must be reworked.
  Scan **[zero]**: `text-area-(content-character-counter|invalid)` (include stylesheets —
  these data-roles are removed).
  Scan **[decision]**: `text-area-bottom-area` — the wrapper itself still exists in v4;
  only hits styling its INTERNAL structure need rework, a hit on the wrapper alone is a
  probable false positive.

## M9. Semantic token follow-ups

The `semantic-token-migration` codemod (step 2) rewrites every literal old-token
reference in JS/TS plus the `--semantic-*` variable form in stylesheets, but six
classes of work remain. The full old→new rename tables are bundled at the end of this
section — use them for every hand-rewrite (do not look for the design-system repo's
MIGRATION.md; it does not exist in the consumer repo).

- **`primary.normal` used as a text/icon color**: the codemod always emits
  `surface.brand.primary` (the guide-table mapping). Where the token is consumed as a
  foreground color (`color:`, `caret-color:`, SVG `fill`/`stroke`, Typography-like
  `color` props), switch to `foreground.brand.primary` — the VALUE is identical, only
  the property/intent classification changes, so this is safe to apply mechanically once
  the usage is confirmed to be foreground.
  Scan **[decision]**: `semantic\.surface\.brand\.primary` and
  `--semantic-surface-brand-primary` (matches valid v4 code by design — assess each hit's
  CSS property / prop context; background, border, and tint usages stay as `surface`).
- **Deleted accent tokens replaced with `foreground.*` tokens**: the codemod maps
  `accent.foreground.red/redOrange/orange/green/blue` and `accent.background.redOrange`
  to `foreground.negative.strong` / `foreground.cautionary.primary` /
  `foreground.positive.primary` / `foreground.brand.primary`. Where the ORIGINAL token
  painted a background (the `accent.background.redOrange` case, or an
  `accent.foreground.*` misused as a fill), a foreground token is the wrong intent —
  pick a `surface.*` token with the user (e.g. `surface.cautionary.primary`,
  `surface.accent.*`). Replacement values also differ from the originals (redOrange
  collapses into orange; orange/green/blue land on different steps) — recommend visual
  QA on screens that used them.
  Scan **[decision]**: `background[^;]*semantic\.foreground\.` (a foreground token as a
  background base is the suspect shape; multi-line declarations escape this — also
  review the step 2 diff hunks that touched the deleted tokens).
- **Group-level references and root-object aliases**: passing or iterating a token
  GROUP object (`theme.semantic.label`, `Object.entries(theme.semantic.accent.background)`)
  is never converted — the transform requires a full leaf path. Neither is an alias or
  destructure of the semantic ROOT (`const sem = theme.semantic; sem.label.normal`,
  `const { label } = theme.semantic`) — the chain no longer passes through a `semantic`
  anchor at the usage site. Rewrite against the rename tables below.
  Scan **[zero]**: the two step-2 verification greps in `codemod-steps.md` (old dot-path
  and old CSS-variable patterns) — after this section every Montage-token hit must be gone;
  step 2's verification only REPORTS these, M9 owns the fix. Standard [zero] semantics apply:
  a hit assessed as non-Montage code (a false positive reverted during step 2's diff review,
  an unrelated object or string) may remain and is listed in the final summary.
  Scan **[decision]**: `\.semantic([^.[:alnum:]]|$)` — locates root-object aliasing and
  destructuring sites (`= theme.semantic;`, `(theme.semantic)`) without matching normal
  `theme.semantic.<group>` chains; trace each alias/destructured name to its leaf usages
  and rewrite them.
- **Dynamically built names and computed access**: `` `--semantic-${x}` ``,
  `'semantic.' + path`, `semantic['label']['normal']` are never matched. Rewrite by
  hand against the rename tables below.
  Scan **[decision]**: `["']--semantic-["'] *\+` and ``\`--semantic-[^\`]*\$\{`` (CSS
  variable construction, either quote style), `["']semantic\.["'] *\+` and
  ``\`semantic\.[^\`]*\$\{`` (dot-path construction), and `semantic\[` (computed
  access — also matches unrelated consumer objects named `semantic`; assess each hit).
- **Dot-path token strings inside stylesheets**: the stylesheet text pass renames only
  the `--semantic-*` CSS-variable form; a `semantic.<old-path>` dot string inside
  `.css/.scss/.sass/.less` (rare — usually content/comments) is untouched and surfaces
  through the step-2 verification grep above. Fix per the rename tables below.
- **Old tokens living outside the transformed directories** (mirrors M3's equivalent class):
  E2E specs (Playwright/Cypress), snapshot files, CSS-in-JS in other packages, HTML files,
  styled-components in `.md`/MDX. The codemod only touches the target directories, so these
  keep their v3 names silently. Run the two step-2 greps over the WHOLE repo (minus
  `.git`/node_modules/build output), not just `<targets>`, and rewrite the hits by hand
  against the rename tables below.

### Rename tables (v3 → v4)

The codemod's full rename map, reproduced here so hand-rewrites never depend on files
outside the consumer repo. Dot paths are relative to `semantic.`; the CSS-variable form
is derived mechanically — `--semantic-` + the path with dots replaced by dashes,
camelCase kept (`accent.foreground.lightBlue` → `--semantic-accent-foreground-lightBlue`),
and any `-rgb` suffix carried over unchanged. `semantic.static.*`,
`semantic.elevation.*`, `semantic.platform.*`, and `atomic.*` are unchanged.

| 기존 (v3)                                                    | 변경 (v4)                                                                                       |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `label.normal` / `.strong`                                   | `foreground.neutral.primary` / `.strong`                                                        |
| `label.neutral` / `.alternative` / `.assistive`              | `foreground.neutral.secondary` / `.tertiary` / `.quaternary`                                    |
| `label.disable`                                              | `foreground.disable.primary`                                                                    |
| `status.positive` / `.cautionary` / `.negative`              | `foreground.positive.primary` / `foreground.cautionary.primary` / `foreground.negative.primary` |
| `inverse.label`                                              | `foreground.neutral.inverse`                                                                    |
| `inverse.primary`                                            | `foreground.brand.inverse`                                                                      |
| `inverse.background`                                         | `surface.neutral.inverse`                                                                       |
| `interaction.inactive`                                       | `foreground.inactive.primary`                                                                   |
| `interaction.disable`                                        | `surface.disable.primary`                                                                       |
| `primary.normal` / `.strong` / `.heavy`                      | `surface.brand.primary` / `.strong` / `.heavy`                                                  |
| `fill.normal` / `.strong` / `.alternative`                   | `surface.neutral.secondary` / `.strong` / `.tertiary`                                           |
| `material.dimmer`                                            | `effect.dimmer.primary`                                                                         |
| `background.normal.normal` / `.alternative`                  | `background.neutral.primary` / `.secondary`                                                     |
| `background.elevated.normal` / `.alternative`                | `surface.elevated.primary` / `.secondary`                                                       |
| `background.transparent.normal` / `.alternative`             | `effect.transparent.primary` / `.secondary`                                                     |
| `background.status.{negative,cautionary,positive}`           | `surface.{negative,cautionary,positive}.primary`                                                |
| `accent.foreground.{lime,cyan,lightBlue,violet,purple,pink}` | `foreground.accent.{동일 키}`                                                                   |
| `accent.foreground.red`                                      | `foreground.negative.strong`                                                                    |
| `accent.foreground.redOrange` / `.orange`                    | `foreground.cautionary.primary`                                                                 |
| `accent.foreground.green`                                    | `foreground.positive.primary`                                                                   |
| `accent.foreground.blue`                                     | `foreground.brand.primary`                                                                      |
| `accent.background.{lime,cyan,lightBlue,violet,purple,pink}` | `surface.accent.{동일 키}Opaque`                                                                |
| `accent.background.redOrange`                                | `foreground.cautionary.primary`                                                                 |
| `line.normal.normal` / `.neutral` / `.alternative`           | `line.neutral.primary` / `.secondary` / `.tertiary`                                             |
| `line.solid.normal` / `.neutral` / `.alternative`            | `line.neutral.primaryOpaque` / `.secondaryOpaque` / `.tertiaryOpaque`                           |
| `line.primary.normal` / `.strong`                            | `line.brand.primary` / `.strong`                                                                |
| `line.status.negative.normal` / `.strong`                    | `line.negative.primary` / `.strong`                                                             |
| `line.status.cautionary.normal`                              | `line.cautionary.primary`                                                                       |
| `line.status.positive.normal`                                | `line.positive.primary`                                                                         |

## M10. ThemeProvider theme storage moved to cookie

`ThemeProvider` dropped its `next-themes` dependency for an in-house cookie-backed
implementation (localStorage is origin-scoped, so themes could not be shared across
subdomains). Reading still happens in a blocking inline script before first paint, so
SSG/SSR strategy and the no-flash behavior are unchanged.

**No source change is required for the common case** — `<ThemeProvider enableDarkMode />`
keeps working as-is. The items below are what does break, plus one new opportunity.

- **`storageKey` prop removed** → `cookie={{ key }}`. The default storage key also changed
  from `theme` to `montage-theme`.
  Scan **[zero]**: `storageKey`. Heuristic — a consumer's own storage utility can share the
  name; assess each hit and only rewrite the one passed to Montage's `ThemeProvider`.
  **Check the key's characters while transplanting it.** `cookie.key` must be an RFC 6265
  cookie name — alphanumerics plus ``!#$%&'*+-.^_`|~`` — and v4 REJECTS anything else with a
  console error, silently falling back to `montage-theme`. A localStorage key containing `:`,
  `/`, `@`, `=`, a space, or an empty string compiles, passes this [zero] scan, and then fails to
  persist the theme at runtime. Rename such keys to a token-safe form (`app:theme` →
  `app-theme`) as part of the move.

  ```tsx
  // AS-IS
  <ThemeProvider enableDarkMode storageKey="app-theme" />
  // TO-BE
  <ThemeProvider enableDarkMode cookie={{ key: 'app-theme' }} />
  ```

- **Direct `next-themes` usage breaks silently.** In v3 `ThemeProvider` rendered
  next-themes' provider internally, so calling next-themes' `useTheme` from consumer code
  worked. In v4 nothing connects them: the hook throws no error and returns `undefined`
  values, so this fails at runtime with no type error and no console warning.
  Scan **[decision]**: `next-themes` (covers imports and the `package.json` dependency).
  **Do not rewrite hits blindly** — first determine which provider each `useTheme()` call
  resolved against:
  - Bound to Montage's `ThemeProvider` (the app has no next-themes provider of its own, or
    the call sits under Montage's) → replace with `useThemeControl` from `@montage-ui/core`
    and map the fields: `resolvedTheme` → `theme` (resolved `'light' | 'dark'`), and the
    user's raw choice → `themeOriginValue` (`'light' | 'dark' | 'system' | undefined`).
    Note `setTheme` accepts only those three values in v4.
    `useThemeControl()` returns EXACTLY `{ theme, themeOriginValue, setTheme }` — next-themes'
    `systemTheme`, `themes`, and `forcedTheme` have no equivalent. A destructure of any of
    them is a per-occurrence decision for the user, not a mechanical rewrite: `systemTheme`
    can be re-derived from `window.matchMedia('(prefers-color-scheme: dark)')` (client-side
    only), `themes` is the fixed `['light', 'dark']` list, and `forcedTheme` has no
    replacement — an app relying on it must be reworked, not remapped.
  - Bound to the app's own `<NextThemeProvider>`, rendered independently of Montage → leave
    it alone. Those calls still work, and the `next-themes` dependency stays.

  Drop the `next-themes` dependency only once no independent usage remains.

  ```tsx
  // AS-IS
  import { useTheme } from 'next-themes';
  const { resolvedTheme, theme, setTheme } = useTheme();
  // TO-BE
  import { useThemeControl } from '@montage-ui/core';
  const { theme, themeOriginValue, setTheme } = useThemeControl();
  ```

- **Cross-subdomain sharing is now possible** via `cookie={{ domain: '.example.com' }}`.
  Omitting `domain` leaves the attribute unset — a host-only cookie, the correct default for
  a single-host app. Like the old localStorage it does not reach sibling subdomains, but the
  scopes are not identical: cookies ignore the port (localStorage is per origin, so
  `:3000` and `:4000` were separate stores), are scoped by `path`, and ride along on every
  request to the host. The value must be a registrable domain; a public suffix (`co.kr`,
  `com`) makes the browser reject the cookie.
  Scan **[decision]**: `<ThemeProvider` — per app, decide whether it should share a theme
  with sibling subdomains, and whether to pass `nonce` (new prop; applies to the theme
  inline script and ScrollArea's injected inline styles) if the project uses CSP.

  **When `domain` is adopted, every app under that root domain must use the SAME `key`,
  `domain`, and `path`.** A host-only cookie and a `Domain=`-scoped one of the same name
  are separate cookies that coexist, `document.cookie` exposes no `Domain` attribute to
  tell them apart, and the order is no help either — RFC 6265 §4.2.2 says not to rely on it
  when two cookies share a name, and browsers differ (Chrome moves a cookie to the end when
  its value changes, so reading the first entry always yields the stale one; Safari has been
  reported to put the more specific cookie first). The symptom is "the theme does not
  persist": toggling repaints, reloading reverts, refocusing the tab reverts — no error, no
  warning.
  `ThemeProvider` deletes a same-named host-only cookie before reading whenever `domain`
  is set, so a host-only-first → `domain`-later rollout self-heals (at the cost of one
  theme reset for users who only had the host-only cookie). It cannot heal a MIXED setup —
  an app left without `domain` has no basis to delete its own host-only cookie while a
  sibling's domain cookie shadows it. Verify the configs match across the whole subdomain
  family; this is a review item, not something a scan can catch.

- **End users' stored theme resets once** on the release that ships v4 — no localStorage
  fallback is read. Nothing to fix in code; call it out in the release notes and expect
  the first load after deploy to follow the system theme (or light when `enableDarkMode`
  is off).

## M11. SegmentedControl changes

- **`variant` prop removed** (was `"solid" | "outlined"`). Delete the prop — solid is the
  only form. There is NO replacement for `outlined`: its transparent background + outer
  border, per-item dividers, and brand-tinted active item are gone, and the active item now
  renders the solid white thumb WITH the sliding animation `outlined` never had. Every
  `outlined` occurrence is a visual change requiring QA, not a mechanical delete.
  Scan **[zero]**: `SegmentedControl[^>]*variant=` (multi-line props escape it — pair with
  the file-level scan below).
- **`SegmentedControlItem` `leadingContent` → `leadingIcon`** (mechanical rename), and
  **`trailingContent` removed** with no replacement — move that content into `children` or
  drop it.
  Scan **[zero]**: `SegmentedControlItem[^>]*(leadingContent|trailingContent)=`. Do NOT
  scan the bare `leadingContent` / `trailingContent` substrings — TextField, TextArea, and
  ListCell keep those props in v4, so bare hits are valid v4 code.
  Scan **[decision]**: `\bSegmentedControl(Item)?\b` file-level, then review every JSX usage
  for a `variant` / `leadingContent` / `trailingContent` prop the line greps missed. The
  `(Item)?` group is required — `\bSegmentedControl\b` alone does NOT match
  `SegmentedControlItem` (the trailing `\b` fails before `I`), so a file that renders only
  items would be skipped entirely.
- **`iconOnly` prop added** — the icon-only form is no longer "an item whose only child is
  an icon". Usages that rendered icons without a text label must set `iconOnly` on the ROOT
  and pass the icon as the item's `children`, plus an `aria-label` per item (the text
  wrapper that carried the accessible name is not rendered in this mode). Root width also
  becomes `fit-content` instead of `100%`, so a parent relying on the control filling its
  width needs a width of its own.
  When a `SegmentedControl` sits inside `TextAreaContent variant="segmented-control"`, that
  variant injects no sizing of its own — `iconOnly` must be set explicitly.
  Scan **[decision]**: `SegmentedControlItem[^>]*aria-label=` — an item with an aria-label
  and no text is the icon-only pattern that now needs `iconOnly` on its root.
  After M1 lands the v4 `@montage-ui/eslint-plugin`, its new
  `segmented-control-item-uses-name` rule flags missing `aria-label` on items inside an
  `iconOnly` root at lint time (`recommended`: warn, `strict`: error) — run the project's
  lint as a second net once the rename phase is done; the line greps above remain the
  primary scan (the rule only sees same-file roots and items).
- **`[data-role='segmented-control-item-text']` not rendered under `iconOnly`** — custom CSS
  targeting it applies to labeled items only.
  Scan **[decision]**: `segmented-control-item-text` (include stylesheets).
- **Size details changed** (heights unchanged at 32 / 40 / 48px): root radius 8→10 / 10→12 /
  12→14px, root padding 2→4 / 2→4 / 3→4px, item typography label2→caption1 /
  body2→label1 / headline2→body2, item icon 14 (same) / 18→16 / 20→18px, item gap fixed 4px
  → 4 / 6 / 6px, small item radius 6→8px. The thumb shadow now comes from
  `semantic.elevation.shadow.normal.xsmall` (the white 28% overlay is gone). Nothing to
  rewrite unless layout was tuned against the old numbers — item labels are one typography
  step smaller, so fixed-width or `maxWidth`-capped controls need a visual check.

## M12. Select / SelectMultiple changes

Everything below applies to BOTH `Select` and `SelectMultiple` — they share one style
implementation. No codemod covers this section.

- **`size` prop introduced** (`'large'` default, `'medium'` = 40px height, responsive values
  accepted). The former single size maps to Large, but Large's details changed: radius
  12→14px, value/placeholder typography body1→body2, `leadingContent` icon 22→20px, chip gap
  4→8px, and the gap between `leadingContent` and the value 12→6px. A field shrunk with
  `height` should switch to `size="medium"` — `height` alone leaves radius, typography, and
  padding at the Large values (`height` itself still works).
  Scan **[decision]**: `\bSelect(Multiple)?[^>]*height=` — each hit decides `size` vs a
  deliberate custom height.
  Scan **[decision]**: `\bSelect(Multiple|Content|RenderChip)?\b` file-level, then review
  every Select JSX usage for the props the line greps in this section missed (multi-line
  props escape them). The alternation is required — `\bSelect\b` alone does NOT match
  `SelectMultiple` / `SelectContent` (the trailing `\b` fails before `M` / `C`), so a file
  that renders only `SelectMultiple` would be skipped entirely. Expect noise: the pattern
  also matches prose and any consumer symbol starting with `Select`.
- **`SelectContent` is its own component now, not a re-export of `TextFieldContent`.**
  `variant` lost four values and its DEFAULT changed from `'text'` to `'icon'`:

  ```text
  variant="icon" | "icon-button" | "custom"           → unchanged
  variant="text" | "timer" | "badge" | "text-button"  → removed; use "custom" + sx
  (no variant)                                        → was "text", is now "icon"
  ```

  Scan **[zero]**: `SelectContent[^>]*variant="(text|timer|badge|text-button)"` (anchored on
  `SelectContent` on purpose — `TextFieldContent` keeps `text`, `timer`, and `badge` in v4, so
  a bare `variant="text"` scan would flag valid TextField code).
  Scan **[decision]**: `\bSelectContent\b` file-level, then review every JSX usage for a
  MISSING `variant` — it rendered a text slot in v3 and renders an icon wrapper in v4, a
  silent visual change no line grep can see. In the same pass, check the `IconButton` inside
  each `variant="icon-button"`: the documented example size changed from 22 to 32 (large) /
  28 (medium), so verify the rendered result instead of porting the old number. `color` only
  applies to `variant="icon"` in v4.
  `variant="icon"`'s icon size is no longer the hardcoded 22px — it follows the Select `size`
  (large 20px / medium 18px), so an `sx`/`fontSize` override that pinned the old 22px should
  be dropped rather than carried over.
  `SelectContentProps` is also its own type now (it was an alias of `TextFieldContentProps`);
  a removed `variant` value assigned through that type surfaces as a type error.

- **`SelectRenderChip` added for the `render` prop.** Chips assembled by hand
  (`<Chip size="xsmall" variant="solid" trailingContent={<IconCloseThick />}>`) still
  compile, but the v4 design is **outlined**, and the new component also owns the
  `status="negative"` / `disabled` styling and defaults `trailingContent` to `<IconClose />`.
  Migrating is a visual change (solid → outlined) — confirm per occurrence.
  Scan **[decision]**: `\bSelect(Multiple)?[^>]*render=` — for each hit, decide whether its
  chips move to `SelectRenderChip`. `e.stopPropagation()` in the chip's `onClick` is still
  required; keep it.

  ```tsx
  // AS-IS
  render={() => value.map((v) => (
    <Chip key={v} size="xsmall" variant="solid" trailingContent={<IconCloseThick />}
      onClick={(e) => { e.stopPropagation(); remove(v); }}>{v}</Chip>
  ))}
  // TO-BE
  render={() => value.map((v) => (
    <SelectRenderChip key={v}
      onClick={(e) => { e.stopPropagation(); remove(v); }}>{v}</SelectRenderChip>
  ))}
  ```

- **Negative-state trailing icon removed** — the circle-exclamation icon no longer renders,
  and its `data-role`s are gone. Code compensating for its width can be simplified.
  Scan **[zero]**: `select(-multiple)?-invalid` (include stylesheets).
- **Field DOM restructured.** Value, placeholder, `leadingContent`, and the chevron now sit
  in one inner row, and the wrapper that held the text is gone. `[data-role='select-values']`
  / `-placeholder` (and their `select-multiple-` counterparts) are unchanged; the wrappers are
  not:

  ```text
  select-render-wrapper           → select-wrapper (inner row) / select-chip-wrapper (chips)
  select-multiple-render-wrapper  → select-multiple-wrapper (inner row)
                                    / select-multiple-chip-wrapper (overflow mask)
  chip scroll container (unnamed `> div` inside the wrapper above)
                                  → select-multiple-chip-render-wrapper
  chevron svg (direct child of the root)
                                  → wrapped in [data-component='select-content']
                                    [data-variant='select-chevron' | 'select-multiple-chevron']
  ```

  Scan **[zero]**: `select(-multiple)?-render-wrapper` (include stylesheets). The pattern is
  exact on purpose — it must NOT match the new `select-multiple-chip-render-wrapper`.
  `padding` stayed on the root, but the inner row adds 4px of its own, and a chevron styled
  through a direct-child `svg` selector now needs the wrapper in the path — review any
  selector that reached into the field's internals.

- **`SelectMultiple`'s placeholder wraps under `overflow`.** In v3 the placeholder was always
  a single ellipsised line; in v4 it follows `overflow` like the value does, so an
  `overflow`-enabled SelectMultiple with a long placeholder now grows taller instead of
  truncating. No scan can see this (it depends on the rendered width) — review the
  `overflow`-enabled SelectMultiples surfaced by this section's file-level scan.

- **`data-component="text-field-content"` no longer appears inside a Select** — Select's
  content slots render `data-component="select-content"` plus `data-variant="<variant>"`.
  Selectors written for a Select's content slot must be renamed; hits inside a real
  TextField / DatePicker / TimePicker are valid v4 code and stay.
  Scan **[decision]**: `text-field-content`. (In v3 the attribute was
  `wds-component="text-field-content"`; step ④ `dom-identifier-migration` already renamed the
  attribute NAME, so by this point every such selector reads `data-component` — this section
  renames the VALUE, same shape as M4's `card-content` note.)
- **Focus ring moved outside the field, elevation shadow dropped.** Focus went from a 2px
  inset ring to a 1px inset border plus a **4px ring drawn outside** the element
  (`line.brand.focus`, `line.negative.focus` when invalid), and every state lost
  `semantic.elevation.shadow.normal.xsmall`. The outer ring is clipped by an
  `overflow: hidden` ancestor and overlaps neighbours sitting closer than 4px — no scan
  catches this, so visually QA Selects in dense toolbars, grids, and scroll containers.
  Value text also drops one typography step (body1 → body2), so width-capped fields need a
  look.

## M13. PushBadge changes

Step ⑦ `push-badge-migration` already rewrote the literal cases (`variant="number"` →
`variant="text"`, `variant="new"` → `variant="text" text="N"`, `count` → `text`). This
section covers what the transform cannot express and the rendering changes no rename fixes.

- **Non-literal `variant` was left as-is.** `variant={v}` / `variant={cond ? 'new' : 'dot'}`
  cannot be mapped, so the transform skipped the value (it still renamed that element's
  `count` → `text`, which is always correct). Trace what the expression produces: `'number'`
  → `'text'`, `'new'` → `'text'` **and the element needs `text="N"`**, `'dot'` → unchanged.
  A leftover `'new'` / `'number'` is not a type error against the v4 union only when the
  expression is typed loosely, so do not rely on the typecheck to find these.
  Scan **[decision]**: `PushBadge[^>]*variant=\{` — every hit is a value to trace by hand.
  A correctly migrated dynamic variant (`variant={cond ? 'text' : 'dot'}`) is valid v4 code
  and still matches after this section is done, so the pass criterion is that every
  expression was traced during the manual phase, never a zero count.
- **`count` reaching the badge through a spread or a wrapper type.** `{...props}` carrying
  `count`, and any `type X = PushBadgeProps & …` / `Pick<PushBadgeProps, 'count'>` that
  re-declares or relays it, are invisible to the transform. The type surface surfaces as a
  typecheck error once M1's install lands the v4 packages; the spread surface does not.
  Scan **[decision]**: `\bPushBadge(Props)?\b` file-level, then review every usage for a
  spread that may carry `count` / `variant`, and for multi-line JSX props the step-⑦ line
  grep could not see. The `(Props)?` group is required — `\bPushBadge\b` alone does NOT match
  `PushBadgeProps` (the trailing `\b` fails before `P`).
- **`count` + `text` on one element.** The transform skips these deliberately (renaming would
  duplicate the attribute). Delete the stale `count`.
  Scan **[zero]** over the WHOLE repo, not just `<targets>`:
  `PushBadge[^>]*(count=|variant="(new|number)")` — step ⑦'s FULL verify pattern, mirroring
  how M4/M5/M9 carry their step's whole pattern out of target. The `count=` half alone would
  leave a literal v3 `<PushBadge variant="new" />` living outside the transformed
  directories (E2E spec, `.snap`, MDX, a sibling package) matched by no zero-criterion
  pattern anywhere in the checklist, since step ⑦'s own grep is `<targets>`-scoped. Rewrite
  hits per the step-⑦ rename table (`variant="number" count={n}` → `variant="text" text={n}`;
  `variant="new"` → `variant="text" text="N"`); in-target hits were already reported by the
  step.
- **`variant="max-count"` adoption is a decision, never a mechanical mapping.** v3's `number`
  had no upper bound; `max-count` clamps a numeric `text` at `maxCount` (default **99**) and
  renders `{maxCount}+`. A counter that legitimately shows 3-digit values must either stay on
  `variant="text"` or set an explicit `maxCount`. Clamping applies to numeric `text` only —
  `text="1000"` (string) renders in full under `max-count`.
  Scan **[decision]**: `PushBadge[^>]*variant="text"` — for each, decide whether it wants a
  cap. Expect most hits to stay as they are; this is an opt-in feature, not a migration debt.
- **`[data-role='push-badge-text']` is gone.** The `Typography` wrapper around the badge text
  was removed; the text renders directly inside `[data-component='push-badge']`, which now
  carries the typography itself. Selectors and test queries reaching for the inner element
  must move up one level.
  Scan **[zero]**: `push-badge-text` (include stylesheets). The bare substring is
  deliberate — it also reaches test queries like `getByTestId('push-badge-text')`, which an
  anchored `\[data-role=…\]` pattern would miss. **Carve-out**: it therefore also matches
  `--push-badge-text-color`, which is NOT a leftover — that variable (with
  `--push-badge-background-color`) is the v4 override point this same section recommends
  below, so hits on either variable are valid v4 code and stay. Only a
  `[data-role='push-badge-text']` selector or a test query for that element is work.
- **`invisible` no longer removes the text from the DOM.** v3 rendered the text only when
  `!invisible`; v4 always renders it, hides it with `transform: scale(0)`, and marks it
  `aria-hidden` (so the shrink animation survives). Tests asserting the text's ABSENCE while
  invisible now fail — assert on `aria-hidden` or on the computed transform instead. Nothing
  to change in product code.
  Scan **[decision]**: `PushBadge[^>]*invisible` — review the surrounding tests, not the
  component usage.
- **New props are opt-in.** `outlineBorder` / `outlineBorderColor` draw an outline around the
  badge so it stays legible over an avatar or icon. The width follows BOTH `size` and
  `variant` — text / max-count get 1 / 1.5 / 2px, dot gets 0.5 / 1 / 1px — and the outline is
  drawn OUTSIDE the badge, so an `overflow: hidden` ancestor clips it. `maxCount` is covered
  above. Nothing breaks by not adopting them.
- **Sizing and color changes** (nothing to rewrite unless layout was tuned against the old
  numbers): dot diameters (4 / 6 / 8px), text badge heights, min-widths, paddings and
  typography are all unchanged from v3. What did change is the text line-height — from a
  hardcoded `1` to the token value (caption2 14px / label1 20px) — and the badge gained
  `box-sizing: border-box`: a project with no global reset previously got a badge padding-widths
  larger than the declared size, so hand-tuned `offsetX`/`offsetY` corrections may now
  overshoot. The former `variant="new"` square came from `aspect-ratio: 1 / 1`; v4 reproduces
  it by fixing the width to the height when `text` is a **single-character string**, so
  `text="N"` stays a circle while `text={3}` is sized by `min-width` and can differ by a
  fraction of a pixel. Background and text colors are now read from
  `--push-badge-background-color` / `--push-badge-text-color` on the wrapper, which is the
  supported override point (the dot uses the background variable as its own color).

## M14. SearchField changes

No codemod covers this section — every fix here is a hand edit.

- **`size` values shifted one step**: v3 `size?: 'medium' | 'small'` (default `'medium'`)
  became v4 `size?: 'large' | 'medium'` (default `'large'`). The mapping is
  `size="medium"` → `size="large"` and `size="small"` → `size="medium"`; an element with
  NO `size` needs no change — standalone, the default still renders the 48px form. Inside a
  `FormControl` the unset size now follows the PARENT's size instead (see the FormControl
  bullet below), so a SearchField under `FormControl size="medium"` renders 40px; that is
  the intended v4 behavior, not a migration miss.

  **Hand-edit rename chain — order and run-once matter.** `medium` is both a rename
  SOURCE (`medium`→`large`) and a rename TARGET (`small`→`medium`) — the same chain shape
  that makes `form-control-migration` corrupting, except here the editor is you. Convert
  each file in ONE pass, per occurrence, and never re-sweep a converted file: a second
  `medium`→`large` sweep promotes the mediums that were just converted FROM `small`.
  Project-wide find-and-replace is safe only in the order `medium`→`large` FIRST, then
  `small`→`medium`, each applied exactly once.

  **The typechecker cannot find the old `medium`.** `'medium'` is a valid value in BOTH
  versions with different meanings (48px in v3, 40px in v4), so an unconverted
  `size="medium"` compiles clean and silently renders 8px shorter. Only `size="small"`
  fails the v4 typecheck. Build the `medium` worklist from the scan BEFORE converting
  anything — after a partial pass, a `size="medium"` hit is ambiguous between "converted
  from `small`" and "not yet converted".

  Scan **[zero]**: `\bSearchField\b[^>]*size="small"` — every hit becomes `size="medium"`.
  Scan **[decision]**: `\bSearchField\b[^>]*size="medium"` — run it before converting and
  record the hits; each PRE-conversion hit becomes `size="large"`. Once the section is
  done the pattern legitimately matches the converted smalls, so the final-verification
  pass criterion is "every pre-conversion hit was converted", never a zero count.
  Scan **[decision]**: `\bSearchField\b[^>]*size=\{` — non-literal size: trace what the
  expression produces (`'medium'` → `'large'`, `'small'` → `'medium'`). A leftover
  `'small'` surfaces as a type error at M1's install; a leftover `'medium'` never does.
  Scan **[decision]**: `\bSearchField` file-level (prefix form on purpose — it also
  matches `SearchFieldProps`, and `SearchField` itself is valid v4 code, so every usage
  is a hit). Review each file for what the line greps above cannot see: multi-line JSX
  props, responsive `size` values (`xs={{ size: 'small' }}` — the same value mapping
  applies inside `xs`/`sm`/`md`/`lg`/`xl` objects, and the colon syntax escapes every
  `size=` grep), `{...spread}`s that may carry `size`, and wrapper types relaying
  `SearchFieldProps['size']` (a relayed `'small'` is a type error; a relayed `'medium'`
  is not).

- **Size details changed** (the reason converted screens still need visual QA):

  | 속성            | 기존 medium  | Large        | 기존 small   | Medium        |
  | --------------- | ------------ | ------------ | ------------ | ------------- |
  | 높이            | 48px         | 48px         | 40px         | 40px          |
  | Border radius   | 12px         | 14px         | 12px         | 12px          |
  | 입력 Typography | body1 (16px) | body2 (15px) | body1 (16px) | label1 (14px) |
  | Icon size       | 20px         | 20px         | 20px         | 18px          |

  Heights map 1:1, so a correctly converted SearchField keeps its height — but radius and
  typography shift, so screens with tightly tuned layouts deserve a look.

- **`size` now follows `FormControl`** (informational): a SearchField with no explicit
  `size` inside a `FormControl` inherits the FormControl's size; an explicit `size` prop
  still wins. Nothing to rewrite — but do not "fix" an unset size to an explicit one
  inside a FormControl, or it stops following the parent.

- **`variant` prop added (opt-in)**: `variant?: 'solid' | 'outlined'`, default `'solid'`.
  The former single form IS solid, so existing usages need no change; `outlined` is a new
  transparent-background form with a 1px inset border. Nothing breaks by not adopting it.

- **DOM depth increased by one level.** A new `[data-role='search-field-wrapper']`
  element now wraps the icon, the `input`, and the reset button. The
  `search-field-icon` / `search-field-reset` data-roles are unchanged but sit one level
  deeper, so descendant selectors keep working while direct-child selectors break:
  - AS-IS: `[data-component='search-field'] > input`
  - TO-BE: `[data-component='search-field'] > [data-role='search-field-wrapper'] > input`

  The icon area is now sized through CSS variables on the root
  (`--search-field-icon-wrapper-size`, `--search-field-icon-size`) — the supported
  override point for custom icon sizing.
  Scan **[decision]**: `search-field` (include stylesheets) — matches valid v4 selectors
  and unrelated consumer strings by design; only hits that reach into the field's
  internals with a direct-child (`>`) combinator need rework.

## Suggested commit boundary

Manual fixes get their own commits, after the codemod phase — with the recommended
auto-commit flow the seven codemod commits already exist by the time any M-section runs, so
do not try to "group" a manual fix into a codemod step's commit (that would mean rewriting
history and defeats per-step revertability). One commit per M-section (or per coherent
group, e.g. M3+M4) keeps review and revert straightforward. Only in a non-auto-commit
inline run, where nothing is committed until the end, may M1/M3/M4/M5/M9/M13 share a commit
with their related codemod step (M9 ↔ step ② `semantic-token-migration`, the same
relationship as M1 ↔ ①, M3 ↔ ③/④, M4 ↔ ⑤, M5 ↔ ⑥, M13 ↔ ⑦).
