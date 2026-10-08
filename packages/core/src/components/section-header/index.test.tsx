import { cleanup, render, screen } from '@testing-library/react';

import { IconButton } from '../icon-button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

import { SectionHeader } from '.';

import type { ReactElement } from 'react';

describe('when given icon buttons inside section header contents', () => {
  afterEach(() => {
    cleanup();
  });

  // xlarge + interactionOverflow: the layout is the 24px icon.
  it('should render them at xlarge size with interactionOverflow', () => {
    render(
      <SectionHeader
        headingContent={
          <IconButton aria-label="Heading">
            <svg />
          </IconButton>
        }
        trailingContent={
          <IconButton aria-label="Trailing">
            <svg />
          </IconButton>
        }
      >
        Title
      </SectionHeader>,
    );

    for (const label of ['Heading', 'Trailing']) {
      expect(window.getComputedStyle(screen.getByLabelText(label)).width).toBe(
        '24px',
      );
    }
  });
});

describe('when an overlay is opened from a section header slot', () => {
  afterEach(() => {
    cleanup();
  });

  // The overlay renders elsewhere (portal); the slot's IconButton defaults
  // must not reach the buttons inside it.
  const popover = (
    <Popover defaultOpen>
      <PopoverTrigger>
        <button type="button">Open</button>
      </PopoverTrigger>
      <PopoverContent heading="Heading" closeButton>
        <IconButton aria-label="Inside">
          <svg />
        </IconButton>
      </PopoverContent>
    </Popover>
  );

  const classNamesOf = (ui: ReactElement) => {
    const { unmount } = render(ui);
    const classNames = ['Inside', 'Close dialog'].map(
      (name) =>
        screen.queryByRole('button', { name })?.getAttribute('class') ?? null,
    );
    unmount();
    return classNames;
  };

  it('should render the overlay buttons as if the overlay were opened anywhere else', () => {
    const standalone = classNamesOf(popover);
    const inSlot = classNamesOf(<SectionHeader trailingContent={popover} />);

    expect(standalone).not.toContain(null);
    expect(inSlot).toEqual(standalone);
  });
});
