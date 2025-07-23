import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { FormControl, FormField, FormLabel, FormMessage } from '../form';

import { Switch } from '.';

describe('when given switch component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render virtual input when wrapped with form', async () => {
    const handleReset = vi.fn();

    render(
      <form data-testid="form" onReset={handleReset}>
        <Switch data-testid="switch" />
        <button data-testid="reset-button" type="reset">
          Reset
        </button>
      </form>,
    );

    const input = screen.getByTestId('form').querySelector('input');

    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();

    fireEvent.click(screen.getByTestId('switch'));

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
          <Switch data-testid="switch" />
        </FormControl>
        <FormMessage>Message</FormMessage>
      </FormField>,
    );

    expect(await axe(screen.getByTestId('switch'))).toHaveNoViolations();
  });
});
