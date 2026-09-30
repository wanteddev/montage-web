import { cleanup, render, screen } from '@testing-library/react';

import { IconButton } from '../icon-button';

import { SectionHeader } from '.';

describe('when given icon buttons inside section header contents', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render them at xlarge size without interactionOverflow', () => {
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
        'var(--dimension-36)',
      );
    }
  });
});
