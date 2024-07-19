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
import { TopNavigationButton } from '../top-navigation';

import {
  ModalActionAreaProvider,
  ModalProvider,
  ModalTopNavigationProvider,
  useModalContext,
  useModalTopNavigationContext,
} from './contexts';
import {
  MODAL_CLOSE_NAME,
  MODAL_CONTAINER_NAME,
  MODAL_NAME,
} from './constants';
import {
  modalContainerStyle,
  modalContainerWrapperStyle,
  modalContentItemStyle,
  modalContentStyle,
  modalDimmerStyle,
  modalGrabberStyle,
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
  ModalProps,
  ModalSummaryProps,
} from './types';

const Modal = ({
  children,
  open: openProp,
  defaultOpen,
  onOpenChange,
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

  const { hasExited, status } = useTransitionStatus({ open, duration });

  return (
    <ModalProvider
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
      setTransitionDuration,
      status,
      ...context
    } = useModalContext(MODAL_CONTAINER_NAME);

    const composedContainerRefs = useComposedRefs(ref, containerRef);

    const innerContainerRef = useRef<HTMLDivElement>(null);
    const composedInnerContainerRefs = useComposedRefs(
      innerContainerRef,
      context.innerContainerRef,
    );

    const detectScrollRef = useRef<HTMLDivElement>(null);

    const [scrollHeight, setScrollHeight] = useState(0);
    const [hasScroll, setHasScroll] = useState(false);

    const handleOnScroll = useCallback(
      (e: Event) => {
        const target = e.target as Element;

        setScrollHeight(target.scrollTop);
      },
      [setScrollHeight],
    );

    const handleResize = useCallback(() => {
      const target = innerContainerRef.current;
      if (!target) {
        return;
      }

      setHasScroll(
        target.scrollHeight - target.clientHeight !== target.scrollTop,
      );
    }, [setHasScroll]);

    useResizeObserver(detectScrollRef.current, handleResize);

    useEffect(() => {
      const target = innerContainerRef.current;
      if (!target) {
        return;
      }

      target.addEventListener('scroll', handleOnScroll);

      return () => target.removeEventListener('scroll', handleOnScroll);
    }, [handleOnScroll]);

    useEffect(() => {
      const content = containerRef.current;

      if (content) {
        return hideOthers(content);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { isBottomSheet, isEnabled, ...dragProps } = useDraggable({
      variant,
      handle,
      xs,
      sm,
      md,
      lg,
      xl,
    });

    useEffect(() => {
      setTransitionDuration(isBottomSheet ? 250 : 0);
    }, [isBottomSheet, setTransitionDuration]);

    return (
      <ModalTopNavigationProvider
        scrolled={sticky && scrollHeight > 0}
        titleId={context.titleId}
        onOpenChange={onOpenChange}
      >
        <ModalActionAreaProvider sticky={sticky} hasScroll={hasScroll}>
          <Box
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
            <RemoveScroll as={Slot} allowPinchZoom shards={[containerRef]}>
              <Box
                onPointerDown={(e) => {
                  const ctrlLeftClick = e.button === 0 && e.ctrlKey === true;
                  const isRightClick = e.button === 2 || ctrlLeftClick;

                  if (isRightClick || disableOutsideClickClose) {
                    e.preventDefault();
                    return;
                  }

                  onOpenChange(false);
                }}
                sx={modalDimmerStyle}
              />
            </RemoveScroll>
            <FocusScope loop trapped={context.open}>
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
                onDismiss={() => onOpenChange(false)}
                ref={composedContainerRefs}
              >
                <Box
                  role="dialog"
                  aria-modal
                  id={context.containerId}
                  aria-describedby={`${context.descriptionId} ${context.summaryId}`}
                  aria-labelledby={`${context.titleId} ${context.headingId}`}
                  {...props}
                  data-status={status}
                  sx={[
                    modalContainerStyle({
                      isBottomSheet,
                      isEnabled,
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
                    viewportRef={composedInnerContainerRefs}
                    sx={{
                      display: 'flex',
                      flexGrow: '1',
                    }}
                    viewPortProps={{
                      sx: {
                        height: 'initial',
                      },
                    }}
                    zIndex={11}
                  >
                    <FlexBox flexDirection="column" ref={detectScrollRef}>
                      {isEnabled && (
                        <FlexBox
                          justifyContent="center"
                          sx={modalGrabberStyle}
                          {...dragProps}
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
      </ModalTopNavigationProvider>
    );
  },
);

ModalContainer.displayName = MODAL_CONTAINER_NAME;

const ModalClose = forwardRef(
  <E extends ElementType = 'button'>(
    { children, ...props }: PolymorphicProps<TopNavigationButtonProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const { onOpenChange } = useModalTopNavigationContext() || {};
    const { variant: navigationVariant } = useTopNavigationContext() || {};

    if (!onOpenChange) {
      return null;
    }

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
          width: 'fit-content',
          minWidth: '100%',
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
      />
    );
  },
) as PolymorphicComponent<ModalDescriptionProps, 'p'>;

ModalDescription.displayName = 'ModalDescription';

export {
  Modal,
  ModalContainer,
  ModalClose,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalSummary,
  ModalDescription,
};
