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
  Option,
  OptionGroup,
  Select,
} from '@montage-ui/core';

import {
  byTestId,
  click,
  clickTopDimmer,
  listboxCount,
  mountedCount,
  openModalCount,
  pressEscape,
  renderWithProvider,
  rightClickTopDimmer,
} from '../helpers';

import type { ReactNode } from 'react';

afterEach(() => cleanup());

const menuOpen = () => mountedCount('[role="menu"]');

const ModalWith = ({
  children,
  disableEscapeKeyDownClose = false,
}: {
  children: ReactNode;
  disableEscapeKeyDownClose?: boolean;
}) => (
  <Modal>
    <ModalTrigger>
      <Button data-testid="open-modal">Open modal</Button>
    </ModalTrigger>
    <ModalContainer
      variant="popup"
      disableEscapeKeyDownClose={disableEscapeKeyDownClose}
    >
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>Modal</ModalHeading>
          {children}
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

const ModalSelect = () => (
  <Select width="25ch" placeholder="Select...">
    <OptionGroup title="Group">
      <Option value="a">Option A</Option>
      <Option value="b">Option B</Option>
    </OptionGroup>
  </Select>
);

const ModalMenu = () => (
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
);

describe('Escape with overlays inside a modal', () => {
  it('Select: first Escape closes the listbox, second closes the modal', async () => {
    renderWithProvider(
      <ModalWith>
        <ModalSelect />
      </ModalWith>,
    );

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await click(document.querySelector('[role="combobox"]'));
    await expect.poll(listboxCount).toBe(1);

    await pressEscape();
    await expect.poll(listboxCount).toBe(0);
    expect(openModalCount()).toBe(1);

    await pressEscape();
    await expect.poll(openModalCount).toBe(0);
  });

  it('Menu: reopen and Escape repeatedly, the modal survives until the menu is gone', async () => {
    renderWithProvider(
      <ModalWith>
        <ModalMenu />
      </ModalWith>,
    );

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    for (let i = 0; i < 2; i += 1) {
      await click(byTestId('open-menu'));
      await expect.poll(menuOpen).toBe(1);

      await pressEscape();
      await expect.poll(menuOpen).toBe(0);
      expect(openModalCount()).toBe(1);
    }

    await pressEscape();
    await expect.poll(openModalCount).toBe(0);
  });

  it('disableEscapeKeyDownClose: Escape closes the inner menu but never the modal', async () => {
    renderWithProvider(
      <ModalWith disableEscapeKeyDownClose>
        <ModalMenu />
      </ModalWith>,
    );

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await click(byTestId('open-menu'));
    await expect.poll(menuOpen).toBe(1);

    await pressEscape();
    await expect.poll(menuOpen).toBe(0);

    await pressEscape();
    await pressEscape();
    expect(openModalCount()).toBe(1);

    // Outside click is still allowed.
    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });

  it('a right click on the dimmer does not close the modal', async () => {
    renderWithProvider(
      <ModalWith>
        <ModalSelect />
      </ModalWith>,
    );

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await rightClickTopDimmer('modal-dimmer');
    await rightClickTopDimmer('modal-dimmer');
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });
});
