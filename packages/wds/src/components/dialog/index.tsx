import { forwardRef, useEffect, useId, useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Box, getColorByToken } from '@wanteddev/wds-engine';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { composeEventHandlers } from '@radix-ui/primitive';

import { hideOthers } from '../../utils/aria-hidden';
import RemoveScroll from '../remove-scroll';
import { DismissableLayer, FlexBox, TextButton, Typography } from '..';
import FocusScope from '../focus-scope';
import PortalOrFragment from '../portal-or-fragment';

import {
  dialogActionStyle,
  dialogContentStyle,
  dialogDimmerStyle,
  dialogWrapperStyle,
} from './style';
import {
  DIALOG_ACTION_AREA_BUTTON_NAME,
  DIALOG_ACTION_AREA_NAME,
  DIALOG_CONTENT_NAME,
  DIALOG_DESCRIPTION_NAME,
  DIALOG_HEADING_NAME,
  DIALOG_NAME,
} from './constants';
import { DialogProvider, useDialogContext } from './contexts';

import type {
  DialogActionAreaButtonProps,
  DialogActionAreaProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogHeadingProps,
  DialogProps,
} from './types';
import type { ElementType, ForwardedRef } from 'react';
import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';

const Dialog = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<DialogProps, 'div'>
>(
  (
    {
      open: openProp,
      defaultOpen,
      onOpenChange,
      wrapperProps,
      children,
      disableOutsideClickClose,
      disableEscapeKeyDownClose,
      disablePortal,
      container,
      onDismiss,
      ...props
    },
    ref,
  ) => {
    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(ref, containerRef);

    const headingId = useId();
    const descriptionId = useId();

    useEffect(() => {
      const element = containerRef.current;

      if (element) {
        return hideOthers(element);
      }
    }, []);

    return (
      <>
        {open && (
          <PortalOrFragment
            container={disablePortal ? null : container}
            disablePortal={disablePortal}
          >
            <FlexBox
              {...wrapperProps}
              sx={[dialogWrapperStyle, wrapperProps?.sx]}
              wds-ignore-dismissable-layer="true"
            >
              <FocusScope loop trapped>
                <DismissableLayer
                  onPointerDownOutside={(e) => {
                    const originalEvent = e.detail.originalEvent;
                    const ctrlLeftClick =
                      originalEvent.button === 0 &&
                      originalEvent.ctrlKey === true;
                    const isRightClick =
                      originalEvent.button === 2 || ctrlLeftClick;

                    if (isRightClick || disableEscapeKeyDownClose)
                      e.preventDefault();
                  }}
                  onFocusOutside={(e) => e.preventDefault()}
                  onDismiss={() => {
                    onDismiss?.();
                    setOpen(false);
                  }}
                  role="presentation"
                  asChild
                >
                  <RemoveScroll as={Slot} allowPinchZoom>
                    <FlexBox
                      ref={composedRef}
                      role="alertdialog"
                      aria-describedby={descriptionId}
                      aria-labelledby={headingId}
                      flexDirection="column"
                      {...props}
                      sx={[dialogContentStyle, props.sx]}
                    >
                      <Box
                        sx={dialogDimmerStyle}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!disableOutsideClickClose) {
                            setOpen(false);
                            onDismiss?.();
                          }
                        }}
                        onPointerDown={(e) => {
                          const target = e.target as HTMLElement;

                          if (target.hasPointerCapture(e.pointerId)) {
                            target.releasePointerCapture(e.pointerId);
                          }
                        }}
                      />

                      <DialogProvider
                        open={open}
                        setOpen={setOpen}
                        headingId={headingId}
                        descriptionId={descriptionId}
                      >
                        {children}
                      </DialogProvider>
                    </FlexBox>
                  </RemoveScroll>
                </DismissableLayer>
              </FocusScope>
            </FlexBox>
          </PortalOrFragment>
        )}
      </>
    );
  },
);

Dialog.displayName = DIALOG_NAME;

const DialogContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<DialogContentProps, 'div'>
>(({ children, ...props }, ref) => {
  return (
    <FlexBox
      wds-component="dialog-content"
      flexDirection="column"
      gap="6px"
      ref={ref}
      {...props}
      sx={[{ padding: '20px' }, props.sx]}
    >
      {children}
    </FlexBox>
  );
});

DialogContent.displayName = DIALOG_CONTENT_NAME;

const DialogHeading = forwardRef<
  HTMLHeadingElement,
  DefaultComponentProps<DialogHeadingProps, 'h2'>
>(({ children, ...props }, ref) => {
  const { headingId } = useDialogContext(DIALOG_HEADING_NAME);

  return (
    <Typography
      wds-component="dialog-title"
      variant="headline1"
      weight="bold"
      color="semantic.label.normal"
      ref={ref}
      as="h2"
      id={headingId}
      {...props}
    >
      {children}
    </Typography>
  );
});

DialogHeading.displayName = DIALOG_HEADING_NAME;

const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DefaultComponentProps<DialogDescriptionProps, 'p'>
>(({ children, ...props }, ref) => {
  const { descriptionId } = useDialogContext(DIALOG_DESCRIPTION_NAME);

  return (
    <Typography
      variant="body2"
      weight="regular"
      color="semantic.label.alternative"
      wds-component="dialog-description"
      ref={ref}
      as="p"
      id={descriptionId}
      {...props}
      sx={[
        {
          wordBreak: 'keep-all',
          overflowWrap: 'anywhere',
        },
        props.sx,
      ]}
    >
      {children}
    </Typography>
  );
});

DialogDescription.displayName = DIALOG_DESCRIPTION_NAME;

const DialogActionArea = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<DialogActionAreaProps, 'div'>
>(({ children, ...props }, ref) => {
  return (
    <FlexBox
      flexDirection="row"
      alignItems="center"
      wds-component="dialog-action-area"
      justifyContent="flex-end"
      gap="24px"
      ref={ref}
      {...props}
      sx={[dialogActionStyle, props.sx]}
    >
      {children}
    </FlexBox>
  );
});

DialogActionArea.displayName = DIALOG_ACTION_AREA_NAME;

const DialogActionAreaButton = forwardRef(
  <E extends ElementType = 'button'>(
    {
      variant = 'normal',
      ...props
    }: PolymorphicProps<DialogActionAreaButtonProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const { setOpen } = useDialogContext(DIALOG_ACTION_AREA_BUTTON_NAME);

    return (
      <TextButton
        size="medium"
        variant={variant === 'normal' ? 'primary' : 'assistive'}
        ref={ref}
        {...props}
        onClick={composeEventHandlers(props.onClick, () => {
          setOpen(false);
        })}
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
) as PolymorphicComponent<DialogActionAreaButtonProps, 'button'>;

DialogActionAreaButton.displayName = DIALOG_ACTION_AREA_BUTTON_NAME;

/**
 * @deprecated 3.0.0 에서 사용이 중지될 예정입니다. DialogActionAreaButton를 이용해주세요.
 */
const DialogButton = DialogActionAreaButton;

export {
  Dialog,
  DialogContent,
  DialogHeading,
  DialogDescription,
  DialogActionArea,
  DialogActionAreaButton,
  DialogButton,
};
