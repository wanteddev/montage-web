/**
 * Single source of truth for the semantic color token restructure shipped in
 * Montage 4.0.0.
 *
 * The 3.x usage-mixed groups (label/fill/material/inverse/status/interaction/
 * primary/accent/…) are reorganized into role-first groups
 * (foreground/background/surface/line/effect). The library and this codemod
 * share these rules so the renamed tokens stay in sync.
 *
 * Paths are dot paths under `semantic.` (the `semantic.` prefix itself is
 * excluded). `semantic.static.*`, `semantic.elevation.*`, `semantic.platform.*`
 * and every `atomic.*` token are unchanged.
 *
 * The map is prefix-free — no old path is a path prefix of another old path —
 * and no new path starts with an old path, so longest-first replacement is
 * unambiguous and applying the transform twice is a no-op (idempotent).
 */
export const SEMANTIC_TOKEN_MAP: Record<string, string> = {
  'label.normal': 'foreground.neutral.primary',
  'label.strong': 'foreground.neutral.strong',
  'label.neutral': 'foreground.neutral.secondary',
  'label.alternative': 'foreground.neutral.tertiary',
  'label.assistive': 'foreground.neutral.quaternary',
  'label.disable': 'foreground.disable.primary',
  'status.positive': 'foreground.positive.primary',
  'status.cautionary': 'foreground.cautionary.primary',
  'status.negative': 'foreground.negative.primary',
  'inverse.label': 'foreground.neutral.inverse',
  'inverse.primary': 'foreground.brand.inverse',
  'inverse.background': 'surface.neutral.inverse',
  'interaction.inactive': 'foreground.inactive.primary',
  'interaction.disable': 'surface.disable.primary',
  'interaction.focus': 'line.brand.focus',
  'interaction.negative': 'line.negative.focus',
  'primary.normal': 'surface.brand.primary',
  'primary.strong': 'surface.brand.strong',
  'primary.heavy': 'surface.brand.heavy',
  'fill.normal': 'surface.neutral.secondary',
  'fill.strong': 'surface.neutral.strong',
  'fill.alternative': 'surface.neutral.tertiary',
  'fill.primary': 'surface.brand.subtle',
  'fill.negative': 'surface.negative.strong',
  'material.dimmer': 'effect.dimmer.primary',
  'background.normal.normal': 'background.neutral.primary',
  'background.normal.alternative': 'background.neutral.secondary',
  'background.elevated.normal': 'surface.elevated.primary',
  'background.elevated.alternative': 'surface.elevated.secondary',
  'background.transparent.normal': 'effect.transparent.primary',
  'background.transparent.alternative': 'effect.transparent.secondary',
  'background.status.negative': 'surface.negative.primary',
  'background.status.cautionary': 'surface.cautionary.primary',
  'background.status.positive': 'surface.positive.primary',
  'accent.foreground.lime': 'foreground.accent.lime',
  'accent.foreground.cyan': 'foreground.accent.cyan',
  'accent.foreground.lightBlue': 'foreground.accent.lightBlue',
  'accent.foreground.violet': 'foreground.accent.violet',
  'accent.foreground.purple': 'foreground.accent.purple',
  'accent.foreground.pink': 'foreground.accent.pink',
  'accent.foreground.red': 'foreground.negative.strong',
  'accent.foreground.redOrange': 'foreground.cautionary.primary',
  'accent.foreground.orange': 'foreground.cautionary.primary',
  'accent.foreground.green': 'foreground.positive.primary',
  'accent.foreground.blue': 'foreground.brand.primary',
  'accent.background.lime': 'surface.accent.limeOpaque',
  'accent.background.cyan': 'surface.accent.cyanOpaque',
  'accent.background.lightBlue': 'surface.accent.lightBlueOpaque',
  'accent.background.violet': 'surface.accent.violetOpaque',
  'accent.background.purple': 'surface.accent.purpleOpaque',
  'accent.background.pink': 'surface.accent.pinkOpaque',
  'accent.background.redOrange': 'foreground.cautionary.primary',
  'line.normal.normal': 'line.neutral.primary',
  'line.normal.neutral': 'line.neutral.secondary',
  'line.normal.alternative': 'line.neutral.tertiary',
  'line.solid.normal': 'line.neutral.primaryOpaque',
  'line.solid.neutral': 'line.neutral.secondaryOpaque',
  'line.solid.alternative': 'line.neutral.tertiaryOpaque',
  'line.primary.normal': 'line.brand.primary',
  'line.primary.strong': 'line.brand.strong',
  'line.status.negative.normal': 'line.negative.primary',
  'line.status.negative.strong': 'line.negative.strong',
  'line.status.cautionary.normal': 'line.cautionary.primary',
  'line.status.positive.normal': 'line.positive.primary',
};

const toDashedPath = (path: string) => path.split('.').join('-');

/** Old dot paths sorted longest-first so the most specific path always wins. */
const SORTED_OLD_PATHS = Object.keys(SEMANTIC_TOKEN_MAP).sort(
  (a, b) => b.length - a.length,
);

/** Dashed (`label-normal`) old → new map used for the CSS variable rename. */
const DASHED_SEMANTIC_TOKEN_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(SEMANTIC_TOKEN_MAP).map(([oldPath, newPath]) => [
    toDashedPath(oldPath),
    toDashedPath(newPath),
  ]),
);

/**
 * Matches a `--semantic-<old-dashed-path>` CSS custom property token. Dots
 * become dashes while camelCase segments are kept as-is
 * (`--semantic-accent-foreground-lightBlue`). The trailing guard stops the
 * match at a non-alphanumeric character, so a `-rgb` suffix stays outside the
 * match and is preserved automatically.
 */
export const SEMANTIC_CSS_VARIABLE_PATTERN = new RegExp(
  `--semantic-(?:${SORTED_OLD_PATHS.map(toDashedPath).join(
    '|',
  )})(?![a-zA-Z0-9])`,
  'g',
);

/**
 * Matches a `semantic.<old-path>` dot-path token inside an arbitrary string —
 * `color="semantic.label.normal"`, `getColorByToken('semantic.…')`, etc. The
 * leading `\b` and the trailing guard keep partial identifiers
 * (`mysemantic.…`, `semantic.label.normalized`) from matching.
 */
export const SEMANTIC_TOKEN_PATH_PATTERN = new RegExp(
  `\\bsemantic\\.(?:${SORTED_OLD_PATHS.map((path) =>
    path.split('.').join('\\.'),
  ).join('|')})(?![a-zA-Z0-9])`,
  'g',
);

/**
 * Rewrites every `--semantic-*` CSS variable inside an arbitrary string (CSS
 * text, a `var(...)` reference, an inline-style key, etc.) to its 4.0 name.
 * Returns the input unchanged when no old token is present. Also used by the
 * CLI as the plain-text pass over stylesheets.
 */
export const renameSemanticTokensInString = (input: string): string => {
  return input.replace(SEMANTIC_CSS_VARIABLE_PATTERN, (token) => {
    const oldDashedPath = token.slice('--semantic-'.length);

    return `--semantic-${
      DASHED_SEMANTIC_TOKEN_MAP[oldDashedPath] ?? oldDashedPath
    }`;
  });
};

/**
 * Rewrites every `semantic.<old-path>` dot-path token inside an arbitrary
 * string to its 4.0 path. Returns the input unchanged when no old token is
 * present.
 */
export const renameSemanticTokenPathsInString = (input: string): string => {
  return input.replace(SEMANTIC_TOKEN_PATH_PATTERN, (token) => {
    const oldPath = token.slice('semantic.'.length);

    return `semantic.${SEMANTIC_TOKEN_MAP[oldPath] ?? oldPath}`;
  });
};
