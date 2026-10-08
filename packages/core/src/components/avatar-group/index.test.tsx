import { cleanup, render } from '@testing-library/react';

import { Avatar } from '../avatar';
import { TextButton } from '../text-button';

import { AvatarGroup, AvatarGroupContent } from '.';

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

describe('when given more avatars than the limit', () => {
  afterEach(() => {
    cleanup();
  });

  const avatars = (from: number, count: number) =>
    Array.from({ length: count }, (_, i) => <Avatar key={from + i} />);
  const countAvatars = () =>
    document.querySelectorAll('[data-component="avatar"]').length;

  it('should render at most five', () => {
    render(<AvatarGroup>{avatars(0, 8)}</AvatarGroup>);
    expect(countAvatars()).toBe(5);
  });

  it('should count avatars inside fragments too', () => {
    render(
      <AvatarGroup>
        <>{avatars(0, 3)}</>
        <>
          <>{avatars(3, 4)}</>
        </>
      </AvatarGroup>,
    );
    expect(countAvatars()).toBe(5);
  });
});
