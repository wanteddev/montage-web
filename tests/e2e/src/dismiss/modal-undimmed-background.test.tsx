import { cleanup } from '@testing-library/react';
import {
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
} from '@montage-ui/core';

import { renderWithProvider } from '../helpers';

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
