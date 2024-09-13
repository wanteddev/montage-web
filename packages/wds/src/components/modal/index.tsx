'use client';
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
import RemoveScroll from '../remove-scroll';
import DismissableLayer from '../dismissable-layer';
import FocusScope from '../focus-scope';
import FlexBox from '../flex-box';
import ScrollArea from '../scroll-area';
import Typography from '../typography';
import PortalOrFragment from '../portal-or-fragment';
import useResizeObserver from '../../hooks/use-resize-observer';
import { useTransitionStatus } from '../../hooks';
import { useTopNavigationContext } from '../top-navigation/contexts';
import { TopNavigation, TopNavigationButton } from '../top-navigation';

import {
  ModalActionAreaProvider,
  ModalNavigationProvider,
  ModalProvider,
  useModalContext,
  useModalNavigationContext,
} from './contexts';
import {
  MODAL_CLOSE_NAME,
  MODAL_CONTAINER_NAME,
  MODAL_NAME,
  MODAL_NAVIGATION_BUTTON_NAME,
  MODAL_NAVIGATION_NAME,
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

import type { TopNavigationButtonProps } from '../top-navigation/types';
import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type { ElementRef, ElementType, ForwardedRef } from 'react';
import type {
  ModalContainerProps,
  ModalContentItemProps,
  ModalContentProps,
  ModalDescriptionProps,
  ModalHeadingProps,
  ModalNavigationProps,
  ModalProps,
  ModalSummaryProps,
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
}: ModalProps) => {
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  const [duration, setDuration] = useState(0);
  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [visibility, setVisibility] = useState<'hidden' | 'visible'>('visible');

  const { hasExited, status } = useTransitionStatus({ open, duration });

  const onVisibilityChangeCallback = useCallbackRef(onVisibilityChange);

  useEffect(() => {
    setDuration(isBottomSheet ? 250 : 0);
  }, [isBottomSheet, setDuration]);

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
      status={status}
      setTransitionDuration={setDuration}
    >
      {!hasExited && (
        <PortalOrFragment disablePortal={disablePortal} container={container}>
          {children}
        </PortalOrFragment>
      )}
    </ModalProvider>
  );
};

Modal.displayName = MODAL_NAME;

const ModalContainer = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ModalContainerProps, 'div'>
>(
  (
    {
      variant = 'popup',
      size = 'normal-fixed',
      handle,
      xs,
      sm,
      md,
      lg,
      xl,
      children,
      sticky = true,
      ...props
    },
    ref,
  ) => {
    const {
      containerRef,
      disableOutsideClickClose,
      disableEscapeKeyDownClose,
      onOpenChange,
      status,
      ...context
    } = useModalContext(MODAL_CONTAINER_NAME);

    const composedContainerRefs = useComposedRefs(ref, containerRef);

    const dimmerRef = useRef<HTMLDivElement>(null);

    const innerContainerRef = useRef<HTMLDivElement>(null);
    const composedInnerContainerRefs = useComposedRefs(
      innerContainerRef,
      context.innerContainerRef,
    );

    const detectScrollRef = useRef<HTMLDivElement>(null);

    const [scrollHeight, setScrollHeight] = useState(0);
    const [actionAreaSticky, setActionAreaSticky] = useState(false);

    const handleOnScroll = useCallback(
      (e: Event) => {
        const target = e.target as Element;

        setScrollHeight(target.scrollTop);
        setActionAreaSticky(
          target.scrollHeight - target.clientHeight !== target.scrollTop,
        );
      },
      [setScrollHeight, setActionAreaSticky],
    );

    const handleResize = useCallback(() => {
      const target = innerContainerRef.current;
      if (!target) {
        return;
      }

      setActionAreaSticky(
        target.scrollHeight - target.clientHeight !== target.scrollTop,
      );
    }, [setActionAreaSticky]);

    useResizeObserver(detectScrollRef.current, handleResize);

    useEffect(() => {
      const target = innerContainerRef.current;
      if (!target) {
        return;
      }

      target.addEventListener('scroll', handleOnScroll);

      return () => target.removeEventListener('scroll', handleOnScroll);
    }, [handleOnScroll]);

    const { isBottomSheetWithHandle, handleVisibilityHidden, ...dragProps } =
      useDraggable({
        variant,
        handle,
        xs,
        sm,
        md,
        lg,
        xl,
        ref: innerContainerRef,
        dimmerRef,
      });

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
      <ModalNavigationProvider
        scrolled={sticky && scrollHeight > 0}
        titleId={context.titleId}
        onOpenChange={onOpenChange}
      >
        <ModalActionAreaProvider sticky={sticky && actionAreaSticky}>
          <Box
            data-visibility={
              isBottomSheetWithHandle ? context.visibility : undefined
            }
            sx={modalContainerWrapperStyle({
              variant,
              size,
              xs,
              sm,
              md,
              lg,
              xl,
            })}
          >
            <RemoveScroll
              enabled={context.open && context.visibility === 'visible'}
              as={Slot}
              allowPinchZoom
              shards={[containerRef]}
            >
              <Box
                ref={dimmerRef}
                data-status={status}
                data-visibility={
                  isBottomSheetWithHandle ? context.visibility : undefined
                }
                onPointerDown={(e) => {
                  const ctrlLeftClick = e.button === 0 && e.ctrlKey === true;
                  const isRightClick = e.button === 2 || ctrlLeftClick;

                  if (isRightClick || disableOutsideClickClose) {
                    e.preventDefault();
                    return;
                  }

                  if (!isBottomSheetWithHandle) {
                    onOpenChange(false);
                  } else {
                    handleVisibilityHidden();
                  }
                }}
                sx={modalDimmerStyle({
                  isBottomSheet: isBottomSheetWithHandle,
                })}
              />
            </RemoveScroll>
            <FocusScope
              loop={context.open && context.visibility === 'visible'}
              trapped={context.open && context.visibility === 'visible'}
            >
              <DismissableLayer
                asChild
                onPointerDownOutside={(e) => {
                  e.preventDefault();
                }}
                onFocusOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => {
                  if (disableEscapeKeyDownClose) {
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
                <Box
                  role="dialog"
                  aria-modal
                  id={context.containerId}
                  aria-describedby={`${context.descriptionId} ${context.summaryId}`}
                  aria-labelledby={`${context.titleId} ${context.headingId}`}
                  {...props}
                  data-visibility={
                    isBottomSheetWithHandle ? context.visibility : undefined
                  }
                  data-status={status}
                  sx={[
                    modalContainerStyle({
                      isBottomSheet: context.isBottomSheet,
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
                    viewportRef={composedInnerContainerRefs}
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
                    }}
                    zIndex={11}
                  >
                    <FlexBox
                      flexDirection="column"
                      ref={detectScrollRef}
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

                      {children}
                    </FlexBox>
                  </ScrollArea>
                </Box>
              </DismissableLayer>
            </FocusScope>
          </Box>
        </ModalActionAreaProvider>
      </ModalNavigationProvider>
    );
  },
);

ModalContainer.displayName = MODAL_CONTAINER_NAME;

const ModalNavigation = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ModalNavigationProps, 'div'>
>(({ leftContent, rightContent = <ModalClose />, variant, ...props }, ref) => {
  const { scrolled, titleId } = useModalNavigationContext(
    MODAL_NAVIGATION_NAME,
  );

  // 모달에서 extended 사용할 때 아이콘이 없더라도 간격을 유지해야하기 때문에
  // mockup 요소를 렌더링 하도록 한다.
  const shouldRenderMockup =
    variant === 'extended' && !leftContent && !rightContent;

  return (
    <TopNavigation
      scrolled={scrolled}
      titleId={titleId}
      leftContent={
        shouldRenderMockup ? <Box sx={{ height: 24 }} /> : leftContent
      }
      rightContent={rightContent}
      {...props}
      variant={variant === 'emphasized' ? undefined : variant}
      sx={[modalNavigationStyle({ variant }), props.sx]}
      ref={ref}
    />
  );
});

ModalNavigation.displayName = MODAL_NAVIGATION_NAME;

const ModalNavigationButton = forwardRef(
  <E extends ElementType = 'button'>(
    props: PolymorphicProps<TopNavigationButtonProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    return <TopNavigationButton {...props} ref={ref} />;
  },
) as PolymorphicComponent<TopNavigationButtonProps, 'button'>;

ModalNavigationButton.displayName = MODAL_NAVIGATION_BUTTON_NAME;

const ModalClose = forwardRef(
  <E extends ElementType = 'button'>(
    { children, ...props }: PolymorphicProps<TopNavigationButtonProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const { onOpenChange } = useModalNavigationContext(MODAL_CLOSE_NAME);
    const { variant: navigationVariant } = useTopNavigationContext() || {};

    return (
      <TopNavigationButton
        {...props}
        onClick={composeEventHandlers(props.onClick, () => onOpenChange(false))}
        ref={ref}
      >
        {children ?? getDefaultCloseIcon(navigationVariant)}
      </TopNavigationButton>
    );
  },
) as PolymorphicComponent<TopNavigationButtonProps, 'button'>;

ModalClose.displayName = MODAL_CLOSE_NAME;

const ModalContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ModalContentProps, 'div'>
>(
  (
    {
      padding,
      paddingExtra,
      paddingHeading,
      paddingInfo,
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
              padding,
              paddingExtra,
              paddingInfo,
              paddingHeading,
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
  DefaultComponentProps<ModalContentItemProps, 'div'>
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
    { as, ...props }: PolymorphicProps<ModalHeadingProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const context = useModalContext(MODAL_NAME);

    return (
      <Typography
        ref={ref}
        as={(as || 'h1') as E}
        variant="heading2"
        weight="bold"
        color="palette.label.normal"
        data-role="modal-heading"
        id={context.headingId}
        {...props}
        sx={[{ wordBreak: 'keep-all', overflowWrap: 'break-word' }, props.sx]}
      />
    );
  },
) as PolymorphicComponent<ModalHeadingProps, 'h1'>;

ModalHeading.displayName = 'ModalHeading';

const ModalSummary = forwardRef(
  <E extends ElementType = 'p'>(
    { as, ...props }: PolymorphicProps<ModalSummaryProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const context = useModalContext(MODAL_NAME);

    return (
      <Typography
        ref={ref}
        as={(as || 'p') as E}
        variant="body2_normal"
        weight="regular"
        color="palette.label.alternative"
        data-role="modal-summary"
        id={context.summaryId}
        {...props}
        sx={[{ wordBreak: 'keep-all', overflowWrap: 'break-word' }, props.sx]}
      />
    );
  },
) as PolymorphicComponent<ModalSummaryProps, 'p'>;

ModalSummary.displayName = 'ModalSummary';

const ModalDescription = forwardRef(
  <E extends ElementType = 'p'>(
    { as, ...props }: PolymorphicProps<ModalDescriptionProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const context = useModalContext(MODAL_NAME);

    return (
      <Typography
        ref={ref}
        as={(as || 'p') as E}
        variant="body1_reading"
        weight="regular"
        color="palette.label.normal"
        data-role="modal-description"
        id={context.descriptionId}
        {...props}
        sx={[{ wordBreak: 'keep-all', overflowWrap: 'break-word' }, props.sx]}
      />
    );
  },
) as PolymorphicComponent<ModalDescriptionProps, 'p'>;

ModalDescription.displayName = 'ModalDescription';

export {
  Modal,
  ModalContainer,
  ModalNavigation,
  ModalNavigationButton,
  ModalClose,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalSummary,
  ModalDescription,
};
