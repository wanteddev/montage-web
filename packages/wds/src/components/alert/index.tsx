import { forwardRef, useEffect, useId, useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Box, getColorByToken } from '@wanteddev/wds-engine';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { composeRefs, useComposedRefs } from '@radix-ui/react-compose-refs';
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
  alertActionStyle,
  alertContainerStyle,
  alertContentStyle,
  alertDimmerStyle,
  alertWrapperStyle,
} from './style';
import {
  ALERT_ACTION_AREA_BUTTON_NAME,
  ALERT_ACTION_AREA_NAME,
  ALERT_CONTAINER_NAME,
  ALERT_CONTENT_NAME,
  ALERT_DESCRIPTION_NAME,
  ALERT_DIMMER_NAME,
  ALERT_HEADING_NAME,
  ALERT_NAME,
  ALERT_TRIGGER_NAME,
} from './constants';
import {
  AlertContainerProvider,
  AlertProvider,
  useAlertContainerContext,
  useAlertContext,
} from './contexts';

import type {
  AlertActionAreaButtonProps,
  AlertActionAreaProps,
  AlertContainerProps,
  AlertContentProps,
  AlertDescriptionProps,
  AlertDimmerProps,
  AlertHeadingProps,
  AlertProps,
  AlertTriggerProps,
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

const Alert = ({
  open: openProp,
  defaultOpen,
  onOpenChange,
  children,
}: AlertProps) => {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
  });

  const headingId = useId();
  const descriptionId = useId();
  const containerId = useId();

  return (
    <AlertProvider
      open={open}
      setOpen={setOpen}
      headingId={headingId}
      descriptionId={descriptionId}
      containerId={containerId}
    >
      {children}
    </AlertProvider>
  );
};

Alert.displayName = ALERT_NAME;

/**
 * Use the form `<Alert dimmer={<AlertDimmer />} />`.
 * Only used to apply custom styles to the Dimmer.
 */
const AlertDimmer = forwardRef(
  <T extends ElementType = 'div'>(
    { as, ...props }: PolymorphicPropsInternal<AlertDimmerProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { disableOutsideClickClose, onDismiss, dimmerRef } =
      useAlertContainerContext(ALERT_DIMMER_NAME);
    const { open, setOpen } = useAlertContext(ALERT_DIMMER_NAME);

    return (
      <Box
        ref={composeRefs(ref, dimmerRef as ForwardedRef<T>)}
        as={(as || 'div') as T}
        {...props}
        wds-ignore-dismissable-layer="true"
        data-role="alert-dimmer"
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
        sx={[alertDimmerStyle, props.sx]}
      />
    );
  },
) as PolymorphicComponentInternal<AlertDimmerProps, 'div'>;

AlertDimmer.displayName = ALERT_DIMMER_NAME;

const AlertTrigger = forwardRef<HTMLElement, AlertTriggerProps>(
  (props, ref) => {
    const { containerId, open, setOpen } = useAlertContext(ALERT_TRIGGER_NAME);

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

AlertTrigger.displayName = ALERT_TRIGGER_NAME;

const AlertContainer = forwardRef(
  <T extends ElementType = 'div'>(
    {
      disableOutsideClickClose = false,
      disableEscapeKeyDownClose,
      disableRemoveScroll = false,
      disableFocusScope = false,
      disableAriaHiddenOthers = false,
      disablePortal,
      container,
      onDismiss,
      forceMount = false,
      wrapperProps,
      dimmer = <AlertDimmer />,
      children,
      ...props
    }: PolymorphicPropsInternal<AlertContainerProps, T>,
    forwardedRef: ForwardedRef<T>,
  ) => {
    const { open, setOpen, headingId, descriptionId, containerId } =
      useAlertContext(ALERT_CONTAINER_NAME);

    const dimmerRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const composedRef = useComposedRefs(
      containerRef,
      forwardedRef as ForwardedRef<HTMLDivElement>,
    );

    const { isPresent, ref } = useAnimationPresence(open || forceMount, {
      subtree: true,
      filter: (node) => {
        return (
          node.isSameNode(containerRef.current) ||
          node.isSameNode(dimmerRef.current)
        );
      },
    });

    useEffect(() => {
      const element = containerRef.current;

      if (element && isPresent && !disableAriaHiddenOthers) {
        return hideOthers(element);
      }
    }, [isPresent, disableAriaHiddenOthers]);

    if (!isPresent) return null;

    return (
      <AlertContainerProvider
        dimmerRef={dimmerRef}
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
            sx={[alertWrapperStyle, wrapperProps?.sx]}
            wds-ignore-dismissable-layer="true"
          >
            {dimmer}

            <FocusScope loop trapped disableFocusScope={disableFocusScope}>
              <DismissableLayer
                onPointerDownOutside={(e) => {
                  const originalEvent = e.detail.originalEvent;
                  const ctrlLeftClick =
                    originalEvent.button === 0 &&
                    originalEvent.ctrlKey === true;
                  const isRightClick =
                    originalEvent.button === 2 || ctrlLeftClick;

                  if (isRightClick || disableOutsideClickClose)
                    e.preventDefault();
                }}
                onFocusOutside={(e) => {
                  if (disableOutsideClickClose) {
                    e.preventDefault();
                  }
                }}
                onEscapeKeyDown={(e: KeyboardEvent) => {
                  if (disableEscapeKeyDownClose) {
                    e.preventDefault();
                  }
                }}
                onDismiss={() => {
                  onDismiss?.();
                  setOpen(false);
                }}
                role="presentation"
                asChild
              >
                <RemoveScroll
                  as={Slot}
                  allowPinchZoom
                  enabled={!disableRemoveScroll}
                >
                  <Box
                    ref={composedRef}
                    role="alertdialog"
                    aria-modal={!disableRemoveScroll || !disableFocusScope}
                    aria-describedby={descriptionId}
                    aria-labelledby={headingId}
                    id={containerId}
                    data-status={open ? 'open' : 'close'}
                    {...props}
                    sx={[alertContainerStyle, props.sx]}
                  >
                    {children}
                  </Box>
                </RemoveScroll>
              </DismissableLayer>
            </FocusScope>
          </FlexBox>
        </PortalOrFragment>
      </AlertContainerProvider>
    );
  },
) as PolymorphicComponentInternal<AlertContainerProps, 'div'>;

AlertContainer.displayName = ALERT_CONTAINER_NAME;

const AlertContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<AlertContentProps, 'div'>
>(({ children, ...props }, ref) => {
  return (
    <FlexBox
      ref={ref}
      flexDirection="column"
      gap="6px"
      {...props}
      sx={[alertContentStyle, props.sx]}
    >
      {children}
    </FlexBox>
  );
});

AlertContent.displayName = ALERT_CONTENT_NAME;

const AlertHeading = forwardRef<
  HTMLHeadingElement,
  DefaultComponentPropsInternal<AlertHeadingProps, 'h2'>
>(({ children, ...props }, ref) => {
  const { headingId } = useAlertContext(ALERT_HEADING_NAME);

  return (
    <Typography
      wds-component="alert-title"
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

AlertHeading.displayName = ALERT_HEADING_NAME;

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  DefaultComponentPropsInternal<AlertDescriptionProps, 'p'>
>(({ children, ...props }, ref) => {
  const { descriptionId } = useAlertContext(ALERT_DESCRIPTION_NAME);

  return (
    <Typography
      variant="body2"
      weight="regular"
      color="semantic.label.alternative"
      wds-component="alert-description"
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

AlertDescription.displayName = ALERT_DESCRIPTION_NAME;

const AlertActionArea = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<AlertActionAreaProps, 'div'>
>(({ children, ...props }, ref) => {
  return (
    <FlexBox
      flexDirection="row"
      alignItems="center"
      wds-component="alert-action-area"
      justifyContent="flex-end"
      gap="24px"
      ref={ref}
      {...props}
      sx={[alertActionStyle, props.sx]}
    >
      {children}
    </FlexBox>
  );
});

AlertActionArea.displayName = ALERT_ACTION_AREA_NAME;

const AlertActionAreaButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      variant = 'normal',
      ...props
    }: PolymorphicPropsInternal<AlertActionAreaButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { setOpen } = useAlertContext(ALERT_ACTION_AREA_BUTTON_NAME);

    return (
      <TextButton
        size="medium"
        color={variant === 'normal' ? 'primary' : 'assistive'}
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
) as PolymorphicComponentInternal<AlertActionAreaButtonProps, 'button'>;

AlertActionAreaButton.displayName = ALERT_ACTION_AREA_BUTTON_NAME;

export {
  Alert,
  AlertTrigger,
  AlertDimmer,
  AlertContainer,
  AlertContent,
  AlertHeading,
  AlertDescription,
  AlertActionArea,
  AlertActionAreaButton,
};

export type {
  AlertProps,
  AlertDimmerProps,
  AlertTriggerProps,
  AlertContentProps,
  AlertContainerProps,
  AlertHeadingProps,
  AlertDescriptionProps,
  AlertActionAreaProps,
  AlertActionAreaButtonProps,
};
