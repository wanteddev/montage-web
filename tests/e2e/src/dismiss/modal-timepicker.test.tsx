import { cleanup } from '@testing-library/react';
import {
  Button,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalTrigger,
  TimePicker,
} from '@montage-ui/core';

import {
  byTestId,
  click,
  clickTopDimmer,
  openModalCount,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

// TimePicker now opens a DismissableLayer with `disableOutsidePointerEvents`, so it
// sits above the modal in the radix layer stack: clicking the modal dimmer
// closes the picker first (topmost) while the modal stays, then closes the modal.
const pickerOpen = () =>
  document.querySelectorAll('[data-role="time-picker-wrapper"]').length;

const ModalWithPicker = () => (
  <Modal>
    <ModalTrigger>
      <Button data-testid="open-modal">Open modal</Button>
    </ModalTrigger>
    <ModalContainer variant="popup">
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>Modal</ModalHeading>
          <TimePicker
            defaultValue={new Date('2025-01-01T10:30:00')}
            format="HH:mm"
            placeholder="HH:mm"
          />
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

describe('TimePicker inside a modal', () => {
  it('closes the picker first, then the modal — never both at once', async () => {
    renderWithProvider(<ModalWithPicker />);

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await click(document.querySelector('[aria-label="Toggle time picker"]'));
    await expect.poll(pickerOpen).toBe(1);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(pickerOpen).toBe(0);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });
});
