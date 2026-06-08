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
} from '@montage-ui/core';

import {
  byTestId,
  click,
  clickTopDimmer,
  openModalCount,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

// Popover content carries data-status on the PopperContent wrapper (an ancestor
// of role="dialog"), so count via the marked content's open wrapper.
const popoverOpen = () =>
  [...document.querySelectorAll('[data-testid="popover-content"]')].filter(
    (el) => el.closest('[data-status="open"]'),
  ).length;

const ModalWithPopover = () => (
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
              Popover body
            </PopoverContent>
          </Popover>
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

describe('Popover inside a modal', () => {
  it('closes the popover first, then the modal — never both at once', async () => {
    renderWithProvider(<ModalWithPopover />);

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await click(byTestId('open-popover'));
    await expect.poll(popoverOpen).toBe(1);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(popoverOpen).toBe(0);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });
});
