import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { FormControl, FormField, FormLabel, FormMessage } from '../form';

import { Checkbox } from '.';

describe('when given checkbox component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render virtual input when wrapped with form', async () => {
    const handleReset = vi.fn();

    render(
      <form data-testid="form" onReset={handleReset}>
        <Checkbox data-testid="checkbox" />
        <button data-testid="reset-button" type="reset">
          Reset
        </button>
      </form>,
    );

    const input = screen.getByTestId('form').querySelector('input');

    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();

    fireEvent.click(screen.getByTestId('checkbox'));

    expect(input).toBeChecked();

    fireEvent.click(screen.getByTestId('reset-button'));
    expect(input).not.toBeChecked();

    expect(handleReset).toHaveBeenCalled();
  });

  it('should pass accessibility test with form field', async () => {
    render(
      <FormField>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <Checkbox data-testid="checkbox" />
        </FormControl>
        <FormMessage>Message</FormMessage>
      </FormField>,
    );

    expect(await axe(screen.getByTestId('checkbox'))).toHaveNoViolations();
  });
});
