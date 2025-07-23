import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { TimeView } from './index';

// Mock scrollTo for test environment
Object.defineProperty(window.Element.prototype, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

describe('when given time view component', () => {
  const defaultProps = {
    value: new Date('2025-01-01T10:00:00'),
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('should render with custom views', () => {
    render(<TimeView {...defaultProps} views={['hour', 'minute', 'second']} />);

    waitFor(() => {
      expect(screen.getAllByRole('list')).toHaveLength(3);
    });
  });

  it('should render with 12-hour format when meridiem is included', () => {
    render(
      <TimeView {...defaultProps} views={['hour', 'minute', 'meridiem']} />,
    );

    waitFor(() => {
      // Should show 12 hours + 60 minutes + 2 meridiem options
      expect(screen.getAllByRole('listitem')).toHaveLength(12 + 60 + 2);
    });
  });

  it('should render with disabled state', () => {
    render(<TimeView {...defaultProps} disabled />);
    waitFor(() => {
      screen.getAllByRole('listitem').forEach((item) => {
        expect(item).toHaveAttribute('aria-disabled', 'true');
      });
    });
  });

  it('should call onChange when a time item is clicked', async () => {
    const onChange = vi.fn();

    render(<TimeView {...defaultProps} onChange={onChange} />);

    waitFor(() => {
      const timeItem = screen.getByText('10');

      fireEvent.click(timeItem);

      expect(onChange).toHaveBeenCalledWith(expect.any(Date));
    });
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

    waitFor(() => {
      const minuteItem = screen.getByText('30');
      fireEvent.click(minuteItem);

      expect(onChangeComplete).toHaveBeenCalledWith(expect.any(Date));
    });
  });

  it('should not call onChange when readOnly', () => {
    const onChange = vi.fn();

    render(<TimeView {...defaultProps} readOnly onChange={onChange} />);

    waitFor(() => {
      const timeItem = screen.getByText('10');
      fireEvent.click(timeItem);

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  it('should navigate between time lists with arrow keys', () => {
    render(<TimeView {...defaultProps} views={['hour', 'minute']} />);

    waitFor(() => {
      expect(screen.getByText('10')).toHaveFocus();
      fireEvent.keyDown(screen.getByText('10'), { key: 'ArrowRight' });

      expect(screen.getByText('0')).toHaveFocus();
    });
  });

  it('should handle roving focus within time list', () => {
    render(<TimeView {...defaultProps} />);

    waitFor(() => {
      const firstTimeItem = screen.getByText('0');
      fireEvent.click(firstTimeItem);

      fireEvent.keyDown(firstTimeItem, { key: 'ArrowDown' });

      const secondTimeItem = screen.getByText('1');
      expect(secondTimeItem).toHaveFocus();

      fireEvent.keyDown(secondTimeItem, { key: 'Tab', shift: true });
      expect(firstTimeItem).toHaveFocus();

      fireEvent.keyDown(firstTimeItem, { key: 'Tab' });
      expect(secondTimeItem).toHaveFocus();
    });
  });

  it('should pass accessibility tests', () => {
    render(<TimeView {...defaultProps} />);

    waitFor(async () => {
      expect(await axe(screen.getByRole('list'))).toHaveNoViolations();

      const timeItems = screen.getAllByRole('listitem');
      timeItems.forEach(async (item) => {
        expect(await axe(item)).toHaveNoViolations();
      });
    });
  });

  it('should respect minTime and maxTime constraint', () => {
    render(
      <TimeView
        {...defaultProps}
        minTime={new Date('2025-01-01T08:00:00')}
        maxTime={new Date('2025-01-01T18:00:00')}
        views={['hour', 'minute']}
      />,
    );

    waitFor(() => {
      expect(screen.queryByText('7')).not.toBeInTheDocument();
      expect(screen.getByText('8')).toBeInTheDocument();
      expect(screen.queryByText('19')).not.toBeInTheDocument();
    });
  });
});
