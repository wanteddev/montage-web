import { cleanup } from '@testing-library/react';
import { Button, DatePicker, TimePicker } from '@montage-ui/core';

import {
  bodyPointerEvents,
  byTestId,
  click,
  clickCorner,
  mountedCount,
  renderWithProvider,
} from '../helpers';

import type { ReactNode } from 'react';

afterEach(() => cleanup());

// Pickers open a DismissableLayer with `disableOutsidePointerEvents` even
// outside a modal: while the popup is open, `body { pointer-events: none }`
// blocks every other control on the page. The first outside click only closes
// the popup; the page is interactive again afterwards.
const WithOutsideButton = ({
  onOutside,
  children,
}: {
  onOutside: () => void;
  children: ReactNode;
}) => (
  <>
    <Button data-testid="outside-button" onClick={onOutside}>
      Outside
    </Button>
    {children}
  </>
);

const cases = [
  {
    name: 'DatePicker',
    toggle: 'Toggle date picker',
    popup: '[data-role="date-picker-wrapper"]',
    picker: (
      <DatePicker
        defaultValue={new Date('2025-01-01')}
        format="YYYY.MM.DD"
        placeholder="YYYY.MM.DD"
      />
    ),
  },
  {
    name: 'TimePicker',
    toggle: 'Toggle time picker',
    popup: '[data-role="time-picker-wrapper"]',
    picker: <TimePicker placeholder="hh:mm" />,
  },
];

describe.each(cases)(
  '$name outside pointer blocking',
  ({ toggle, popup, picker }) => {
    it('blocks outside controls while open, restores the body once closed', async () => {
      const onOutside = vi.fn();
      renderWithProvider(
        <WithOutsideButton onOutside={onOutside}>{picker}</WithOutsideButton>,
      );

      expect(bodyPointerEvents()).not.toBe('none');

      await click(document.querySelector(`[aria-label="${toggle}"]`));
      await expect.poll(() => mountedCount(popup)).toBe(1);
      expect(bodyPointerEvents()).toBe('none');

      // Blocked: the click lands on <html> and only dismisses the popup.
      await clickCorner(byTestId('outside-button'));
      await expect.poll(() => mountedCount(popup)).toBe(0);
      expect(onOutside).not.toHaveBeenCalled();

      await expect.poll(bodyPointerEvents).not.toBe('none');
      expect(document.body.style.pointerEvents).toBe('');

      // Interactive again.
      await click(byTestId('outside-button'));
      expect(onOutside).toHaveBeenCalledTimes(1);
    });
  },
);
