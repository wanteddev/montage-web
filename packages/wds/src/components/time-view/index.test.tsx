import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { TimeView } from '.';

// Mock scrollTo for test environment
Object.defineProperty(window.Element.prototype, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

describe('when given time view component', () => {
  const defaultProps = {
    defaultValue: new Date('2025-01-01T10:00:00'),
    onChange: vi.fn(),
  };

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should render with custom views', async () => {
    const { unmount } = render(
      <TimeView {...defaultProps} views={['hour', 'minute', 'second']} />,
    );

    expect(screen.getAllByRole('listbox')).toHaveLength(3);

    unmount();

    render(<TimeView {...defaultProps} views={['hour', 'minute']} />);

    expect(screen.getAllByRole('listbox')).toHaveLength(2);
  });

  it('should render with 12-hour format when meridiem is included', async () => {
    render(
      <TimeView {...defaultProps} views={['hour', 'minute', 'meridiem']} />,
    );

    // Should show 12 hours + 60 minutes + 2 meridiem options
    expect(screen.getAllByRole('option')).toHaveLength(12 + 60 / 5 + 2);
  });

  it('should call onChangeComplete when last view is selected', () => {
    const onChangeComplete = vi.fn();

    render(
      <TimeView
        {...defaultProps}
        views={['hour', 'minute']}
        onChangeComplete={onChangeComplete}
      />,
    );

    const minuteItem = screen.getByText('30');
    fireEvent.click(minuteItem);

    expect(onChangeComplete).toHaveBeenCalledWith(expect.any(Date));
  });

  it('should handle minTime and maxTime props', async () => {
    const minTime = new Date('2025-01-01T09:00:00');
    const maxTime = new Date('2025-01-01T18:00:00');

    render(
      <TimeView
        {...defaultProps}
        minTime={minTime}
        maxTime={maxTime}
        views={['hour', 'minute']}
      />,
    );

    expect(screen.getAllByRole('listbox')).toHaveLength(2);
  });

  it('should handle minTime only', () => {
    const minTime = new Date('2025-01-01T12:00:00');

    render(
      <TimeView
        {...defaultProps}
        minTime={minTime}
        views={['hour', 'minute']}
      />,
    );

    expect(screen.getAllByRole('listbox')).toHaveLength(2);
  });

  it('should handle maxTime only', () => {
    const maxTime = new Date('2025-01-01T15:00:00');

    render(
      <TimeView
        {...defaultProps}
        maxTime={maxTime}
        views={['hour', 'minute']}
      />,
    );

    expect(screen.getAllByRole('listbox')).toHaveLength(2);
  });

  it('should work with 12-hour format', () => {
    const minTime = new Date('2025-01-01T09:00:00');
    const maxTime = new Date('2025-01-01T18:00:00');

    render(
      <TimeView
        {...defaultProps}
        minTime={minTime}
        maxTime={maxTime}
        views={['hour', 'minute', 'meridiem']}
      />,
    );

    expect(screen.getAllByRole('listbox')).toHaveLength(3);
  });

  it('should disable hours outside minTime and maxTime range', () => {
    const minTime = new Date('2025-01-01T09:00:00'); // 09:00
    const maxTime = new Date('2025-01-01T18:00:00'); // 18:00

    render(
      <TimeView
        {...defaultProps}
        minTime={minTime}
        maxTime={maxTime}
        views={['hour', 'minute']}
      />,
    );

    const hour8 = screen.getByText('8');
    expect(hour8.closest('[role="option"]')).toHaveAttribute('disabled');

    const hour19 = screen.getByText('19');
    expect(hour19.closest('[role="option"]')).toHaveAttribute('disabled');

    const hour10Elements = screen.getAllByText('10');
    const hour10 = hour10Elements.find((el) =>
      el
        .closest('[role="option"]')
        ?.getAttribute('data-role')
        ?.includes('hour'),
    );
    expect(hour10?.closest('[role="option"]')).not.toHaveAttribute('disabled');
  });

  it('should not call onChange when clicking disabled time items', () => {
    const onChange = vi.fn();
    const minTime = new Date('2025-01-01T10:00:00');
    const maxTime = new Date('2025-01-01T18:00:00');

    render(
      <TimeView
        {...defaultProps}
        onChange={onChange}
        minTime={minTime}
        maxTime={maxTime}
        views={['hour', 'minute']}
      />,
    );

    const hour8 = screen.getByText('8');
    fireEvent.click(hour8);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should call onChange when clicking enabled time items', () => {
    const onChange = vi.fn();
    const minTime = new Date('2025-01-01T09:00:00');
    const maxTime = new Date('2025-01-01T18:00:00');

    render(
      <TimeView
        {...defaultProps}
        onChange={onChange}
        minTime={minTime}
        maxTime={maxTime}
        views={['hour', 'minute']}
      />,
    );

    const hour12 = screen.getByText('12');
    fireEvent.click(hour12);

    expect(onChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('should ignore date part and only compare time', () => {
    const minTime = new Date('2024-12-31T09:00:00');
    const maxTime = new Date('2026-01-02T18:00:00');

    render(
      <TimeView
        {...defaultProps}
        minTime={minTime}
        maxTime={maxTime}
        views={['hour', 'minute']}
      />,
    );

    const hour8 = screen.getByText('8');

    expect(hour8.closest('[role="option"]')).toHaveAttribute('disabled');

    const hour19 = screen.getByText('19');
    expect(hour19.closest('[role="option"]')).toHaveAttribute('disabled');

    const hour10Elements = screen.getAllByText('10');
    const hour10 = hour10Elements.find((el) =>
      el
        .closest('[role="option"]')
        ?.getAttribute('data-role')
        ?.includes('hour'),
    );
    expect(hour10?.closest('[role="option"]')).not.toHaveAttribute('disabled');
  });

  it('should pass accessibility tests', async () => {
    render(<TimeView {...defaultProps} />);

    const timeLists = screen.getAllByRole('listbox');
    const timeItems = screen.getAllByRole('option');

    for (const list of timeLists) {
      expect(list).toBeInTheDocument();
      expect(await axe(list)).toHaveNoViolations();
    }

    for (const item of timeItems) {
      expect(item).toBeInTheDocument();
      expect(await axe(item)).toHaveNoViolations();
    }
  });
});
