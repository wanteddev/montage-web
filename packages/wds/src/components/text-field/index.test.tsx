import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import { FormControl, FormField, FormLabel, FormMessage } from '../form';

import { TextField } from '.';

describe('when given text field component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should focus input when wrapper is clicked', async () => {
    const { container } = render(<TextField data-testid="text-field" />);

    const wrapper = container.querySelector<HTMLElement>(
      '[wds-component="text-field"]',
    )!;

    fireEvent.click(wrapper);

    await waitFor(() => {
      expect(screen.getByTestId('text-field')).toHaveFocus();
    });
  });

  it('should pass accessibility test with form field', async () => {
    render(
      <FormField>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <TextField
            data-testid="text-field"
            readOnly={false}
            invalid={false}
          />
        </FormControl>
        <FormMessage>Message</FormMessage>
      </FormField>,
    );

    expect(await axe(screen.getByTestId('text-field'))).toHaveNoViolations();
  });
});
