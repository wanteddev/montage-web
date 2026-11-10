import {
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
} from '@montage-ui/core';
import { cleanup } from '@testing-library/react';

import { clickTopDimmer, pressEscape, renderWithProvider } from '../helpers';

import type { ModalContainerProps } from '@montage-ui/core';

afterEach(() => cleanup());

// Default `--modal-default-max-height`: viewport (720) - top inset (40).
const FULL_HEIGHT = 680;
const HALF_HEIGHT = 340;
// The sheet may dip below the floor by at most this much while held past it.
const RUBBER_BAND_MAX = 40;

const dialog = () => {
  const element = document.querySelector<HTMLElement>('[role="dialog"]');
  if (!element) throw new Error('no dialog');
  return element;
};

const visibleHeight = () =>
  window.innerHeight - dialog().getBoundingClientRect().top;

const nextFrame = () =>
  new Promise((resolve) => requestAnimationFrame(resolve));

const mount = async (props: Partial<ModalContainerProps> = {}) => {
  renderWithProvider(
    <Modal defaultOpen>
      <ModalContainer
        variant="bottom"
        resize="flexible"
        handle
        smallestSnap="half"
        {...props}
      >
        <ModalContent>
          <ModalContentItem>
            <ModalHeading>Sheet</ModalHeading>
          </ModalContentItem>
        </ModalContent>
      </ModalContainer>
    </Modal>,
  );

  await expect.poll(() => dialog().dataset.status).toBe('open');
  await Promise.all(
    dialog()
      .getAnimations()
      .map((animation) => animation.finished),
  );
};

/** Wait until the settle spring has handed the height back to CSS. */
const settled = async () => {
  await expect
    .poll(() => dialog().style.getPropertyValue('--modal-drag-height'))
    .toBe('');
  await Promise.all(
    dialog()
      .getAnimations()
      .map((animation) => animation.finished),
  );
};

/**
 * Drag the grabber down by `distance` in fast steps and release, returning the
 * lowest visible height seen while the pointer was held.
 */
const flingDown = async (distance: number) => {
  const grabber = document.querySelector(
    '[data-role="modal-container-grabber"]',
  );
  if (!grabber) throw new Error('no grabber');
  const { left, top, width, height } = grabber.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const steps = 6;

  let lowest = Infinity;
  grabber.dispatchEvent(
    new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y }),
  );
  for (let i = 1; i <= steps; i++) {
    window.dispatchEvent(
      new MouseEvent('mousemove', {
        bubbles: true,
        clientX: x,
        clientY: y + (distance * i) / steps,
      }),
    );
    await nextFrame();
    lowest = Math.min(lowest, visibleHeight());
  }
  window.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      clientX: x,
      clientY: y + distance,
    }),
  );
  await settled();

  return lowest;
};

describe("flexible bottom sheet with smallestSnap='half'", () => {
  it('settles at half when flung down from full, without a peek height', async () => {
    await mount({ defaultSnap: 'full' });
    expect(Math.round(visibleHeight())).toBe(FULL_HEIGHT);

    const lowest = await flingDown(600);

    expect(lowest).toBeGreaterThanOrEqual(HALF_HEIGHT - RUBBER_BAND_MAX);
    expect(dialog().dataset.snap).toBe('half');
    expect(dialog().dataset.status).toBe('open');
    expect(Math.round(visibleHeight())).toBe(HALF_HEIGHT);
  });

  it('stays at half when dragged down from half, ignoring peekHeight', async () => {
    await mount({ defaultSnap: 'half', peekHeight: 72 });

    const lowest = await flingDown(300);

    expect(lowest).toBeGreaterThanOrEqual(HALF_HEIGHT - RUBBER_BAND_MAX);
    expect(lowest).toBeLessThan(HALF_HEIGHT);
    expect(dialog().dataset.snap).toBe('half');
    expect(Math.round(visibleHeight())).toBe(HALF_HEIGHT);
  });

  it('collapses to half on Escape and stays there on the next one', async () => {
    await mount({ defaultSnap: 'full', peekHeight: 72 });

    await pressEscape();
    await expect.poll(() => dialog().dataset.snap).toBe('half');
    await settled();
    expect(Math.round(visibleHeight())).toBe(HALF_HEIGHT);

    await pressEscape();
    await nextFrame();
    expect(dialog().dataset.snap).toBe('half');
    expect(dialog().dataset.status).toBe('open');
  });

  it('collapses to half on an outside click', async () => {
    await mount({ defaultSnap: 'full' });

    await clickTopDimmer();
    await expect.poll(() => dialog().dataset.snap).toBe('half');
    await settled();

    expect(dialog().dataset.status).toBe('open');
    expect(Math.round(visibleHeight())).toBe(HALF_HEIGHT);
  });

  it('shows a controlled peek snap as half and reports it', async () => {
    const onSnapChange = vi.fn();
    await mount({ snap: 'peek', peekHeight: 72, onSnapChange });

    expect(dialog().dataset.snap).toBe('half');
    expect(onSnapChange).toHaveBeenCalledWith('half');
    expect(Math.round(visibleHeight())).toBe(HALF_HEIGHT);
  });
});
