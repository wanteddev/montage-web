import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import {
  FormControl,
  FormControlField,
  FormControlLabel,
  FormControlMessage,
} from '../form-control';

import { TextField } from '.';

describe('when given text field component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should focus input when wrapper is clicked', async () => {
    const { container } = render(<TextField data-testid="text-field" />);

    const wrapper = container.querySelector<HTMLElement>(
      '[data-component="text-field"]',
    )!;

    fireEvent.click(wrapper);

    await waitFor(() => {
      expect(screen.getByTestId('text-field')).toHaveFocus();
    });
  });

  it('should pass accessibility test with form control', async () => {
    render(
      <FormControl>
        <FormControlLabel>Label</FormControlLabel>
        <FormControlField>
          <TextField
            data-testid="text-field"
            readOnly={false}
            status="normal"
          />
        </FormControlField>
        <FormControlMessage>Message</FormControlMessage>
      </FormControl>,
    );

    expect(await axe(screen.getByTestId('text-field'))).toHaveNoViolations();
  });
});
