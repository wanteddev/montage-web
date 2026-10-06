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

describe('when given section message leading content', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the status icon of the variant by default', () => {
    render(<SectionMessage variant="positive">Message</SectionMessage>);

    expect(screen.getByLabelText('positive')).toBeInTheDocument();
  });

  it('should hide the status icon when leadingContent is null', () => {
    render(
      <SectionMessage variant="positive" leadingContent={null}>
        Message
      </SectionMessage>,
    );

    expect(screen.queryByLabelText('positive')).not.toBeInTheDocument();
  });

  it('should render the given leadingContent instead of the status icon', () => {
    render(
      <SectionMessage
        variant="positive"
        leadingContent={<span aria-label="custom icon" />}
      >
        Message
      </SectionMessage>,
    );

    expect(screen.getByLabelText('custom icon')).toBeInTheDocument();
    expect(screen.queryByLabelText('positive')).not.toBeInTheDocument();
  });
});
