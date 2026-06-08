/**
 * Single source of truth for the `--wds-*` → unprefixed CSS variable rename
 * shipped in Montage 4.0.0.
 *
 * The library (`@montage-ui/core`) and this codemod share these rules so the
 * renamed variables stay in sync. The same map is also used to generate the
 * one-off `sed` rules that rewrite the library source.
 *
 * Rename rule:
 * - Default: strip the `--wds-` brand prefix (`--wds-modal-translate` → `--modal-translate`).
 *   Every variable already carries its component name, so the result stays scoped.
 * - Exceptions: a handful of variables whose names become too generic once the
 *   prefix is stripped (and would collide with user-defined variables). These get
 *   an explicit component-scoped name instead.
 */

/**
 * Variables whose stripped name would be too generic and risk colliding with a
 * consumer's own CSS variables. Renamed with an explicit component scope.
 */
export const CSS_VARIABLE_EXCEPTIONS: Record<string, string> = {
  '--wds-column-spacing': '--grid-column-spacing',
  '--wds-row-spacing': '--grid-row-spacing',
};

/**
 * All `--wds-*` CSS variables exposed by the library as of 3.x. Used to validate
 * the rename map and to document the migration surface. Keep in sync with the
 * library source.
 */
export const KNOWN_WDS_VARIABLES: ReadonlyArray<string> = [
  '--wds-accordion-height',
  '--wds-accordion-overflow',
  '--wds-action-area-extra-content-margin',
  '--wds-action-area-margin',
  '--wds-action-area-margin-x',
  '--wds-action-area-margin-y',
  '--wds-card-content-item-bottom-position-margin-top',
  '--wds-card-content-item-top-position-margin-bottom',
  '--wds-card-content-item-top-position-margin-top',
  '--wds-card-thumbnail-content-z-index',
  '--wds-card-thumbnail-overlay-z-index',
  '--wds-category-icon-button-padding',
  '--wds-category-list-padding',
  '--wds-column-spacing',
  '--wds-fallback-view-bottom-space',
  '--wds-framed-style-border-radius',
  '--wds-framed-style-horizontal-padding',
  '--wds-framed-style-vertical-padding',
  '--wds-icon-button-inset',
  '--wds-list-cell-horizontal-padding',
  '--wds-list-cell-interaction-display',
  '--wds-list-cell-interaction-padding',
  '--wds-list-cell-vertical-padding',
  '--wds-modal-content-margin',
  '--wds-modal-default-max-height',
  '--wds-modal-grabber-height-guard',
  '--wds-modal-max-height',
  '--wds-modal-popup-border-radius',
  '--wds-modal-translate',
  '--wds-pagination-dot-border-color',
  '--wds-pagination-dot-size',
  '--wds-progress-indicator-transform',
  '--wds-push-badge-offset-x',
  '--wds-push-badge-offset-y',
  '--wds-region-viewport-bottom',
  '--wds-region-viewport-max-width',
  '--wds-row-spacing',
  '--wds-snackbar-animation-height',
  '--wds-snackbar-animation-margin-top',
  '--wds-switch-padding',
  '--wds-switch-thumb-size',
  '--wds-switch-width',
  '--wds-tab-icon-button-padding',
  '--wds-tab-list-active-divider-color',
  '--wds-tab-list-disabled-divider-color',
  '--wds-tab-list-divider-color',
  '--wds-tab-list-item-flex',
  '--wds-tab-list-item-overflow',
  '--wds-tab-list-item-text-align',
  '--wds-tab-list-item-text-display',
  '--wds-tab-list-padding',
  '--wds-tab-padding-x',
  '--wds-tab-padding-y',
  '--wds-table-border-color',
  '--wds-table-cell-min-height',
  '--wds-table-cell-padding-x',
  '--wds-table-cell-padding-y',
  '--wds-table-head-cell-min-height',
  '--wds-table-head-cell-padding-x',
  '--wds-table-head-cell-padding-y',
  '--wds-text-area-height',
  '--wds-text-area-scroll-height',
  '--wds-toast-animation-height',
  '--wds-toast-animation-margin-top',
  '--wds-top-navigation-min-height',
  '--wds-top-navigation-padding',
  '--wds-top-navigation-padding-x',
  '--wds-top-navigation-padding-y',
  '--wds-top-navigation-title-width',
];

/** Matches a single `--wds-*` CSS custom property token. */
export const WDS_VARIABLE_PATTERN = /--wds-[a-z0-9-]+/g;

/** Renames a single `--wds-*` token to its 4.0 name. */
export const renameWdsVariable = (token: string): string => {
  return CSS_VARIABLE_EXCEPTIONS[token] ?? token.replace(/^--wds-/, '--');
};

/**
 * Rewrites every `--wds-*` token inside an arbitrary string (CSS text, a
 * `var(...)` reference, an inline-style key, etc.). Returns the input unchanged
 * when no token is present.
 */
export const renameWdsVariablesInString = (input: string): string => {
  return input.replace(WDS_VARIABLE_PATTERN, (token) =>
    renameWdsVariable(token),
  );
};

/**
 * Fully expanded old → new map for the known 3.x variables. Useful for
 * validation, documentation, and generating the library `sed` rules.
 */
export const CSS_VARIABLE_MAP: Record<string, string> = Object.fromEntries(
  KNOWN_WDS_VARIABLES.map((name) => [name, renameWdsVariable(name)]),
);
