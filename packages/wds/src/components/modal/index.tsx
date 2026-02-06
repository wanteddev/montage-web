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
import { IconClose } from '@wanteddev/wds-icon';
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
import useResizeObserver from '../../hooks/internal/use-resize-observer';
import { useSize } from '../../hooks';
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
  BOTTOM_SHEET_PEEK_PADDING,
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
}: ModalProps) => {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [visibility, setVisibility] = useState<'hidden' | 'visible'>('visible');

  const [innerContainer, setInnerContainer] = useState<HTMLDivElement | null>(
    null,
  );

  const onVisibilityChangeCallback = useCallbackRef(onVisibilityChange);

  useEffect(() => {
    // variant="bottom" sm={{ variant: 'popup' }} 일 때 예외 처리
    if (!isBottomSheet && open && visibility === 'hidden') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisibility('visible');
      setOpen(false);
    }
  }, [isBottomSheet, open, visibility, setOpen, setVisibility]);

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
      innerContainer={innerContainer}
      setInnerContainer={setInnerContainer}
      containerId={useId()}
      titleId={useId()}
      headingId={useId()}
      summaryId={useId()}
      descriptionId={useId()}
      open={open}
      onOpenChange={setOpen}
    >
      {children}
    </ModalProvider>
  );
};

Modal.displayName = MODAL_NAME;

const ModalTrigger = forwardRef<HTMLElement, ModalTriggerProps>(
  (props, ref) => {
    const { containerId, open, onOpenChange } =
      useModalContext(MODAL_TRIGGER_NAME);

    return (
      <Slot
        ref={ref}
        aria-controls={containerId}
        aria-haspopup="dialog"
        aria-expanded={open}
        {...props}
        onClick={composeEventHandlers(props.onClick, () => onOpenChange(true))}
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
      container,
      disableOutsideClickClose = false,
      disableEscapeKeyDownClose = false,
      disableRemoveScroll = false,
      disablePortal = false,
      disableFocusScope = false,
      disableAriaHiddenOthers = false,
      forceMount = false,
      sticky = true,
      wrapperProps,
      peekHeight,
      dimmer = <ModalDimmer />,
      ...props
    }: PolymorphicPropsInternal<ModalContainerProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { containerRef, open, onOpenChange, ...context } =
      useModalContext(MODAL_CONTAINER_NAME);

    const dimmerRef = useRef<HTMLDivElement>(null);

    const { isPresent, ref: wrapperRef } = useAnimationPresence(
      open || forceMount,
      {
        subtree: true,
        filter: (node) => {
          return (
            node.isSameNode(dimmerRef.current) ||
            node.isSameNode(containerRef.current)
          );
        },
      },
    );

    const composedRefs = useComposedRefs<HTMLDivElement>(
      wrapperProps?.ref as RefObject<HTMLDivElement | null> | undefined,
      wrapperRef,
    );

    const composedContainerRefs = useComposedRefs(
      containerRef,
      ref as ForwardedRef<HTMLDivElement>,
    );

    const { isBottomSheetWithHandle, handleVisibilityHidden, ...dragProps } =
      useDraggable({
        peekHeight,
        variant,
        handle,
        xs,
        sm,
        md,
        lg,
        xl,
        target: context.innerContainer,
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

      if (content && isPresent && !disableAriaHiddenOthers) {
        const undo = hideOthers(content);

        if (isBottomSheetWithHandle && context.visibility === 'hidden') {
          undo();

          return;
        }

        return undo;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      isBottomSheetWithHandle,
      context.visibility,
      isPresent,
      disableAriaHiddenOthers,
    ]);

    if (!isPresent) return null;

    const grabberHeightGuard = isBottomSheetWithHandle
      ? BOTTOM_SHEET_PEEK_PADDING
      : 0;

    return (
      <PortalOrFragment disablePortal={disablePortal} container={container}>
        <Box
          data-visibility={
            isBottomSheetWithHandle ? context.visibility : undefined
          }
          {...wrapperProps}
          ref={composedRefs}
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
            disableOutsideClickClose={disableOutsideClickClose}
            isBottomSheetWithHandle={isBottomSheetWithHandle}
            handleVisibilityHidden={handleVisibilityHidden}
            dimmerRef={dimmerRef}
          >
            {dimmer}
          </ModalDimmerProvider>

          <FocusScope
            loop={open && context.visibility === 'visible'}
            trapped={open && context.visibility === 'visible'}
            disableFocusScope={disableFocusScope}
          >
            <DismissableLayer
              asChild
              onPointerDownOutside={(e: PointerDownOutsideEvent) => {
                const originalEvent = e.detail.originalEvent;
                const ctrlLeftClick =
                  originalEvent.button === 0 && originalEvent.ctrlKey === true;
                const isRightClick =
                  originalEvent.button === 2 || ctrlLeftClick;

                if (isRightClick || disableOutsideClickClose)
                  e.preventDefault();
              }}
              onEscapeKeyDown={(e: KeyboardEvent) => {
                if (disableEscapeKeyDownClose) {
                  e.preventDefault();
                }
              }}
              onFocusOutside={(e) => {
                if (
                  disableOutsideClickClose ||
                  context.visibility === 'hidden'
                ) {
                  e.preventDefault();
                }
              }}
              onDismiss={() => {
                if (!isBottomSheetWithHandle) {
                  onOpenChange(false);
                } else {
                  handleVisibilityHidden();
                }
              }}
              ref={composedContainerRefs}
            >
              <RemoveScroll
                enabled={
                  open &&
                  context.visibility === 'visible' &&
                  !disableRemoveScroll
                }
                as={Slot}
                allowPinchZoom
              >
                <Box
                  role="dialog"
                  aria-modal={
                    open &&
                    context.visibility === 'visible' &&
                    (!disableRemoveScroll || !disableFocusScope)
                  }
                  id={context.containerId}
                  aria-describedby={`${context.descriptionId} ${context.summaryId}`}
                  aria-labelledby={`${context.titleId} ${context.headingId}`}
                  {...props}
                  wds-ignore-dismissable-layer="true"
                  data-visibility={context.visibility}
                  data-status={open ? 'open' : 'close'}
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
                    data-role="modal-container-scroll-area"
                    scrollbars="vertical"
                    viewportRef={context.setInnerContainer}
                    sx={{
                      display: 'flex',
                      flexGrow: '1',
                    }}
                    viewportProps={{
                      sx: {
                        height: 'initial',
                        ['& [data-radix-scroll-area-content]']: {
                          display: 'flex',
                          flexDirection: 'column',
                        },
                      },
                      style: {
                        scrollPaddingTop:
                          topNavigationHeight + grabberHeightGuard,
                        scrollPaddingBottom: actionAreaHeight,
                      },
                    }}
                    zIndex={11}
                  >
                    <FlexBox
                      flexDirection="column"
                      flex="1"
                      data-role="modal-container-wrapper"
                      sx={{
                        '--wds-modal-grabber-height-guard': `${grabberHeightGuard}px`,
                        ['&:has([data-role="modal-container-grabber"])']: {
                          paddingTop:
                            'var(--wds-modal-grabber-height-guard, 0px)',
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
      </PortalOrFragment>
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
    const { open, visibility, onOpenChange } =
      useModalContext(MODAL_DIMMER_NAME);

    const {
      isBottomSheetWithHandle,
      dimmerRef,
      handleVisibilityHidden,
      disableOutsideClickClose,
    } = useModalDimmerContext(MODAL_DIMMER_NAME);

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
          if (disableOutsideClickClose) {
            e.preventDefault();
            return;
          }

          if (!isBottomSheetWithHandle) {
            onOpenChange(false);
          } else if (visibility === 'visible') {
            e.preventDefault();
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
  const { innerContainer, ...context } = useModalContext(
    'ModalContextProviders',
  );

  const [navigationSticky, setNavigationSticky] = useState(false);
  const [actionAreaSticky, setActionAreaSticky] = useState(false);

  const handleResize = useCallback(() => {
    if (!innerContainer) {
      return;
    }

    setNavigationSticky(innerContainer.scrollTop > 0);
    setActionAreaSticky(
      innerContainer.scrollHeight - innerContainer.clientHeight >
        innerContainer.scrollTop,
    );
  }, [innerContainer]);

  useResizeObserver(innerContainer?.firstElementChild, handleResize);

  useEffect(() => {
    const container = innerContainer;

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
  }, [innerContainer]);

  return (
    <ModalNavigationProvider
      titleId={context.titleId}
      onOpenChange={context.onOpenChange}
      sticky={sticky && navigationSticky}
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
    {
      leadingContent,
      trailingContent = <ModalClose />,
      variant,
      children,
      background,
      ...props
    },
    ref,
  ) => {
    const { titleId, sticky } = useModalNavigationContext(
      MODAL_NAVIGATION_NAME,
    );

    return (
      <TopNavigation
        titleId={titleId}
        leadingContent={leadingContent}
        trailingContent={trailingContent}
        background={background ?? sticky}
        {...props}
        variant={variant === 'emphasized' ? undefined : variant}
        sx={[modalNavigationStyle({ variant }), props.sx]}
        ref={ref}
        // eslint-disable-next-line react/no-children-prop
        children={variant === 'emphasized' && !children ? <span /> : children}
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
    { children, ...props }: PolymorphicPropsInternal<ModalCloseProps, E>,
    ref: ForwardedRef<E>,
  ) => {
    const { onOpenChange } = useModalNavigationContext(MODAL_CLOSE_NAME);

    return (
      <TopNavigationButton
        aria-label="Close dialog"
        {...props}
        onClick={composeEventHandlers(props.onClick, () => onOpenChange(false))}
        ref={ref}
      >
        {children ?? <IconClose />}
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
