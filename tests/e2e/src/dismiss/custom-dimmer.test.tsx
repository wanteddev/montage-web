import { cleanup } from '@testing-library/react';
import {
  Alert,
  AlertActionArea,
  AlertActionAreaButton,
  AlertContainer,
  AlertContent,
  AlertDimmer,
  AlertHeading,
  AlertTrigger,
  Button,
  Modal,
  ModalContainer,
  ModalContent,
  ModalContentItem,
  ModalDimmer,
  ModalHeading,
  ModalTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@montage-ui/core';

import {
  byTestId,
  click,
  clickCorner,
  clickTopDimmer,
  openAlertCount,
  openModalCount,
  popoverOpenByTestId,
  renderWithProvider,
} from '../helpers';

import type { ReactNode } from 'react';

afterEach(() => cleanup());

// `dimmer` lets consumers swap the scrim (e.g. framer-motion). Dismissal is
// owned by the DismissableLayer's outside-pointer handling, so it must work no
// matter what element the dimmer is — including one without data-role.
const CustomDimmerModal = ({
  dimmer,
  disableOutsideClickClose = false,
  children,
}: {
  dimmer: ReactNode;
  disableOutsideClickClose?: boolean;
  children?: ReactNode;
}) => (
  <Modal>
    <ModalTrigger>
      <Button data-testid="open-modal">Open modal</Button>
    </ModalTrigger>
    <ModalContainer
      variant="popup"
      dimmer={dimmer}
      disableOutsideClickClose={disableOutsideClickClose}
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

describe('custom Modal dimmer', () => {
  it('a styled ModalDimmer still closes the modal on outside click', async () => {
    renderWithProvider(
      <CustomDimmerModal
        dimmer={
          <ModalDimmer
            data-testid="custom-dimmer"
            sx={{ backgroundColor: 'rgba(255, 0, 0, 0.4)' }}
          />
        }
      />,
    );

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    expect(
      getComputedStyle(byTestId('custom-dimmer') as Element).backgroundColor,
    ).toBe('rgba(255, 0, 0, 0.4)');

    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });

  it('a plain element dimmer (no ModalDimmer) still closes the modal', async () => {
    renderWithProvider(
      <CustomDimmerModal
        dimmer={
          <div
            data-testid="plain-dimmer"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.4)',
            }}
          />
        }
      />,
    );

    await click(byTestId('open-modal'));
    await expect.poll(() => byTestId('plain-dimmer')).not.toBeNull();

    await clickCorner(byTestId('plain-dimmer'));
    await expect.poll(() => byTestId('plain-dimmer')).toBeNull();
  });

  it('disableOutsideClickClose wins over a custom dimmer', async () => {
    renderWithProvider(
      <CustomDimmerModal
        disableOutsideClickClose
        dimmer={<ModalDimmer data-testid="custom-dimmer" />}
      />,
    );

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await clickTopDimmer('modal-dimmer');
    expect(openModalCount()).toBe(1);
  });

  it('a popover inside a custom-dimmer modal closes before the modal', async () => {
    renderWithProvider(
      <CustomDimmerModal dimmer={<ModalDimmer data-testid="custom-dimmer" />}>
        <Popover>
          <PopoverTrigger>
            <Button data-testid="open-popover">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent data-testid="popover-content">
            Popover body
          </PopoverContent>
        </Popover>
      </CustomDimmerModal>,
    );

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await click(byTestId('open-popover'));
    await expect.poll(() => popoverOpenByTestId('popover-content')).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(() => popoverOpenByTestId('popover-content')).toBe(0);
    expect(openModalCount()).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await expect.poll(openModalCount).toBe(0);
  });

  // v3 ModalDimmer composed the consumer's onClick with its own close handler.
  // Since #583 the blocking layer sets `body { pointer-events: none }`, so the
  // dimmer (a sibling of the layer, not inside it) no longer receives clicks.
  it('a consumer onClick on ModalDimmer fires when the dimmer is clicked', async () => {
    const onDimmerClick = vi.fn();

    renderWithProvider(
      <CustomDimmerModal
        disableOutsideClickClose
        dimmer={<ModalDimmer onClick={onDimmerClick} />}
      />,
    );

    await click(byTestId('open-modal'));
    await expect.poll(openModalCount).toBe(1);

    await clickTopDimmer('modal-dimmer');
    expect(onDimmerClick).toHaveBeenCalledTimes(1);
  });
});

const CustomDimmerAlert = ({
  disableOutsideClickClose = false,
}: {
  disableOutsideClickClose?: boolean;
}) => (
  <Alert>
    <AlertTrigger>
      <Button data-testid="open-alert">Open alert</Button>
    </AlertTrigger>
    <AlertContainer
      disableOutsideClickClose={disableOutsideClickClose}
      dimmer={
        <AlertDimmer
          data-testid="custom-alert-dimmer"
          sx={{ backgroundColor: 'rgba(0, 0, 255, 0.4)' }}
        />
      }
    >
      <AlertContent>
        <AlertHeading>Alert</AlertHeading>
      </AlertContent>
      <AlertActionArea>
        <AlertActionAreaButton>OK</AlertActionAreaButton>
      </AlertActionArea>
    </AlertContainer>
  </Alert>
);

describe('custom Alert dimmer', () => {
  it('a styled AlertDimmer still closes the alert on outside click', async () => {
    renderWithProvider(<CustomDimmerAlert />);

    await click(byTestId('open-alert'));
    await expect.poll(openAlertCount).toBe(1);

    expect(
      getComputedStyle(byTestId('custom-alert-dimmer') as Element)
        .backgroundColor,
    ).toBe('rgba(0, 0, 255, 0.4)');

    await clickTopDimmer('alert-dimmer');
    await expect.poll(openAlertCount).toBe(0);
  });

  it('disableOutsideClickClose keeps the alert open behind a custom dimmer', async () => {
    renderWithProvider(<CustomDimmerAlert disableOutsideClickClose />);

    await click(byTestId('open-alert'));
    await expect.poll(openAlertCount).toBe(1);

    await clickTopDimmer('alert-dimmer');
    await clickTopDimmer('alert-dimmer');
    expect(openAlertCount()).toBe(1);
  });
});
