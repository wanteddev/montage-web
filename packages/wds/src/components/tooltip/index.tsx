import { forwardRef, useCallback, useEffect, useId, useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useTheme } from '@wanteddev/wds-engine';
import { IconClose } from '@wanteddev/wds-icon';

import { DismissableLayer } from '../dismissable-layer';
import { Popper, PopperAnchor, PopperArrow, PopperContent } from '../popper';
import { FlexBox } from '../flex-box';
import { Typography } from '../typography';
import { addOpacity } from '../../utils';
import { IconButton } from '../icon-button';
import { createScope } from '../../hooks/internal/use-scope-context';
import { NoSsr } from '../no-ssr';
import { AnimationPresence } from '../animation-presence';

import {
  TooltipGroupProvider,
  TooltipProvider,
  useTooltipContext,
} from './contexts';
import {
  TOOLTIP_CONTENT_NAME,
  TOOLTIP_CONTENT_WRAPPER_NAME,
  TOOLTIP_GROUP_NAME,
  TOOLTIP_NAME,
  TOOLTIP_TRIGGER_NAME,
} from './constants';
import { tooltipContentStyle, tooltipWrapperStyle } from './style';
import { useTooltip } from './hooks';

import type {
  DefaultComponentPropsInternal,
  PolymorphicComponentInternal,
  PolymorphicPropsInternal,
} from '@wanteddev/wds-engine';
import type {
  TooltipContentProps,
  TooltipContentWrapperProps,
  TooltipGroupProps,
  TooltipProps,
  TooltipTriggerProps,
} from './types';
import type { ElementType, ForwardedRef } from 'react';

const useTooltipScope = createScope('Popper');

const TooltipGroup = ({
  children,
  skipDelayDuration = 350,
}: TooltipGroupProps) => {
  const isOpenWithoutDelayRef = useRef(false);
  const skipDelayTimerRef = useRef(0);

  useEffect(() => {
    const skipDelayTimer = skipDelayTimerRef.current;
    return () => window.clearTimeout(skipDelayTimer);
  }, []);

  return (
    <TooltipGroupProvider
      onOpen={useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        isOpenWithoutDelayRef.current = true;
      }, [])}
      onClose={useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        skipDelayTimerRef.current = window.setTimeout(() => {
          isOpenWithoutDelayRef.current = false;
        }, skipDelayDuration);
      }, [skipDelayDuration])}
      isOpenWithoutDelayRef={isOpenWithoutDelayRef}
    >
      {children}
    </TooltipGroupProvider>
  );
};

TooltipGroup.displayName = TOOLTIP_GROUP_NAME;

const Tooltip = ({
  mode = 'hover',
  open: originOpen,
  defaultOpen = mode === 'always',
  onOpenChange,
  children,
  enterDelay = 200,
  leaveDelay = 250,
  disableCloseOnPointDown = false,
  disableOpenOnFocus = false,
  enableOpenOnFocusVisibleOnly = false,
}: TooltipProps) => {
  const containerId = useId();
  const {
    triggerRef,
    containerRef,
    open,
    handleMouseOver,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handleMouseDown,
    handleDismiss,
    handleClick,
    handlePointerDownOutside,
  } = useTooltip({
    mode,
    open: originOpen,
    defaultOpen,
    onOpenChange,
    enterDelay,
    leaveDelay,
    disableCloseOnPointDown,
    disableOpenOnFocus,
    enableOpenOnFocusVisibleOnly,
  });

  const scopes = useTooltipScope('Tooltip');

  return (
    <TooltipProvider
      triggerRef={triggerRef}
      containerRef={containerRef}
      mode={mode}
      containerId={containerId}
      open={open}
      handleMouseOver={handleMouseOver}
      handleMouseLeave={handleMouseLeave}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
      handleMouseDown={handleMouseDown}
      handleDismiss={handleDismiss}
      handleClick={handleClick}
      handlePointerDownOutside={handlePointerDownOutside}
    >
      <Popper {...scopes}>{children}</Popper>
    </TooltipProvider>
  );
};

Tooltip.displayName = TOOLTIP_NAME;

const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  (props, ref) => {
    const {
      triggerRef,
      containerId,
      open,
      handleMouseOver,
      handleMouseLeave,
      handleFocus,
      handleBlur,
      handleMouseDown,
      handleClick,
    } = useTooltipContext(TOOLTIP_TRIGGER_NAME);

    const scopes = useTooltipScope('Tooltip');

    return (
      <PopperAnchor ref={triggerRef} {...scopes}>
        <Slot
          aria-describedby={open ? containerId : undefined}
          {...props}
          ref={ref}
          onMouseOver={composeEventHandlers(props.onMouseOver, handleMouseOver)}
          onMouseLeave={composeEventHandlers(
            props.onMouseLeave,
            handleMouseLeave,
          )}
          onFocus={composeEventHandlers(props.onFocus, handleFocus)}
          onBlur={composeEventHandlers(props.onBlur, handleBlur)}
          onMouseDown={composeEventHandlers(props.onMouseDown, handleMouseDown)}
          onClick={composeEventHandlers(props.onClick, handleClick)}
        />
      </PopperAnchor>
    );
  },
);

TooltipTrigger.displayName = TOOLTIP_TRIGGER_NAME;

const TooltipContent = forwardRef(
  <T extends ElementType = 'div'>(
    {
      arrow = true,
      action,
      children,
      position = 'top-center',
      offset = 2,
      container,
      disablePortal,
      closeButton,
      referenceHidden = false,
      referenceHiddenOffsets,
      setContext,
      forceMount = false,
      as,
      sx,
      ...props
    }: PolymorphicPropsInternal<TooltipContentProps, T>,
    ref: ForwardedRef<T>,
  ) => {
    const scopes = useTooltipScope('Tooltip');

    const {
      containerRef,
      containerId,
      mode,
      open,
      handleMouseOver,
      handleMouseLeave,
      handleFocus,
      handleBlur,
      handleDismiss,
      handlePointerDownOutside,
    } = useTooltipContext(TOOLTIP_CONTENT_NAME);

    const composedRef = useComposedRefs(ref, containerRef as ForwardedRef<T>);

    const isAlways = mode === 'always';

    const theme = useTheme();

    const overlay = addOpacity(theme.semantic.primary.normal, theme.opacity[5]);

    const Component = as ?? Slot;

    return (
      <AnimationPresence present={open || forceMount}>
        <TooltipContentWrapper
          isAlways={isAlways}
          onFocusOutside={(e) => e.preventDefault()}
          onPointerDownOutside={handlePointerDownOutside}
          onDismiss={handleDismiss}
        >
          <PopperContent
            {...scopes}
            position={position}
            role="tooltip"
            data-status={open ? 'open' : 'close'}
            id={containerId}
            container={container}
            disablePortal={disablePortal}
            offset={offset}
            referenceHidden={referenceHidden}
            referenceHiddenOffsets={referenceHiddenOffsets}
            setContext={setContext}
            wrapperProps={{
              // Prevent mouseover events during the disappearing animation
              onMouseOver: open ? handleMouseOver : undefined,
              onMouseLeave: handleMouseLeave,
              onFocus: handleFocus,
              onBlur: handleBlur,
            }}
          >
            <Component ref={composedRef} {...props}>
              <FlexBox sx={[tooltipWrapperStyle, sx]}>
                <FlexBox sx={tooltipContentStyle}>
                  <FlexBox gap="8px" sx={{ zIndex: 1 }}>
                    <FlexBox
                      flexDirection="column"
                      gap="6px"
                      sx={{
                        padding: '0px 2px',
                      }}
                    >
                      <Typography
                        variant="label1"
                        weight="medium"
                        sx={{
                          wordBreak: 'keep-all',
                          overflowWrap: 'anywhere',
                        }}
                      >
                        {children}
                      </Typography>

                      {Boolean(action) && (
                        <FlexBox
                          data-role="tooltip-content-action"
                          alignItems="center"
                          sx={{ height: 20 }}
                        >
                          {action}
                        </FlexBox>
                      )}
                    </FlexBox>

                    {closeButton && (
                      <FlexBox sx={{ padding: '0 2px' }}>
                        <IconButton
                          variant="normal"
                          size={16}
                          onClick={handleDismiss}
                        >
                          <IconClose />
                        </IconButton>
                      </FlexBox>
                    )}
                  </FlexBox>

                  {arrow && <PopperArrow overlay={overlay} {...scopes} />}
                </FlexBox>
              </FlexBox>
            </Component>
          </PopperContent>
        </TooltipContentWrapper>
      </AnimationPresence>
    );
  },
) as PolymorphicComponentInternal<TooltipContentProps, 'div'>;

TooltipContent.displayName = TOOLTIP_CONTENT_NAME;

const TooltipContentWrapper = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<TooltipContentWrapperProps, 'div'>
>(
  (
    { isAlways, onFocusOutside, onPointerDownOutside, onDismiss, ...props },
    ref,
  ) => {
    if (isAlways) {
      return (
        <NoSsr>
          <Slot ref={ref} {...props} />
        </NoSsr>
      );
    }

    return (
      <DismissableLayer
        ref={ref}
        asChild
        disableOutsidePointerEvents={false}
        onFocusOutside={onFocusOutside}
        onPointerDownOutside={onPointerDownOutside}
        onDismiss={onDismiss}
        {...props}
      />
    );
  },
);

TooltipContentWrapper.displayName = TOOLTIP_CONTENT_WRAPPER_NAME;

export { TooltipGroup, Tooltip, TooltipTrigger, TooltipContent };

export type {
  TooltipGroupProps,
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
};
