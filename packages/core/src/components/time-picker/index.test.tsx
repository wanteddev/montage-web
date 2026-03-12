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

import { TimePicker } from '.';

Object.defineProperty(window.Element.prototype, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

describe('when given time picker component', () => {
  const defaultProps = {
    defaultValue: new Date('2025-01-01T10:30:00'),
    onChange: vi.fn(),
    locale: 'en-US',
    format: 'HH:mm:ss',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should navigate between time lists with arrow keys', async () => {
    render(<TimePicker {...defaultProps} data-testid="time-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('time-picker');

    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveValue('09:30:00');

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveValue('10:30:00');

    fireEvent.keyDown(input, { key: 'End' });

    expect(input).toHaveValue('23:30:00');

    fireEvent.keyDown(input, { key: 'Home' });

    expect(input).toHaveValue('00:30:00');

    fireEvent.keyDown(input, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(input.selectionStart).toBe(3);
      expect(input.selectionEnd).toBe(5);
    });

    fireEvent.keyDown(input, { key: 'ArrowLeft' });

    await waitFor(() => {
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(2);
    });
  });

  it('should pass accessibility tests', async () => {
    render(<TimePicker {...defaultProps} data-testid="time-picker" />);

    expect(await axe(screen.getByTestId('time-picker'))).toHaveNoViolations();
  });

  it('should pass accessibility test with form field', async () => {
    render(
      <FormField>
        <FormLabel>Label</FormLabel>
        <FormControl>
          <TimePicker {...defaultProps} data-testid="time-picker" />
        </FormControl>
        <FormMessage>Message</FormMessage>
      </FormField>,
    );

    expect(await axe(screen.getByTestId('time-picker'))).toHaveNoViolations();
  });

  it('should render with custom format', () => {
    render(
      <TimePicker
        {...defaultProps}
        format="A hh:mm:ss"
        data-testid="time-picker"
      />,
    );

    expect(screen.getByTestId('time-picker')).toBeInTheDocument();
    expect(screen.getByTestId('time-picker')).toHaveValue('AM 10:30:00');
  });

  it('should render with custom locale', () => {
    render(
      <TimePicker
        {...defaultProps}
        format="A hh:mm:ss"
        locale="ko-KR"
        data-testid="time-picker"
      />,
    );

    expect(screen.getByTestId('time-picker')).toBeInTheDocument();
    expect(screen.getByTestId('time-picker')).toHaveValue('오전 10:30:00');
  });

  it('should render with custom timezone', () => {
    render(
      <TimePicker
        {...defaultProps}
        defaultValue={new Date('2025-01-01 10:30:00 GMT+0900')}
        format="A hh:mm:ss"
        locale="ko-KR"
        timezone="UTC"
        data-testid="time-picker"
      />,
    );

    expect(screen.getByTestId('time-picker')).toBeInTheDocument();
    expect(screen.getByTestId('time-picker')).toHaveValue('오전 01:30:00');
  });

  it('should render with 12-hour format', () => {
    render(
      <TimePicker {...defaultProps} format="hh:mm" data-testid="time-picker" />,
    );

    const input = screen.getByTestId<HTMLInputElement>('time-picker');

    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'End' });

    expect(input).toHaveValue('12:30');
  });

  it('should open time-view when clock icon is clicked', async () => {
    render(
      <TimePicker {...defaultProps} format="hh:mm" data-testid="time-picker" />,
    );

    fireEvent.click(screen.getByLabelText('Toggle time picker'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(document.activeElement).toHaveTextContent('10');
  });

  it('should handle paste events', () => {
    render(<TimePicker {...defaultProps} data-testid="time-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('time-picker');
    fireEvent.focus(input);

    input.setSelectionRange(0, input.value.length);

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '14:30:00',
      },
    });

    expect(input).toHaveValue('14:30:00');

    input.setSelectionRange(0, input.value.length);

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '26:00:00',
      },
    });

    expect(input).toHaveValue('14:30:00');

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '23',
      },
    });

    expect(input).toHaveValue('14:30:23');

    input.setSelectionRange(0, input.value.length);

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '10:00:00',
      },
    });

    expect(input).toHaveValue('10:00:00');
  });
});
