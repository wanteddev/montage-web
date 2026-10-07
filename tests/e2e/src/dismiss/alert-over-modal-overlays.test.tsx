import { cleanup } from '@testing-library/react';
import {
  Alert,
  AlertActionArea,
  AlertActionAreaButton,
  AlertContainer,
  AlertContent,
  AlertHeading,
  AlertTrigger,
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
  openAlertCount,
  openModalCount,
  openTooltipCount,
  popoverOpenByTestId,
  pressEscape,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

// Modal → Alert → (Popover | Tooltip). The Alert is a blocking layer above the
// modal; overlays opened from inside the alert must stack above it and close
// before the alert, which itself must close before the modal. Popover and
// tooltip are tested separately: the alert auto-focuses its first tabbable, so a
// tooltip trigger would open on mount and cover a neighbouring trigger.
const popoverOpen = () => popoverOpenByTestId('alert-popover-content');

const ModalWithAlertOverlays = ({
  overlay,
}: {
  overlay: 'popover' | 'tooltip';
}) => (
  <Modal>
    <ModalTrigger>
      <Button data-testid="open-modal">Open modal</Button>
    </ModalTrigger>
    <ModalContainer variant="popup">
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>Modal</ModalHeading>
          <Alert>
            <AlertTrigger>
              <Button data-testid="open-alert">Open alert</Button>
            </AlertTrigger>
            <AlertContainer>
              <AlertContent>
                <AlertHeading>Alert</AlertHeading>
                {overlay === 'popover' ? (
                  <Popover>
                    <PopoverTrigger>
                      <Button data-testid="open-popover">Open popover</Button>
                    </PopoverTrigger>
                    <PopoverContent data-testid="alert-popover-content">
                      Popover body
                    </PopoverContent>
                  </Popover>
                ) : (
                  <TooltipGroup>
                    <Tooltip enterDelay={0} leaveDelay={0}>
                      <TooltipTrigger>
                        <Button data-testid="tooltip-trigger">Hover me</Button>
                      </TooltipTrigger>
                      <TooltipContent>Helpful text</TooltipContent>
                    </Tooltip>
                  </TooltipGroup>
                )}
              </AlertContent>
              <AlertActionArea>
                <AlertActionAreaButton>OK</AlertActionAreaButton>
              </AlertActionArea>
            </AlertContainer>
          </Alert>
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

const openModalAndAlert = async () => {
  await click(byTestId('open-modal'));
  await expect.poll(openModalCount).toBe(1);

  await click(byTestId('open-alert'));
  await expect.poll(openAlertCount).toBe(1);
  expect(openModalCount()).toBe(1);
};

describe('Popover / Tooltip inside an Alert over a Modal', () => {
  it('outside clicks close popover → alert → modal, one at a time', async () => {
    renderWithProvider(<ModalWithAlertOverlays overlay="popover" />);
    await openModalAndAlert();

    await click(byTestId('open-popover'));
    await expect.poll(popoverOpen).toBe(1);

    await clickTopDimmer('alert-dimmer');
    await expect.poll(popoverOpen).toBe(0);
    expect(openAlertCount()).toBe(1);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('alert-dimmer');
    await expect.poll(openAlertCount).toBe(0);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });

  it('Escape closes tooltip → alert → modal, one at a time', async () => {
    renderWithProvider(<ModalWithAlertOverlays overlay="tooltip" />);
    await openModalAndAlert();

    await hover(byTestId('tooltip-trigger'));
    await expect.poll(openTooltipCount).toBe(1);

    await pressEscape();
    await expect.poll(openTooltipCount).toBe(0);
    expect(openAlertCount()).toBe(1);
    expect(openModalCount()).toBe(1);
    await expect.poll(() => mountedCount('[role="tooltip"]')).toBe(0);

    await pressEscape();
    await expect.poll(openAlertCount).toBe(0);
    expect(openModalCount()).toBe(1);
    await expect.poll(() => mountedCount('[role="alertdialog"]')).toBe(0);

    await pressEscape();
    await expect.poll(openModalCount).toBe(0);
  });
});
