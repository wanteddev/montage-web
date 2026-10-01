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
import { Box } from '@montage-ui/engine';
import { IconChevronLeft, IconClose } from '@montage-ui/icon';
import { composeEventHandlers } from '@radix-ui/primitive';

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
import { useAnimationPresence } from '../animation-presence';
import { IconButton } from '../icon-button';
import { TextButtonProvider } from '../text-button/contexts';
import { TextButton } from '../text-button';
import { SlotDefaultsProvider } from '../../hooks/internal/use-slot-defaults';

import {
  ModalDimmerProvider,
  ModalNavigationProvider,
  ModalProvider,
  ModalScrollContainerProvider,
  useModalContext,
  useModalDimmerContext,
  useModalNavigationContext,
  useModalScrollContainerContext,
} from './contexts';
import {
  BOTTOM_SHEET_PEEK_PADDING,
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
  modalContentStyle,
  modalDimmerStyle,
  modalGrabberStyle,
  modalNavigationButtonTextStyle,
  modalNavigationContentStyle,
  modalNavigationFloatingBackgroundStyle,
  modalNavigationLeftIconStyle,
  modalNavigationRightIconStyle,
  modalNavigationStyle,
  modalNavigationTitleStyle,
  modalNavigationWrapperStyle,
} from './style';
import { useDraggable } from './hooks';

import type { PointerDownOutsideEvent } from '../dismissable-layer/types';
import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@montage-ui/engine';
import type { ElementType, ForwardedRef, RefObject } from 'react';
import type {
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
}: ModalProps) => {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const [innerContainer, setInnerContainer] = useState<HTMLDivElement | null>(
    null,
  );

  return (
    <ModalProvider
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
      enableHalfSnapScroll = false,
      forceMount = false,
      sticky = true,
      wrapperProps,
      peekHeight,
      snap: snapProp,
      defaultSnap = 'half',
      onSnapChange,
      largestUndimmedSnap = 'peek',
      dimmer = <ModalDimmer />,
      ...props
    }: PolymorphicPropsInternal<ModalContainerProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { containerRef, open, onOpenChange, ...context } =
      useModalContext(MODAL_CONTAINER_NAME);

    const dimmerRef = useRef<HTMLDivElement>(null);

    const [snap = defaultSnap, setSnap] = useControllableState({
      prop: snapProp,
      defaultProp: defaultSnap,
      onChange: onSnapChange,
    });

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

    // Reset snap once the exit animation completes. For `forceMount=false` the
    // component unmounts and this never fires (state dies with the tree). For
    // `forceMount=true` it ensures the next open starts at `full` instead of
    // whatever snap was active when the user dismissed the sheet.
    useEffect(() => {
      if (!isPresent) setSnap(defaultSnap);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPresent]);

    const composedRefs = useComposedRefs<HTMLDivElement>(
      wrapperProps?.ref as RefObject<HTMLDivElement | null> | undefined,
      wrapperRef,
    );

    const composedContainerRefs = useComposedRefs(
      containerRef,
      ref as ForwardedRef<HTMLDivElement>,
    );

    const {
      resolvedVariant,
      isBottomSheetWithHandle,
      collapseToPeekOrClose,
      ...dragProps
    } = useDraggable({
      peekHeight,
      variant,
      resize,
      handle,
      defaultSnap,
      xs,
      sm,
      md,
      lg,
      xl,
      dimmerRef,
      snap,
      enableHalfSnapScroll,
      largestUndimmedSnap,
      setSnap,
    });

    // Edge case: when a responsive `variant` flips away from `bottom` (e.g.
    // `variant="bottom" sm={{ variant: 'popup' }}`) while the sheet is in
    // `peek`, peek is no longer a valid state for the new variant — reset
    // snap to `full` and close.
    useEffect(() => {
      if (resolvedVariant !== 'bottom' && open && snap === 'peek') {
        setSnap(defaultSnap);
        onOpenChange(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resolvedVariant, open, snap, onOpenChange]);

    const modalNavigationHeight =
      useSize(
        containerRef.current?.querySelector(
          '[data-component="modal-navigation"]',
        ) ?? null,
      )?.height ?? 0;

    const actionAreaHeight =
      useSize(
        containerRef.current?.querySelector('[data-component="action-area"]') ??
          null,
      )?.height ?? 0;

    const isPeek = snap === 'peek';
    // True when the current snap is "undimmed" — the dimmer is invisible and
    // pointer-events fall through to content behind the sheet. Mirrors iOS's
    // `largestUndimmedDetentIdentifier`: every consequence of "no scrim" —
    // focus trap, aria-hidden on siblings, body scroll lock, outside-click /
    // focus-outside dismiss — is suppressed in lockstep so the modal does not
    // try to be the only-thing-on-screen while it visually isn't.
    const isUndimmed =
      isPeek || (snap === 'half' && largestUndimmedSnap === 'half');
    const isVisible = !isUndimmed;

    // Single "modal barrier" predicate: the overlay owns the screen (blocks
    // pointer + AT). Undimmed sheets (map UIs) intentionally are NOT a barrier.
    // `disableOutsideClickClose` is orthogonal and only affects dismissal.
    const isModal = open && isVisible;

    useEffect(() => {
      const content = containerRef.current;

      if (content && isPresent && !disableAriaHiddenOthers) {
        const undo = hideOthers(content);

        // Undimmed snaps leave the rest of the page visible AND interactive —
        // hiding it from screen readers would create a mismatch where sighted
        // users can still tab/click into the background but AT users can't.
        if (isBottomSheetWithHandle && isUndimmed) {
          undo();

          return;
        }

        return undo;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      isBottomSheetWithHandle,
      isUndimmed,
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
          data-snap={snap}
          data-largest-undimmed-snap={largestUndimmedSnap}
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
            collapseToPeekOrClose={collapseToPeekOrClose}
            dimmerRef={dimmerRef}
            snap={snap}
            largestUndimmedSnap={largestUndimmedSnap}
          >
            {dimmer}
          </ModalDimmerProvider>

          <FocusScope
            loop={open && isVisible}
            trapped={open && isVisible}
            disableFocusScope={disableFocusScope}
          >
            <DismissableLayer
              asChild
              disableOutsidePointerEvents={isModal && !disableAriaHiddenOthers}
              onPointerDownOutside={(e: PointerDownOutsideEvent) => {
                const originalEvent = e.detail.originalEvent;
                const ctrlLeftClick =
                  originalEvent.button === 0 && originalEvent.ctrlKey === true;
                const isRightClick =
                  originalEvent.button === 2 || ctrlLeftClick;

                if (isRightClick || disableOutsideClickClose || isUndimmed)
                  e.preventDefault();
              }}
              onEscapeKeyDown={(e: KeyboardEvent) => {
                if (disableEscapeKeyDownClose) {
                  e.preventDefault();
                }
              }}
              onFocusOutside={(e) => e.preventDefault()}
              onDismiss={() => {
                if (!isBottomSheetWithHandle) {
                  onOpenChange(false);
                } else {
                  collapseToPeekOrClose();
                }
              }}
              ref={composedContainerRefs}
            >
              <RemoveScroll
                enabled={open && isVisible && !disableRemoveScroll}
                as={Slot}
                allowPinchZoom
              >
                <Box
                  role="dialog"
                  aria-modal={isModal && !disableAriaHiddenOthers}
                  id={context.containerId}
                  aria-describedby={`${context.descriptionId} ${context.summaryId}`}
                  aria-labelledby={`${context.titleId} ${context.headingId}`}
                  {...props}
                  data-snap={snap}
                  data-largest-undimmed-snap={largestUndimmedSnap}
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
                          modalNavigationHeight + grabberHeightGuard,
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
                        '--modal-grabber-height-guard': `${grabberHeightGuard}px`,
                        ['&:has([data-role="modal-container-grabber"])']: {
                          paddingTop: 'var(--modal-grabber-height-guard, 0px)',
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

                      <ModalScrollProvider
                        sticky={sticky}
                        variant={resolvedVariant}
                      >
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
    const { open } = useModalContext(MODAL_DIMMER_NAME);

    const { isBottomSheetWithHandle, dimmerRef, snap, largestUndimmedSnap } =
      useModalDimmerContext(MODAL_DIMMER_NAME);

    return (
      <Box
        data-role="modal-dimmer"
        data-status={open ? 'open' : 'close'}
        data-snap={isBottomSheetWithHandle ? snap : undefined}
        data-largest-undimmed-snap={
          isBottomSheetWithHandle ? largestUndimmedSnap : undefined
        }
        as={as || 'div'}
        {...props}
        ref={useComposedRefs(ref, dimmerRef as ForwardedRef<T>)}
        sx={[modalDimmerStyle, props.sx]}
      />
    );
  },
) as PolymorphicComponentInternal<ModalDimmerProps, 'div'>;

ModalDimmer.displayName = MODAL_DIMMER_NAME;

const ModalScrollProvider = ({
  children,
  variant,
  sticky,
}: ModalScrollProviderProps) => {
  const { innerContainer } = useModalContext('ModalContextProviders');

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
    <ModalScrollContainerProvider
      actionAreaSticky={sticky && actionAreaSticky}
      navigationSticky={sticky && navigationSticky}
      variant={variant}
    >
      {children}
    </ModalScrollContainerProvider>
  );
};

const ModalNavigation = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ModalNavigationProps, 'div'>
>(
  (
    {
      variant: givenVariant,
      leadingContent,
      trailingContent = <ModalNavigationButton variant="close-button" />,
      toolbar,
      background: originBackground,
      xs,
      sm,
      md,
      lg,
      xl,
      children,
      ...props
    },
    ref,
  ) => {
    const { titleId } = useModalContext(MODAL_NAVIGATION_NAME);
    const { navigationSticky, variant: modalVariant } =
      useModalScrollContainerContext() || {};

    const background = originBackground ?? navigationSticky;

    if (process.env.NODE_ENV !== 'production') {
      if (modalVariant !== 'full' && givenVariant === 'normal') {
        console.warn(
          `[Montage] The "normal" variant is not supported in the "${modalVariant}" modal variant. Please use "emphasized", "floating", or "search" instead.`,
        );
      }
    }

    const variant: ModalNavigationProps['variant'] =
      givenVariant ?? (modalVariant === 'full' ? 'normal' : 'emphasized');

    return (
      <ModalNavigationProvider variant={variant}>
        <FlexBox
          data-component="modal-navigation"
          ref={ref}
          flexDirection="column"
          data-background={background}
          {...props}
          data-variant={variant}
          sx={[
            modalNavigationStyle({
              background,
              variant,
              xs,
              sm,
              md,
              lg,
              xl,
            }),
            props.sx,
          ]}
        >
          {background && variant === 'floating' && (
            <FlexBox
              aria-hidden
              data-role="modal-navigation-floating-background"
              sx={modalNavigationFloatingBackgroundStyle}
            >
              <Box
                aria-hidden
                data-role="modal-navigation-floating-background-layer"
              />
              <Box
                aria-hidden
                data-role="modal-navigation-floating-background-layer"
              />
              <Box
                aria-hidden
                data-role="modal-navigation-floating-background-layer"
              />
              <Box
                aria-hidden
                data-role="modal-navigation-floating-background-layer"
              />
              <Box
                aria-hidden
                data-role="modal-navigation-floating-background-layer"
              />
              <Box
                aria-hidden
                data-role="modal-navigation-floating-background-layer"
              />
            </FlexBox>
          )}
          <FlexBox
            data-role="modal-navigation-wrapper"
            sx={modalNavigationWrapperStyle(variant)}
          >
            <FlexBox
              data-role="modal-navigation-content"
              sx={modalNavigationContentStyle(variant)}
            >
              {Boolean(leadingContent) && (
                <FlexBox
                  gap="16px"
                  alignItems="center"
                  sx={modalNavigationLeftIconStyle(variant)}
                  data-role="modal-navigation-leading-content-wrapper"
                >
                  {leadingContent}
                </FlexBox>
              )}

              {Boolean(children) &&
                (variant === 'search' ? (
                  <SlotDefaultsProvider
                    value={{
                      SearchField: {
                        size: 'medium',
                      },
                    }}
                  >
                    <FlexBox
                      data-role="navigation-field"
                      sx={modalNavigationTitleStyle(variant)}
                      id={titleId}
                    >
                      {children}
                    </FlexBox>
                  </SlotDefaultsProvider>
                ) : (
                  <FlexBox
                    alignItems="center"
                    sx={modalNavigationTitleStyle(variant)}
                    data-role="navigation-title"
                  >
                    <Typography
                      as="h2"
                      id={titleId}
                      variant={
                        variant === 'emphasized' ? 'heading2' : 'headline2'
                      }
                      weight="bold"
                      color="semantic.foreground.neutral.strong"
                      display="block"
                      sx={{ margin: 0, border: 'none' }}
                    >
                      {children}
                    </Typography>
                  </FlexBox>
                ))}

              {Boolean(trailingContent) && (
                <FlexBox
                  gap="16px"
                  alignItems="center"
                  sx={modalNavigationRightIconStyle(variant)}
                  data-role="modal-navigation-trailing-content-wrapper"
                >
                  {trailingContent}
                </FlexBox>
              )}
            </FlexBox>
          </FlexBox>

          {toolbar && variant !== 'floating' && (
            <FlexBox
              sx={{ width: '100%' }}
              flexDirection="column"
              data-role="modal-navigation-toolbar"
            >
              {toolbar}
            </FlexBox>
          )}
        </FlexBox>
      </ModalNavigationProvider>
    );
  },
);

ModalNavigation.displayName = MODAL_NAVIGATION_NAME;

const ModalNavigationButton = forwardRef(
  <T extends ElementType = 'button'>(
    {
      children,
      variant = 'icon-button',
      color = 'assistive',
      size,
      background,
      alternative,
      ...props
    }: PolymorphicPropsInternal<ModalNavigationButtonProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const { variant: navigationVariant } = useModalNavigationContext(
      MODAL_NAVIGATION_BUTTON_NAME,
    );
    const { onOpenChange } = useModalContext(MODAL_NAVIGATION_BUTTON_NAME);

    switch (variant) {
      case 'icon-button':
      case 'back-button':
        return (
          <IconButton
            interactionEffect="dim"
            size={size ?? 'xlarge'}
            interactionOverflow
            aria-label={variant === 'back-button' ? 'Go back' : undefined}
            {...props}
            variant={
              navigationVariant === 'floating' && background
                ? 'background'
                : 'normal'
            }
            alternative={alternative}
            data-component="modal-navigation-button"
            ref={ref}
          >
            {children ?? (variant === 'back-button' && <IconChevronLeft />)}
          </IconButton>
        );
      case 'close-button':
        return (
          <IconButton
            interactionEffect="dim"
            size={size ?? 'xlarge'}
            interactionOverflow
            aria-label="Close dialog"
            {...props}
            variant={
              navigationVariant === 'floating' && background
                ? 'background'
                : 'normal'
            }
            onClick={composeEventHandlers(props.onClick, () =>
              onOpenChange(false),
            )}
            alternative={alternative}
            data-component="modal-navigation-button"
            ref={ref}
          >
            {children ?? <IconClose />}
          </IconButton>
        );

      case 'text-button':
      default:
        return (
          <TextButtonProvider assistive="semantic.foreground.neutral.primary">
            <TextButton
              color={color}
              {...props}
              size={size === 'small' ? 'small' : 'medium'}
              sx={[modalNavigationButtonTextStyle, props.sx]}
              data-component="modal-navigation-button"
              ref={ref}
            >
              {children}
            </TextButton>
          </TextButtonProvider>
        );
    }
  },
) as PolymorphicComponentInternal<ModalNavigationButtonProps, 'button'>;

ModalNavigationButton.displayName = MODAL_NAVIGATION_BUTTON_NAME;

const ModalContent = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<ModalContentProps, 'div'>
>(
  (
    {
      gap = 'var(--modal-content-margin-y, 24px)',
      verticalPadding,
      horizontalPadding = 'both',
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
          data-component="modal-content"
          flexDirection="column"
          {...props}
          sx={[
            modalContentStyle({
              verticalPadding,
              horizontalPadding,
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
    <FlexBox ref={ref} as="div" gap="12px" flexDirection="column" {...props} />
  );
});

ModalContentItem.displayName = 'ModalContentItem';

const ModalHeading = forwardRef(
  <E extends ElementType = 'h1'>(
    {
      as,
      variant = 'heading2',
      weight = 'bold',
      color = 'semantic.foreground.neutral.primary',
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
      color = 'semantic.foreground.neutral.tertiary',
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
      color = 'semantic.foreground.neutral.primary',
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
  ModalContentProps,
  ModalContentItemProps,
  ModalHeadingProps,
  ModalSummaryProps,
  ModalDescriptionProps,
};
