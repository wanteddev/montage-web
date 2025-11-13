import { useCallback } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';

import { useAlertStore } from '../../stores/alert-store';
import {
  Alert,
  AlertActionArea,
  AlertContainer,
  AlertContent,
  AlertDescription,
  AlertHeading,
} from '../../components/alert';

import type { MouseEvent } from 'react';
import type { AlertItem } from '../../stores/alert-store';

const AlertArea = () => {
  const items = useAlertStore((state) => state.items);

  return (
    <>
      {items.map((dialog) => (
        <AlertPromise key={dialog.id} {...dialog} />
      ))}
    </>
  );
};

export default AlertArea;

const AlertPromise = ({
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
}: AlertItem) => {
  const hide = useAlertStore((state) => state.hide);

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
    <Alert open onOpenChange={(open) => !open && handleCancel()}>
      <AlertContainer
        disableOutsideClickClose={disableOutsideClickClose}
        disableEscapeKeyDownClose={disableEscapeKeyDownClose}
        sx={sx}
      >
        <AlertContent>
          {title && <AlertHeading>{title}</AlertHeading>}
          {content && <AlertDescription>{content}</AlertDescription>}
        </AlertContent>

        <AlertActionArea
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
        </AlertActionArea>
      </AlertContainer>
    </Alert>
  );
};
