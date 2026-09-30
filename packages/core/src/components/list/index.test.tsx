import { cleanup, render } from '@testing-library/react';

import { Avatar } from '../avatar';
import { Button } from '../button';
import { ContentBadge } from '../content-badge';
import { TextButton } from '../text-button';

import {
  List,
  ListCell,
  ListCellContent,
  ListCellExtraContent,
  ListCellLabelTrailing,
} from '.';

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

const inCell = (slots: {
  trailingContent?: ReactElement;
  labelTrailing?: ReactElement;
  extraContent?: ReactElement;
}) => (
  <List>
    <ListCell {...slots}>Label</ListCell>
  </List>
);

describe('when given components inside list cell slots', () => {
  afterEach(() => {
    cleanup();
  });

  it.each<
    [string, (size?: 'small' | 'medium') => ReactElement, 'small' | 'medium']
  >([
    [
      'text-button',
      (size) => (
        <TextButton data-testid="child" size={size}>
          Text
        </TextButton>
      ),
      'small',
    ],
    [
      'button',
      (size) => (
        <Button data-testid="child" size={size}>
          Button
        </Button>
      ),
      'small',
    ],
    ['avatar', (size) => <Avatar data-testid="child" size={size} />, 'medium'],
    [
      'content-badge',
      (size) => (
        <ContentBadge data-testid="child" size={size}>
          Badge
        </ContentBadge>
      ),
      'small',
    ],
  ])('should apply the default size in %s content', (variant, child, size) => {
    const slot = (element: ReactElement) =>
      inCell({
        trailingContent: (
          <ListCellContent
            variant={
              variant as 'text-button' | 'button' | 'avatar' | 'content-badge'
            }
          >
            {element}
          </ListCellContent>
        ),
      });

    expect(classNamesOf(slot(child()))).toEqual(
      classNamesOf(slot(child(size))),
    );
  });

  it('should apply the default size in content badge label trailing and extra content', () => {
    const badge = (size?: 'small') => (
      <ContentBadge data-testid="child" size={size}>
        Badge
      </ContentBadge>
    );

    expect(
      classNamesOf(
        inCell({
          labelTrailing: (
            <ListCellLabelTrailing variant="content-badge">
              {badge()}
            </ListCellLabelTrailing>
          ),
        }),
      ),
    ).toEqual(classNamesOf(badge('small')));
    expect(
      classNamesOf(
        inCell({
          extraContent: (
            <ListCellExtraContent variant="content-badge">
              {badge()}
            </ListCellExtraContent>
          ),
        }),
      ),
    ).toEqual(classNamesOf(badge('small')));
  });

  it('should keep the size declared on the component', () => {
    const badge = (
      <ContentBadge data-testid="child" size="medium">
        Badge
      </ContentBadge>
    );

    expect(
      classNamesOf(
        inCell({
          trailingContent: (
            <ListCellContent variant="content-badge">{badge}</ListCellContent>
          ),
        }),
      ),
    ).toEqual(classNamesOf(badge));
  });
});
