import { forwardRef } from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import {
  FormControl,
  FormControlField,
  FormControlLabel,
  FormControlMessage,
} from '../form-control';

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

  it('should pass accessibility test with form control', async () => {
    render(
      <FormControl>
        <FormControlLabel>Label</FormControlLabel>
        <FormControlField>
          <DatePicker {...defaultProps} data-testid="date-picker" />
        </FormControlField>
        <FormControlMessage>Message</FormControlMessage>
      </FormControl>,
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

describe('when given date picker calendar button', () => {
  afterEach(() => {
    cleanup();
  });

  // interactionOverflow: the layout is the icon (large 20, medium 18).
  it.each([
    ['large', '20px'],
    ['medium', '18px'],
  ] as const)(
    'should size the calendar button by the %s field',
    (size, width) => {
      render(<DatePicker size={size} />);

      expect(
        window.getComputedStyle(screen.getByLabelText('Toggle date picker'))
          .width,
      ).toBe(width);
    },
  );
});

describe('when given a custom input to DatePicker', () => {
  it('should pass the responsive props through to it', () => {
    const receiveXs = vi.fn();

    const CustomInput = forwardRef<HTMLInputElement, { xs?: unknown }>(
      ({ xs }, ref) => {
        receiveXs(xs);
        return <input ref={ref} />;
      },
    );

    render(<DatePicker input={CustomInput as never} xs={{ width: '100px' }} />);

    expect(receiveXs).toHaveBeenLastCalledWith({ width: '100px' });
  });
});

describe('when the date picker calendar closes', () => {
  // Unmount restore runs in a setTimeout(0).
  const flush = () =>
    act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));

  const openCalendar = async () => {
    const toggle = screen.getByLabelText('Toggle date picker');
    toggle.focus();
    fireEvent.click(toggle);
    await flush();
  };

  afterEach(() => {
    cleanup();
  });

  // DateCalendar focuses a day on mount, before FocusScope used to capture
  // the element to restore focus to.
  it('should restore focus to the calendar button on Escape', async () => {
    render(<DatePicker locale="en-US" defaultValue={new Date('2025-01-01')} />);

    await openCalendar();
    expect(document.activeElement).toHaveAttribute('data-date', '1');

    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
    await flush();

    expect(screen.getByLabelText('Toggle date picker')).toHaveFocus();
  });

  it('should restore focus to the calendar button when a date is selected', async () => {
    render(<DatePicker locale="en-US" defaultValue={new Date('2025-01-01')} />);

    await openCalendar();
    fireEvent.click(screen.getByText('15'));
    await flush();

    expect(screen.getByLabelText('Toggle date picker')).toHaveFocus();
  });

  // A synchronous focus() here is pulled back by the still-trapped scope, so
  // consumers defer it until the picker has closed.
  it('should keep focus moved to the next field after onChangeComplete', async () => {
    render(
      <>
        <DatePicker
          locale="en-US"
          onChangeComplete={() =>
            setTimeout(() => screen.getByLabelText('next').focus())
          }
        />
        <input aria-label="next" />
      </>,
    );

    await openCalendar();
    fireEvent.click(screen.getByText('15'));
    await flush();

    expect(screen.getByLabelText('next')).toHaveFocus();
  });

  it('should respect a custom onUnmountAutoFocus', async () => {
    render(
      <>
        <button>other</button>
        <DatePicker
          locale="en-US"
          contentProps={{
            onUnmountAutoFocus: (event) => {
              event.preventDefault();
              screen.getByRole('button', { name: 'other' }).focus();
            },
          }}
        />
      </>,
    );

    await openCalendar();
    fireEvent.keyDown(document.activeElement!, { key: 'Escape' });
    await flush();

    expect(screen.getByRole('button', { name: 'other' })).toHaveFocus();
  });
});
