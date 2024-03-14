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
import { IconCloseThick } from '@wanteddev/wds-icon';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useFocusGuards } from '@radix-ui/react-focus-guards';
import { Slot } from '@radix-ui/react-slot';

import { hideOthers } from '@/utils';

import RemoveScroll from '../remove-scroll';
import DismissableLayer from '../dismissable-layer';
import FocusScope from '../focus-scope';
import Portal from '../portal';
import Button from '../button';
import FlexBox from '../flex-box';
import IconButton from '../icon-button';
import ScrollArea from '../scroll-area';
import TextButton from '../text-button';
import Typography from '../typography';

import {
  ModalActionAreaProvider,
  ModalProvider,
  useModalActionAreaContext,
  useModalContext,
} from './context';
import {
  MODAL_ACTION_AREA_NAME,
  MODAL_ACTION_BUTTON_NAME,
  MODAL_NAME,
} from './constants';
import {
  modalActionAreaStyle,
  modalActionButtonSingle,
  modalContainerStyle,
  modalContainerWrapperStyle,
  modalContentItemStyle,
  modalContentStyle,
  modalDimmerStyle,
  modalNavigationStyle,
} from './style';

import type { ButtonVariant } from '../button/types';
import type {
  ComponentProps,
  ElementType,
  ForwardedRef,
  ReactNode,
  UIEventHandler,
} from 'react';
import type {
  ModalActionAreaProps,
  ModalActionButtonProps,
  ModalContainerProps,
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
  container,
  disableDimmer = false,
  disableOutsideClickClose = false,
  disableEscapeKeyDownClose = false,
}: ModalProps) => {
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const innerContainerRef = useRef<HTMLDivElement>(null);

  const [scrollHeight, setScrollHeight] = useState(0);

  const handleOpenToggle = useCallback(
    () => setOpen((prevOpen) => !prevOpen),
    [setOpen],
  );

  return (
    <ModalProvider
      innerContainerRef={innerContainerRef}
      scrollHeight={scrollHeight}
      onChangeScrollHeight={setScrollHeight}
      containerId={useId()}
      titleId={useId()}
      headingId={useId()}
      summaryId={useId()}
      descriptionId={useId()}
      open={open}
      disableDimmer={disableDimmer}
      disableOutsideClickClose={disableOutsideClickClose}
      disableEscapeKeyDownClose={disableEscapeKeyDownClose}
      onOpenChange={setOpen}
      onOpenToggle={handleOpenToggle}
    >
      {open && (
        <>
          <Portal container={container}>
            <>{children}</>
          </Portal>
        </>
      )}
    </ModalProvider>
  );
};

Modal.displayName = MODAL_NAME;

const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>(
  (
    { variant = 'popup', size = 'normal', xs, sm, md, lg, children, ...props },
    ref,
  ) => {
    const {
      disableDimmer,
      disableOutsideClickClose,
      disableEscapeKeyDownClose,
      onChangeScrollHeight,
      onOpenToggle,
      ...context
    } = useModalContext(MODAL_NAME);

    const containerRef = useRef<HTMLDivElement>(null);
    const composedContainerRefs = useComposedRefs(ref, containerRef);

    const innerContainerRef = useRef<HTMLDivElement>(null);
    const composedInnerContainerRefs = useComposedRefs(
      innerContainerRef,
      context.innerContainerRef,
    );

    useFocusGuards();

    const handleOnScroll: UIEventHandler<HTMLDivElement> = useCallback(
      (e) => {
        const target = e.target as Element;

        onChangeScrollHeight(target.scrollTop);
      },
      [onChangeScrollHeight],
    );

    useEffect(() => {
      const content = containerRef.current;

      if (content) {
        return hideOthers(content);
      }
    }, []);

    return (
      <div
        css={modalContainerWrapperStyle({
          variant,
          size,
          xs,
          sm,
          md,
          lg,
        })}
      >
        {!disableDimmer && (
          <RemoveScroll as={Slot} allowPinchZoom shards={[containerRef]}>
            <div
              css={modalDimmerStyle}
              onClick={() => {
                if (!disableOutsideClickClose) {
                  onOpenToggle();
                }
              }}
            />
          </RemoveScroll>
        )}
        <FocusScope loop trapped={context.open}>
          <DismissableLayer
            onPointerDownOutside={(e) => {
              const originalEvent = e.detail.originalEvent;
              const ctrlLeftClick =
                originalEvent.button === 0 && originalEvent.ctrlKey === true;
              const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

              if (isRightClick || disableOutsideClickClose) e.preventDefault();
            }}
            onFocusOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => {
              if (disableEscapeKeyDownClose) {
                e.preventDefault();
              }
            }}
            ref={composedContainerRefs}
            role="dialog"
            aria-modal
            id={context.containerId}
            aria-describedby={`${context.descriptionId} ${context.summaryId}`}
            aria-labelledby={`${context.titleId} ${context.headingId}`}
            css={modalContainerStyle({ variant, size, xs, sm, md, lg })}
            onDismiss={() => context.onOpenChange(false)}
            asChild
            {...props}
          >
            <ScrollArea
              onScrollCapture={handleOnScroll}
              viewportRef={composedInnerContainerRefs}
            >
              <div
                css={(theme) => ({
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100%',
                  backgroundColor: theme.palette.background.elevated.normal,
                })}
              >
                {children}
              </div>
            </ScrollArea>
          </DismissableLayer>
        </FocusScope>
      </div>
    );
  },
);

ModalContainer.displayName = 'ModalContainer';

const ModalNavigation = forwardRef<HTMLDivElement, ModalNavigationProps>(
  ({ variant = 'compact', xs, sm, md, lg, children }, ref) => {
    const context = useModalContext(MODAL_NAME);

    return (
      <div
        wds-component="modal-navigation"
        ref={ref}
        css={modalNavigationStyle({
          variant,
          isScrolled: context.scrollHeight > 0,
          xs,
          sm,
          md,
          lg,
        })}
      >
        {variant !== 'floating' ? (
          <>
            <Typography
              as="h2"
              id={context.titleId}
              variant="headline2"
              weight="bold"
              color="palette.label.strong"
              noWrap
            >
              {children}
            </Typography>

            <IconButton
              wds-ignore-first-focus="true"
              onClick={() => context.onOpenChange(false)}
              variant="normal"
              size={24}
            >
              <IconCloseThick />
            </IconButton>
          </>
        ) : (
          <IconButton
            wds-ignore-first-focus="true"
            onClick={() => context.onOpenChange(false)}
            variant="background"
            size={24}
          >
            <IconCloseThick />
          </IconButton>
        )}
      </div>
    );
  },
);

ModalNavigation.displayName = 'ModalNavigation';

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ padding, paddingExtra, paddingInfo, xs, sm, md, lg, ...props }, ref) => {
    return (
      <FlexBox
        ref={ref}
        as="div"
        flexDirection="column"
        css={modalContentStyle({
          padding,
          paddingExtra,
          paddingInfo,
          xs,
          sm,
          md,
          lg,
        })}
        {...props}
      />
    );
  },
);

ModalContent.displayName = 'ModalContent';

const ModalContentItem = forwardRef<HTMLDivElement, ModalContentProps>(
  (props, ref) => {
    return (
      <FlexBox
        ref={ref}
        as="div"
        gap="14px"
        flexDirection="column"
        css={modalContentItemStyle}
        {...props}
      />
    );
  },
);

ModalContentItem.displayName = 'ModalContentItem';

const ModalHeading = forwardRef<HTMLHeadingElement, ModalHeadingProps>(
  (props, ref) => {
    const context = useModalContext(MODAL_NAME);

    return (
      <Typography
        ref={ref}
        as="h1"
        variant="heading2"
        weight="bold"
        color="palette.label.normal"
        id={context.headingId}
        {...props}
      />
    );
  },
);

ModalHeading.displayName = 'ModalHeading';

const ModalSummary = forwardRef<HTMLParagraphElement, ModalSummaryProps>(
  (props, ref) => {
    const context = useModalContext(MODAL_NAME);

    return (
      <Typography
        ref={ref}
        as="p"
        variant="body2_normal"
        weight="regular"
        color="palette.label.alternative"
        id={context.summaryId}
        {...props}
      />
    );
  },
);

ModalSummary.displayName = 'ModalSummary';

const ModalDescription = forwardRef<
  HTMLParagraphElement,
  ModalDescriptionProps
>((props, ref) => {
  const context = useModalContext(MODAL_NAME);

  return (
    <Typography
      ref={ref}
      as="p"
      variant="body1_reading"
      weight="regular"
      color="palette.label.normal"
      id={context.descriptionId}
      {...props}
    />
  );
});

ModalDescription.displayName = 'ModalDescription';

const ModalActionArea = forwardRef<HTMLDivElement, ModalActionAreaProps>(
  (
    { variant = 'normal', priority = 'compact', children, caption, ...props },
    ref,
  ) => {
    const { innerContainerRef, scrollHeight } = useModalContext(MODAL_NAME);

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        if (innerContainerRef.current) {
          setIsSticky(
            innerContainerRef.current.scrollHeight -
              innerContainerRef.current.clientHeight !==
              scrollHeight,
          );
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }, [innerContainerRef, scrollHeight]);

    return (
      <ModalActionAreaProvider priority={priority}>
        <FlexBox
          ref={ref}
          flexShrink={0}
          flexDirection="column"
          css={modalActionAreaStyle({
            variant,
            priority,
            isSticky: priority === 'single' ? false : isSticky,
          })}
          {...props}
        >
          {Boolean(caption) && (
            <Typography
              align="center"
              variant="label2"
              weight="regular"
              color="palette.label.alternative"
              css={{ marginBottom: '16px' }}
            >
              {caption}
            </Typography>
          )}
          <FlexBox
            flexDirection={priority === 'strong' ? 'column' : 'row'}
            gap="8px"
            alignSelf={priority === 'compact' ? 'flex-end' : 'initial'}
          >
            {children}
          </FlexBox>
        </FlexBox>
      </ModalActionAreaProvider>
    );
  },
);

ModalActionArea.displayName = MODAL_ACTION_AREA_NAME;

const ModalActionButtonFC = forwardRef(
  <E extends ElementType = 'button'>(
    { variant = 'primary', ...props }: ModalActionButtonProps<E>,
    ref: ForwardedRef<ModalActionButtonProps<E>['as']>,
  ) => {
    const { priority } = useModalActionAreaContext(MODAL_ACTION_AREA_NAME);

    const renderComponent: {
      [key in typeof variant]: ReactNode;
    } = {
      primary: (
        <Button
          ref={ref}
          variant={priority === 'single' ? 'outlined' : 'solid'}
          color="primary"
          fullWidth={priority === 'strong'}
          css={modalActionButtonSingle(priority)}
          {...(props as ComponentProps<typeof Button<E, ButtonVariant>>)}
        />
      ),
      secondary: (
        <Button
          ref={ref}
          variant="outlined"
          color={
            priority === 'strong' || priority === 'neutral'
              ? 'primary'
              : 'secondary'
          }
          fullWidth={priority === 'strong'}
          css={modalActionButtonSingle(priority)}
          {...(props as ComponentProps<typeof Button<E, ButtonVariant>>)}
        />
      ),
      assistive:
        priority === 'strong' ? (
          <TextButton
            ref={ref}
            color="assistive"
            size="small"
            css={{
              margin: '8px 0px',
              width: 'fit-content',
              alignSelf: 'center',
            }}
            {...(props as ComponentProps<typeof TextButton>)}
          />
        ) : (
          <Button
            ref={ref}
            variant="outlined"
            color="secondary"
            css={modalActionButtonSingle(priority)}
            {...(props as ComponentProps<typeof Button<E, ButtonVariant>>)}
          />
        ),
    };

    return renderComponent[variant];
  },
);

ModalActionButtonFC.displayName = MODAL_ACTION_BUTTON_NAME;

const ModalActionButton = ModalActionButtonFC as <
  E extends ElementType = 'button',
>(
  props: ModalActionButtonProps<E>,
) => ReactNode;

export {
  Modal,
  ModalContainer,
  ModalNavigation,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalSummary,
  ModalDescription,
  ModalActionArea,
  ModalActionButton,
};
