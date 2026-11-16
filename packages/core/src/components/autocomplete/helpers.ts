import { scrollIntoViewIfNeeded } from '../../utils/internal/element';

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
  const viewport = element?.closest<HTMLElement>(
    '[data-radix-scroll-area-viewport]',
  );

  if (!viewport || !element) return;

  setAttributeSelection(element, items, focusVisible);

  scrollIntoViewIfNeeded(viewport, element);
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
