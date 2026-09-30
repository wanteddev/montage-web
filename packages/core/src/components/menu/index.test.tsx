import { cleanup, render } from '@testing-library/react';

import { Button } from '../button';
import { TextButton } from '../text-button';

import { MenuActionAreaContent } from '.';

import type { ReactElement } from 'react';

// Emotion class names are derived from the generated styles, so equal class
// names mean the slot default renders exactly like an explicit `size`.
const classNamesOf = (element: ReactElement) => {
  const { container, unmount } = render(element);
  const classNames = Array.from(
    container.querySelectorAll(
      '[data-testid="child"], [data-testid="child"] *',
    ),
  ).map((node) => node.getAttribute('class') ?? '');
  unmount();
  return classNames;
};

const textButton = (size?: 'small') => (
  <TextButton data-testid="child" size={size}>
    Text
  </TextButton>
);

describe('when given buttons inside menu action area content', () => {
  afterEach(() => {
    cleanup();
  });

  it.each([
    [
      'button',
      (size?: 'small') => (
        <Button data-testid="child" size={size}>
          Button
        </Button>
      ),
    ],
    ['text-button', textButton],
  ] as const)('should apply the small size in %s content', (variant, child) => {
    expect(
      classNamesOf(
        <MenuActionAreaContent variant={variant}>
          {child()}
        </MenuActionAreaContent>,
      ),
    ).toEqual(classNamesOf(child('small')));
  });
});
