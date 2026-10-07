/**
 * Single source of truth for the `wds-*` DOM identifier renames shipped in
 * Montage 4.0.0 — marker attributes and portal container ids that consumers may
 * reference via CSS attribute selectors, `querySelector`, or `closest`.
 *
 * Rename strategy:
 * - Marker / behavior-control attributes are normalized to the standard `data-`
 *   prefix.
 * - Global element ids keep a brand prefix (`montage-`) to avoid collisions.
 *
 * Note: `wds-pagination-dot` is intentionally omitted — it is an internal React
 * `key`, never rendered to the DOM, so it is not part of the consumer surface.
 */
export const DOM_IDENTIFIER_MAP: Record<string, string> = {
  'wds-component': 'data-component',
  'wds-ignore-first-focus': 'data-ignore-first-focus',
  'wds-ignore-dismissable-layer': 'data-ignore-dismissable-layer',
  // Covers `wds-region-manager` and `wds-region-manager-bottom`.
  'wds-region-manager': 'montage-region-manager',
};

/**
 * A key only matches as a whole token start — not when it sits inside a longer
 * identifier such as `data-wds-component` or a `--wds-component` CSS variable,
 * which are not Montage DOM identifiers and must be left alone. Trailing
 * characters are allowed on purpose (`wds-region-manager-bottom`).
 */
const TOKEN_START = '(?<![\\w-])';

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Matches any `wds-*` DOM identifier token handled by the map. */
export const WDS_DOM_IDENTIFIER_PATTERN = new RegExp(
  `${TOKEN_START}(?:${Object.keys(DOM_IDENTIFIER_MAP).map(escapeRegExp).join('|')})`,
);

const DOM_IDENTIFIER_REPLACERS = Object.entries(DOM_IDENTIFIER_MAP).map(
  ([oldId, newId]) =>
    [new RegExp(`${TOKEN_START}${escapeRegExp(oldId)}`, 'g'), newId] as const,
);

/**
 * Rewrites every known `wds-*` DOM identifier inside an arbitrary string —
 * attribute selectors (`[wds-component='x']`), id selectors
 * (`#wds-region-manager-bottom`), and raw attribute names. Returns the input
 * unchanged when no identifier is present.
 *
 * Idempotent: the map keys all start with `wds-` and the replacements never
 * contain `wds-`, so a second pass finds nothing to rename. Embedded
 * occurrences (`data-wds-component`) are skipped by the token-start guard.
 */
export const renameWdsDomIdentifiersInString = (input: string): string => {
  let output = input;

  for (const [pattern, newId] of DOM_IDENTIFIER_REPLACERS) {
    output = output.replace(pattern, newId);
  }

  return output;
};
