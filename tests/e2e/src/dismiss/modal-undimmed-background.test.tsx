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
  clickCorner,
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

describe.each(['half', 'full'] as const)(
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

  // Same fallback for `half`: before, a popup at the half snap kept a visible
  // dimmer while dropping modality (aria-modal=false, body not blocked).
  it('half: flexible bottom sheet on mobile ↔ popup on desktop', async () => {
    await page.viewport(MOBILE, 720);
    renderWithProvider(
      <BackgroundWithSheet
        variant="bottom"
        resize="flexible"
        largestUndimmedSnap="half"
        md={{ variant: 'popup' }}
      />,
    );

    const UNDIMMED_AT_HALF = { ...UNDIMMED, largestUndimmedSnap: 'half' };
    await expect.poll(sheetState).toEqual(UNDIMMED_AT_HALF);
    await page.viewport(DESKTOP, 720);
    await expect.poll(sheetState).toEqual(DIMMED_MODAL);
    await page.viewport(MOBILE, 720);
    await expect.poll(sheetState).toEqual(UNDIMMED_AT_HALF);
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

// A breakpoint flip can land in the middle of a drag. Dragging writes inline
// overrides (dimmer opacity, translate, max-height); once the sheet turns into
// a popup the drag handlers bail out, so the flip itself must clear them —
// otherwise the popup keeps a stale (for `full`: invisible) dimmer and offset.
describe.each([undefined, 'full'] as const)(
  'largestUndimmedSnap=%s: flipping to a popup mid-drag',
  (largestUndimmedSnap) => {
    afterEach(async () => {
      await page.viewport(DESKTOP, 720);
    });

    it('drops the drag inline styles so the popup is a regular dimmed modal', async () => {
      await page.viewport(MOBILE, 720);
      renderWithProvider(
        <BackgroundWithSheet
          variant="bottom"
          resize="flexible"
          handle
          largestUndimmedSnap={largestUndimmedSnap}
          md={{ variant: 'popup' }}
        />,
      );

      await expect.poll(openDialog).not.toBeNull();
      const grabber = document.querySelector(
        '[data-role="modal-container-grabber"]',
      );
      if (!grabber) throw new Error('no grabber');
      const { left, top, width, height } = grabber.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;

      grabber.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y }),
      );
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          bubbles: true,
          clientX: x,
          clientY: y + 100,
        }),
      );
      const dimmer = document.querySelector<HTMLElement>(
        '[data-role="modal-dimmer"]',
      );
      if (!dimmer) throw new Error('no dimmer');
      await expect.poll(() => dimmer.style.opacity).not.toBe('');

      const dragInlineStyles = () => {
        const dialog = openDialog() as HTMLElement;
        return {
          dimmerOpacity: dimmer.style.opacity,
          translate: dialog.style.getPropertyValue('--modal-translate'),
          maxHeight: dialog.style.getPropertyValue('--modal-max-height'),
        };
      };
      const NO_DRAG_STYLES = {
        dimmerOpacity: '',
        translate: '',
        maxHeight: '',
      };

      await page.viewport(DESKTOP, 720);
      await expect.poll(sheetState).toEqual(DIMMED_MODAL);
      expect(dragInlineStyles()).toEqual(NO_DRAG_STYLES);

      // The drag must have ended, not just paused: back on mobile (dragging
      // re-enabled) the same pointer keeps moving, and nothing may follow it.
      await page.viewport(MOBILE, 720);
      await expect
        .poll(() => openDialog()?.getAttribute('aria-modal'))
        .toBe(largestUndimmedSnap === 'full' ? 'false' : 'true');
      window.dispatchEvent(
        new MouseEvent('mousemove', {
          bubbles: true,
          clientX: x,
          clientY: y + 200,
        }),
      );
      window.dispatchEvent(
        new MouseEvent('mouseup', {
          bubbles: true,
          clientX: x,
          clientY: y + 200,
        }),
      );
      await new Promise((resolve) => requestAnimationFrame(resolve));
      expect(dragInlineStyles()).toEqual(NO_DRAG_STYLES);
      expect(openDialog()).toHaveAttribute('data-snap', 'half');
    });
  },
);

// The flip cleanup above must re-apply the committed snap rather than reset
// to `full`: a sheet resting at `peek` that turns into a handle-less `hug`
// sheet keeps `data-snap="peek"`, so it must also keep its peek offset.
describe('flipping a peeked flexible sheet to a handle-less hug sheet', () => {
  afterEach(async () => {
    await page.viewport(DESKTOP, 720);
  });

  it('keeps the sheet at its peek position', async () => {
    await page.viewport(MOBILE, 720);
    renderWithProvider(
      <Modal defaultOpen>
        <ModalContainer
          variant="bottom"
          resize="flexible"
          handle
          peekHeight={80}
          snap="peek"
          md={{ resize: 'hug', handle: false }}
        >
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Sheet</ModalHeading>
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>,
    );

    const peekOffset = () => {
      const dialog = openDialog() as HTMLElement | null;
      return {
        snap: dialog?.dataset.snap,
        translate: dialog?.style.getPropertyValue('--modal-translate'),
      };
    };
    const PEEKED = { snap: 'peek', translate: 'calc(100% - 80px)' };

    await expect.poll(peekOffset).toEqual(PEEKED);
    await page.viewport(DESKTOP, 720);
    await expect
      .poll(() =>
        openDialog()?.querySelector('[data-role="modal-container-grabber"]'),
      )
      .toBeNull();
    expect(peekOffset()).toEqual(PEEKED);
  });
});

// While the user drags a peeked sheet, the parent drops `peekHeight`, and then
// a breakpoint flip turns dragging off (`md={{ handle: false }}`). There is no
// peek offset left to apply, but the drag's inline overrides must still be
// cleared.
describe('dropping peekHeight, then the handle, mid-drag at peek', () => {
  afterEach(async () => {
    await page.viewport(DESKTOP, 720);
  });

  it('still clears the drag inline styles', async () => {
    const Harness = () => {
      const [peekHeight, setPeekHeight] = useState<number | undefined>(80);
      return (
        <>
          <button
            type="button"
            data-testid="drop-peek"
            onClick={() => setPeekHeight(undefined)}
          >
            drop peek
          </button>
          <Modal defaultOpen>
            <ModalContainer
              variant="bottom"
              handle
              peekHeight={peekHeight}
              md={{ handle: false }}
            >
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

    await page.viewport(MOBILE, 720);
    renderWithProvider(<Harness />);

    await expect.poll(openDialog).not.toBeNull();
    const dimmer = document.querySelector<HTMLElement>(
      '[data-role="modal-dimmer"]',
    );
    if (!dimmer) throw new Error('no dimmer');
    await clickCorner(dimmer);
    await expect
      .poll(() => openDialog()?.getAttribute('data-snap'))
      .toBe('peek');

    const grabber = document.querySelector(
      '[data-role="modal-container-grabber"]',
    );
    if (!grabber) throw new Error('no grabber');
    const { left, top, width, height } = grabber.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    grabber.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y }),
    );
    window.dispatchEvent(
      new MouseEvent('mousemove', {
        bubbles: true,
        clientX: x,
        clientY: y - 150,
      }),
    );
    await expect.poll(() => dimmer.style.opacity).not.toBe('');

    // A plain click event only (no mousedown/up), so the drag stays live.
    (byTestId('drop-peek') as HTMLElement).click();
    await new Promise((resolve) => setTimeout(resolve, 100));
    await page.viewport(DESKTOP, 720);

    await expect
      .poll(() =>
        openDialog()?.querySelector('[data-role="modal-container-grabber"]'),
      )
      .toBeNull();
    await expect.poll(() => dimmer.style.opacity).toBe('');
    const dialog = openDialog() as HTMLElement;
    expect(dialog.style.getPropertyValue('--modal-max-height')).toBe('');
    expect(dialog.style.getPropertyValue('transition')).toBe('');
  });
});
