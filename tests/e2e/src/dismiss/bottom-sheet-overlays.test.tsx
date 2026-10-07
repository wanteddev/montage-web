import { cleanup } from '@testing-library/react';
import {
  Button,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  Option,
  OptionGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
} from '@montage-ui/core';

import {
  bodyPointerEvents,
  byTestId,
  click,
  clickCorner,
  clickTopDimmer,
  listboxCount,
  popoverOpenByTestId,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

const sheetSnap = () =>
  document
    .querySelector('[role="dialog"][data-snap]')
    ?.getAttribute('data-snap');

const popoverOpen = () => popoverOpenByTestId('sheet-popover-content');

const SheetPopover = () => (
  <Popover>
    <PopoverTrigger>
      <Button data-testid="open-popover">Open popover</Button>
    </PopoverTrigger>
    <PopoverContent data-testid="sheet-popover-content">
      Popover body
    </PopoverContent>
  </Popover>
);

const SheetSelect = () => (
  <Select width="25ch" placeholder="Select...">
    <OptionGroup title="Group">
      <Option value="a">Option A</Option>
      <Option value="b">Option B</Option>
    </OptionGroup>
  </Select>
);

// A dimmed handle sheet: an outside click collapses it to `peek` instead of
// closing it (`collapseToPeekOrClose`). An overlay inside it must close first.
describe('dimmed bottom sheet (handle) with a Popover', () => {
  it('outside click closes the popover first, then collapses the sheet to peek', async () => {
    renderWithProvider(
      <Modal defaultOpen>
        <ModalContainer
          variant="bottom"
          handle
          peekHeight={80}
          defaultSnap="full"
        >
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Sheet</ModalHeading>
              <SheetPopover />
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>,
    );

    await expect.poll(sheetSnap).toBe('full');

    await click(byTestId('open-popover'));
    await expect.poll(popoverOpen).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(popoverOpen).toBe(0);
    expect(sheetSnap()).toBe('full');

    await clickTopDimmer('modal-dimmer');
    await expect.poll(sheetSnap).toBe('peek');
    // Peek is undimmed: the page behind must be interactive again.
    await expect.poll(bodyPointerEvents).not.toBe('none');
  });
});

// An undimmed half sheet is not a barrier, but a Select opened inside it is:
// while the listbox is open the body is blocked; closing it restores the page
// and leaves the sheet untouched.
describe('undimmed bottom sheet with a Select', () => {
  it('select blocks the page while open; outside click closes only the select', async () => {
    const onBackgroundClick = vi.fn();

    renderWithProvider(
      <>
        <Button data-testid="background-button" onClick={onBackgroundClick}>
          Background
        </Button>
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
                <SheetSelect />
              </ModalContentItem>
            </ModalContent>
          </ModalContainer>
        </Modal>
      </>,
    );

    await expect.poll(sheetSnap).toBe('half');
    expect(bodyPointerEvents()).not.toBe('none');

    // Undimmed: the background is clickable while only the sheet is open.
    await click(byTestId('background-button'));
    expect(onBackgroundClick).toHaveBeenCalledTimes(1);
    expect(sheetSnap()).toBe('half');

    await click(document.querySelector('[role="combobox"]'));
    await expect.poll(listboxCount).toBe(1);
    expect(bodyPointerEvents()).toBe('none');

    // The background button is blocked while the listbox is open; the click
    // only dismisses the listbox.
    await clickCorner(byTestId('background-button'));
    await expect.poll(listboxCount).toBe(0);
    expect(onBackgroundClick).toHaveBeenCalledTimes(1);
    expect(sheetSnap()).toBe('half');
    await expect.poll(bodyPointerEvents).not.toBe('none');
  });
});
