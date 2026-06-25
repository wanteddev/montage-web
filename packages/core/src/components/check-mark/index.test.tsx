import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import {
  FormControl,
  FormControlField,
  FormControlLabel,
  FormControlMessage,
} from '../form-control';

import { CheckMark } from '.';

describe('when given check mark component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render virtual input when wrapped with form', async () => {
    const handleReset = vi.fn();

    render(
      <form data-testid="form" onReset={handleReset}>
        <CheckMark data-testid="check-mark" />
        <button data-testid="reset-button" type="reset">
          Reset
        </button>
      </form>,
    );

    const input = screen.getByTestId('form').querySelector('input');

    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();

    fireEvent.click(screen.getByTestId('check-mark'));

    expect(input).toBeChecked();

    fireEvent.click(screen.getByTestId('reset-button'));
    expect(input).not.toBeChecked();

    expect(handleReset).toHaveBeenCalled();
  });

  it('should pass accessibility test with form control', async () => {
    render(
      <FormControl>
        <FormControlLabel>Label</FormControlLabel>
        <FormControlField>
          <CheckMark data-testid="check-mark" />
        </FormControlField>
        <FormControlMessage>Message</FormControlMessage>
      </FormControl>,
    );

    expect(await axe(screen.getByTestId('check-mark'))).toHaveNoViolations();
  });
});
