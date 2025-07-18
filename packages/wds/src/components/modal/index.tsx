import { useControllableState } from '@radix-ui/react-use-controllable-state';
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Slot } from '@radix-ui/react-slot';
import { Box } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { flushSync } from 'react-dom';

import { hideOthers } from '../../utils';
import { RemoveScroll } from '../remove-scroll';
import { DismissableLayer } from '../dismissable-layer';
import { FocusScope } from '../focus-scope';
import { FlexBox } from '../flex-box';
import { ScrollArea } from '../scroll-area';
import { Typography } from '../typography';
import { PortalOrFragment } from '../portal-or-fragment';
import useResizeObserver from '../../hooks/use-resize-observer';
import { useSize } from '../../hooks';
import { useTopNavigationContext } from '../top-navigation/contexts';
import { TopNavigation, TopNavigationButton } from '../top-navigation';
import { useAnimationPresence } from '../animation-presence';

import {
  ModalActionAreaProvider,
  ModalDimmerProvider,
  ModalNavigationProvider,
  ModalProvider,
  useModalContext,
  useModalDimmerContext,
  useModalNavigationContext,
} from './contexts';
import {
  MODAL_CLOSE_NAME,
  MODAL_CONTAINER_NAME,
  MODAL_DIMMER_NAME,
  MODAL_NAME,
  MODAL_NAVIGATION_BUTTON_NAME,
  MODAL_NAVIGATION_NAME,
  MODAL_TRIGGER_NAME,
} from './constants';
import {
  modalContainerStyle,
  modalContainerWrapperStyle,
  modalContentItemStyle,
  modalContentStyle,
  modalDimmerStyle,
  modalGrabberStyle,
  modalNavigationStyle,
} from './style';
import { useDraggable } from './hooks';
import { getDefaultCloseIcon } from './helpers';

import type { PointerDownOutsideEvent } from '../dismissable-layer/types';
import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type {
  ElementType,
  ForwardedRef,
  MouseEvent,
  PointerEvent,
  RefObject,
} from 'react';
import type {
  ModalCloseProps,
  ModalContainerProps,
  ModalContentItemProps,
  ModalContentProps,
  ModalDescriptionProps,
  ModalDimmerProps,
  ModalHeadingProps,
  ModalNavigationButtonProps,
  ModalNavigationProps,
  ModalProps,
  ModalScrollProviderProps,
  ModalSummaryProps,
  ModalTriggerProps,
} from './types';

const Modal = ({
  children,
  open: openProp,
  defaultOpen,
  onOpenChange,
  onVisibilityChange,
  container,
  disableOutsideClickClose = false,
  disableEscapeKeyDownClose = false,
  disablePortal = false,
  forceMount = false,
}: ModalProps) => {
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const { isPresent, ref } = useAnimationPresence(open || forceMount, {
    subtree: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [visibility, setVisibility] = useState<'hidden' | 'visible'>('visible');

  const onVisibilityChangeCallback = useCallbackRef(onVisibilityChange);

  useEffect(() => {
    // variant="bottom" sm={{ variant: 'popup' }} 일 때 예외 처리
    if (!isBottomSheet && open && visibility === 'hidden') {
      setVisibility('visible');
      setOpen(false);
    }
  }, [isBottomSheet, open, visibility, setOpen, setVisibility]);

  useEffect(() => {
    if (!open) {
      setVisibility('visible');
    }
  }, [open]);

  return (
    <ModalProvider
      isBottomSheet={isBottomSheet}
      setIsBottomSheet={setIsBottomSheet}
      visibility={visibility}
      setVisibility={useCallback(
        (value) => {
          flushSync(() => {
            onVisibilityChangeCallback(value);
            setVisibility(value);
          });

          containerRef.current?.focus();
        },
        [onVisibilityChangeCallback],
      )}
      containerRef={containerRef}
      innerContainerRef={innerContainerRef}
      containerId={useId()}
      titleId={useId()}
      headingId={useId()}
      summaryId={useId()}
      descriptionId={useId()}
      open={open}
      disableOutsideClickClose={disableOutsideClickClose}
      disableEscapeKeyDownClose={disableEscapeKeyDownClose}
      onOpenChange={setOpen}
      wrapperRef={ref}
    >
      {isPresent ? (
        <PortalOrFragment disablePortal={disablePortal} container={container}>
          {children}
        </PortalOrFragment>
      ) : null}
    </ModalProvider>
  );
};

Modal.displayName = MODAL_NAME;

const ModalTrigger = forwardRef<HTMLElement, ModalTriggerProps>(
  (props, ref) => {
    const { containerId, open } = useModalContext(MODAL_TRIGGER_NAME);

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

ModalTrigger.displayName = MODAL_TRIGGER_NAME;

const ModalContainer = forwardRef(
  <T extends ElementType = 'div'>(
    {
      variant = 'popup',
      size = 'medium',
      resize = 'hug',
      handle,
      xs,
      sm,
      md,
      lg,
      xl,
      children,
      sticky = true,
      wrapperProps,
      dimmer = <ModalDimmer />,
      ...props
    }: PolymorphicPropsInternal<ModalContainerProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const {
      containerRef,
      disableEscapeKeyDownClose,
      disableOutsideClickClose,
      onOpenChange,
      ...context
    } = useModalContext(MODAL_CONTAINER_NAME);

    const composedContainerRefs = useComposedRefs(
      containerRef,
      ref as ForwardedRef<HTMLDivElement>,
    );

    const dimmerRef = useRef<HTMLDivElement>(null);

    const { isBottomSheetWithHandle, handleVisibilityHidden, ...dragProps } =
      useDraggable({
        variant,
        handle,
        xs,
        sm,
        md,
        lg,
        xl,
        ref: context.innerContainerRef,
        dimmerRef,
      });

    const topNavigationHeight =
      useSize(
        containerRef.current?.querySelector(
          '[wds-component="top-navigation"]',
        ) ?? null,
      )?.height ?? 0;

    const actionAreaHeight =
      useSize(
        containerRef.current?.querySelector('[wds-component="action-area"]') ??
          null,
      )?.height ?? 0;

    useEffect(() => {
      const content = containerRef.current;

      if (content) {
        const undo = hideOthers(content);

        if (isBottomSheetWithHandle && context.visibility === 'hidden') {
          undo();

          return;
        }

        return undo;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBottomSheetWithHandle, context.visibility]);

    return (
      <Box
        data-visibility={
          isBottomSheetWithHandle ? context.visibility : undefined
        }
        {...wrapperProps}
        ref={useComposedRefs<HTMLDivElement>(
          wrapperProps?.ref as RefObject<HTMLDivElement> | undefined,
          context.wrapperRef,
        )}
        sx={[
          modalContainerWrapperStyle({
            variant,
            size,
            xs,
            sm,
            md,
            lg,
            xl,
          }),
          wrapperProps?.sx,
        ]}
      >
        <ModalDimmerProvider
          isBottomSheetWithHandle={isBottomSheetWithHandle}
          handleVisibilityHidden={handleVisibilityHidden}
          dimmerRef={dimmerRef}
        >
          {dimmer}
        </ModalDimmerProvider>

        <FocusScope
          loop={context.open && context.visibility === 'visible'}
          trapped={context.open && context.visibility === 'visible'}
        >
          <DismissableLayer
            asChild
            onPointerDownOutside={useCallback(
              (e: PointerDownOutsideEvent) => {
                const originalEvent = e.detail.originalEvent;
                const ctrlLeftClick =
                  originalEvent.button === 0 && originalEvent.ctrlKey === true;
                const isRightClick =
                  originalEvent.button === 2 || ctrlLeftClick;

                if (isRightClick || disableOutsideClickClose)
                  e.preventDefault();
              },
              [disableOutsideClickClose],
            )}
            onEscapeKeyDown={useCallback(
              (e: KeyboardEvent) => {
                if (disableEscapeKeyDownClose) {
                  e.preventDefault();
                }
              },
              [disableEscapeKeyDownClose],
            )}
            onDismiss={useCallback(() => {
              if (!isBottomSheetWithHandle) {
                onOpenChange(false);
              } else {
                handleVisibilityHidden();
              }
            }, [isBottomSheetWithHandle, onOpenChange, handleVisibilityHidden])}
            ref={composedContainerRefs}
          >
            <RemoveScroll
              enabled={context.open && context.visibility === 'visible'}
              as={Slot}
              allowPinchZoom
            >
              <Box
                role="dialog"
                aria-modal
                id={context.containerId}
                aria-describedby={`${context.descriptionId} ${context.summaryId}`}
                aria-labelledby={`${context.titleId} ${context.headingId}`}
                {...props}
                wds-ignore-dismissable-layer="true"
                data-visibility={context.visibility}
                data-status={context.open ? 'open' : 'close'}
                sx={[
                  modalContainerStyle({
                    resize,
                    variant,
                    size,
                    xs,
                    sm,
                    md,
                    lg,
                    xl,
                  }),
                  props.sx,
                ]}
              >
                <ScrollArea
                  scrollbars="vertical"
                  viewportRef={context.innerContainerRef}
                  sx={{
                    display: 'flex',
                    flexGrow: '1',
                  }}
                  viewportProps={{
                    sx: {
                      height: 'initial',
                      scrollPaddingTop: topNavigationHeight,
                      scrollPaddingBottom: actionAreaHeight,
                      ['& [data-radix-scroll-area-content]']: {
                        display: 'flex',
                        flexDirection: 'column',
                      },
                    },
                  }}
                  zIndex={11}
                >
                  <FlexBox
                    flexDirection="column"
                    flex="1"
                    sx={{
                      ['[data-role="modal-container-grabber"] + [wds-component="top-navigation"]']:
                        {
                          paddingTop: 12,
                        },
                    }}
                    {...dragProps}
                  >
                    {isBottomSheetWithHandle && (
                      <FlexBox
                        justifyContent="center"
                        sx={modalGrabberStyle}
                        data-role="modal-container-grabber"
                      />
                    )}

                    <ModalScrollProvider sticky={sticky}>
                      {children}
                    </ModalScrollProvider>
                  </FlexBox>
                </ScrollArea>
              </Box>
            </RemoveScroll>
          </DismissableLayer>
        </FocusScope>
      </Box>
    );
  },
) as PolymorphicComponentInternal<ModalContainerProps, 'div'>;

ModalContainer.displayName = MODAL_CONTAINER_NAME;

/**
 * Use the form `<ModalContainer dimmer={<ModalDimmer />} />`.
 * Only used to apply custom styles to the Dimmer.
 */
const ModalDimmer = forwardRef(
  <T extends ElementType = 'div'>(
    { as, ...props }: PolymorphicPropsInternal<ModalDimmerProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { open, visibility, onOpenChange, disableOutsideClickClose } =
      useModalContext(MODAL_DIMMER_NAME);

    const { isBottomSheetWithHandle, dimmerRef, handleVisibilityHidden } =
      useModalDimmerContext(MODAL_DIMMER_NAME);

    return (
      <Box
        data-role="modal-dimmer"
        data-status={open ? 'open' : 'close'}
        data-visibility={isBottomSheetWithHandle ? visibility : undefined}
        as={as || 'div'}
        {...props}
        wds-ignore-dismissable-layer="true"
        ref={useComposedRefs(ref, dimmerRef as ForwardedRef<T>)}
        onPointerDown={composeEventHandlers(
          props.onPointerDown,
          (e: PointerEvent) => {
            const target = e.target as HTMLElement;

            if (target.hasPointerCapture(e.pointerId)) {
              target.releasePointerCapture(e.pointerId);
            }
          },
        )}
        onClick={composeEventHandlers(props.onClick, (e: MouseEvent) => {
          e.preventDefault();
          if (disableOutsideClickClose) {
            return;
          }

          if (!isBottomSheetWithHandle) {
            onOpenChange(false);
          } else {
            handleVisibilityHidden();
          }
        })}
        sx={[modalDimmerStyle, props.sx]}
      />
    );
  },
) as PolymorphicComponentInternal<ModalDimmerProps, 'div'>;

ModalDimmer.displayName = MODAL_DIMMER_NAME;

const ModalScrollProvider = ({
  children,
  sticky,
}: ModalScrollProviderProps) => {
  const { innerContainerRef, ...context } = useModalContext(
    'ModalContextProviders',
  );

  const [navigationSticky, setNavigationSticky] = useState(false);
  const [actionAreaSticky, setActionAreaSticky] = useState(false);

  const handleResize = useCallback(() => {
    const target = innerContainerRef.current;
    if (!target) {
      return;
    }

    setNavigationSticky(target.scrollTop > 0);
    setActionAreaSticky(
      target.scrollHeight - target.clientHeight > target.scrollTop,
    );
  }, [innerContainerRef]);

  useResizeObserver(innerContainerRef.current?.firstElementChild, handleResize);

  useEffect(() => {
    const container = innerContainerRef.current;

    if (!container) {
      return;
    }

    const handleOnScroll = (e: Event) => {
      const target = e.target as HTMLElement;

      setNavigationSticky(target.scrollTop > 0);
      setActionAreaSticky(
        target.scrollHeight - target.clientHeight > target.scrollTop,
      );
    };

    container.addEventListener('scroll', handleOnScroll);

    return () => container.removeEventListener('scroll', handleOnScroll);
  }, [innerContainerRef]);

  return (
    <ModalNavigationProvider
      scrolled={sticky && navigationSticky}
      titleId={context.titleId}
      onOpenChange={context.onOpenChange}
    >
      <ModalActionAreaProvider sticky={sticky && actionAreaSticky}>
        {children}
      </ModalActionAreaProvider>
    </ModalNavigationProvider>
  );
};

const ModalNavigation = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ModalNavigationProps, 'div'>
>(
  (
    { leadingContent, trailingContent = <ModalClose />, variant, ...props },
    ref,
  ) => {
    const { scrolled, titleId } = useModalNavigationContext(
      MODAL_NAVIGATION_NAME,
    );

    // When using extended in modal, since the icon is not always present,
    // render a mockup element to maintain the spacing.
    const shouldRenderMockup =
      variant === 'extended' && !leadingContent && !trailingContent;

    return (
      <TopNavigation
        scrolled={scrolled}
        titleId={titleId}
        leadingContent={
          shouldRenderMockup ? <Box sx={{ height: 24 }} /> : leadingContent
        }
        trailingContent={trailingContent}
        {...props}
        variant={variant === 'emphasized' ? undefined : variant}
        sx={[modalNavigationStyle({ variant }), props.sx]}
        ref={ref}
      />
    );
  },
);

ModalNavigation.displayName = MODAL_NAVIGATION_NAME;

const ModalNavigationButton = forwardRef(
  <E extends ElementType = 'button'>(
    { as, ...props }: PolymorphicPropsInternal<ModalNavigationButtonProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    return <TopNavigationButton {...props} as={as || 'button'} ref={ref} />;
  },
) as PolymorphicComponentInternal<ModalNavigationButtonProps, 'button'>;

ModalNavigationButton.displayName = MODAL_NAVIGATION_BUTTON_NAME;

const ModalClose = forwardRef(
  <E extends ElementType = 'button'>(
    {
      children,
      background = false,
      ...props
    }: PolymorphicPropsInternal<ModalCloseProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const { onOpenChange } = useModalNavigationContext(MODAL_CLOSE_NAME);
    const { variant: navigationVariant } = useTopNavigationContext() || {};

    return (
      <TopNavigationButton
        aria-label="Close dialog"
        {...props}
        background={background}
        onClick={composeEventHandlers(props.onClick, () => onOpenChange(false))}
        ref={ref}
      >
        {children ?? getDefaultCloseIcon(navigationVariant, background)}
      </TopNavigationButton>
    );
  },
) as PolymorphicComponentInternal<ModalCloseProps, 'button'>;

ModalClose.displayName = MODAL_CLOSE_NAME;

const ModalContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ModalContentProps, 'div'>
>(
  (
    {
      gap = 'calc(var(--wds-modal-content-margin, 20px))',
      xs,
      sm,
      md,
      lg,
      xl,
      ...props
    },
    ref,
  ) => {
    return (
      <Box
        sx={{
          height: 'max-content',
          width: '100%',
          flex: '1',
        }}
      >
        <FlexBox
          ref={ref}
          as="div"
          wds-component="modal-content"
          flexDirection="column"
          {...props}
          sx={[
            modalContentStyle({
              gap,
              xs,
              sm,
              md,
              lg,
              xl,
            }),
            props.sx,
          ]}
        />
      </Box>
    );
  },
);

ModalContent.displayName = 'ModalContent';

const ModalContentItem = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ModalContentItemProps, 'div'>
>((props, ref) => {
  return (
    <FlexBox
      ref={ref}
      as="div"
      gap="12px"
      flexDirection="column"
      {...props}
      sx={[modalContentItemStyle, props.sx]}
    />
  );
});

ModalContentItem.displayName = 'ModalContentItem';

const ModalHeading = forwardRef(
  <E extends ElementType = 'h1'>(
    {
      as,
      variant = 'heading2',
      weight = 'bold',
      color = 'semantic.label.normal',
      ...props
    }: PolymorphicPropsInternal<ModalHeadingProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const context = useModalContext(MODAL_NAME);

    return (
      <Typography
        ref={ref}
        as={(as || 'h1') as E}
        variant={variant}
        weight={weight}
        color={color}
        data-role="modal-heading"
        id={context.headingId}
        {...props}
        sx={[{ wordBreak: 'keep-all', overflowWrap: 'break-word' }, props.sx]}
      />
    );
  },
) as PolymorphicComponentInternal<ModalHeadingProps, 'h1'>;

ModalHeading.displayName = 'ModalHeading';

const ModalSummary = forwardRef(
  <E extends ElementType = 'p'>(
    {
      as,
      variant = 'body2',
      weight = 'regular',
      color = 'semantic.label.alternative',
      ...props
    }: PolymorphicPropsInternal<ModalSummaryProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const context = useModalContext(MODAL_NAME);

    return (
      <Typography
        ref={ref}
        as={(as || 'p') as E}
        variant={variant}
        weight={weight}
        color={color}
        data-role="modal-summary"
        id={context.summaryId}
        {...props}
        sx={[{ wordBreak: 'keep-all', overflowWrap: 'break-word' }, props.sx]}
      />
    );
  },
) as PolymorphicComponentInternal<ModalSummaryProps, 'p'>;

ModalSummary.displayName = 'ModalSummary';

const ModalDescription = forwardRef(
  <E extends ElementType = 'p'>(
    {
      as,
      variant = 'body1-reading',
      weight = 'regular',
      color = 'semantic.label.normal',
      ...props
    }: PolymorphicPropsInternal<ModalDescriptionProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const context = useModalContext(MODAL_NAME);

    return (
      <Typography
        ref={ref}
        as={(as || 'p') as E}
        variant={variant}
        weight={weight}
        color={color}
        data-role="modal-description"
        id={context.descriptionId}
        {...props}
        sx={[{ wordBreak: 'keep-all', overflowWrap: 'break-word' }, props.sx]}
      />
    );
  },
) as PolymorphicComponentInternal<ModalDescriptionProps, 'p'>;

ModalDescription.displayName = 'ModalDescription';

export {
  Modal,
  ModalTrigger,
  ModalContainer,
  ModalDimmer,
  ModalNavigation,
  ModalNavigationButton,
  ModalClose,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalSummary,
  ModalDescription,
};

export type {
  ModalProps,
  ModalContainerProps,
  ModalTriggerProps,
  ModalDimmerProps,
  ModalNavigationProps,
  ModalNavigationButtonProps,
  ModalCloseProps,
  ModalContentProps,
  ModalContentItemProps,
  ModalHeadingProps,
  ModalSummaryProps,
  ModalDescriptionProps,
};
