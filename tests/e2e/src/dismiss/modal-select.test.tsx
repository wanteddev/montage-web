import { cleanup } from '@testing-library/react';
import {
  Button,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalTrigger,
  Option,
  OptionGroup,
  Select,
} from '@montage-ui/core';

import {
  byTestId,
  click,
  clickTopDimmer,
  listboxCount,
  openModalCount,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

const ModalWithSelect = () => (
  <Modal>
    <ModalTrigger>
      <Button data-testid="open-modal">Open modal</Button>
    </ModalTrigger>
    <ModalContainer variant="popup">
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>Modal</ModalHeading>
          <Select width="25ch" placeholder="Select...">
            <OptionGroup title="Group">
              <Option value="a">Option A</Option>
              <Option value="b">Option B</Option>
            </OptionGroup>
          </Select>
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

describe('Select inside a modal', () => {
  it('closes the select first, then the modal — never both at once', async () => {
    renderWithProvider(<ModalWithSelect />);

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await click(document.querySelector('[role="combobox"]'));
    await expect.poll(listboxCount).toBe(1);
    expect(openModalCount()).toBe(1); // modal stays open

    // Outside click (modal dimmer): the listbox closes, modal stays.
    await clickTopDimmer('modal-dimmer');
    await expect.poll(listboxCount).toBe(0);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });
});
