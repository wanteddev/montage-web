import { cleanup, render, screen } from '@testing-library/react';

import { SectionMessage } from '.';

describe('when given section message close button', () => {
  afterEach(() => {
    cleanup();
  });

  // large + interactionOverflow: the layout is the 20px icon.
  it('should render it at large size with interactionOverflow', () => {
    render(<SectionMessage closeButton>Message</SectionMessage>);

    expect(
      window.getComputedStyle(screen.getByLabelText('Close message')).width,
    ).toBe('20px');
  });
});
