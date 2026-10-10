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
 * 3.x의 `--wds-modal-content-margin` 하나가 4.0에서 `-x` / `-y` 두 변수로
 * 나뉘었다. 접두사만 떼면 v4가 읽지 않는 `--modal-content-margin`이 되고,
 * fallback 없는 `var()`는 선언 전체를 무효로 만든다. 그래서 이 변수를 읽는
 * CSS 속성으로 축을 정하고, 정할 수 없으면 접두사만 뗀 이름을 남긴 채
 * 보고한다(마이그레이션 스킬 M20의 [zero] 스캔이 남은 것을 잡는다).
 */
const SPLIT_MODAL_CONTENT_MARGIN = '--wds-modal-content-margin';

const BOX_PROPERTY = '(padding|margin|scroll-padding|scroll-margin|inset)';

const HORIZONTAL_PROPERTY = new RegExp(
  `^(${BOX_PROPERTY}-(left|right|inline|inline-start|inline-end)|left|right)$`,
);

const VERTICAL_PROPERTY = new RegExp(
  `^(${BOX_PROPERTY}-(top|bottom|block|block-start|block-end)|top|bottom)$`,
);

const BOX_SHORTHAND = new RegExp(`^${BOX_PROPERTY}$`);

// `padding: a b c d`의 값 개수별 각 자리의 축 (top/bottom = y, left/right = x).
const SHORTHAND_AXES: Record<number, ReadonlyArray<'x' | 'y'>> = {
  2: ['y', 'x'],
  3: ['y', 'x', 'y'],
  4: ['y', 'x', 'y', 'x'],
};

const toKebabCase = (property: string) =>
  property.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

/** 괄호 밖 공백으로 나눈 값 토큰의 [시작, 끝) 범위. */
const splitTopLevelValues = (value: string) => {
  const ranges: Array<[number, number]> = [];
  let depth = 0;
  let start = -1;

  for (let index = 0; index <= value.length; index += 1) {
    const char = value[index];

    if (char === '(') depth += 1;
    if (char === ')') depth -= 1;

    const isBoundary = char === undefined || (depth === 0 && /\s/.test(char));

    if (isBoundary && start !== -1) {
      ranges.push([start, index]);
      start = -1;
    } else if (!isBoundary && start === -1) {
      start = index;
    }
  }

  return ranges.filter(
    ([from, to]) => value.slice(from, to).toLowerCase() !== '!important',
  );
};

const resolveAxis = (
  input: string,
  offset: number,
  propertyHint: string | undefined,
): 'x' | 'y' | undefined => {
  // 같은 문자열 안의 선언(`prop: value`)을 먼저 찾고, 없으면 호출한 쪽이
  // 넘긴 속성(인라인 스타일 객체의 key 등)을 쓴다.
  const declarationStart =
    Math.max(
      input.lastIndexOf(';', offset),
      input.lastIndexOf('{', offset),
      input.lastIndexOf('}', offset),
    ) + 1;
  const declaration = /^\s*([-a-zA-Z]+)\s*:/.exec(
    input.slice(declarationStart, offset),
  );

  let property = propertyHint;
  let valueStart = 0;

  if (declaration?.[1]) {
    property = declaration[1];
    valueStart = declarationStart + declaration[0].length;
  }

  if (!property) {
    return undefined;
  }

  property = toKebabCase(property).toLowerCase();

  if (HORIZONTAL_PROPERTY.test(property)) return 'x';
  if (VERTICAL_PROPERTY.test(property)) return 'y';
  if (!BOX_SHORTHAND.test(property)) return undefined;

  const valueEnd = input.slice(valueStart).search(/[;}]/);
  const value = input.slice(
    valueStart,
    valueEnd === -1 ? undefined : valueStart + valueEnd,
  );
  const ranges = splitTopLevelValues(value);
  const position = ranges.findIndex(
    ([from, to]) => offset - valueStart >= from && offset - valueStart < to,
  );

  return SHORTHAND_AXES[ranges.length]?.[position];
};

export type RenameWdsVariablesContext = {
  /**
   * 문자열에 `prop:` 선언이 없을 때 쓸 CSS 속성 이름 (`paddingLeft`,
   * `padding-left` 모두 가능) — 인라인 스타일 객체의 key 등.
   */
  property?: string;
  /** 축을 정하지 못한 `--wds-modal-content-margin`마다 호출된다. */
  onUnresolved?: (excerpt: string) => void;
};

/**
 * Rewrites every `--wds-*` token inside an arbitrary string (CSS text, a
 * `var(...)` reference, an inline-style key, etc.). Returns the input unchanged
 * when no token is present.
 */
export const renameWdsVariablesInString = (
  input: string,
  context: RenameWdsVariablesContext = {},
): string => {
  return input.replace(WDS_VARIABLE_PATTERN, (token, offset: number) => {
    if (token !== SPLIT_MODAL_CONTENT_MARGIN) {
      return renameWdsVariable(token);
    }

    // 정의(`--wds-modal-content-margin: 20px`, 인라인 스타일 key)는 두 축을
    // 함께 바꾸던 값이라 한쪽으로 정할 수 없다.
    const isDefinition = /^\s*:/.test(input.slice(offset + token.length));
    const axis = isDefinition
      ? undefined
      : resolveAxis(input, offset, context.property);

    if (axis) {
      return `--modal-content-margin-${axis}`;
    }

    const lineStart = input.lastIndexOf('\n', offset) + 1;
    const lineEnd = input.indexOf('\n', offset);

    context.onUnresolved?.(
      input.slice(lineStart, lineEnd === -1 ? undefined : lineEnd).trim(),
    );

    return renameWdsVariable(token);
  });
};

/**
 * Fully expanded old → new map for the known 3.x variables. Useful for
 * validation, documentation, and generating the library `sed` rules.
 */
export const CSS_VARIABLE_MAP: Record<string, string> = Object.fromEntries(
  KNOWN_WDS_VARIABLES.map((name) => [name, renameWdsVariable(name)]),
);
