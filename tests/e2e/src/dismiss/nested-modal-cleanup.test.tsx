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
  ariaHiddenOthersCount,
  bodyPointerEvents,
  byTestId,
  click,
  clickTopDimmer,
  mountedCount,
  openModalCount,
  popoverOpenByTestId,
  pressEscape,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

const popoverOpen = () => popoverOpenByTestId('inner-popover-content');

// Modal 1 → Modal 2 → Popover. After everything is closed — by a mix of
// Escape and outside clicks — no blocking side effect may leak: body
// pointer-events, aria-hidden markers and the dialog nodes must all be gone.
const NestedModalsWithPopover = () => (
  <Modal>
    <ModalTrigger>
      <Button data-testid="open-1">Open 1</Button>
    </ModalTrigger>
    <ModalContainer variant="popup">
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>Modal 1</ModalHeading>
          <Modal>
            <ModalTrigger>
              <Button data-testid="open-2">Open 2</Button>
            </ModalTrigger>
            <ModalContainer variant="popup">
              <ModalContent>
                <ModalContentItem>
                  <ModalHeading>Modal 2</ModalHeading>
                  <Popover>
                    <PopoverTrigger>
                      <Button data-testid="open-popover">Open popover</Button>
                    </PopoverTrigger>
                    <PopoverContent data-testid="inner-popover-content">
                      Popover body
                    </PopoverContent>
                  </Popover>
                </ModalContentItem>
              </ModalContent>
            </ModalContainer>
          </Modal>
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

describe('nested modals + popover cleanup', () => {
  it('leaves no pointer-events or aria-hidden residue after mixed dismissal', async () => {
    renderWithProvider(<NestedModalsWithPopover />);

    await click(byTestId('open-1'));
    await expect.poll(openModalCount).toBe(1);
    await click(byTestId('open-2'));
    await expect.poll(openModalCount).toBe(2);
    await click(byTestId('open-popover'));
    await expect.poll(popoverOpen).toBe(1);

    expect(bodyPointerEvents()).toBe('none');
    expect(ariaHiddenOthersCount()).toBeGreaterThan(0);

    // Popover via Escape.
    await pressEscape();
    await expect.poll(popoverOpen).toBe(0);
    expect(openModalCount()).toBe(2);
    await expect
      .poll(() => mountedCount('[data-testid="inner-popover-content"]'))
      .toBe(0);

    // Modal 2 via outside click.
    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(1);
    // Modal 1 is still a barrier.
    expect(bodyPointerEvents()).toBe('none');
    await expect.poll(() => mountedCount('[role="dialog"]')).toBe(1);

    // Modal 1 via Escape.
    await pressEscape();
    await expect.poll(openModalCount).toBe(0);
    await expect.poll(() => mountedCount('[role="dialog"]')).toBe(0);

    await expect.poll(bodyPointerEvents).not.toBe('none');
    expect(document.body.style.pointerEvents).toBe('');
    await expect.poll(ariaHiddenOthersCount).toBe(0);
  });
});
