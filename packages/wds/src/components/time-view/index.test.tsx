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
    defaultValue: new Date('2025-01-01T10:00:00'),
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render with custom views', async () => {
    const { unmount } = render(
      <TimeView {...defaultProps} views={['hour', 'minute', 'second']} />,
    );

    await waitFor(() => {
      expect(screen.getAllByRole('listbox')).toHaveLength(3);
    });

    unmount();

    render(<TimeView {...defaultProps} views={['hour', 'minute']} />);

    await waitFor(() => {
      expect(screen.getAllByRole('listbox')).toHaveLength(2);
    });
  });

  it('should render with 12-hour format when meridiem is included', async () => {
    render(
      <TimeView {...defaultProps} views={['hour', 'minute', 'meridiem']} />,
    );

    await waitFor(() => {
      // Should show 12 hours + 60 minutes + 2 meridiem options
      expect(screen.getAllByRole('option')).toHaveLength(12 + 60 / 5 + 2);
    });
  });

  it('should call onChangeComplete when last view is selected', async () => {
    const onChangeComplete = vi.fn();

    render(
      <TimeView
        {...defaultProps}
        views={['hour', 'minute']}
        onChangeComplete={onChangeComplete}
      />,
    );

    await waitFor(() => {
      const minuteItem = screen.getByText('30');
      fireEvent.click(minuteItem);

      expect(onChangeComplete).toHaveBeenCalledWith(expect.any(Date));
    });
  });

  it('should pass accessibility tests', async () => {
    render(<TimeView {...defaultProps} />);

    const timeLists = screen.getAllByRole('listbox');

    for (const timeList of timeLists) {
      expect(await axe(timeList)).toHaveNoViolations();
    }

    const timeItems = screen.getAllByRole('option');

    for (const item of timeItems) {
      expect(await axe(item)).toHaveNoViolations();
    }
  });
});
