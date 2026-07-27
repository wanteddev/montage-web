# Manual Migrations (v3 → v4)

Changes the codemods cannot apply automatically. Run these AFTER all 6 codemod steps
completed (see `codemod-steps.md`). Each section lists scan patterns to locate affected
code — scan first, then apply fixes only where a real occurrence exists.

Scan patterns use `grep -E` syntax with `\b`/`\s`/`\w` shorthands — supported by GNU grep,
macOS BSD grep, and ripgrep alike (translate the shorthands to POSIX classes for busybox
or other minimal greps). Patterns beginning with `-` (e.g. `--wds-`) must be passed after
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

- `package.json` — `dependencies` / `devDependencies` / `peerDependencies` / `resolutions` / `overrides` / `pnpm.overrides`. Replace each `@wanteddev/wds*` entry with its `@montage-ui/*` counterpart at version `^4.0.0`, then run the project's package manager install to refresh the lockfile.
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
const\s*\{[^}]*\b(spacing|radius|dimension|opacity|zIndex|primitive)\b[^}]*\}\s*=\s*[\w.]*[Tt]heme
```

(the `[\w.]*` tail also matches `props.theme`, `this.props.theme`, and `useTheme()`
bases; an alias whose name does not end in `theme` still escapes — treat the scan as a
heuristic) then inspect each file for arithmetic on the destructured names.

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
  import { lightOriginTheme, darkOriginTheme } from '@montage-ui/core';

  lightOriginTheme.spacing[16]; // '16px' — raw value
  ```

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
- Dynamically built DOM-identifier strings whose static part stops short of a full token:
  `'wds-' + kind`, `` `wds-ignore-${x}` `` — review every dynamic construction site, same
  as the `--wds-` case above. The full-token [zero] scans below do not reach the
  shortest-head form; locate it with **[decision]**: `["']wds-["'] *\+` and
  ``\`wds-[^\`]*\$\{`` (expect noise from unrelated `wds-` strings; assess each hit).
- camelCase custom properties: the rename pattern is lowercase-only, so `--wds-myVar` comes
  out partially rewritten as `--myVar`. The diff review for these is owned by step 3's
  (`css-variable-migration`) post-step verification (where the diff is at hand); this note
  is a safety net — if step 3's diff was never reviewed, grep it now.

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
  Scan **[decision]**: `Card(Body|Row|Title|Caption|Thumbnail)\w*` used outside JSX tags
  in files that also render `ListCard`.
- **Cross-file context**: a child-component file that imports only Card sub-components (no
  `ListCard` import in the same file) is converted to Card-family names even when a parent
  file mounts it inside a `ListCard`. Review shared child components rendered inside
  `ListCard` and switch them to `ListCard*` names by hand. Concrete procedure
  (**[decision]**):
  1. `grep -rlE '\bCard(Body|Row|Title|Caption|Thumbnail)' <targets>` minus the files that
     also match `\bListCard` — these are Card-family-only files.
  2. For each such file's exported component, grep for its importers; flag any importer
     that renders `ListCard` around the imported component — those usages need the
     `ListCard*` names.
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
  Note: after `dom-identifier-migration`, old `wds-component="card-content"` selectors have
  become `data-component="card-content"` — this step renames the _value_ part.

## M5. FormControl follow-ups

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
- **`TextFieldButton` `variant` prop removed** (was `"normal" | "assistive"`). Delete the
  prop. The trailing button now renders inside the field.
  Scan **[zero]**: `TextFieldButton[^>]*variant=`.
- **`TextFieldContent` `variant="text-button"` removed**. Replace with another variant.
  Scan **[zero]**: `variant="text-button"` (do NOT scan the bare substring `text-button` —
  v4 TextButton still legitimately renders `data-component="text-button"` and
  `data-role="text-button-loading"`, so bare-substring hits on those selectors are valid
  v4 code).
- **Negative-state trailing icon removed** — the circle-exclamation icon no longer renders.
  Code compensating for its width can be simplified.
- **`[data-role='text-field-wrapper']` styling moved** — `padding` and inset `box-shadow`
  now live on the TextField root. Custom styles targeting the wrapper must move to the root
  element (`sx` or root selector).
  Scan **[decision]**: `text-field-wrapper`.

## M8. TextArea changes

- **`TextAreaContent` variant renames**: `variant="badge"` → `variant="content-badge"`,
  `variant="chip"` → `variant="custom"`. New variants `primary-icon-button` and
  `segmented-control` are available (informational).
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
reference in JS/TS plus the `--semantic-*` variable form in stylesheets, but five
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
  and old CSS-variable patterns) — after this section every remaining hit must be gone;
  step 2's verification only REPORTS these, M9 owns the fix.
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

  ```tsx
  // AS-IS
  <ThemeProvider enableDarkMode storageKey="app-theme" />
  // TO-BE
  <ThemeProvider enableDarkMode cookie={{ key: 'app-theme' }} />
  ```

- **Direct `next-themes` usage breaks silently.** In v3 `ThemeProvider` rendered
  next-themes' provider internally, so calling next-themes' `useTheme` from consumer code
  worked. In v4 nothing connects them: the hook throws no error and returns `undefined`
  values, so this fails at runtime with no type error and no console warning. Replace with
  `useThemeControl` from `@montage-ui/core` (`theme` = resolved `'light' | 'dark'`,
  `themeOriginValue` = the user's `'light' | 'dark' | 'system' | undefined` choice).
  Scan **[zero]**: `next-themes` (covers imports and the `package.json` dependency — drop
  the dependency if nothing else uses it).

  ```tsx
  // AS-IS
  import { useTheme } from 'next-themes';
  const { resolvedTheme, theme, setTheme } = useTheme();
  // TO-BE
  import { useThemeControl } from '@montage-ui/core';
  const { theme, themeOriginValue, setTheme } = useThemeControl();
  ```

- **Cross-subdomain sharing is now possible** via `cookie={{ domain: '.example.com' }}`.
  Omitting `domain` leaves the attribute unset (host-only cookie — same scope as the old
  localStorage), which is the correct default for a single-host app. The value must be a
  registrable domain; a public suffix (`co.kr`, `com`) makes the browser reject the cookie.
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

## Suggested commit boundary

Manual fixes get their own commits, after the codemod phase — with the recommended
auto-commit flow the six codemod commits already exist by the time any M-section runs, so
do not try to "group" a manual fix into a codemod step's commit (that would mean rewriting
history and defeats per-step revertability). One commit per M-section (or per coherent
group, e.g. M3+M4) keeps review and revert straightforward. Only in a non-auto-commit
inline run, where nothing is committed until the end, may M1/M3/M4/M5 share a commit with
their related codemod step.
