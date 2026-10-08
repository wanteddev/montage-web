import { cleanup } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { TimeView } from '@montage-ui/core';

import { byTestId, click, renderWithProvider } from '../helpers';

import type { ComponentProps } from 'react';

afterEach(() => cleanup());

// TimeView turns off the browser's scroll-on-focus for keyboard entry
// (`preventScrollOnEntryFocus`) and scrolls the entered item itself. The item
// that receives focus must end up inside its list's viewport — also when there
// is no selection, or the selection is disabled. Layout needs a real browser.

const viewports = () =>
  Array.from(
    document.querySelectorAll<HTMLElement>(
      '[data-role="time-list-scroll-area"] [data-radix-scroll-area-viewport]',
    ),
  );

/** 0: hour list, 1: minute list. */
const list = (index: number) => {
  const viewport = viewports()[index];
  if (!viewport) throw new Error(`no time list at ${index}`);
  return viewport;
};

const scrollToBottom = (viewport: HTMLElement) => {
  viewport.scrollTop = viewport.scrollHeight;
};

const focusedIsVisibleIn = (viewport: HTMLElement) => {
  const focused = document.activeElement as HTMLElement;
  if (!viewport.contains(focused)) return false;

  const item = focused.getBoundingClientRect();
  const box = viewport.getBoundingClientRect();
  return item.top >= box.top - 1 && item.bottom <= box.bottom + 1;
};

const renderTimeView = (props: ComponentProps<typeof TimeView> = {}) =>
  renderWithProvider(
    <>
      <button type="button" data-testid="before">
        before
      </button>
      {/* The TimePicker popup gives its TimeView this height. */}
      <TimeView sx={{ height: '324px' }} {...props} />
    </>,
  );

const tabFromBefore = async () => {
  await click(byTestId('before'));
  await userEvent.keyboard('{Tab}');
};

describe('TimeView keyboard entry', () => {
  it('scrolls the first item into view when there is no selection', async () => {
    renderTimeView();
    const hours = list(0);
    scrollToBottom(hours);

    await tabFromBefore();

    await expect.poll(() => focusedIsVisibleIn(hours)).toBe(true);
  });

  it('scrolls the selected item into view (control)', async () => {
    renderTimeView({ defaultValue: new Date('2025-01-01T10:30:00') });
    const hours = list(0);
    scrollToBottom(hours);

    await tabFromBefore();

    await expect.poll(() => focusedIsVisibleIn(hours)).toBe(true);
  });

  it('scrolls to the item that gets focus when the selection is disabled', async () => {
    renderTimeView({
      defaultValue: new Date('2025-01-01T03:00:00'),
      minTime: new Date('2025-01-01T20:00:00'),
    });
    const hours = list(0);
    hours.scrollTop = 0;

    await tabFromBefore();

    await expect.poll(() => focusedIsVisibleIn(hours)).toBe(true);
  });

  it('scrolls the next list into view when entered with ArrowRight', async () => {
    renderTimeView();
    const minutes = list(1);
    scrollToBottom(minutes);

    await tabFromBefore();
    await userEvent.keyboard('{ArrowRight}');

    await expect.poll(() => focusedIsVisibleIn(minutes)).toBe(true);
  });
});
