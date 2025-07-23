import { forwardRef, useEffect, useId, useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Box, getColorByToken } from '@wanteddev/wds-engine';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { composeEventHandlers } from '@radix-ui/primitive';

import { hideOthers } from '../../utils/aria-hidden';
import { RemoveScroll } from '../remove-scroll';
import { Typography } from '../typography';
import { DismissableLayer } from '../dismissable-layer';
import { FlexBox } from '../flex-box';
import { TextButton } from '../text-button';
import { FocusScope } from '../focus-scope';
import { PortalOrFragment } from '../portal-or-fragment';
import { useAnimationPresence } from '../animation-presence';

import {
  dialogActionStyle,
  dialogContainerStyle,
  dialogContentStyle,
  dialogDimmerStyle,
  dialogWrapperStyle,
} from './style';
import {
  DIALOG_ACTION_AREA_BUTTON_NAME,
  DIALOG_ACTION_AREA_NAME,
  DIALOG_CONTAINER_NAME,
  DIALOG_CONTENT_NAME,
  DIALOG_DESCRIPTION_NAME,
  DIALOG_DIMMER_NAME,
  DIALOG_HEADING_NAME,
  DIALOG_NAME,
  DIALOG_TRIGGER_NAME,
} from './constants';
import {
  DialogContainerProvider,
  DialogProvider,
  useDialogContainerContext,
  useDialogContext,
} from './contexts';

import type {
  DialogActionAreaButtonProps,
  DialogActionAreaProps,
  DialogContainerProps,
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
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';

const Dialog = ({
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
}: DialogProps) => {
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const headingId = useId();
  const descriptionId = useId();
  const containerId = useId();

  return (
    <DialogProvider
      open={open}
      setOpen={setOpen}
      headingId={headingId}
      descriptionId={descriptionId}
      containerId={containerId}
    >
      {children}
    </DialogProvider>
  );
};

Dialog.displayName = DIALOG_NAME;

/**
 * Use the form `<Dialog dimmer={<DialogDimmer />} />`.
 * Only used to apply custom styles to the Dimmer.
 */
const DialogDimmer = forwardRef(
  <T extends ElementType = 'div'>(
    { as, ...props }: PolymorphicPropsInternal<DialogDimmerProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { disableOutsideClickClose, onDismiss } =
      useDialogContainerContext(DIALOG_DIMMER_NAME);
    const { open, setOpen } = useDialogContext(DIALOG_DIMMER_NAME);

    return (
      <Box
        ref={ref}
        as={(as || 'div') as T}
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
) as PolymorphicComponentInternal<DialogDimmerProps, 'div'>;

DialogDimmer.displayName = DIALOG_DIMMER_NAME;

const DialogTrigger = forwardRef<HTMLElement, DialogTriggerProps>(
  (props, ref) => {
    const { containerId, open, setOpen } =
      useDialogContext(DIALOG_TRIGGER_NAME);

    return (
      <Slot
        ref={ref}
        aria-controls={containerId}
        aria-haspopup="dialog"
        aria-expanded={open}
        {...props}
        onClick={composeEventHandlers(props.onClick, () => {
          setOpen(true);
        })}
      />
    );
  },
);

DialogTrigger.displayName = DIALOG_TRIGGER_NAME;

const DialogContainer = forwardRef(
  <T extends ElementType = 'div'>(
    {
      disableOutsideClickClose = false,
      disableEscapeKeyDownClose,
      disablePortal,
      container,
      onDismiss,
      forceMount = false,
      wrapperProps,
      dimmer = <DialogDimmer />,
      children,
      ...props
    }: PolymorphicPropsInternal<DialogContainerProps, T>,
    forwardedRef: ForwardedRef<T>,
  ) => {
    const { open, setOpen, headingId, descriptionId, containerId } =
      useDialogContext(DIALOG_CONTENT_NAME);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const composedRef = useComposedRefs(
      containerRef,
      forwardedRef as ForwardedRef<HTMLDivElement>,
    );

    const { isPresent, ref } = useAnimationPresence(open || forceMount, {
      subtree: true,
    });

    useEffect(() => {
      const element = containerRef.current;

      if (element && isPresent) {
        return hideOthers(element);
      }
    }, [isPresent]);

    if (!isPresent) return null;

    return (
      <DialogContainerProvider
        disableOutsideClickClose={disableOutsideClickClose}
        onDismiss={onDismiss}
      >
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
                onFocusOutside={(e) => e.preventDefault()}
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
                    data-status={open ? 'open' : 'close'}
                    {...props}
                    sx={[dialogContainerStyle, props.sx]}
                  >
                    {children}
                  </Box>
                </RemoveScroll>
              </DismissableLayer>
            </FocusScope>
          </FlexBox>
        </PortalOrFragment>
      </DialogContainerProvider>
    );
  },
) as PolymorphicComponentInternal<DialogContainerProps, 'div'>;

DialogContainer.displayName = DIALOG_CONTAINER_NAME;

const DialogContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<DialogContentProps, 'div'>
>(({ children, ...props }, ref) => {
  return (
    <FlexBox
      ref={ref}
      flexDirection="column"
      gap="6px"
      {...props}
      sx={[dialogContentStyle, props.sx]}
    >
      {children}
    </FlexBox>
  );
});

DialogContent.displayName = DIALOG_CONTENT_NAME;

const DialogHeading = forwardRef<
  HTMLHeadingElement,
  DefaultComponentPropsInternal<DialogHeadingProps, 'h2'>
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
  DefaultComponentPropsInternal<DialogDescriptionProps, 'p'>
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
  DefaultComponentPropsInternal<DialogActionAreaProps, 'div'>
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
    }: PolymorphicPropsInternal<DialogActionAreaButtonProps, T>,
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
) as PolymorphicComponentInternal<DialogActionAreaButtonProps, 'button'>;

DialogActionAreaButton.displayName = DIALOG_ACTION_AREA_BUTTON_NAME;

/**
 * @deprecated 3.0.0 에서 사용이 중지될 예정입니다. DialogActionAreaButton를 이용해주세요.
 */
const DialogButton = DialogActionAreaButton;

export {
  Dialog,
  DialogTrigger,
  DialogDimmer,
  DialogContainer,
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
  DialogContainerProps,
  DialogHeadingProps,
  DialogDescriptionProps,
  DialogActionAreaProps,
  DialogActionAreaButtonProps,
};
