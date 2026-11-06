import { isElementDisabled } from '../../utils/internal/element';

/** Whether the key event comes from a field the user is typing into. */
export const isEditableTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

/** The enabled items of a menu popup's own list, in DOM order. */
export const getFocusableItems = (viewport: HTMLElement) =>
  Array.from(
    viewport.querySelectorAll<HTMLElement>('[data-radix-collection-item]'),
  ).filter((item) => !isElementDisabled(item));

export type Point = { x: number; y: number };
export type Polygon = Array<Point>;

/** Extends the exit point back over the trigger so jitter on the edge stays inside. */
const EXIT_POINT_BLEED = 5;

/**
 * The area the pointer may cross while traveling from a submenu trigger to
 * its content without closing the submenu: the triangle from the exit point
 * fanned out to the content's near edge, plus the content itself.
 */
export const getPointerGraceArea = (
  exitPoint: Point,
  triggerRect: DOMRect,
  contentRect: DOMRect,
): Polygon => {
  // Derived from the rects rather than `data-side` so callers do not depend
  // on how the popup was positioned (flipped, RTL, custom positioning).
  const isBelow = contentRect.top >= triggerRect.bottom;
  const isAbove = contentRect.bottom <= triggerRect.top;

  if (isBelow || isAbove) {
    // Fell back to the vertical axis on a narrow viewport.
    const bleed = isBelow ? -EXIT_POINT_BLEED : EXIT_POINT_BLEED;
    const nearEdge = isBelow ? contentRect.top : contentRect.bottom;
    const farEdge = isBelow ? contentRect.bottom : contentRect.top;

    return [
      { x: exitPoint.x, y: exitPoint.y + bleed },
      { x: contentRect.left, y: nearEdge },
      { x: contentRect.left, y: farEdge },
      { x: contentRect.right, y: farEdge },
      { x: contentRect.right, y: nearEdge },
    ];
  }

  const isContentOnRight =
    contentRect.left + contentRect.width / 2 >=
    triggerRect.left + triggerRect.width / 2;
  const bleed = isContentOnRight ? -EXIT_POINT_BLEED : EXIT_POINT_BLEED;
  const nearEdge = isContentOnRight ? contentRect.left : contentRect.right;
  const farEdge = isContentOnRight ? contentRect.right : contentRect.left;

  return [
    { x: exitPoint.x + bleed, y: exitPoint.y },
    { x: nearEdge, y: contentRect.top },
    { x: farEdge, y: contentRect.top },
    { x: farEdge, y: contentRect.bottom },
    { x: nearEdge, y: contentRect.bottom },
  ];
};

/** Ray casting: https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html */
export const isPointInPolygon = ({ x, y }: Point, polygon: Polygon) => {
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const { x: xi, y: yi } = polygon[i]!;
    const { x: xj, y: yj } = polygon[j]!;

    const intersects =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

    if (intersects) inside = !inside;
  }

  return inside;
};
