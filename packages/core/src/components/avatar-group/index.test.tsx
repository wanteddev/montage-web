import { cleanup, render } from '@testing-library/react';

import { TextButton } from '../text-button';

import { AvatarGroupContent } from '.';

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

describe('when given text button inside avatar group content', () => {
  afterEach(() => {
    cleanup();
  });

  it('should apply the small size', () => {
    expect(
      classNamesOf(
        <AvatarGroupContent variant="text-button">
          {textButton()}
        </AvatarGroupContent>,
      ),
    ).toEqual(
      classNamesOf(
        <AvatarGroupContent variant="text-button">
          {textButton('small')}
        </AvatarGroupContent>,
      ),
    );
  });
});
