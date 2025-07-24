import { useCallback } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';

import { useDialogStore } from '../../stores/dialog-store';
import {
  Dialog,
  DialogActionArea,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogHeading,
} from '../../components/dialog';

import type { MouseEvent } from 'react';
import type { DialogItem } from '../../stores/dialog-store';

const DialogArea = () => {
  const items = useDialogStore((state) => state.items);

  return (
    <>
      {items.map((dialog) => (
        <DialogPromise key={dialog.id} {...dialog} />
      ))}
    </>
  );
};

export default DialogArea;

const DialogPromise = ({
  id,
  content,
  title,
  confirm,
  cancel,
  direction = 'normal',
  disableOutsideClickClose,
  disableEscapeKeyDownClose,
  sx,
  resolve,
}: DialogItem) => {
  const hide = useDialogStore((state) => state.hide);

  const handleClose = useCallback(() => {
    hide(id);
  }, [hide, id]);

  const handleCancel = useCallback(
    (e?: MouseEvent<HTMLElement>) => {
      if (e?.defaultPrevented) {
        return;
      }

      handleClose();
      resolve('cancel');
    },
    [handleClose, resolve],
  );

  const handleConfirm = useCallback(
    (e?: MouseEvent<HTMLElement>) => {
      if (e?.defaultPrevented) {
        return;
      }

      handleClose();
      resolve('confirm');
    },
    [handleClose, resolve],
  );

  return (
    <Dialog open onOpenChange={(open) => !open && handleCancel()}>
      <DialogContainer
        disableOutsideClickClose={disableOutsideClickClose}
        disableEscapeKeyDownClose={disableEscapeKeyDownClose}
        sx={sx}
      >
        <DialogContent>
          {title && <DialogHeading>{title}</DialogHeading>}
          {content && <DialogDescription>{content}</DialogDescription>}
        </DialogContent>

        <DialogActionArea
          flexDirection={direction === 'reverse' ? 'row-reverse' : 'row'}
          justifyContent={direction === 'reverse' ? 'initial' : 'flex-end'}
        >
          <Slot onClick={handleConfirm}>
            <Slottable>{confirm}</Slottable>
          </Slot>

          {Boolean(cancel) && (
            <Slot onClick={handleCancel}>
              <Slottable>{cancel}</Slottable>
            </Slot>
          )}
        </DialogActionArea>
      </DialogContainer>
    </Dialog>
  );
};
