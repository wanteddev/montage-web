import {
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
} from '@montage-ui/core';
import { cleanup } from '@testing-library/react';

import { renderWithProvider } from '../helpers';

afterEach(() => cleanup());

const CUSTOM_MAX_HEIGHT = 400;
// Default `--modal-default-max-height`: viewport (720) - top inset (40).
const DEFAULT_MAX_HEIGHT = 680;
// Top-edge rubber-band ceiling — the sheet may overshoot the full snap by at
// most this much while the pointer is held past it.
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

// The snap math used to derive the full height from the viewport alone, so a
// sheet whose max-height was customized in CSS grew past it mid-drag and then
// jumped back once the settle handed off to CSS.
describe.each([
  ['the default max-height', undefined, DEFAULT_MAX_HEIGHT, 340],
  [
    'a custom --modal-max-height',
    { '--modal-max-height': `${CUSTOM_MAX_HEIGHT}px` },
    CUSTOM_MAX_HEIGHT,
    200,
  ],
  [
    'a custom --modal-default-max-height',
    { '--modal-default-max-height': `${CUSTOM_MAX_HEIGHT}px` },
    CUSTOM_MAX_HEIGHT,
    200,
  ],
  // `max-height` only caps the sheet; the half snap still derives from the
  // (default) full height.
  [
    'a custom max-height',
    { maxHeight: `${CUSTOM_MAX_HEIGHT}px` },
    CUSTOM_MAX_HEIGHT,
    340,
  ],
] as const)(
  'flexible bottom sheet with %s',
  (_, sx, fullHeight, halfHeight) => {
    it('rests at half of the full height and drags up to it', async () => {
      renderWithProvider(
        <Modal defaultOpen>
          <ModalContainer
            variant="bottom"
            resize="flexible"
            handle
            defaultSnap="half"
            sx={sx}
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
      // Let the mount keyframe finish so the sheet rests at its half snap.
      await Promise.all(
        dialog()
          .getAnimations()
          .map((animation) => animation.finished),
      );

      expect(Math.round(visibleHeight())).toBe(halfHeight);

      const grabber = document.querySelector(
        '[data-role="modal-container-grabber"]',
      );
      if (!grabber) throw new Error('no grabber');
      const { left, top, width, height } = grabber.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;

      let tallest = 0;
      const sample = () => {
        tallest = Math.max(tallest, visibleHeight());
      };

      grabber.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y }),
      );
      // Pull well past the full height.
      for (let i = 1; i <= 8; i++) {
        window.dispatchEvent(
          new MouseEvent('mousemove', {
            bubbles: true,
            clientX: x,
            clientY: y - i * 80,
          }),
        );
        await nextFrame();
        sample();
      }
      window.dispatchEvent(
        new MouseEvent('mouseup', {
          bubbles: true,
          clientX: x,
          clientY: y - 640,
        }),
      );

      await expect
        .poll(() => {
          sample();
          return dialog().dataset.snap;
        })
        .toBe('full');
      await expect
        .poll(() => dialog().style.getPropertyValue('--modal-drag-height'))
        .toBe('');

      expect(tallest).toBeLessThanOrEqual(fullHeight + RUBBER_BAND_MAX);
      expect(Math.round(visibleHeight())).toBe(fullHeight);
    });
  },
);
