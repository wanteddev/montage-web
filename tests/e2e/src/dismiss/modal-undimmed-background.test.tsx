import {
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
} from '@montage-ui/core';
import { cleanup } from '@testing-library/react';
import { useState } from 'react';
import { page } from 'vitest/browser';

import {
  bodyPointerEvents,
  byTestId,
  click,
  renderWithProvider,
} from '../helpers';

import type { ComponentProps } from 'react';

afterEach(() => cleanup());

// An undimmed bottom sheet (half snap with largestUndimmedSnap="half") is meant to
// let the user interact with the page BEHIND it (iOS largestUndimmedDetent style).
// That requires the body to stay interactive — `disableOutsidePointerEvents` must
// be off while undimmed, otherwise `body { pointer-events: none }` blocks the
// background even though no dimmer is shown.
const UndimmedSheet = () => (
  <Modal defaultOpen>
    <ModalContainer
      variant="bottom"
      handle
      peekHeight={80}
      snap="half"
      largestUndimmedSnap="half"
    >
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>Sheet</ModalHeading>
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

describe('undimmed bottom sheet', () => {
  it('keeps the background interactive (body pointer-events not disabled)', async () => {
    renderWithProvider(<UndimmedSheet />);

    // Confirm the sheet mounted in the undimmed half state.
    await expect
      .poll(() =>
        document.querySelector(
          '[role="dialog"][data-snap="half"][data-largest-undimmed-snap="half"]',
        ),
      )
      .not.toBeNull();

    expect(getComputedStyle(document.body).pointerEvents).not.toBe('none');
  });
});

// `largestUndimmedSnap="full"` makes every snap undimmed, so even at `full`
// the sheet is non-modal: no visible dimmer, and a click on the page behind
// the sheet reaches its target without dismissing the sheet.
const BackgroundWithSheet = (
  props: Pick<
    ComponentProps<typeof ModalContainer>,
    | 'variant'
    | 'resize'
    | 'handle'
    | 'defaultSnap'
    | 'largestUndimmedSnap'
    | 'md'
  >,
) => {
  const [count, setCount] = useState(0);

  return (
    <>
      <button
        type="button"
        data-testid="background-button"
        style={{ position: 'fixed', top: 0, left: 0 }}
        onClick={() => setCount((c) => c + 1)}
      >
        clicked {count}
      </button>
      <Modal defaultOpen>
        <ModalContainer {...props}>
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Sheet</ModalHeading>
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

const openDialog = () =>
  document.querySelector('[role="dialog"][data-status="open"]');

const dimmerOpacity = () => {
  const dimmer = document.querySelector('[data-role="modal-dimmer"]');
  return dimmer ? getComputedStyle(dimmer).opacity : null;
};

describe.each([
  { name: 'flexible sheet', resize: 'flexible' as const },
  { name: 'hug sheet with handle', resize: 'hug' as const },
])('largestUndimmedSnap="full" on a $name', ({ resize }) => {
  it('stays undimmed at full and lets the background receive clicks', async () => {
    renderWithProvider(
      <BackgroundWithSheet
        variant="bottom"
        resize={resize}
        handle
        defaultSnap="full"
        largestUndimmedSnap="full"
      />,
    );

    await expect
      .poll(() =>
        document.querySelector(
          '[role="dialog"][data-snap="full"][data-largest-undimmed-snap="full"]',
        ),
      )
      .not.toBeNull();

    expect(openDialog()).toHaveAttribute('aria-modal', 'false');
    expect(bodyPointerEvents()).not.toBe('none');
    await expect.poll(dimmerOpacity).toBe('0');

    await click(byTestId('background-button'));

    expect(byTestId('background-button')).toHaveTextContent('clicked 1');
    // A background click is not an outside-click dismiss for an undimmed sheet.
    expect(openDialog()).not.toBeNull();
  });
});

describe.each(['full'] as const)(
  'largestUndimmedSnap="%s" on a popup',
  (largestUndimmedSnap) => {
    it('falls back to peek — the popup stays dimmed and modal', async () => {
      renderWithProvider(
        <BackgroundWithSheet
          variant="popup"
          largestUndimmedSnap={largestUndimmedSnap}
        />,
      );

      await expect.poll(openDialog).not.toBeNull();

      expect(openDialog()).toHaveAttribute(
        'data-largest-undimmed-snap',
        'peek',
      );
      expect(openDialog()).toHaveAttribute('aria-modal', 'true');
      expect(bodyPointerEvents()).toBe('none');
      await expect.poll(dimmerOpacity).toBe('1');
    });
  },
);

// Responsive props can flip the sheet between a draggable bottom sheet and a
// popup / handle-less sheet at a breakpoint. `full` must follow the resolved
// layout: non-modal while it's a draggable bottom sheet, back to a regular
// dimmed modal (body blocked, siblings aria-hidden) otherwise — both ways.
const MOBILE = 600;
const DESKTOP = 1280; // ≥ md (992px)

const sheetState = () => ({
  largestUndimmedSnap: openDialog()?.getAttribute('data-largest-undimmed-snap'),
  ariaModal: openDialog()?.getAttribute('aria-modal'),
  bodyBlocked: bodyPointerEvents() === 'none',
  dimmerOpacity: dimmerOpacity(),
  siblingsAriaHidden:
    document.querySelectorAll('[data-aria-hidden]').length > 0,
});

const UNDIMMED = {
  largestUndimmedSnap: 'full',
  ariaModal: 'false',
  bodyBlocked: false,
  dimmerOpacity: '0',
  siblingsAriaHidden: false,
};

const DIMMED_MODAL = {
  largestUndimmedSnap: 'peek',
  ariaModal: 'true',
  bodyBlocked: true,
  dimmerOpacity: '1',
  siblingsAriaHidden: true,
};

describe('largestUndimmedSnap="full" across breakpoints', () => {
  afterEach(async () => {
    await page.viewport(DESKTOP, 720);
  });

  it('bottom sheet on mobile ↔ popup on desktop', async () => {
    await page.viewport(MOBILE, 720);
    renderWithProvider(
      <BackgroundWithSheet
        variant="bottom"
        handle
        largestUndimmedSnap="full"
        md={{ variant: 'popup' }}
      />,
    );

    await expect.poll(sheetState).toEqual(UNDIMMED);
    await page.viewport(DESKTOP, 720);
    await expect.poll(sheetState).toEqual(DIMMED_MODAL);
    await page.viewport(MOBILE, 720);
    await expect.poll(sheetState).toEqual(UNDIMMED);
  });

  it('popup on mobile ↔ flexible bottom sheet on desktop', async () => {
    await page.viewport(MOBILE, 720);
    renderWithProvider(
      <BackgroundWithSheet
        variant="popup"
        largestUndimmedSnap="full"
        md={{ variant: 'bottom', resize: 'flexible' }}
      />,
    );

    await expect.poll(sheetState).toEqual(DIMMED_MODAL);
    await page.viewport(DESKTOP, 720);
    await expect.poll(sheetState).toEqual(UNDIMMED);
    await page.viewport(MOBILE, 720);
    await expect.poll(sheetState).toEqual(DIMMED_MODAL);
  });

  it('flexible on mobile ↔ handle-less hug on desktop', async () => {
    await page.viewport(MOBILE, 720);
    renderWithProvider(
      <BackgroundWithSheet
        variant="bottom"
        resize="flexible"
        largestUndimmedSnap="full"
        md={{ resize: 'hug' }}
      />,
    );

    await expect.poll(sheetState).toEqual(UNDIMMED);
    await page.viewport(DESKTOP, 720);
    await expect.poll(sheetState).toEqual(DIMMED_MODAL);
    await page.viewport(MOBILE, 720);
    await expect.poll(sheetState).toEqual(UNDIMMED);
  });
});
