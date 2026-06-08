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
  openModalCount,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

// A `useAlert({ disableOutsideClickClose: true })` opened over a modal must remain
// a hard-modal barrier. Clicking its dimmer should close nothing: the alert is
// disableOutsideClickClose, and the underlying modal must NOT close through it.
const ModalWithBlockingAlert = () => {
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
                  content: 'Cannot dismiss by outside click',
                  confirm: <Button>OK</Button>,
                  disableOutsideClickClose: true,
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

describe('disableOutsideClickClose alert over a modal', () => {
  it('outside click closes neither the alert nor the underlying modal', async () => {
    renderWithProvider(<ModalWithBlockingAlert />);

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await click(byTestId('open-alert'));
    await expect.poll(openAlertCount).toBe(1);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('alert-dimmer');
    await clickTopDimmer('alert-dimmer');

    expect(openAlertCount()).toBe(1); // alert blocks outside-click close
    expect(openModalCount()).toBe(1); // underlying modal must NOT close through it
  });
});
