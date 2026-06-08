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

/** Matches any `wds-*` DOM identifier token handled by the map. */
export const WDS_DOM_IDENTIFIER_PATTERN = new RegExp(
  Object.keys(DOM_IDENTIFIER_MAP).join('|'),
);

/**
 * Rewrites every known `wds-*` DOM identifier inside an arbitrary string —
 * attribute selectors (`[wds-component='x']`), id selectors
 * (`#wds-region-manager-bottom`), and raw attribute names. Returns the input
 * unchanged when no identifier is present.
 *
 * The map keys all start with `wds-` and the replacements never do, so applying
 * the substitutions in sequence is safe and idempotent.
 */
export const renameWdsDomIdentifiersInString = (input: string): string => {
  let output = input;

  for (const [oldId, newId] of Object.entries(DOM_IDENTIFIER_MAP)) {
    output = output.split(oldId).join(newId);
  }

  return output;
};
