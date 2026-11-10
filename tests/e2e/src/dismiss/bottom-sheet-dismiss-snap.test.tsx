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
const PEEK_HEIGHT = 72;

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
        dismissSnap="half"
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

/** Drag the grabber down by `distance` in fast steps and release. */
const flingDown = async (distance: number, { settle = true } = {}) => {
  const grabber = document.querySelector(
    '[data-role="modal-container-grabber"]',
  );
  if (!grabber) throw new Error('no grabber');
  const { left, top, width, height } = grabber.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const steps = 6;

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
  }
  window.dispatchEvent(
    new MouseEvent('mouseup', {
      bubbles: true,
      clientX: x,
      clientY: y + distance,
    }),
  );
  if (settle) await settled();
};

describe("flexible bottom sheet with dismissSnap='half'", () => {
  it('collapses from full to half on Escape and stays there on the next one', async () => {
    await mount({ defaultSnap: 'full', peekHeight: PEEK_HEIGHT });
    expect(Math.round(visibleHeight())).toBe(FULL_HEIGHT);

    await pressEscape();
    await expect.poll(() => dialog().dataset.snap).toBe('half');
    await settled();
    expect(Math.round(visibleHeight())).toBe(HALF_HEIGHT);

    await pressEscape();
    await nextFrame();
    expect(dialog().dataset.snap).toBe('half');
    expect(dialog().dataset.status).toBe('open');
  });

  it('collapses to half on an outside click without a peek height', async () => {
    await mount({ defaultSnap: 'full' });

    await clickTopDimmer();
    await expect.poll(() => dialog().dataset.snap).toBe('half');
    await settled();

    expect(dialog().dataset.status).toBe('open');
    expect(Math.round(visibleHeight())).toBe(HALF_HEIGHT);
  });

  it('still drags down to peek and stays there on Escape', async () => {
    await mount({ defaultSnap: 'half', peekHeight: PEEK_HEIGHT });

    await flingDown(400);
    expect(dialog().dataset.snap).toBe('peek');
    expect(Math.round(visibleHeight())).toBe(PEEK_HEIGHT);

    await pressEscape();
    await nextFrame();
    expect(dialog().dataset.snap).toBe('peek');
    expect(dialog().dataset.status).toBe('open');
  });

  it('still closes on a downward drag without a peek height', async () => {
    await mount({ defaultSnap: 'half' });

    await flingDown(400, { settle: false });

    await expect.poll(() => dialog().dataset.status).not.toBe('open');
  });
});
