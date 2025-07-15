import { forwardRef, useEffect, useId, useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Box, getColorByToken } from '@wanteddev/wds-engine';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';

import { hideOthers } from '../../utils/aria-hidden';
import RemoveScroll from '../remove-scroll';
import { DismissableLayer, FlexBox, TextButton, Typography } from '..';
import FocusScope from '../focus-scope';
import PortalOrFragment from '../portal-or-fragment';
import { useAnimationPresence } from '../animation-presence';

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
  DIALOG_DIMMER_NAME,
  DIALOG_HEADING_NAME,
  DIALOG_NAME,
  DIALOG_TRIGGER_NAME,
} from './constants';
import { DialogProvider, useDialogContext } from './contexts';

import type {
  DialogActionAreaButtonProps,
  DialogActionAreaProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogDimmerProps,
  DialogHeadingProps,
  DialogProps,
  DialogTriggerProps,
} from './types';
import type {
  ElementType,
  ForwardedRef,
  MouseEvent,
  PointerEvent,
} from 'react';
import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';

const Dialog = forwardRef(
  <T extends ElementType = 'div'>(
    {
      open: openProp,
      defaultOpen,
      onOpenChange,
      wrapperProps,
      children,
      disableOutsideClickClose = false,
      disableEscapeKeyDownClose,
      disablePortal,
      container,
      onDismiss,
      forceMount = false,
      dimmer = <DialogDimmer />,
      ...props
    }: PolymorphicProps<DialogProps, T>,
    forwardedRef: ForwardedRef<T>,
  ) => {
    const [open = false, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChange,
    });

    const { isPresent, ref } = useAnimationPresence(open || forceMount, {
      subtree: true,
    });

    const containerRef = useRef<HTMLElement | null>(null);
    const composedRef = useComposedRefs(
      containerRef,
      forwardedRef as ForwardedRef<HTMLElement>,
    );

    const headingId = useId();
    const descriptionId = useId();
    const containerId = useId();

    useEffect(() => {
      const element = containerRef.current;

      if (element && isPresent) {
        return hideOthers(element);
      }
    }, [isPresent]);

    return (
      <DialogProvider
        open={open}
        setOpen={setOpen}
        headingId={headingId}
        descriptionId={descriptionId}
        containerId={containerId}
        disableOutsideClickClose={disableOutsideClickClose}
        onDismiss={useCallbackRef(onDismiss)}
      >
        {isPresent ? (
          <PortalOrFragment
            container={disablePortal ? null : container}
            disablePortal={disablePortal}
            ref={ref}
          >
            <FlexBox
              {...wrapperProps}
              sx={[dialogWrapperStyle, wrapperProps?.sx]}
              wds-ignore-dismissable-layer="true"
            >
              {dimmer}

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
                  onDismiss={() => {
                    onDismiss?.();
                    setOpen(false);
                  }}
                  role="presentation"
                  asChild
                >
                  <RemoveScroll as={Slot} allowPinchZoom>
                    <Box
                      ref={composedRef}
                      role="alertdialog"
                      aria-describedby={descriptionId}
                      aria-labelledby={headingId}
                      id={containerId}
                      {...props}
                      data-status={open ? 'open' : 'close'}
                      sx={[dialogContentStyle, props.sx]}
                    >
                      {children}
                    </Box>
                  </RemoveScroll>
                </DismissableLayer>
              </FocusScope>
            </FlexBox>
          </PortalOrFragment>
        ) : null}
      </DialogProvider>
    );
  },
) as PolymorphicComponent<DialogProps, 'div'>;

Dialog.displayName = DIALOG_NAME;

/**
 * @description
 * `<Dialog dimmer={<DialogDimmer />} />` 형태로 사용합니다.
 * Dimmer에 커스텀 스타일을 적용하기 위해서만 사용합니다.
 */
const DialogDimmer = forwardRef(
  <T extends ElementType = 'div'>(
    props: PolymorphicProps<DialogDimmerProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { open, setOpen, disableOutsideClickClose, onDismiss } =
      useDialogContext(DIALOG_DIMMER_NAME);

    return (
      <Box
        ref={ref}
        {...props}
        data-role="dialog-dimmer"
        data-status={open ? 'open' : 'close'}
        onClick={composeEventHandlers(
          props.onClick,
          (e: MouseEvent<HTMLElement>) => {
            e.preventDefault();
            if (!disableOutsideClickClose) {
              setOpen(false);
              onDismiss?.();
            }
          },
        )}
        onPointerDown={composeEventHandlers(
          props.onPointerDown,
          (e: PointerEvent<HTMLElement>) => {
            const target = e.target as HTMLElement;

            if (target.hasPointerCapture(e.pointerId)) {
              target.releasePointerCapture(e.pointerId);
            }
          },
        )}
        sx={[dialogDimmerStyle, props.sx]}
      />
    );
  },
) as PolymorphicComponent<DialogDimmerProps, 'div'>;

DialogDimmer.displayName = DIALOG_DIMMER_NAME;

const DialogTrigger = forwardRef<HTMLElement, DialogTriggerProps>(
  (props, ref) => {
    const { containerId, open } = useDialogContext(DIALOG_TRIGGER_NAME);

    return (
      <Slot
        ref={ref}
        aria-controls={containerId}
        aria-haspopup="dialog"
        aria-expanded={open}
        {...props}
      />
    );
  },
);

DialogTrigger.displayName = DIALOG_TRIGGER_NAME;

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
  <T extends ElementType = 'button'>(
    {
      variant = 'normal',
      ...props
    }: PolymorphicProps<DialogActionAreaButtonProps, T>,
    ref: ForwardedRef<T>,
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
  DialogTrigger,
  DialogDimmer,
  DialogContent,
  DialogHeading,
  DialogDescription,
  DialogActionArea,
  DialogActionAreaButton,
  DialogButton,
};

export type {
  DialogProps,
  DialogDimmerProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogHeadingProps,
  DialogDescriptionProps,
  DialogActionAreaProps,
  DialogActionAreaButtonProps,
};
