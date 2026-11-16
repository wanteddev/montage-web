export const isElementDisabled = (element: HTMLElement) => {
  return (
    (element.hasAttribute('disabled') &&
      element.getAttribute('disabled')?.toString() !== 'false') ||
    element.ariaDisabled?.toString() === 'true'
  );
};

// Resolves a computed `scroll-padding-*` / `scroll-margin-*` value to px.
// `auto` and unparsable values resolve to 0. Percentages are relative to `base`.
const resolveScrollLength = (value: string, base: number) => {
  const parsed = parseFloat(value);

  if (Number.isNaN(parsed)) {
    return 0;
  }

  return value.trim().endsWith('%') ? (parsed / 100) * base : parsed;
};

type ScrollAxis = 'x' | 'y';

const SCROLL_AXIS_KEYS = {
  x: {
    start: 'left',
    end: 'right',
    size: 'width',
    paddingStart: 'scrollPaddingLeft',
    paddingEnd: 'scrollPaddingRight',
    marginStart: 'scrollMarginLeft',
    marginEnd: 'scrollMarginRight',
    scroll: 'scrollLeft',
  },
  y: {
    start: 'top',
    end: 'bottom',
    size: 'height',
    paddingStart: 'scrollPaddingTop',
    paddingEnd: 'scrollPaddingBottom',
    marginStart: 'scrollMarginTop',
    marginEnd: 'scrollMarginBottom',
    scroll: 'scrollTop',
  },
} as const;

export interface ScrollIntoViewOptions {
  /** Scroll direction. Defaults to `'y'`. */
  axis?: ScrollAxis;
  /** Where the target lands in the scrollport. Defaults to `'center'`. */
  align?: 'start' | 'center';
  /** Skip scrolling when the target is already fully visible. Defaults to `false`. */
  ifNeeded?: boolean;
}

// Scrolls only `viewport` (never its ancestors) so that `element` is aligned
// inside it. Same as the native algorithm: the scrollport is shrunk by
// `scroll-padding` and the target is grown by `scroll-margin` before aligning.
export const scrollIntoViewWithin = (
  viewport: HTMLElement,
  element: HTMLElement,
  {
    axis = 'y',
    align = 'center',
    ifNeeded = false,
  }: ScrollIntoViewOptions = {},
) => {
  const keys = SCROLL_AXIS_KEYS[axis];
  const viewportRect = viewport.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const viewportStyle = getComputedStyle(viewport);
  const elementStyle = getComputedStyle(element);

  const viewportStart =
    viewportRect[keys.start] +
    resolveScrollLength(
      viewportStyle[keys.paddingStart],
      viewportRect[keys.size],
    );
  const viewportEnd =
    viewportRect[keys.end] -
    resolveScrollLength(
      viewportStyle[keys.paddingEnd],
      viewportRect[keys.size],
    );
  const elementStart =
    elementRect[keys.start] -
    resolveScrollLength(elementStyle[keys.marginStart], elementRect[keys.size]);
  const elementEnd =
    elementRect[keys.end] +
    resolveScrollLength(elementStyle[keys.marginEnd], elementRect[keys.size]);

  if (ifNeeded && elementStart >= viewportStart && elementEnd <= viewportEnd) {
    return;
  }

  viewport[keys.scroll] +=
    align === 'start'
      ? elementStart - viewportStart
      : (elementStart + elementEnd) / 2 - (viewportStart + viewportEnd) / 2;
};

// Centers `element` in `viewport` only when it is not fully visible.
export const scrollIntoViewIfNeeded = (
  viewport: HTMLElement,
  element: HTMLElement,
) => scrollIntoViewWithin(viewport, element, { ifNeeded: true });

// Focuses `element` without letting the browser scroll any ancestor. A bare
// `focus()` walks every scroll container up to the document, which throws a
// zoomed-in page around; instead only the nearest ScrollArea viewport is
// adjusted (when needed) before focusing with `preventScroll`.
export const focusIntoView = (element: HTMLElement | null | undefined) => {
  if (!element) {
    return;
  }

  const viewport = element.closest<HTMLElement>(
    '[data-radix-scroll-area-viewport]',
  );

  if (viewport) {
    scrollIntoViewIfNeeded(viewport, element);
  }

  element.focus({ preventScroll: true });
};
