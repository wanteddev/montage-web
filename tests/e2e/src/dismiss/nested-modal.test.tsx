import { cleanup } from '@testing-library/react';
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
  byTestId,
  click,
  clickTopDimmer,
  openDialogCount,
  renderWithProvider,
} from '../helpers';

afterEach(() => cleanup());

const Leaf = ({
  testid,
  title,
  children,
}: {
  testid: string;
  title: string;
  children?: React.ReactNode;
}) => (
  <Modal>
    <ModalTrigger>
      <Button data-testid={testid}>{title}</Button>
    </ModalTrigger>
    <ModalContainer variant="popup">
      <ModalContent>
        <ModalContentItem>
          <ModalHeading>{title}</ModalHeading>
          {children}
        </ModalContentItem>
      </ModalContent>
    </ModalContainer>
  </Modal>
);

describe('nested modals (declarative)', () => {
  it('closes only the topmost modal per dimmer click, sequentially', async () => {
    renderWithProvider(
      <Leaf testid="open-1" title="Modal 1">
        <Leaf testid="open-2" title="Modal 2">
          <Leaf testid="open-3" title="Modal 3" />
        </Leaf>
      </Leaf>,
    );

    await click(byTestId('open-1'));
    await expect.poll(openDialogCount).toBe(1);
    await click(byTestId('open-2'));
    await expect.poll(openDialogCount).toBe(2);
    await click(byTestId('open-3'));
    await expect.poll(openDialogCount).toBe(3);

    await clickTopDimmer();
    await expect.poll(openDialogCount).toBe(2);
    await clickTopDimmer();
    await expect.poll(openDialogCount).toBe(1);
    await clickTopDimmer();
    await expect.poll(openDialogCount).toBe(0);
  });
});
