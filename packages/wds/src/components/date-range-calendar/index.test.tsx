import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { axe } from 'vitest-axe';

import { DateRangeCalendar } from '.';

Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

describe('when given date range calendar component', () => {
  const defaultProps = {
    defaultValue: [
      new Date('2025-01-15T00:00:00'),
      new Date('2025-01-20T00:00:00'),
    ] as [Date, Date],
    onChange: vi.fn(),
    locale: 'en-US',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render day view by default', () => {
    render(<DateRangeCalendar {...defaultProps} />);

    const grid = screen.getByRole('grid', { name: 'Select day range' });
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveAttribute('aria-multiselectable');
    expect(screen.getByText('January 2025')).toBeInTheDocument();
  });

  it('should handle range selection with two clicks', () => {
    const onChange = vi.fn();
    const onChangeComplete = vi.fn();

    render(
      <DateRangeCalendar
        locale="en-US"
        onChange={onChange}
        onChangeComplete={onChangeComplete}
      />,
    );

    // First click sets start
    const day10 = screen.getByText('10');
    fireEvent.click(day10);

    expect(onChange).toHaveBeenCalledWith([expect.any(Date), undefined]);

    // Second click sets end
    const day20 = screen.getByText('20');
    fireEvent.click(day20);

    expect(onChangeComplete).toHaveBeenCalledWith([
      expect.any(Date),
      expect.any(Date),
    ]);
  });

  it('should swap start and end when end is before start', () => {
    const onChangeComplete = vi.fn();

    render(
      <DateRangeCalendar
        locale="en-US"
        onChange={vi.fn()}
        onChangeComplete={onChangeComplete}
      />,
    );

    // Click later date first
    fireEvent.click(screen.getByText('20'));
    // Click earlier date second
    fireEvent.click(screen.getByText('10'));

    const [start, end] = onChangeComplete.mock.calls[0]![0] as [Date, Date];
    expect(start.getDate()).toBeLessThanOrEqual(end.getDate());
  });

  it('should navigate months with arrow buttons', () => {
    render(<DateRangeCalendar {...defaultProps} />);

    const nextButton = screen.getByLabelText('Next month');
    const prevButton = screen.getByLabelText('Previous month');

    fireEvent.click(nextButton);
    expect(screen.getByText('February 2025')).toBeInTheDocument();

    fireEvent.click(prevButton);
    expect(screen.getByText('January 2025')).toBeInTheDocument();
  });

  it('should render multiple calendars when calendars prop is set', () => {
    render(<DateRangeCalendar {...defaultProps} calendars={2} />);

    expect(screen.getByText('January 2025')).toBeInTheDocument();
    expect(screen.getByText('February 2025')).toBeInTheDocument();
  });

  it('should not render other month dates', () => {
    render(
      <DateRangeCalendar
        defaultValue={[
          new Date('2025-02-15T00:00:00'),
          new Date('2025-02-20T00:00:00'),
        ]}
        locale="en-US"
      />,
    );

    const dayOnes = screen.getAllByText('1');
    expect(dayOnes).toHaveLength(1);
  });

  it('should handle keyboard navigation in day view', async () => {
    render(<DateRangeCalendar {...defaultProps} />);

    const day15 = screen.getByText('15');
    day15.focus();

    fireEvent.keyDown(day15, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(screen.getByText('16')).toHaveFocus();
    });
  });

  it('should render month view', () => {
    render(<DateRangeCalendar {...defaultProps} view="month" />);

    const grid = screen.getByRole('grid', { name: 'Select month range' });
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveAttribute('aria-multiselectable');
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Dec')).toBeInTheDocument();
  });

  it('should handle month range selection', () => {
    const onChange = vi.fn();
    const onChangeComplete = vi.fn();

    render(
      <DateRangeCalendar
        locale="en-US"
        view="month"
        onChange={onChange}
        onChangeComplete={onChangeComplete}
      />,
    );

    fireEvent.click(screen.getByText('Mar'));
    expect(onChange).toHaveBeenCalledWith([expect.any(Date), undefined]);

    fireEvent.click(screen.getByText('Jun'));
    expect(onChangeComplete).toHaveBeenCalledWith([
      expect.any(Date),
      expect.any(Date),
    ]);
  });

  it('should render year view', () => {
    render(<DateRangeCalendar {...defaultProps} view="year" />);

    const grid = screen.getByRole('grid', { name: 'Select year range' });
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveAttribute('aria-multiselectable');
    expect(screen.getByRole('gridcell', { name: '2025' })).toBeInTheDocument();
  });

  it('should handle year range selection', () => {
    const onChange = vi.fn();
    const onChangeComplete = vi.fn();

    render(
      <DateRangeCalendar
        locale="en-US"
        view="year"
        onChange={onChange}
        onChangeComplete={onChangeComplete}
      />,
    );

    fireEvent.click(screen.getByRole('gridcell', { name: '2024' }));
    expect(onChange).toHaveBeenCalledWith([expect.any(Date), undefined]);

    fireEvent.click(screen.getByRole('gridcell', { name: '2026' }));
    expect(onChangeComplete).toHaveBeenCalledWith([
      expect.any(Date),
      expect.any(Date),
    ]);
  });

  it('should handle keyboard navigation in year view', async () => {
    render(<DateRangeCalendar {...defaultProps} view="year" />);

    const year2025 = screen.getByRole('gridcell', { name: '2025' });
    year2025.focus();

    fireEvent.keyDown(year2025, { key: 'ArrowRight' });

    await waitFor(() => {
      expect(screen.getByRole('gridcell', { name: '2026' })).toHaveFocus();
    });
  });

  it('should disable navigation buttons at min/max boundaries', () => {
    render(
      <DateRangeCalendar
        {...defaultProps}
        min={new Date('2025-01-01')}
        max={new Date('2025-01-31')}
      />,
    );

    expect(screen.getByLabelText('Previous month')).toBeDisabled();
    expect(screen.getByLabelText('Next month')).toBeDisabled();
  });

  it('should handle controlled value', () => {
    const value: [Date, Date] = [
      new Date('2025-03-10T00:00:00'),
      new Date('2025-03-20T00:00:00'),
    ];

    render(<DateRangeCalendar {...defaultProps} value={value} />);

    expect(screen.getByText('March 2025')).toBeInTheDocument();
  });

  it('should show header label without view toggle button', () => {
    render(<DateRangeCalendar {...defaultProps} />);

    const headerLabel = screen.getByText('January 2025');

    expect(headerLabel.closest('button')).toBeNull();
  });

  it('should pass accessibility tests for day view', async () => {
    render(<DateRangeCalendar {...defaultProps} />);

    const rowgroup = screen.getByRole('rowgroup');
    expect(await axe(rowgroup)).toHaveNoViolations();
  });

  it('should pass accessibility tests for month view', async () => {
    render(<DateRangeCalendar {...defaultProps} view="month" />);

    const rows = screen.getAllByRole('row');
    for (const row of rows) {
      expect(await axe(row)).toHaveNoViolations();
    }
  });

  it('should pass accessibility tests for year view', async () => {
    render(<DateRangeCalendar {...defaultProps} view="year" />);

    const rows = screen.getAllByRole('row');
    for (const row of rows) {
      expect(await axe(row)).toHaveNoViolations();
    }
  });
});
