import { forwardRef, useCallback, useEffect, useId, useRef } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { Box, getColorByToken } from '@wanteddev/wds-engine';

import { hideOthers } from '../../utils/aria-hidden';
import RemoveScroll from '../remove-scroll';
import { DismissableLayer, FlexBox, Portal, TextButton, Typography } from '..';
import FocusScope from '../focus-scope';
import { useDialogStore } from '../../stores/dialog-store';

import {
  dialogActionStyle,
  dialogContentStyle,
  dialogDimmerStyle,
  dialogWrapperStyle,
} from './style';

import type { DialogButtonProps } from './types';
import type { ElementType, ForwardedRef, MouseEvent } from 'react';
import type {
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { DialogItem } from '../../stores/dialog-store';

const Dialog = () => {
  const items = useDialogStore((state) => state.items);

  return (
    <Portal>
      {items.map((dialog) => (
        <Item key={dialog.id} {...dialog} />
      ))}
    </Portal>
  );
};

const Item = ({
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

  const ref = useRef<HTMLDivElement>(null);

  const titleId = useId();
  const descriptionId = useId();

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

  useEffect(() => {
    const element = ref.current;

    if (element) {
      return hideOthers(element);
    }
  }, []);

  return (
    <FlexBox sx={dialogWrapperStyle} wds-ignore-dismissable-layer="true">
      <FocusScope loop trapped>
        <DismissableLayer
          onPointerDownOutside={(e) => {
            const originalEvent = e.detail.originalEvent;
            const ctrlLeftClick =
              originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

            if (isRightClick || disableEscapeKeyDownClose) e.preventDefault();
          }}
          onFocusOutside={(e) => e.preventDefault()}
          onDismiss={handleCancel}
          role="presentation"
          asChild
        >
          <RemoveScroll as={Slot} allowPinchZoom>
            <FlexBox
              ref={ref}
              role="alertdialog"
              aria-describedby={descriptionId}
              aria-labelledby={titleId}
              flexDirection="column"
              sx={[dialogContentStyle, sx]}
            >
              <Box
                sx={dialogDimmerStyle}
                onClick={(e) => {
                  e.preventDefault();
                  if (!disableOutsideClickClose) {
                    handleCancel();
                  }
                }}
                onPointerDown={(e) => {
                  const target = e.target as HTMLElement;

                  if (target.hasPointerCapture(e.pointerId)) {
                    target.releasePointerCapture(e.pointerId);
                  }
                }}
              />

              <FlexBox
                wds-component="dialog-wrapper"
                flexDirection="column"
                gap="6px"
                sx={{ padding: '20px' }}
              >
                {Boolean(title) && (
                  <Typography
                    wds-component="dialog-title"
                    variant="headline1"
                    weight="bold"
                    color="semantic.label.normal"
                  >
                    {title}
                  </Typography>
                )}

                <Typography
                  wds-component="dialog-content"
                  variant="body2"
                  weight="regular"
                  color="semantic.label.alternative"
                  sx={{
                    wordBreak: 'keep-all',
                    overflowWrap: 'anywhere',
                  }}
                  display="block"
                >
                  {content}
                </Typography>
              </FlexBox>

              <FlexBox
                flexDirection={direction === 'reverse' ? 'row-reverse' : 'row'}
                alignItems="center"
                wds-component="dialog-action-wrapper"
                justifyContent={
                  direction === 'reverse' ? 'initial' : 'flex-end'
                }
                gap="24px"
                sx={dialogActionStyle}
              >
                <Slot onClick={handleConfirm}>
                  <Slottable>{confirm}</Slottable>
                </Slot>

                {Boolean(cancel) && (
                  <Slot onClick={handleCancel}>
                    <Slottable>{cancel}</Slottable>
                  </Slot>
                )}
              </FlexBox>
            </FlexBox>
          </RemoveScroll>
        </DismissableLayer>
      </FocusScope>
    </FlexBox>
  );
};

export const DialogButton = forwardRef(
  <E extends ElementType = 'button'>(
    { variant = 'normal', ...props }: PolymorphicProps<DialogButtonProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    return (
      <TextButton
        size="medium"
        variant={variant === 'normal' ? 'primary' : 'assistive'}
        ref={ref}
        {...props}
        sx={
          variant === 'negative'
            ? [
                (theme) => ({
                  color: getColorByToken(theme, 'semantic.status.negative'),
                  ['[wds-component="with-interaction"]']: {
                    backgroundColor: getColorByToken(
                      theme,
                      'semantic.status.negative',
                    ),
                  },
                }),
                props.sx,
              ]
            : props.sx
        }
      />
    );
  },
) as PolymorphicComponent<DialogButtonProps, 'button'>;

DialogButton.displayName = 'DialogButton';

export default Dialog;
