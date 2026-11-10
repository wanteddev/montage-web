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
      resize="flexible"
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
          maxHeight: dialog.style.getPropertyValue('--modal-drag-height'),
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

// `peek` only exists on draggable sheets. A sheet resting at `peek` that loses
// its handle at a breakpoint resolves to `full` and becomes a regular dimmed
// modal — and stays consistent even if a controlled owner ignores the change.
describe('flipping a peeked sheet to a handle-less hug sheet', () => {
  afterEach(async () => {
    await page.viewport(DESKTOP, 720);
  });

  const PeekedSheet = ({
    onSnapChange,
    controlled,
  }: {
    onSnapChange: (snap: string) => void;
    controlled: boolean;
  }) => {
    const [snap, setSnap] = useState<'peek' | 'half' | 'full'>('peek');
    return (
      <Modal defaultOpen>
        <ModalContainer
          variant="bottom"
          resize="flexible"
          handle
          peekHeight={80}
          snap={snap}
          onSnapChange={(next) => {
            onSnapChange(next);
            if (controlled) setSnap(next);
          }}
          md={{ resize: 'hug', handle: false }}
        >
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Sheet</ModalHeading>
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>
    );
  };

  it.each([
    { name: 'owner follows onSnapChange', controlled: true },
    { name: 'owner ignores onSnapChange', controlled: false },
  ])('$name: resolves to full as a regular modal', async ({ controlled }) => {
    const onSnapChange = vi.fn();
    await page.viewport(MOBILE, 720);
    renderWithProvider(
      <PeekedSheet onSnapChange={onSnapChange} controlled={controlled} />,
    );

    await expect
      .poll(() => openDialog()?.getAttribute('data-snap'))
      .toBe('peek');

    await page.viewport(DESKTOP, 720);

    await expect
      .poll(() => openDialog()?.getAttribute('data-snap'))
      .toBe('full');
    await expect.poll(sheetState).toEqual(DIMMED_MODAL);
    expect(onSnapChange).toHaveBeenCalledWith('full');
    expect(
      (openDialog() as HTMLElement).style.getPropertyValue('--modal-translate'),
    ).toBe('');
  });
});

// A flexible sheet that becomes a hug sheet at a breakpoint and comes back
// keeps the snap the user left it at (it used to reset to `defaultSnap`).
describe('flexible → hug → flexible round trip', () => {
  afterEach(async () => {
    await page.viewport(DESKTOP, 720);
  });

  it('keeps the full snap instead of resetting to defaultSnap', async () => {
    const onSnapChange = vi.fn();
    await page.viewport(MOBILE, 720);
    renderWithProvider(
      <Modal defaultOpen>
        <ModalContainer
          variant="bottom"
          resize="flexible"
          handle
          defaultSnap="full"
          onSnapChange={onSnapChange}
          md={{ resize: 'hug' }}
        >
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Sheet</ModalHeading>
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>,
    );

    await expect
      .poll(() => openDialog()?.getAttribute('data-snap'))
      .toBe('full');
    await page.viewport(DESKTOP, 720);
    await expect
      .poll(() => openDialog()?.getAttribute('data-snap'))
      .toBe('full');
    await page.viewport(MOBILE, 720);
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(openDialog()).toHaveAttribute('data-snap', 'full');
    expect(onSnapChange).not.toHaveBeenCalledWith('half');
  });
});

// A controlled `snap="peek"` sheet opened from a trigger mounts already at
// peek; the peek offset must be applied even though `snap` never changes.
describe('opening a sheet that is already at peek', () => {
  it('applies the peek offset on open', async () => {
    const Harness = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button
            type="button"
            data-testid="open-peeked"
            onClick={() => setOpen(true)}
          >
            open
          </button>
          <Modal open={open} onOpenChange={setOpen}>
            <ModalContainer variant="bottom" handle peekHeight={80} snap="peek">
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
    renderWithProvider(<Harness />);

    await click(byTestId('open-peeked'));

    await expect
      .poll(() =>
        (openDialog() as HTMLElement | null)?.style.getPropertyValue(
          '--modal-translate',
        ),
      )
      .toBe('calc(100% - 80px)');
    expect(openDialog()).toHaveAttribute('data-snap', 'peek');
  });
});

// A `forceMount` sheet closed at peek keeps `peek` as its stored snap. Opening
// it again where it renders as a popup must not trip the "bottom sheet at peek
// flipped to popup" close path — that only applies to an actual layout flip.
describe('reopening a forceMount sheet closed at peek, as a popup', () => {
  afterEach(async () => {
    await page.viewport(DESKTOP, 720);
  });

  it('stays open', async () => {
    const Harness = () => {
      const [open, setOpen] = useState(true);
      return (
        <>
          <button
            type="button"
            data-testid="reopen"
            onClick={() => setOpen(true)}
          >
            open
          </button>
          <button
            type="button"
            data-testid="close"
            onClick={() => setOpen(false)}
          >
            close
          </button>
          <Modal open={open} onOpenChange={setOpen}>
            <ModalContainer
              variant="bottom"
              resize="flexible"
              handle
              peekHeight={80}
              forceMount
              md={{ variant: 'popup' }}
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
    // Collapse to peek through the dimmer, then close from outside the sheet.
    const dimmer = document.querySelector('[data-role="modal-dimmer"]');
    if (!dimmer) throw new Error('no dimmer');
    await clickCorner(dimmer);
    await expect
      .poll(() => openDialog()?.getAttribute('data-snap'))
      .toBe('peek');
    (byTestId('close') as HTMLElement).click();
    await expect.poll(openDialog).toBeNull();

    await page.viewport(DESKTOP, 720);
    (byTestId('reopen') as HTMLElement).click();

    await expect.poll(sheetState).toEqual(DIMMED_MODAL);
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(openDialog()).not.toBeNull();
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
    expect(dialog.style.getPropertyValue('--modal-drag-height')).toBe('');
    expect(dialog.style.getPropertyValue('transition')).toBe('');
  });
});

// A drag-dismiss leaves the dragged position inline on purpose, so the exit
// animation starts where the finger let go instead of jumping back to the
// snap height first.
describe('drag-dismissing a sheet', () => {
  it.each([
    { name: 'hug', resize: 'hug' as const },
    { name: 'flexible', resize: 'flexible' as const },
  ])(
    '$name: keeps the dragged position through the exit',
    async ({ resize }) => {
      renderWithProvider(
        <Modal defaultOpen>
          <ModalContainer
            variant="bottom"
            resize={resize}
            handle
            defaultSnap="full"
          >
            <ModalContent>
              <ModalContentItem>
                <ModalHeading>Sheet</ModalHeading>
              </ModalContentItem>
            </ModalContent>
          </ModalContainer>
        </Modal>,
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
      for (let i = 1; i <= 6; i++) {
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            bubbles: true,
            clientX: x,
            clientY: y + i * 100,
          }),
        );
        await new Promise((resolve) => setTimeout(resolve, 16));
      }
      window.dispatchEvent(
        new MouseEvent('mouseup', {
          bubbles: true,
          clientX: x,
          clientY: y + 600,
        }),
      );

      const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
      if (!dialog) throw new Error('no dialog');
      await expect.poll(() => dialog.dataset.status).toBe('close');
      const draggedInline =
        dialog.style.getPropertyValue('--modal-translate') ||
        dialog.style.getPropertyValue('--modal-drag-height');
      expect(draggedInline).not.toBe('');
    },
  );
});

// `peekHeight` / `largestUndimmedSnap` follow the breakpoint like `variant`.
describe('responsive peekHeight and largestUndimmedSnap', () => {
  afterEach(async () => {
    await page.viewport(DESKTOP, 720);
  });

  it('largestUndimmedSnap: undimmed on mobile, regular modal on desktop', async () => {
    await page.viewport(MOBILE, 720);
    renderWithProvider(
      <BackgroundWithSheet
        variant="bottom"
        resize="flexible"
        handle
        defaultSnap="full"
        largestUndimmedSnap="full"
        md={{ largestUndimmedSnap: 'peek' }}
      />,
    );

    await expect.poll(sheetState).toEqual(UNDIMMED);
    await page.viewport(DESKTOP, 720);
    await expect.poll(sheetState).toEqual(DIMMED_MODAL);
    await page.viewport(MOBILE, 720);
    await expect.poll(sheetState).toEqual(UNDIMMED);
  });

  it('peekHeight: a peeked sheet whose peek is turned off resolves to full', async () => {
    await page.viewport(MOBILE, 720);
    renderWithProvider(
      <Modal defaultOpen>
        <ModalContainer
          variant="bottom"
          handle
          peekHeight={80}
          md={{ peekHeight: 0 }}
        >
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Sheet</ModalHeading>
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>,
    );

    await expect.poll(openDialog).not.toBeNull();
    const dimmer = document.querySelector('[data-role="modal-dimmer"]');
    if (!dimmer) throw new Error('no dimmer');
    await clickCorner(dimmer);
    await expect
      .poll(() => openDialog()?.getAttribute('data-snap'))
      .toBe('peek');

    await page.viewport(DESKTOP, 720);

    await expect
      .poll(() => openDialog()?.getAttribute('data-snap'))
      .toBe('full');
    await expect.poll(sheetState).toEqual(DIMMED_MODAL);
    expect(
      (openDialog() as HTMLElement).style.getPropertyValue('--modal-translate'),
    ).toBe('');
  });
});

// The responsive props must still follow a parent updating them while the
// sheet is mounted (no breakpoint change involved), as they did before they
// became responsive.
describe('updating peekHeight / largestUndimmedSnap from the parent', () => {
  it('peekHeight removed: a dimmer click closes instead of collapsing to peek', async () => {
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
            <ModalContainer variant="bottom" handle peekHeight={peekHeight}>
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
    renderWithProvider(<Harness />);

    await expect.poll(openDialog).not.toBeNull();
    (byTestId('drop-peek') as HTMLElement).click();
    await new Promise((resolve) => setTimeout(resolve, 100));

    const dimmer = document.querySelector('[data-role="modal-dimmer"]');
    if (!dimmer) throw new Error('no dimmer');
    await clickCorner(dimmer);

    await expect
      .poll(() => document.querySelector('[role="dialog"][data-status="open"]'))
      .toBeNull();
  });

  it('largestUndimmedSnap switched to full: undimmed right away', async () => {
    const Harness = () => {
      const [undimmed, setUndimmed] = useState(false);
      return (
        <>
          <button
            type="button"
            data-testid="undim"
            onClick={() => setUndimmed(true)}
          >
            undim
          </button>
          <Modal defaultOpen>
            <ModalContainer
              variant="bottom"
              resize="flexible"
              handle
              defaultSnap="full"
              largestUndimmedSnap={undimmed ? 'full' : 'peek'}
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
    renderWithProvider(<Harness />);

    await expect
      .poll(() => openDialog()?.getAttribute('data-largest-undimmed-snap'))
      .toBe('peek');
    (byTestId('undim') as HTMLElement).click();

    await expect
      .poll(() => openDialog()?.getAttribute('data-largest-undimmed-snap'))
      .toBe('full');
    expect(openDialog()).toHaveAttribute('aria-modal', 'false');
  });
});

// Responsive values that change while the sheet is open must take effect
// right away, not only after the next snap change / listener re-bind.
describe('responsive values changing while open', () => {
  afterEach(async () => {
    await page.viewport(DESKTOP, 720);
  });

  it('peekHeight: a sheet resting at peek moves to the new peek height', async () => {
    await page.viewport(MOBILE, 720);
    renderWithProvider(
      <Modal defaultOpen>
        <ModalContainer
          variant="bottom"
          handle
          peekHeight={80}
          md={{ peekHeight: 120 }}
        >
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Sheet</ModalHeading>
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>,
    );

    await expect.poll(openDialog).not.toBeNull();
    const dimmer = document.querySelector('[data-role="modal-dimmer"]');
    if (!dimmer) throw new Error('no dimmer');
    await clickCorner(dimmer);
    const translate = () =>
      (openDialog() as HTMLElement | null)?.style.getPropertyValue(
        '--modal-translate',
      );
    await expect.poll(translate).toBe('calc(100% - 80px)');

    await page.viewport(DESKTOP, 720);

    await expect.poll(translate).toBe('calc(100% - 120px)');
    expect(openDialog()).toHaveAttribute('data-snap', 'peek');
  });

  it('enableHalfSnapScroll: half-snap viewport swipes follow the new value', async () => {
    await page.viewport(MOBILE, 720);
    renderWithProvider(
      <Modal defaultOpen>
        <ModalContainer
          variant="bottom"
          resize="flexible"
          handle
          defaultSnap="half"
          md={{ enableHalfSnapScroll: true }}
        >
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Sheet</ModalHeading>
              {Array.from({ length: 60 }, (_, i) => (
                <p key={i}>line {i}</p>
              ))}
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>,
    );
    await expect
      .poll(() => openDialog()?.getAttribute('data-snap'))
      .toBe('half');
    await page.viewport(DESKTOP, 720);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const viewport = openDialog()?.querySelector<HTMLElement>(
      '[data-radix-scroll-area-viewport]',
    );
    if (!viewport) throw new Error('no viewport');
    const { left, top, width, height } = viewport.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const touch = (clientY: number) =>
      new Touch({ identifier: 1, target: viewport, clientX: x, clientY });
    const fire = (type: string, clientY: number) =>
      viewport.dispatchEvent(
        new TouchEvent(type, {
          bubbles: true,
          cancelable: true,
          touches: type === 'touchend' ? [] : [touch(clientY)],
          changedTouches: [touch(clientY)],
        }),
      );

    // ↑ swipe at half with scrollable content: with the flag on, native
    // scroll keeps it until the boundary — the sheet must not be dragged.
    fire('touchstart', y);
    for (let i = 1; i <= 5; i++) fire('touchmove', y - i * 12);
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(
      (openDialog() as HTMLElement).style.getPropertyValue(
        '--modal-drag-height',
      ),
    ).toBe('');
    fire('touchend', y - 60);
  });
});
