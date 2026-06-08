import { cleanup } from '@testing-library/react';
import {
  Button,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  MenuTrigger,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalTrigger,
} from '@montage-ui/core';

import {
  byTestId,
  click,
  clickTopDimmer,
  openModalCount,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

// Menu is built on Popover (disableOutsidePointerEvents=true), so it stacks
// above the modal: clicking the modal dimmer closes the menu first, modal stays.
const menuOpen = () => document.querySelectorAll('[role="menu"]').length;

const ModalWithMenu = () => (
  <Modal>
    <ModalTrigger>
      <Button data-testid="open-modal">Open modal</Button>
    </ModalTrigger>
    <ModalContainer variant="popup">
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>Modal</ModalHeading>
          <Menu>
            <MenuTrigger>
              <Button data-testid="open-menu">Open menu</Button>
            </MenuTrigger>
            <MenuContent>
              <MenuList>
                <MenuItem value="a">Item A</MenuItem>
                <MenuItem value="b">Item B</MenuItem>
              </MenuList>
            </MenuContent>
          </Menu>
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

describe('Menu inside a modal', () => {
  it('closes the menu first, then the modal — never both at once', async () => {
    renderWithProvider(<ModalWithMenu />);

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await click(byTestId('open-menu'));
    await expect.poll(menuOpen).toBe(1);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(menuOpen).toBe(0);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });
});
