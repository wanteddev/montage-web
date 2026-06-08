import { cleanup } from '@testing-library/react';
import {
  Button,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalTrigger,
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
  openModalCount,
  openTooltipCount,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

const ModalWithTooltip = () => (
  <Modal>
    <ModalTrigger>
      <Button data-testid="open-modal">Open modal</Button>
    </ModalTrigger>
    <ModalContainer variant="popup">
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>Modal</ModalHeading>
          <TooltipGroup>
            <Tooltip enterDelay={0} leaveDelay={0}>
              <TooltipTrigger>
                <Button data-testid="tooltip-trigger">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>Helpful text</TooltipContent>
            </Tooltip>
          </TooltipGroup>
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

describe('Tooltip inside a modal', () => {
  it('opening a tooltip does not close the modal; dimmer still closes the modal', async () => {
    renderWithProvider(<ModalWithTooltip />);

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await hover(byTestId('tooltip-trigger'));
    await expect.poll(openTooltipCount).toBe(1);
    expect(openModalCount()).toBe(1); // tooltip does not disturb the modal

    // Tooltip is a non-blocking layer; the modal dimmer still closes the modal.
    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });
});
