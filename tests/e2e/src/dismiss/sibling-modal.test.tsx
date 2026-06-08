import { useState } from 'react';
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

// Two modals rendered as SIBLINGS in JSX (not nested). Modal 2 is opened by a
// button living inside Modal 1, but in the fiber tree it is a sibling — the
// case the radix layer stack must still order correctly.
const SiblingModals = () => {
  const [open2, setOpen2] = useState(false);

  return (
    <>
      <Modal>
        <ModalTrigger>
          <Button data-testid="open-1">Open 1</Button>
        </ModalTrigger>
        <ModalContainer variant="popup">
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Modal 1</ModalHeading>
              <Button data-testid="open-2" onClick={() => setOpen2(true)}>
                Open 2
              </Button>
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>

      <Modal open={open2} onOpenChange={setOpen2}>
        <ModalContainer variant="popup">
          <ModalContent>
            <ModalContentItem>
              <ModalHeading>Modal 2</ModalHeading>
            </ModalContentItem>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

describe('sibling modals', () => {
  it('closes only the topmost sibling modal per dimmer click, sequentially', async () => {
    renderWithProvider(<SiblingModals />);

    await click(byTestId('open-1'));
    await expect.poll(openDialogCount).toBe(1);
    await click(byTestId('open-2'));
    await expect.poll(openDialogCount).toBe(2);

    await clickTopDimmer();
    await expect.poll(openDialogCount).toBe(1);
    await clickTopDimmer();
    await expect.poll(openDialogCount).toBe(0);
  });
});
