import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { FormControl, FormField, FormLabel, FormMessage } from '../form';

import { DatePicker } from '.';

Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

describe('when given date picker component', () => {
  const defaultProps = {
    defaultValue: new Date('2025-01-01T10:30:00'),
    onChange: vi.fn(),
    locale: 'en-US',
    format: 'YYYY.MM.DD',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should navigate between date lists with arrow keys', async () => {
    render(<DatePicker {...defaultProps} data-testid="date-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('date-picker');

    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveValue('2024.01.01');

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveValue('2025.01.01');

    fireEvent.keyDown(input, { key: 'End' });

    expect(input).toHaveValue('2100.01.01');

    fireEvent.keyDown(input, { key: 'Home' });

    expect(input).toHaveValue('1900.01.01');

    fireEvent.keyDown(input, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(input.selectionStart).toBe(5);
      expect(input.selectionEnd).toBe(7);
    });

    fireEvent.keyDown(input, { key: 'ArrowLeft' });

    await waitFor(() => {
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(4);
    });
  });

  it('should pass accessibility tests', async () => {
    render(<DatePicker {...defaultProps} data-testid="date-picker" />);

    expect(await axe(screen.getByTestId('date-picker'))).toHaveNoViolations();
  });

  it('should pass accessibility test with form field', async () => {
    render(
      <FormField>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <DatePicker {...defaultProps} data-testid="date-picker" />
        </FormControl>
        <FormMessage>Message</FormMessage>
      </FormField>,
    );

    expect(await axe(screen.getByTestId('date-picker'))).toHaveNoViolations();
  });

  it('should render with custom format', () => {
    render(
      <DatePicker
        {...defaultProps}
        format="YYYY.MMM.DD"
        data-testid="date-picker"
      />,
    );

    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker')).toHaveValue('2025.Jan.01');
  });

  it('should render with custom timezone', () => {
    render(
      <DatePicker
        {...defaultProps}
        defaultValue={new Date('2025-01-01 01:30:00 GMT+0900')}
        timezone="UTC"
        data-testid="date-picker"
      />,
    );

    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker')).toHaveValue('2024.12.31');
  });

  it('should open date calendar when calendar icon is clicked', () => {
    render(<DatePicker {...defaultProps} data-testid="date-picker" />);

    fireEvent.click(screen.getByLabelText('Toggle date picker'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should handle paste events', () => {
    render(<DatePicker {...defaultProps} data-testid="date-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('date-picker');
    fireEvent.focus(input);

    input.setSelectionRange(0, input.value.length);

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '2025.05.01',
      },
    });

    expect(input).toHaveValue('2025.05.01');

    input.setSelectionRange(0, input.value.length);

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '2999.12.31',
      },
    });

    expect(input).toHaveValue('2999.12.31');

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '23',
      },
    });

    expect(input).toHaveValue('2999.12.23');

    input.setSelectionRange(0, input.value.length);

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '2050.12.01',
      },
    });

    expect(input).toHaveValue('2050.12.01');
  });
});
