import { cleanup } from '@testing-library/react';
import {
  Button,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalTrigger,
  useAlert,
} from '@montage-ui/core';

import {
  byTestId,
  click,
  clickTopDimmer,
  openAlertCount,
  openDialogCount,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

// An imperative `useAlert` fired from inside a Modal renders the Alert in the
// global AlertArea (fiber-detached). The radix layer stack must still treat the
// Alert as the topmost layer so clicking its dimmer closes the Alert only.
const ModalWithAlert = () => {
  const alert = useAlert();

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
              data-testid="open-alert"
              onClick={() =>
                alert({
                  title: 'Confirm',
                  content: 'Are you sure?',
                  confirm: <Button>OK</Button>,
                })
              }
            >
              Open alert
            </Button>
          </ModalContentItem>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

describe('useAlert inside a modal', () => {
  it('closing the alert dimmer keeps the underlying modal open', async () => {
    renderWithProvider(<ModalWithAlert />);

    await click(byTestId('open-modal'));
    await expect.poll(openDialogCount).toBe(1);

    await click(byTestId('open-alert'));
    await expect.poll(openAlertCount).toBe(1);
    expect(openDialogCount()).toBe(1); // modal stayed open while alert opened

    // Click the alert's dimmer: only the alert (topmost) closes.
    await clickTopDimmer('alert-dimmer');
    await expect.poll(openAlertCount).toBe(0);
    expect(openDialogCount()).toBe(1);

    // Now the modal's own dimmer closes the modal.
    await clickTopDimmer('modal-dimmer');
    await expect.poll(openDialogCount).toBe(0);
  });
});
