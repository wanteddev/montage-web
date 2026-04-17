import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { DateRangePicker } from '.';

Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

describe('when given date range picker component', () => {
  const defaultProps = {
    defaultValue: [
      new Date('2025-01-15T00:00:00'),
      new Date('2025-02-20T00:00:00'),
    ] as [Date, Date],
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

  // --- Rendering ---

  it('should render with default range value', () => {
    render(<DateRangePicker {...defaultProps} data-testid="range-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    expect(input).toHaveValue('2025.01.15 - 2025.02.20');
  });

  it('should render empty when no value', () => {
    render(
      <DateRangePicker
        locale="en-US"
        format="YYYY.MM.DD"
        data-testid="range-picker"
      />,
    );

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    expect(input).toHaveValue('');
  });

  it('should show format placeholder on focus when empty', () => {
    render(
      <DateRangePicker
        locale="en-US"
        format="YYYY.MM.DD"
        data-testid="range-picker"
      />,
    );

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    fireEvent.focus(input);

    expect(input).toHaveValue('YYYY.MM.DD - YYYY.MM.DD');
  });

  // --- Keyboard section navigation ---

  it('should navigate between start date sections with arrow keys', async () => {
    render(<DateRangePicker {...defaultProps} data-testid="range-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    fireEvent.focus(input);

    await waitFor(() => {
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(4);
    });

    fireEvent.keyDown(input, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(input.selectionStart).toBe(5);
      expect(input.selectionEnd).toBe(7);
    });

    fireEvent.keyDown(input, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(input.selectionStart).toBe(8);
      expect(input.selectionEnd).toBe(10);
    });
  });

  it('should navigate from start to end date sections', async () => {
    render(<DateRangePicker {...defaultProps} data-testid="range-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });

    // "2025.01.15 - 2025.02.20" → end YYYY starts at 13
    await waitFor(() => {
      expect(input.selectionStart).toBe(13);
      expect(input.selectionEnd).toBe(17);
    });
  });

  it('should navigate from end to start date sections', async () => {
    render(<DateRangePicker {...defaultProps} data-testid="range-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    fireEvent.focus(input);

    // Navigate to end date YYYY
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });

    // ArrowLeft from end YYYY → start DD
    fireEvent.keyDown(input, { key: 'ArrowLeft' });

    await waitFor(() => {
      expect(input.selectionStart).toBe(8);
      expect(input.selectionEnd).toBe(10);
    });
  });

  // --- Value modification (start) ---

  it('should modify start date year with ArrowUp/Down', () => {
    render(<DateRangePicker {...defaultProps} data-testid="range-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveValue('2024.01.15 - 2025.02.20');

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveValue('2025.01.15 - 2025.02.20');
  });

  it('should modify start date year with Home/End', () => {
    render(<DateRangePicker {...defaultProps} data-testid="range-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'End' });

    expect(input).toHaveValue('2100.01.15 - 2025.02.20');

    fireEvent.keyDown(input, { key: 'Home' });

    expect(input).toHaveValue('1900.01.15 - 2025.02.20');
  });

  // --- Value modification (end) ---

  it('should modify end date year with ArrowUp/Down', async () => {
    render(<DateRangePicker {...defaultProps} data-testid="range-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    fireEvent.focus(input);

    // Navigate to end YYYY
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(input.selectionStart).toBe(13);
    });

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(input).toHaveValue('2025.01.15 - 2024.02.20');

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveValue('2025.01.15 - 2025.02.20');
  });

  // --- Backspace ---

  it('should clear start section with Backspace', () => {
    render(<DateRangePicker {...defaultProps} data-testid="range-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(input).toHaveValue('YYYY.01.15 - 2025.02.20');
  });

  it('should clear end section with Backspace', async () => {
    render(<DateRangePicker {...defaultProps} data-testid="range-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    fireEvent.focus(input);

    // Navigate to end YYYY
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });
    fireEvent.keyDown(input, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(input.selectionStart).toBe(13);
    });

    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(input).toHaveValue('2025.01.15 - YYYY.02.20');
  });

  // --- Paste ---

  it('should handle paste for full range', () => {
    render(<DateRangePicker {...defaultProps} data-testid="range-picker" />);

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    fireEvent.focus(input);

    input.setSelectionRange(0, input.value.length);

    fireEvent.paste(input, {
      clipboardData: {
        getData: () => '2024.06.01 - 2024.12.31',
      },
    });

    expect(input).toHaveValue('2024.06.01 - 2024.12.31');
  });

  // --- Calendar popup ---

  it('should open calendar when calendar icon is clicked', () => {
    render(<DateRangePicker {...defaultProps} data-testid="range-picker" />);

    fireEvent.click(screen.getByLabelText('Toggle date range picker'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  // --- Invalid state ---

  it('should be invalid when start > end in uncontrolled mode', () => {
    render(
      <DateRangePicker
        defaultValue={[
          new Date('2025-03-01T00:00:00'),
          new Date('2025-01-01T00:00:00'),
        ]}
        locale="en-US"
        format="YYYY.MM.DD"
        data-testid="range-picker"
      />,
    );

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should not be invalid when start equals end', () => {
    const sameDate = new Date('2025-01-15T00:00:00');

    render(
      <DateRangePicker
        defaultValue={[sameDate, sameDate]}
        locale="en-US"
        format="YYYY.MM.DD"
        data-testid="range-picker"
      />,
    );

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    expect(input).not.toHaveAttribute('aria-invalid', 'true');
  });

  // --- Disabled / ReadOnly ---

  it('should not modify value when disabled', () => {
    render(
      <DateRangePicker {...defaultProps} disabled data-testid="range-picker" />,
    );

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    expect(input).toBeDisabled();
  });

  it('should not modify value when readOnly', () => {
    render(
      <DateRangePicker {...defaultProps} readOnly data-testid="range-picker" />,
    );

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: 'ArrowUp' });

    expect(input).toHaveValue('2025.01.15 - 2025.02.20');
  });

  // --- Custom format ---

  it('should render with custom format', () => {
    render(
      <DateRangePicker
        {...defaultProps}
        format="DD/MM/YYYY"
        data-testid="range-picker"
      />,
    );

    const input = screen.getByTestId<HTMLInputElement>('range-picker');

    expect(input).toHaveValue('15/01/2025 - 20/02/2025');
  });

  // --- View prop ---

  it('should pass view prop to calendar', () => {
    render(
      <DateRangePicker
        {...defaultProps}
        view="month"
        data-testid="range-picker"
      />,
    );

    fireEvent.click(screen.getByLabelText('Toggle date range picker'));

    expect(screen.getAllByRole('grid').length).toBeGreaterThanOrEqual(1);
  });
});
