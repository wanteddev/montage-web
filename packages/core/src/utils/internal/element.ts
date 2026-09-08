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

export const scrollIntoViewIfNeeded = (
  viewport: HTMLElement,
  element: HTMLElement,
) => {
  const viewportRect = viewport.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const viewportStyle = getComputedStyle(viewport);
  const elementStyle = getComputedStyle(element);

  // Same as the native algorithm: the scrollport is shrunk by `scroll-padding`
  // and the target is grown by `scroll-margin` before comparing edges.
  const viewportTop =
    viewportRect.top +
    resolveScrollLength(viewportStyle.scrollPaddingTop, viewportRect.height);
  const viewportBottom =
    viewportRect.bottom -
    resolveScrollLength(viewportStyle.scrollPaddingBottom, viewportRect.height);
  const elementTop =
    elementRect.top -
    resolveScrollLength(elementStyle.scrollMarginTop, elementRect.height);
  const elementBottom =
    elementRect.bottom +
    resolveScrollLength(elementStyle.scrollMarginBottom, elementRect.height);

  const overflowTop = viewportTop - elementTop;
  const overflowBottom = elementBottom - viewportBottom;

  if (overflowTop <= 0 && overflowBottom <= 0) {
    return;
  }

  // Align the center of the target with the center of the scrollport.
  viewport.scrollTop +=
    (elementTop + elementBottom) / 2 - (viewportTop + viewportBottom) / 2;
};

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
