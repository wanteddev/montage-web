import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { Avatar } from '../avatar';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { IconButton } from '../icon-button';
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

describe('when given icon button inside list cell content', () => {
  afterEach(() => {
    cleanup();
  });

  // large + interactionOverflow: the layout is the 20px icon.
  it('should render it at large size with interactionOverflow', () => {
    render(
      inCell({
        trailingContent: (
          <ListCellContent variant="icon-button">
            <IconButton aria-label="Trailing">
              <svg />
            </IconButton>
          </ListCellContent>
        ),
      }),
    );

    expect(
      window.getComputedStyle(screen.getByLabelText('Trailing')).width,
    ).toBe('20px');
  });
});

describe('when the click target inside a list cell is an svg', () => {
  it('should forward the click to the leading control without throwing', () => {
    const onCheckedChange = vi.fn();
    const onError = vi.fn((event: ErrorEvent) => event.preventDefault());
    window.addEventListener('error', onError);

    render(
      <List>
        <ListCell
          selected
          leadingContent={
            <ListCellContent variant="checkbox">
              <Checkbox onCheckedChange={onCheckedChange} />
            </ListCellContent>
          }
        >
          Label
        </ListCell>
      </List>,
    );

    const icon = document.querySelector(
      '[data-role="list-cell-selected-icon-check"] svg',
    )!;
    fireEvent.click(icon.querySelector('path') ?? icon);

    window.removeEventListener('error', onError);
    expect(onError).not.toHaveBeenCalled();
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
  });
});
