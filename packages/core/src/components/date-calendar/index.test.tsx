import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';

import { DateCalendar } from '.';

// Mock scrollIntoView for test environment
Object.defineProperty(window.Element.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

describe('when given date calendar component', () => {
  const defaultProps = {
    defaultValue: new Date('2025-01-01T10:00:00'),
    onChange: vi.fn(),
    locale: 'en-US',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should handle date selection', () => {
    const onChange = vi.fn();
    render(<DateCalendar {...defaultProps} onChange={onChange} />);

    const dateButton = screen.getByText('15');
    fireEvent.click(dateButton);

    expect(onChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('should navigate months with arrow buttons', () => {
    render(<DateCalendar {...defaultProps} />);

    const nextButton = screen.getByLabelText('Next month');
    const prevButton = screen.getByLabelText('Previous month');

    fireEvent.click(nextButton);
    expect(screen.getByText('February 2025')).toBeInTheDocument();

    fireEvent.click(prevButton);
    expect(screen.getByText('January 2025')).toBeInTheDocument();
  });

  it('should render year view when specified', () => {
    render(<DateCalendar {...defaultProps} view="year" views={['year']} />);

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('should handle year selection', () => {
    const onChange = vi.fn();
    render(
      <DateCalendar
        {...defaultProps}
        view="year"
        views={['year']}
        onChange={onChange}
      />,
    );

    const yearButton = screen.getByText('2026');
    fireEvent.click(yearButton);

    expect(onChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('should handle keyboard navigation in year view', () => {
    render(<DateCalendar {...defaultProps} view="year" views={['year']} />);

    const year2025Button = screen.getByText('2025');
    year2025Button.focus();

    fireEvent.keyDown(year2025Button, { key: 'ArrowRight' });
    expect(screen.getByText('2026')).toHaveFocus();
  });

  it('should render month view when specified', () => {
    render(<DateCalendar {...defaultProps} view="month" views={['month']} />);

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Dec')).toBeInTheDocument();
  });

  it('should handle month selection', () => {
    const onChange = vi.fn();
    render(
      <DateCalendar
        {...defaultProps}
        view="month"
        views={['month']}
        onChange={onChange}
      />,
    );

    const monthButton = screen.getByText('Feb');
    fireEvent.click(monthButton);

    expect(onChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('should change views when header is clicked', () => {
    render(<DateCalendar {...defaultProps} views={['year', 'month', 'day']} />);

    const headerButton = screen.getByText('January 2025');
    fireEvent.click(headerButton);

    // Should show year view
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('should handle view transitions correctly', () => {
    const onChange = vi.fn();
    render(
      <DateCalendar
        {...defaultProps}
        views={['year', 'month', 'day']}
        onChange={onChange}
      />,
    );

    // Start in day view
    expect(screen.getByRole('grid')).toBeInTheDocument();

    // Click header to go to year view
    const headerButton = screen.getByText('January 2025');
    fireEvent.click(headerButton);

    // Select a year
    const yearButton = screen.getByText('2025');
    fireEvent.click(yearButton);

    // Should transition to month view
    expect(screen.getByText('Jan')).toBeInTheDocument();
  });

  it('should disable navigation buttons when appropriate', () => {
    const minDate = new Date('2025-01-01');
    const maxDate = new Date('2025-01-31');

    render(<DateCalendar {...defaultProps} min={minDate} max={maxDate} />);

    const prevButton = screen.getByLabelText('Previous month');
    const nextButton = screen.getByLabelText('Next month');

    // Should be disabled when at min/max
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('should handle controlled value', () => {
    const value = new Date('2025-02-15');
    const onChange = vi.fn();

    render(
      <DateCalendar {...defaultProps} value={value} onChange={onChange} />,
    );

    expect(screen.getByText('February 2025')).toBeInTheDocument();
  });

  it('should call onChangeComplete when date selection is complete', () => {
    const onChangeComplete = vi.fn();
    render(
      <DateCalendar {...defaultProps} onChangeComplete={onChangeComplete} />,
    );

    const dateButton = screen.getByText('15');
    fireEvent.click(dateButton);

    expect(onChangeComplete).toHaveBeenCalledWith(expect.any(Date));
  });

  it('should call onViewChange when view changes', () => {
    const onViewChange = vi.fn();
    render(
      <DateCalendar
        {...defaultProps}
        views={['year', 'day']}
        onViewChange={onViewChange}
      />,
    );

    const headerButton = screen.getByText('January 2025');
    fireEvent.click(headerButton);

    expect(onViewChange).toHaveBeenCalledWith('year');
  });

  it('should handle single view mode', () => {
    render(<DateCalendar {...defaultProps} views={['year']} />);

    // Should not show header navigation in single view mode
    expect(screen.queryByLabelText('Previous month')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next month')).not.toBeInTheDocument();
  });

  it('should pass accessibility tests', async () => {
    const { rerender } = render(<DateCalendar {...defaultProps} />);

    expect(await axe(screen.getByRole('rowgroup'))).toHaveNoViolations();

    const rows = screen.getAllByRole('row');

    for (const row of rows) {
      expect(await axe(row)).toHaveNoViolations();
    }

    rerender(<DateCalendar {...defaultProps} view="year" views={['year']} />);

    expect(await axe(screen.getByRole('radiogroup'))).toHaveNoViolations();

    rerender(<DateCalendar {...defaultProps} view="month" views={['month']} />);

    expect(await axe(screen.getByRole('radiogroup'))).toHaveNoViolations();
  });
});
