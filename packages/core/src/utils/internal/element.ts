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
    offsetSize: 'offsetWidth',
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
    offsetSize: 'offsetHeight',
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

  // Rects are in screen pixels, while scroll offsets, `scroll-padding` and
  // `scroll-margin` are in layout pixels. Under a scaled ancestor (e.g. a
  // modal's scale-in animation) the two differ, so convert the rects first.
  const scale =
    viewport[keys.offsetSize] > 0 && viewportRect[keys.size] > 0
      ? viewportRect[keys.size] / viewport[keys.offsetSize]
      : 1;
  const viewportSize = viewportRect[keys.size] / scale;
  const elementSize = elementRect[keys.size] / scale;

  const viewportStart =
    viewportRect[keys.start] / scale +
    resolveScrollLength(viewportStyle[keys.paddingStart], viewportSize);
  const viewportEnd =
    viewportRect[keys.end] / scale -
    resolveScrollLength(viewportStyle[keys.paddingEnd], viewportSize);
  const elementStart =
    elementRect[keys.start] / scale -
    resolveScrollLength(elementStyle[keys.marginStart], elementSize);
  const elementEnd =
    elementRect[keys.end] / scale +
    resolveScrollLength(elementStyle[keys.marginEnd], elementSize);

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
