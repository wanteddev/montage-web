import { cleanup, render, screen } from '@testing-library/react';

import { FormControl } from '../form-control';

import { SearchField } from '.';

describe('when given search field reset button', () => {
  afterEach(() => {
    cleanup();
  });

  const resetWidth = () =>
    window.getComputedStyle(screen.getByLabelText('Reset search')).width;

  // interactionOverflow: the layout is the icon (large 20, medium 18).
  it.each([
    ['large', '20px'],
    ['medium', '18px'],
  ] as const)('should size the reset button by the %s field', (size, width) => {
    render(<SearchField size={size} />);

    expect(resetWidth()).toBe(width);
  });

  it('should follow the form control size', () => {
    render(
      <FormControl size="medium">
        <SearchField />
      </FormControl>,
    );

    expect(resetWidth()).toBe('18px');
  });
});
