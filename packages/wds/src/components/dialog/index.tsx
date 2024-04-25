'use client';
import { useCallback, useEffect, useId, useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { hideOthers } from '../../utils/aria-hidden';
import useFocusGuards from '../../hooks/use-focus-guard';
import RemoveScroll from '../remove-scroll';
import {
  DismissableLayer,
  Divider,
  FlexBox,
  Portal,
  TextButton,
  Typography,
} from '..';
import FocusScope from '../focus-scope';
import { useDialogStore } from '../../stores/dialog-store';
import { getColorByToken } from '../../utils';

import {
  dialogActionStyle,
  dialogContentStyle,
  dialogDimmerStyle,
  dialogDividerStyle,
  dialogStyle,
  dialogWrapperStyle,
} from './style';

import type { PropsWithChildren } from 'react';
import type { ThemeColorsToken } from '../../types';
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
  confirmText,
  confirmColor = 'palette.primary.normal',
  focusTrap = 'confirm',
  cancelText,
  disableOutsideClickClose,
  disableEscapeKeyDownClose,
  resolve,
}: DialogItem) => {
  const hide = useDialogStore((state) => state.hide);

  const ref = useRef<HTMLDivElement>(null);

  const titleId = useId();
  const descriptionId = useId();

  const handleClose = useCallback(() => {
    hide(id);
  }, [hide, id]);

  const handleCancel = useCallback(() => {
    handleClose();
    resolve('cancel');
  }, [handleClose, resolve]);

  const handleConfirm = useCallback(() => {
    handleClose();
    resolve('confirm');
  }, [handleClose, resolve]);

  useFocusGuards();

  useEffect(() => {
    const element = ref.current;

    if (element) {
      return hideOthers(element);
    }
  }, []);

  return (
    <FlexBox css={dialogWrapperStyle} wds-ignore-dismissable-layer="true">
      <RemoveScroll as={Slot} allowPinchZoom shards={[ref]}>
        <div
          css={dialogDimmerStyle}
          onClick={() => {
            if (!disableOutsideClickClose) {
              handleCancel();
            }
          }}
        />
      </RemoveScroll>
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
          css={dialogStyle}
        >
          <FlexBox
            ref={ref}
            role="alertdialog"
            aria-describedby={descriptionId}
            aria-labelledby={titleId}
            flexDirection="column"
            css={dialogContentStyle}
          >
            <FlexBox flexDirection="column" gap="6px" css={{ padding: '20px' }}>
              {Boolean(title) && (
                <Typography
                  variant="headline1"
                  weight="bold"
                  color="palette.label.normal"
                >
                  {title}
                </Typography>
              )}

              <Typography
                variant="body2_normal"
                weight="regular"
                color="palette.label.alternative"
              >
                {content}
              </Typography>
            </FlexBox>

            <Divider color="palette.label.normal" css={dialogDividerStyle} />

            <FlexBox
              flexDirection={focusTrap === 'confirm' ? 'row-reverse' : 'row'}
              alignItems="center"
              justifyContent={focusTrap === 'confirm' ? 'initial' : 'flex-end'}
              gap="24px"
              css={dialogActionStyle}
            >
              {focusTrap === 'confirm' ? (
                <>
                  <ConfirmButton onClick={handleConfirm} color={confirmColor}>
                    {confirmText}
                  </ConfirmButton>

                  <CancelButton onClick={handleCancel}>
                    {cancelText}
                  </CancelButton>
                </>
              ) : (
                <>
                  <CancelButton onClick={handleCancel}>
                    {cancelText}
                  </CancelButton>

                  <ConfirmButton onClick={handleConfirm} color={confirmColor}>
                    {confirmText}
                  </ConfirmButton>
                </>
              )}
            </FlexBox>
          </FlexBox>
        </DismissableLayer>
      </FocusScope>
    </FlexBox>
  );
};

type DialogButtonProps = PropsWithChildren<{
  color: ThemeColorsToken;
  onClick: () => void;
}>;

const ConfirmButton = ({ color, onClick, children }: DialogButtonProps) => (
  <TextButton
    size="medium"
    variant="primary"
    onClick={onClick}
    css={(theme) => ({
      color: getColorByToken(theme, color),
      ['[wds-component="with-interaction"]']: {
        backgroundColor: getColorByToken(theme, color),
      },
    })}
  >
    {children}
  </TextButton>
);

const CancelButton = ({
  onClick,
  children,
}: Omit<DialogButtonProps, 'color'>) => {
  if (!children) {
    return null;
  }

  return (
    <TextButton size="medium" variant="assistive" onClick={onClick}>
      {children}
    </TextButton>
  );
};

export default Dialog;
