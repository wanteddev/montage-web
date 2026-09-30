import { cleanup, render, screen } from '@testing-library/react';

import { Pagination } from '.';

describe('when given pagination navigation buttons', () => {
  afterEach(() => {
    cleanup();
  });

  // small + interactionOverflow: the layout is the 16px icon in every variant.
  it.each(['extended', 'compact', 'minimize'] as const)(
    'should render them at small size with interactionOverflow in %s',
    (variant) => {
      render(<Pagination variant={variant} defaultPage={2} totalPages={10} />);

      for (const label of ['Previous page', 'Next page']) {
        expect(
          window.getComputedStyle(screen.getByLabelText(label)).width,
        ).toBe('16px');
      }
    },
  );
});
