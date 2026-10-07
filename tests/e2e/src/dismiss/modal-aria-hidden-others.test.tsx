import { cleanup } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import {
  Button,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalTrigger,
} from '@montage-ui/core';

import {
  ariaHiddenOthersCount,
  bodyPointerEvents,
  byTestId,
  click,
  clickTopDimmer,
  openModalCount,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

// A floating widget that sits ABOVE the modal (e.g. a third-party chat button).
// A barrier modal sets `body { pointer-events: none }`, so the widget cannot be
// clicked even though it is visually on top. `disableAriaHiddenOthers` turns the
// modal into a non-barrier: no aria-hidden on siblings, body stays interactive,
// aria-modal drops to false.
const ModalWithFloatingWidget = ({
  onWidgetClick,
  disableAriaHiddenOthers = false,
}: {
  onWidgetClick: () => void;
  disableAriaHiddenOthers?: boolean;
}) => (
  <>
    <button
      type="button"
      data-testid="floating-widget"
      onClick={onWidgetClick}
      style={{ position: 'fixed', top: 8, right: 8, zIndex: 99999 }}
    >
      Widget
    </button>
    <Modal>
      <ModalTrigger>
        <Button data-testid="open-modal">Open modal</Button>
      </ModalTrigger>
      <ModalContainer
        variant="popup"
        disableAriaHiddenOthers={disableAriaHiddenOthers}
      >
        <ModalContent>
          <ModalContentItem>
            <ModalHeading>Modal</ModalHeading>
          </ModalContentItem>
        </ModalContent>
      </ModalContainer>
    </Modal>
  </>
);

const clickWidget = () =>
  // `force`: a barrier makes the widget pointer-events:none, which would fail
  // Playwright's actionability check — a real user's click still lands there.
  userEvent.click(byTestId('floating-widget') as Element, { force: true });

describe('barrier modal (default)', () => {
  it('blocks a floating widget above it and hides siblings from AT', async () => {
    const onWidgetClick = vi.fn();
    renderWithProvider(
      <ModalWithFloatingWidget onWidgetClick={onWidgetClick} />,
    );

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    expect(document.querySelector('[role="dialog"]')).toHaveAttribute(
      'aria-modal',
      'true',
    );
    expect(bodyPointerEvents()).toBe('none');
    expect(ariaHiddenOthersCount()).toBeGreaterThan(0);

    await clickWidget();
    expect(onWidgetClick).not.toHaveBeenCalled();
    // The click fell through to <html>: an outside interaction → dismissed.
    await expect.poll(openModalCount).toBe(0);

    await expect.poll(bodyPointerEvents).not.toBe('none');
    await expect.poll(ariaHiddenOthersCount).toBe(0);
  });
});

describe('Modal with disableAriaHiddenOthers', () => {
  it('is not a barrier: aria-modal=false, body interactive, siblings not hidden', async () => {
    renderWithProvider(
      <ModalWithFloatingWidget
        onWidgetClick={() => {}}
        disableAriaHiddenOthers
      />,
    );

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    expect(document.querySelector('[role="dialog"]')).toHaveAttribute(
      'aria-modal',
      'false',
    );
    expect(bodyPointerEvents()).not.toBe('none');
    expect(ariaHiddenOthersCount()).toBe(0);
  });

  it('the floating widget receives the click, and the modal is dismissed', async () => {
    const onWidgetClick = vi.fn();
    renderWithProvider(
      <ModalWithFloatingWidget
        onWidgetClick={onWidgetClick}
        disableAriaHiddenOthers
      />,
    );

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await clickWidget();
    await expect.poll(() => onWidgetClick.mock.calls.length).toBe(1);
    await expect.poll(openModalCount).toBe(0);
  });

  it('the dimmer still closes it', async () => {
    renderWithProvider(
      <ModalWithFloatingWidget
        onWidgetClick={() => {}}
        disableAriaHiddenOthers
      />,
    );

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });
});
