import { useEffect } from 'react';

let count = 0;

const useFocusGuards = () => {
  useEffect(() => {
    const edgeGuards = document.querySelectorAll(
      '[wds-component="focus-guard"]',
    );
    document.body.insertAdjacentElement(
      'afterbegin',
      edgeGuards[0] ?? createFocusGuard(),
    );
    document.body.insertAdjacentElement(
      'beforeend',
      edgeGuards[1] ?? createFocusGuard(),
    );
    count++;

    return () => {
      if (count === 1) {
        document
          .querySelectorAll('[wds-component="focus-guard"]')
          .forEach((node) => node.remove());
      }
      count--;
    };
  }, []);
};

const createFocusGuard = () => {
  const element = document.createElement('span');
  element.setAttribute('wds-component', 'focus-guard');
  element.tabIndex = 0;
  element.style.cssText =
    'outline: none; opacity: 0; position: fixed; pointer-events: none';
  return element;
};

export default useFocusGuards;
