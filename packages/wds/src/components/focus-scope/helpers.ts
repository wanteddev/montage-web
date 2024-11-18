/**
 * Most of this file is based on code from @radix-ui/react-focus-scope.
 * MIT Licensed, Copyright (c) 2022 WorkOS

 * https://github.com/radix-ui/primitives/blob/main/packages/react/focus-scope/src/FocusScope.tsx
 */
type FocusableTarget = HTMLElement | { focus(): void };

export const focus = (
  element?: FocusableTarget | null,
  { select = false } = {},
) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    if (
      element !== previouslyFocusedElement &&
      isSelectableInput(element) &&
      select
    )
      element.select();
  }
};

export const focusFirst = (
  candidates: Array<HTMLElement>,
  { select = false } = {},
) => {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement) return;
  }
};

export const getTabbableEdges = (container: HTMLElement) => {
  const candidates = getTabbableCandidates(container);

  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);

  return [first, last] as const;
};

export const getTabbableCandidates = (container: HTMLElement) => {
  const nodes: Array<HTMLElement> = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: any) => {
      const isHiddenInput = node.tagName === 'INPUT' && node.type === 'hidden';
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;

      return node.tabIndex >= 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });
  while (walker.nextNode()) nodes.push(walker.currentNode as HTMLElement);

  return nodes;
};

export const getTabbableForFirstFocus = (nodes: Array<HTMLElement>) => {
  return nodes.sort((a, b) => {
    const aIgnoreFirstFocus =
      a.getAttribute('wds-ignore-first-focus') === 'true';
    const bIgnoreFirstFocus =
      b.getAttribute('wds-ignore-first-focus') === 'true';

    if (aIgnoreFirstFocus && !bIgnoreFirstFocus) {
      return 1;
    } else if (!aIgnoreFirstFocus && bIgnoreFirstFocus) {
      return -1;
    }

    return 0;
  });
};

export const arrayRemove = <T>(array: Array<T>, item: T) => {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
};

export const removeLinks = (items: Array<HTMLElement>) => {
  return items.filter((item) => item.tagName !== 'A');
};

const findVisible = (elements: Array<HTMLElement>, container: HTMLElement) => {
  for (const element of elements) {
    // we stop checking if it's hidden at the `container` level (excluding)
    if (!isHidden(element, { upTo: container })) return element;
  }
};

const isHidden = (node: HTMLElement, { upTo }: { upTo?: HTMLElement }) => {
  if (getComputedStyle(node).visibility === 'hidden') return true;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (node) {
    if (upTo !== undefined && node === upTo) return false;
    if (getComputedStyle(node).display === 'none') return true;
    node = node.parentElement as HTMLElement;
  }
  return false;
};

const isSelectableInput = (
  element: any,
): element is FocusableTarget & { select: () => void } => {
  return element instanceof HTMLInputElement && 'select' in element;
};
