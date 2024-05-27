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
import { flushSync } from 'react-dom';
import { Box, useTheme } from '@wanteddev/wds-engine';
import { composeEventHandlers } from '@radix-ui/primitive';

import { hideOthers } from '../../utils';
import RemoveScroll from '../remove-scroll';
import DismissableLayer from '../dismissable-layer';
import FocusScope from '../focus-scope';
import Button from '../button';
import FlexBox from '../flex-box';
import IconButton from '../icon-button';
import ScrollArea from '../scroll-area';
import TextButton from '../text-button';
import Typography from '../typography';
import PortalOrFragment from '../portal-or-fragment';

import {
  ModalActionAreaProvider,
  ModalContainerProvider,
  ModalNavigationProvider,
  ModalProvider,
  useModalActionAreaContext,
  useModalContainerContext,
  useModalContext,
  useModalNavigationContext,
} from './contexts';
import {
  MODAL_ACTION_AREA_NAME,
  MODAL_ACTION_BUTTON_NAME,
  MODAL_CLOSE_NAME,
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
  modalLeftIconStyle,
  modalNavigationStyle,
  modalNavigationTitleStyle,
  modalNavigationWrapperStyle,
  modalRightIconStyle,
} from './style';
import { useDraggable } from './hooks';
import { getDefaultCloseIcon } from './helpers';

import type { IconButtonProps } from '../icon-button/types';
import type {
  DefaultComponentProps,
  PolymorphicComponent,
  PolymorphicProps,
} from '@wanteddev/wds-engine';
import type {
  CSSProperties,
  ElementRef,
  ElementType,
  ForwardedRef,
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
  disablePortal = false,
}: ModalProps) => {
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

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
      disableDimmer={disableDimmer}
      disableOutsideClickClose={disableOutsideClickClose}
      disableEscapeKeyDownClose={disableEscapeKeyDownClose}
      onOpenChange={setOpen}
    >
      {open && (
        <>
          <PortalOrFragment disablePortal={disablePortal} container={container}>
            <>{children}</>
          </PortalOrFragment>
        </>
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
      disableDimmer,
      disableOutsideClickClose,
      disableEscapeKeyDownClose,
      onOpenChange,
      ...context
    } = useModalContext(MODAL_NAME);

    const composedContainerRefs = useComposedRefs(ref, containerRef);

    const innerContainerRef = useRef<HTMLDivElement>(null);
    const composedInnerContainerRefs = useComposedRefs(
      innerContainerRef,
      context.innerContainerRef,
    );

    const [scrollHeight, setScrollHeight] = useState(0);

    const [hasScroll, setHasScroll] = useState(false);

    const handleOnScroll: UIEventHandler<HTMLDivElement> = useCallback(
      (e) => {
        const target = e.target as Element;

        setScrollHeight(target.scrollTop);
      },
      [setScrollHeight],
    );

    useEffect(() => {
      const handleResize = () => {
        if (innerContainerRef.current) {
          setHasScroll(
            innerContainerRef.current.scrollHeight -
              innerContainerRef.current.clientHeight !==
              scrollHeight,
          );
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }, [innerContainerRef, scrollHeight, setHasScroll]);

    useEffect(() => {
      const content = containerRef.current;

      if (content) {
        return hideOthers(content);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { isEnabled, ...dragProps } = useDraggable({
      variant,
      handle,
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
      <ModalContainerProvider
        hasScroll={hasScroll}
        scrollHeight={scrollHeight}
        handleClose={handleClose}
        sticky={sticky}
      >
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
          {!disableDimmer && (
            <RemoveScroll as={Slot} allowPinchZoom shards={[containerRef]}>
              <Box
                onPointerDown={(e) => {
                  const ctrlLeftClick = e.button === 0 && e.ctrlKey === true;
                  const isRightClick = e.button === 2 || ctrlLeftClick;

                  if (isRightClick || disableOutsideClickClose) {
                    e.preventDefault();
                    return;
                  }

                  handleClose();
                }}
                sx={modalDimmerStyle}
              />
            </RemoveScroll>
          )}
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
              onDismiss={handleClose}
              ref={composedContainerRefs}
            >
              <Box
                role="dialog"
                aria-modal
                id={context.containerId}
                aria-describedby={`${context.descriptionId} ${context.summaryId}`}
                aria-labelledby={`${context.titleId} ${context.headingId}`}
                {...props}
                sx={[
                  modalContainerStyle({
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
                    ['& > div']: {
                      display: 'flex !important',
                      flexDirection: 'column',
                    },
                  }}
                  zIndex={11}
                  asChild
                  viewPortProps={{
                    onScroll: handleOnScroll,
                    sx: {
                      flexGrow: 1,
                    },
                  }}
                >
                  {isEnabled && (
                    <FlexBox
                      justifyContent="center"
                      sx={modalGrabberStyle}
                      {...dragProps}
                    />
                  )}

                  {children}
                </ScrollArea>
              </Box>
            </DismissableLayer>
          </FocusScope>
        </Box>
      </ModalContainerProvider>
    );
  },
);

ModalContainer.displayName = 'ModalContainer';

const ModalClose = forwardRef(
  <E extends ElementType = 'button'>(
    { children, ...props }: PolymorphicProps<IconButtonProps, E>,
    ref: ForwardedRef<ElementRef<E>>,
  ) => {
    const { handleClose } = useModalContainerContext(MODAL_CLOSE_NAME);
    const { variant } = useModalNavigationContext(MODAL_CLOSE_NAME);

    return (
      <IconButton
        wds-ignore-first-focus="true"
        variant={variant === 'float' ? 'background' : 'normal'}
        size={24}
        {...props}
        onClick={composeEventHandlers(props.onClick, handleClose)}
        ref={ref}
      >
        {children ?? getDefaultCloseIcon(variant)}
      </IconButton>
    );
  },
) as PolymorphicComponent<IconButtonProps, 'button'>;

ModalClose.displayName = MODAL_CLOSE_NAME;

const ModalNavigation = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ModalNavigationProps, 'div'>
>(
  (
    {
      variant = 'normal',
      leftButton,
      rightButton = <ModalClose />,
      toolbar,
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
    const context = useModalContext(MODAL_NAVIGATION_NAME);
    const { scrollHeight, sticky } = useModalContainerContext(
      MODAL_NAVIGATION_NAME,
    );
    const theme = useTheme();

    const leftButtonRedner = Boolean(leftButton) ? (
      <FlexBox gap="16px" sx={modalLeftIconStyle(variant)}>
        {leftButton}
      </FlexBox>
    ) : null;

    const rightButtonRedner = Boolean(rightButton) && (
      <FlexBox gap="16px" sx={modalRightIconStyle(variant)}>
        {rightButton}
      </FlexBox>
    );

    return (
      <ModalNavigationProvider variant={variant}>
        <FlexBox
          wds-component="modal-navigation"
          ref={ref}
          flexDirection="column"
          {...props}
          sx={[
            modalNavigationStyle({
              variant,
              xs,
              sm,
              md,
              lg,
              xl,
            }),
            props.sx,
          ]}
          style={
            {
              ['--wds-navigation-border-color']:
                sticky && scrollHeight > 0
                  ? theme.palette.line.normal.normal
                  : 'transparent',
              ...props.style,
            } as CSSProperties
          }
        >
          <FlexBox sx={modalNavigationWrapperStyle(variant)}>
            {variant !== 'float' ? (
              <>
                {variant !== 'extended' && leftButtonRedner}

                {Boolean(children) && (
                  <FlexBox
                    alignItems="center"
                    sx={modalNavigationTitleStyle(variant)}
                  >
                    <Typography
                      as="h2"
                      id={context.titleId}
                      variant="headline2"
                      weight="bold"
                      color="palette.label.strong"
                      display="block"
                      noWrap
                      sx={{ margin: 0, border: 'none' }}
                    >
                      {children}
                    </Typography>
                  </FlexBox>
                )}

                {variant !== 'extended' ? (
                  rightButtonRedner
                ) : (
                  <FlexBox sx={{ width: '100%' }}>
                    {leftButtonRedner}
                    {rightButtonRedner}
                  </FlexBox>
                )}
              </>
            ) : (
              <>
                {Boolean(leftButton) && (
                  <FlexBox gap="16px" sx={modalLeftIconStyle(variant)}>
                    {leftButton}
                  </FlexBox>
                )}
                {Boolean(rightButton) && (
                  <FlexBox gap="16px" sx={modalRightIconStyle(variant)}>
                    {rightButton}
                  </FlexBox>
                )}
              </>
            )}
          </FlexBox>

          {toolbar}
        </FlexBox>
      </ModalNavigationProvider>
    );
  },
);

ModalNavigation.displayName = 'ModalNavigation';

const ModalContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ModalContentProps, 'div'>
>(
  (
    { padding, paddingExtra, paddingInfo, xs, sm, md, lg, xl, ...props },
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
        id={context.descriptionId}
        {...props}
      />
    );
  },
) as PolymorphicComponent<ModalDescriptionProps, 'p'>;

ModalDescription.displayName = 'ModalDescription';

const ModalActionArea = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<ModalActionAreaProps, 'div'>
>(
  (
    { variant = 'normal', priority = 'compact', children, caption, ...props },
    ref,
  ) => {
    const { sticky: enableSticky, hasScroll } = useModalContainerContext(
      MODAL_ACTION_AREA_NAME,
    );

    return (
      <ModalActionAreaProvider priority={priority}>
        <FlexBox
          wds-component="modal-action-area"
          ref={ref}
          flexShrink={0}
          flexDirection="column"
          {...props}
          sx={[
            modalActionAreaStyle({
              variant,
              priority,
              isSticky:
                !enableSticky || priority === 'single' ? false : hasScroll,
            }),
            props.sx,
          ]}
        >
          {Boolean(caption) && (
            <Typography
              align="center"
              variant="label2"
              weight="regular"
              color="palette.label.alternative"
              sx={{ marginBottom: '16px' }}
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

const ModalActionButton = forwardRef(
  <E extends ElementType = 'button'>(
    {
      variant = 'primary',
      ...props
    }: PolymorphicProps<ModalActionButtonProps, E>,
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
          {...props}
          sx={[modalActionButtonSingle(priority), props.sx]}
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
          {...props}
          sx={[modalActionButtonSingle(priority), props.sx]}
        />
      ),
      assistive:
        priority === 'strong' ? (
          <TextButton
            ref={ref}
            color="assistive"
            size="small"
            {...props}
            sx={[
              {
                margin: '8px 0px',
                width: 'fit-content',
                alignSelf: 'center',
              },
              props.sx,
            ]}
          />
        ) : (
          <Button
            ref={ref}
            variant="outlined"
            color="secondary"
            {...props}
            sx={[modalActionButtonSingle(priority), props.sx]}
          />
        ),
    };

    return renderComponent[variant];
  },
) as PolymorphicComponent<ModalActionButtonProps, 'button'>;

ModalActionButton.displayName = MODAL_ACTION_BUTTON_NAME;

export {
  Modal,
  ModalContainer,
  ModalClose,
  ModalNavigation,
  ModalContent,
  ModalContentItem,
  ModalHeading,
  ModalSummary,
  ModalDescription,
  ModalActionArea,
  ModalActionButton,
};
