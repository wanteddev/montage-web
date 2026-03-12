import type { AutocompleteCollectionItem } from './types';

export const focusSelectedOption = (
  option: AutocompleteCollectionItem | undefined,
  items: Array<AutocompleteCollectionItem>,
  focusVisible?: boolean,
) => {
  if (!option) {
    return;
  }

  const element = option.ref.current;
  const viewport = element?.closest('[data-radix-scroll-area-viewport]');

  if (!viewport || !element) return;

  setAttributeSelection(element, items, focusVisible);

  if (viewport.scrollHeight > viewport.clientHeight) {
    const scrollBottom = viewport.clientHeight + viewport.scrollTop;
    const elementBottom = element.offsetTop + element.offsetHeight;
    if (elementBottom > scrollBottom) {
      viewport.scrollTop = elementBottom - viewport.clientHeight;
    } else if (
      element.offsetTop - element.offsetHeight * 0 <
      viewport.scrollTop
    ) {
      viewport.scrollTop = element.offsetTop - element.offsetHeight * 0;
    }
  }
};

export const setAttributeSelection = (
  element: HTMLElement | null,
  items: Array<AutocompleteCollectionItem>,
  focusVisible?: boolean,
) => {
  resetAttributeSelection(items);

  if (focusVisible) {
    element?.setAttribute('data-focus-visible', 'true');
  }
  element?.setAttribute('data-focus', 'true');
};

export const resetAttributeSelection = (
  items: Array<AutocompleteCollectionItem>,
) => {
  items.forEach((item) => {
    item.ref.current?.removeAttribute('data-focus');
    item.ref.current?.removeAttribute('data-focus-visible');
  });
};
