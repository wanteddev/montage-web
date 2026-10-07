import { cleanup } from '@testing-library/react';
import {
  Button,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipGroup,
  TooltipTrigger,
} from '@montage-ui/core';

import {
  byTestId,
  click,
  clickTopDimmer,
  hover,
  mountedCount,
  openModalCount,
  openTooltipCount,
  popoverOpenByTestId,
  pressEscape,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

// Three stacked layers: Modal (blocking) > Popover (blocking) > Tooltip
// (non-blocking DismissableLayer). Every dismiss gesture must peel exactly one
// layer off the top of the radix stack.
const popoverOpen = () => popoverOpenByTestId('popover-content');

const ModalPopoverTooltip = () => (
  <Modal>
    <ModalTrigger>
      <Button data-testid="open-modal">Open modal</Button>
    </ModalTrigger>
    <ModalContainer variant="popup">
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>Modal</ModalHeading>
          <Popover>
            <PopoverTrigger>
              <Button data-testid="open-popover">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent data-testid="popover-content">
              <TooltipGroup>
                <Tooltip enterDelay={0} leaveDelay={0}>
                  <TooltipTrigger>
                    <Button data-testid="tooltip-trigger">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>Helpful text</TooltipContent>
                </Tooltip>
              </TooltipGroup>
            </PopoverContent>
          </Popover>
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

const openAllThree = async () => {
  await click(byTestId('open-modal'));
  await expect.poll(openModalCount).toBe(1);

  await click(byTestId('open-popover'));
  await expect.poll(popoverOpen).toBe(1);

  await hover(byTestId('tooltip-trigger'));
  await expect.poll(openTooltipCount).toBe(1);
  expect(popoverOpen()).toBe(1);
  expect(openModalCount()).toBe(1);
};

describe('Tooltip inside a Popover inside a Modal', () => {
  it('Escape peels one layer per press: tooltip → popover → modal', async () => {
    renderWithProvider(<ModalPopoverTooltip />);
    await openAllThree();

    await pressEscape();
    await expect.poll(openTooltipCount).toBe(0);
    expect(popoverOpen()).toBe(1);
    expect(openModalCount()).toBe(1);
    await expect.poll(() => mountedCount('[role="tooltip"]')).toBe(0);

    await pressEscape();
    await expect.poll(popoverOpen).toBe(0);
    expect(openModalCount()).toBe(1);
    await expect
      .poll(() => mountedCount('[data-testid="popover-content"]'))
      .toBe(0);

    await pressEscape();
    await expect.poll(openModalCount).toBe(0);
  });

  it('an outside click closes the popover (and its tooltip) but keeps the modal', async () => {
    renderWithProvider(<ModalPopoverTooltip />);
    await openAllThree();

    await clickTopDimmer('modal-dimmer');
    await expect.poll(popoverOpen).toBe(0);
    await expect.poll(openTooltipCount).toBe(0);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });
});
