import { cleanup, render, screen } from '@testing-library/react';

import { Pagination } from '.';

describe('when given pagination navigation buttons', () => {
  afterEach(() => {
    cleanup();
  });

  // interactionOverflow: the layout is the icon — small 16, compact xlarge 24.
  it.each([
    ['extended', '16px'],
    ['minimize', '16px'],
    ['compact', '24px'],
  ] as const)(
    'should render them with interactionOverflow in %s',
    (variant, width) => {
      render(<Pagination variant={variant} defaultPage={2} totalPages={10} />);

      for (const label of ['Previous page', 'Next page']) {
        expect(
          window.getComputedStyle(screen.getByLabelText(label)).width,
        ).toBe(width);
      }
    },
  );
});
