import { isElementDisabled } from '../../utils/internal/element';

/** The enabled items of a menu popup's own list, in DOM order. */
export const getFocusableItems = (viewport: HTMLElement) =>
  Array.from(
    viewport.querySelectorAll<HTMLElement>('[data-radix-collection-item]'),
  ).filter((item) => !isElementDisabled(item));
