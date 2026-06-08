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
} from '@montage-ui/core';

import {
  byTestId,
  click,
  clickTopDimmer,
  openAlertCount,
  openModalCount,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

const ModalLeaf = ({
  testid,
  title,
  disableOutsideClickClose = false,
  children,
}: {
  testid: string;
  title: string;
  disableOutsideClickClose?: boolean;
  children?: React.ReactNode;
}) => (
  <Modal>
    <ModalTrigger>
      <Button data-testid={testid}>{title}</Button>
    </ModalTrigger>
    <ModalContainer
      variant="popup"
      disableOutsideClickClose={disableOutsideClickClose}
    >
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>{title}</ModalHeading>
          {children}
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

describe('disableOutsideClickClose', () => {
  it('keeps a single modal open when its dimmer is clicked', async () => {
    renderWithProvider(
      <ModalLeaf testid="open-1" title="Modal 1" disableOutsideClickClose />,
    );

    await click(byTestId('open-1'));
    await expect.poll(openModalCount).toBe(1);

    await clickTopDimmer('modal-dimmer');
    await clickTopDimmer('modal-dimmer');
    // Still open: outside-click close is disabled.
    expect(openModalCount()).toBe(1);
  });

  it('a top modal with disableOutsideClickClose blocks the dimmer for the whole stack', async () => {
    renderWithProvider(
      <ModalLeaf testid="open-1" title="Modal 1">
        <ModalLeaf testid="open-2" title="Modal 2" disableOutsideClickClose />
      </ModalLeaf>,
    );

    await click(byTestId('open-1'));
    await expect.poll(openModalCount).toBe(1);
    await click(byTestId('open-2'));
    await expect.poll(openModalCount).toBe(2);

    await clickTopDimmer('modal-dimmer');
    await clickTopDimmer('modal-dimmer');
    // Top modal absorbs the outside click; nothing closes.
    expect(openModalCount()).toBe(2);
  });

  it('keeps an alert open when its dimmer is clicked', async () => {
    renderWithProvider(
      <Alert>
        <AlertTrigger>
          <Button data-testid="open-alert">Open alert</Button>
        </AlertTrigger>
        <AlertContainer disableOutsideClickClose>
          <AlertContent>
            <AlertHeading>Alert</AlertHeading>
          </AlertContent>
          <AlertActionArea>
            <AlertActionAreaButton>OK</AlertActionAreaButton>
          </AlertActionArea>
        </AlertContainer>
      </Alert>,
    );

    await click(byTestId('open-alert'));
    await expect.poll(openAlertCount).toBe(1);

    await clickTopDimmer('alert-dimmer');
    await clickTopDimmer('alert-dimmer');
    expect(openAlertCount()).toBe(1);
  });
});
