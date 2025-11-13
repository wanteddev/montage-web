import { forwardRef, useCallback, useEffect, useId, useRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { Box, useTheme } from '@wanteddev/wds-engine';
import { IconClose } from '@wanteddev/wds-icon';

import { DismissableLayer } from '../dismissable-layer';
import { Popper, PopperAnchor, PopperArrow, PopperContent } from '../popper';
import { FlexBox } from '../flex-box';
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
import {
  tooltipContentShortcutStyle,
  tooltipContentStyle,
  tooltipWrapperStyle,
} from './style';
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
      action,
      children,
      position = 'top-center',
      offset = 4,
      container,
      disablePortal,
      closeButton,
      referenceHidden = false,
      referenceHiddenOffsets,
      setContext,
      forceMount = false,
      shortcut,
      size = 'medium',
      xs,
      sm,
      md,
      lg,
      xl,
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

    const id = useId();

    const composedRef = useComposedRefs(ref, containerRef as ForwardedRef<T>);

    const isAlways = mode === 'always';

    const Component = as ?? Slot;

    const theme = useTheme();

    const mediumArrowMaskId = useId();
    const smallArrowMaskId = useId();

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
            aria-labelledby={id}
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
              <FlexBox
                sx={[tooltipWrapperStyle({ size, xs, sm, md, lg, xl }), sx]}
              >
                <FlexBox data-role="tooltip-content" sx={tooltipContentStyle}>
                  <FlexBox gap="8px" sx={{ zIndex: 1 }}>
                    <FlexBox
                      flexDirection="column"
                      gap="6px"
                      data-role="tooltip-content-text-wrapper"
                    >
                      <FlexBox gap="4px">
                        <Box
                          id={id}
                          as="span"
                          data-role="tooltip-content-text"
                          sx={{
                            wordBreak: 'keep-all',
                            overflowWrap: 'anywhere',
                          }}
                        >
                          {children}
                        </Box>

                        {shortcut && (
                          <Box
                            as="span"
                            data-role="tooltip-content-shortcut"
                            sx={tooltipContentShortcutStyle}
                          >
                            {shortcut}
                          </Box>
                        )}
                      </FlexBox>

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
                      <FlexBox
                        sx={{ height: 'fit-content' }}
                        flexShrink="0"
                        alignItems="center"
                        data-role="tooltip-content-close-button-wrapper"
                      >
                        <IconButton
                          data-role="tooltip-content-close-button"
                          variant="normal"
                          size={16}
                          aria-label="Close tooltip"
                          onClick={handleDismiss}
                        >
                          <IconClose />
                        </IconButton>
                      </FlexBox>
                    )}
                  </FlexBox>

                  <PopperArrow {...scopes}>
                    <Box
                      as="svg"
                      data-role="tooltip-arrow-medium"
                      viewBox="0 0 20 8"
                      width="20"
                      height="8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <mask id={mediumArrowMaskId} maskUnits="userSpaceOnUse">
                        <path
                          d="M8.07038 4.16544L6.41566 2.23494C5.71105 1.41289 5.35874 1.00187 4.93043 0.706626C4.5509 0.445007 4.129 0.250961 3.68337 0.133056C3.18047 0 2.63912 0 1.55642 0H19.4436C18.3609 0 17.8195 0 17.3166 0.133056C16.871 0.250961 16.4491 0.445007 16.0696 0.706626C15.6413 1.00186 15.289 1.41289 14.5843 2.23493L14.5843 2.23494L12.9296 4.16544L12.9296 4.16545C12.0926 5.14193 11.6741 5.63017 11.1761 5.80906C10.7391 5.96607 10.2609 5.96607 9.82386 5.80906C9.32586 5.63017 8.90737 5.14193 8.07038 4.16545L8.07038 4.16544Z"
                          fill="white"
                        />
                      </mask>
                      <g mask={`url(#${mediumArrowMaskId})`}>
                        <rect
                          opacity="0.88"
                          width="20"
                          height="8"
                          fill={theme.semantic.inverse.background}
                        />
                        <rect
                          opacity="0.05"
                          width="20"
                          height="8"
                          fill={theme.semantic.primary.normal}
                        />
                      </g>
                    </Box>

                    <Box
                      as="svg"
                      data-role="tooltip-arrow-small"
                      viewBox="0 0 14 6"
                      width="14"
                      height="6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <mask id={smallArrowMaskId} maskUnits="userSpaceOnUse">
                        <path
                          d="M5.58 3.44L4.92 2.56C4.216 1.62134 3.864 1.15201 3.4179 0.813504C3.02279 0.513696 2.57537 0.289985 2.09846 0.153782C1.55999 0 0.973329 0 -0.2 0H15.2C14.0267 0 13.44 0 12.9015 0.153782C12.4246 0.289985 11.9772 0.513696 11.5821 0.813504C11.136 1.152 10.784 1.62133 10.08 2.55999L10.08 2.56L9.42 3.44L9.41999 3.44001C8.76864 4.30848 8.44296 4.74271 8.04371 4.89799C7.69399 5.034 7.30601 5.034 6.95629 4.89799C6.55703 4.74271 6.23136 4.30848 5.58 3.44Z"
                          fill="white"
                        />
                      </mask>
                      <g mask={`url(#${smallArrowMaskId})`}>
                        <rect
                          opacity="0.88"
                          width="14"
                          height="6"
                          fill={theme.semantic.inverse.background}
                        />
                        <rect
                          opacity="0.05"
                          width="14"
                          height="6"
                          fill={theme.semantic.primary.normal}
                        />
                      </g>
                    </Box>
                  </PopperArrow>
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
