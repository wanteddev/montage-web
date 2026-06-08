import { cleanup } from '@testing-library/react';
import {
  Button,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalTrigger,
  useSnackbar,
} from '@montage-ui/core';

import {
  byTestId,
  click,
  openModalCount,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

// A modal opens a DismissableLayer with `disableOutsidePointerEvents`, which sets
// `body { pointer-events: none }`. A Snackbar/Toast lives in the global RegionArea
// (outside the modal). This verifies its action button is still clickable while a
// modal is open.
let actionClicks = 0;

const ModalWithSnackbar = () => {
  const snackbar = useSnackbar();

  return (
    <Modal>
      <ModalTrigger>
        <Button data-testid="open-modal">Open modal</Button>
      </ModalTrigger>
      <ModalContainer variant="popup">
        <ModalContent>
          <ModalContentItem>
            <ModalHeading>Modal</ModalHeading>
            <Button
              data-testid="show-snackbar"
              onClick={() =>
                snackbar({
                  description: 'Saved',
                  duration: 100000,
                  action: {
                    children: 'Undo',
                    'data-testid': 'snack-action',
                    onClick: () => {
                      actionClicks += 1;
                    },
                  },
                })
              }
            >
              Show snackbar
            </Button>
          </ModalContentItem>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

describe('Snackbar over an open modal', () => {
  it('snackbar action stays clickable while a modal is open', async () => {
    actionClicks = 0;
    renderWithProvider(<ModalWithSnackbar />);

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await click(byTestId('show-snackbar'));
    await expect.poll(() => byTestId('snack-action')).not.toBeNull();

    await click(byTestId('snack-action'));
    expect(actionClicks).toBe(1);
    expect(openModalCount()).toBe(1); // clicking the snackbar must not close the modal
  });
});
