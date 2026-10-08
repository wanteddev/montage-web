import { cleanup } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import {
  Autocomplete,
  AutocompleteField,
  AutocompleteList,
  AutocompleteOption,
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

const ModalAutocomplete = () => (
  <Autocomplete>
    <AutocompleteField>
      <input data-testid="autocomplete-field" />
    </AutocompleteField>
    <AutocompleteList>
      <AutocompleteOption value="apple">Apple</AutocompleteOption>
      <AutocompleteOption value="avocado">Avocado</AutocompleteOption>
    </AutocompleteList>
  </Autocomplete>
);

const autocompleteField = () =>
  byTestId('autocomplete-field') as HTMLInputElement;

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

  // The list is not a radix layer by itself; Escape is handled on the document
  // in the capture phase, so without its own layer the modal used to close
  // first — whatever the field did with the key.
  it.each([
    ['opened by click', async () => {}],
    [
      'with a highlighted option',
      async () => {
        await userEvent.keyboard('{ArrowDown}');
      },
    ],
    [
      'opened by typing',
      async () => {
        await userEvent.keyboard('a');
      },
    ],
  ])(
    'Autocomplete (%s): first Escape closes the list, second closes the modal',
    async (_, prepare) => {
      renderWithProvider(
        <ModalWith>
          <ModalAutocomplete />
        </ModalWith>,
      );

      await click(byTestId('open-modal'));
      await expect.poll(openModalCount).toBe(1);

      await click(autocompleteField());
      await prepare();
      await expect.poll(listboxCount).toBe(1);
      const typed = autocompleteField().value;

      await pressEscape();
      await expect.poll(listboxCount).toBe(0);
      expect(openModalCount()).toBe(1);
      // `type="search"` must not clear the value on Escape.
      expect(autocompleteField().value).toBe(typed);

      await pressEscape();
      await expect.poll(openModalCount).toBe(0);
    },
  );
});
