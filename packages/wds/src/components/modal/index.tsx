'use client';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { IconCloseThick } from '@wanteddev/wds-icon';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Slot } from '@radix-ui/react-slot';
import { useTheme } from '@emotion/react';
import { flushSync } from 'react-dom';

import { hideOthers } from '../../utils';
import useFocusGuards from '../../hooks/use-focus-guard';
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
  ModalContainerProvider,
  ModalProvider,
  useModalActionAreaContext,
  useModalContainerContext,
  useModalContext,
} from './contexts';
import {
  MODAL_ACTION_AREA_NAME,
  MODAL_ACTION_BUTTON_NAME,
  MODAL_NAME,
  MODAL_NAVIGATION_NAME,
} from './constants';
import {
  modalActionAreaStyle,
  modalActionButtonSingle,
  modalContainerStyle,
  modalContainerWrapperStyle,
  modalContentItemStyle,
  modalContentStyle,
  modalDimmerStyle,
  modalGrabberStyle,
  modalNavigationStyle,
} from './style';
import { useDraggable } from './hooks';

import type { ButtonVariant } from '../button/types';
import type {
  CSSProperties,
  ComponentProps,
  ComponentPropsWithRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  NamedExoticComponent,
  ReactNode,
  UIEventHandler,
} from 'react';
import type {
  ModalActionAreaProps,
  ModalActionButtonProps,
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

  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  const [scrollHeight, setScrollHeight] = useState(0);

  return (
    <ModalProvider
      containerRef={containerRef}
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
    {
      variant = 'popup',
      size = 'normal-fixed',
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
    const {
      containerRef,
      disableDimmer,
      disableOutsideClickClose,
      disableEscapeKeyDownClose,
      onChangeScrollHeight,
      onOpenChange,
      ...context
    } = useModalContext(MODAL_NAME);

    const composedContainerRefs = useComposedRefs(ref, containerRef);

    const innerContainerRef = useRef<HTMLDivElement>(null);
    const composedInnerContainerRefs = useComposedRefs(
      innerContainerRef,
      context.innerContainerRef,
    );

    useFocusGuards();

    const otherChildren = Children.toArray(children).filter((child) =>
      isValidElement(child)
        ? (child.type as NamedExoticComponent).displayName !==
          MODAL_ACTION_AREA_NAME
        : true,
    );

    const actionButton = Children.toArray(children).filter(
      (child) =>
        isValidElement(child) &&
        (child.type as NamedExoticComponent).displayName ===
          MODAL_ACTION_AREA_NAME,
    );

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { isEnabled, ...dragProps } = useDraggable({
      variant,
      xs,
      sm,
      md,
      lg,
      xl,
    });

    const handleClose = useCallback(async () => {
      if (isEnabled && containerRef.current) {
        try {
          containerRef.current.style.setProperty(
            '--wds-modal-translate',
            '100%',
          );
          await containerRef.current.animate(
            [
              {
                transform: 'translateY(0px)',
              },
              {
                transform: 'translateY(100%)',
              },
            ],
            {
              duration: 200,
              easing: 'ease',
            },
          ).finished;

          flushSync(() => {
            onOpenChange(false);
          });
        } catch (err) {
          onOpenChange(false);
        }
      } else {
        onOpenChange(false);
      }
    }, [onOpenChange, isEnabled, containerRef]);

    return (
      <ModalContainerProvider handleClose={handleClose}>
        <div
          css={modalContainerWrapperStyle({
            variant,
            size,
            xs,
            sm,
            md,
            lg,
            xl,
          })}
        >
          {!disableDimmer && (
            <RemoveScroll as={Slot} allowPinchZoom shards={[containerRef]}>
              <div css={modalDimmerStyle} />
            </RemoveScroll>
          )}
          <FocusScope loop trapped={context.open}>
            <DismissableLayer
              onPointerDownOutside={(e) => {
                const originalEvent = e.detail.originalEvent;
                const ctrlLeftClick =
                  originalEvent.button === 0 && originalEvent.ctrlKey === true;
                const isRightClick =
                  originalEvent.button === 2 || ctrlLeftClick;

                if (isRightClick || disableOutsideClickClose)
                  e.preventDefault();
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
              onDismiss={handleClose}
              css={modalContainerStyle({
                variant,
                size,
                xs,
                sm,
                md,
                lg,
                xl,
              })}
              {...props}
            >
              <ScrollArea
                onScrollCapture={handleOnScroll}
                viewportRef={composedInnerContainerRefs}
                css={{
                  display: 'flex',
                  flexGrow: '1',
                  ['& > div']: {
                    display: 'block !important',
                  },
                }}
                zIndex={11}
                asChild
                viewPortProps={{
                  css: { flexGrow: 1 },
                }}
              >
                <div
                  css={{
                    height: 'max-content',
                    width: 'fit-content',
                    minWidth: '100%',
                  }}
                >
                  {isEnabled && (
                    <FlexBox
                      justifyContent="center"
                      css={modalGrabberStyle}
                      {...dragProps}
                    />
                  )}

                  {otherChildren}
                </div>
              </ScrollArea>
              {actionButton}
            </DismissableLayer>
          </FocusScope>
        </div>
      </ModalContainerProvider>
    );
  },
);

ModalContainer.displayName = 'ModalContainer';

const ModalNavigation = forwardRef<HTMLDivElement, ModalNavigationProps>(
  ({ variant = 'compact', xs, sm, md, lg, xl, children }, ref) => {
    const context = useModalContext(MODAL_NAVIGATION_NAME);
    const { handleClose } = useModalContainerContext(MODAL_NAVIGATION_NAME);
    const theme = useTheme();

    return (
      <>
        <div
          wds-component="modal-navigation"
          ref={ref}
          style={
            {
              ['--wds-navigation-border-color']:
                context.scrollHeight > 0
                  ? theme.palette.line.normal.normal
                  : 'transparent',
            } as CSSProperties
          }
          css={[
            modalNavigationStyle({
              variant,
              xs,
              sm,
              md,
              lg,
              xl,
            }),
            { position: 'absolute' },
          ]}
        >
          {variant !== 'floating' ? (
            <>
              {Boolean(children) && (
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
              )}

              <IconButton
                wds-ignore-first-focus="true"
                onClick={handleClose}
                variant="normal"
                size={24}
              >
                <IconCloseThick />
              </IconButton>
            </>
          ) : (
            <IconButton
              wds-ignore-first-focus="true"
              onClick={handleClose}
              variant="background"
              size={24}
            >
              <IconCloseThick />
            </IconButton>
          )}
        </div>

        <div
          tabIndex={-1}
          aria-hidden
          css={[
            modalNavigationStyle({
              variant,
              xs,
              sm,
              md,
              lg,
              xl,
            }),
            { visibility: 'hidden', touchAction: 'none', zIndex: '-1' },
          ]}
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

              <IconButton tabIndex={-1} aria-hidden variant="normal" size={24}>
                <IconCloseThick />
              </IconButton>
            </>
          ) : (
            <IconButton
              tabIndex={-1}
              aria-hidden
              variant="background"
              size={24}
            >
              <IconCloseThick />
            </IconButton>
          )}
        </div>
      </>
    );
  },
);

ModalNavigation.displayName = 'ModalNavigation';

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  (
    { padding, paddingExtra, paddingInfo, xs, sm, md, lg, xl, ...props },
    ref,
  ) => {
    return (
      <FlexBox
        ref={ref}
        as="div"
        wds-component="modal-content"
        flexDirection="column"
        css={modalContentStyle({
          padding,
          paddingExtra,
          paddingInfo,
          xs,
          sm,
          md,
          lg,
          xl,
        })}
        {...props}
      />
    );
  },
);

ModalContent.displayName = 'ModalContent';

const ModalContentItem = forwardRef<HTMLDivElement, ModalContentItemProps>(
  (props, ref) => {
    return (
      <FlexBox
        ref={ref}
        as="div"
        gap="12px"
        flexDirection="column"
        css={modalContentItemStyle}
        {...props}
      />
    );
  },
);

ModalContentItem.displayName = 'ModalContentItem';

const ModalHeadingFc = forwardRef(
  <E extends ElementType = 'h1'>(
    props: ModalHeadingProps<E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const context = useModalContext(MODAL_NAME);

    return (
      <Typography
        ref={ref}
        as="h1"
        variant="heading2"
        weight="bold"
        color="palette.label.normal"
        id={context.headingId}
        {...(props as ComponentPropsWithRef<typeof Typography>)}
      />
    );
  },
);

ModalHeadingFc.displayName = 'ModalHeading';

const ModalHeading = ModalHeadingFc as <E extends ElementType = 'h1'>(
  props: ModalHeadingProps<E>,
) => JSX.Element;

const ModalSummaryFc = forwardRef(
  <E extends ElementType = 'p'>(
    props: ModalSummaryProps<E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const context = useModalContext(MODAL_NAME);

    return (
      <Typography
        ref={ref}
        as="p"
        variant="body2_normal"
        weight="regular"
        color="palette.label.alternative"
        id={context.summaryId}
        {...(props as ComponentPropsWithRef<typeof Typography>)}
      />
    );
  },
);

ModalSummaryFc.displayName = 'ModalSummary';

const ModalSummary = ModalSummaryFc as <E extends ElementType = 'p'>(
  props: ModalSummaryProps<E>,
) => JSX.Element;

const ModalDescriptionFC = forwardRef(
  <E extends ElementType = 'p'>(
    props: ModalDescriptionProps<E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const context = useModalContext(MODAL_NAME);

    return (
      <Typography
        ref={ref}
        as="p"
        variant="body1_reading"
        weight="regular"
        color="palette.label.normal"
        id={context.descriptionId}
        {...(props as ComponentPropsWithRef<typeof Typography>)}
      />
    );
  },
);

ModalDescriptionFC.displayName = 'ModalDescription';

const ModalDescription = ModalDescriptionFC as <E extends ElementType = 'p'>(
  props: ModalDescriptionProps<E>,
) => JSX.Element;

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
          wds-component="modal-action-area"
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
    ref: ForwardedRef<ElementRef<E>>,
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
) => JSX.Element;

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
