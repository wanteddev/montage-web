import {
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
} from 'react';
import { Slot } from '@radix-ui/react-slot';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useTheme } from '@wanteddev/wds-engine';
import { IconClose } from '@wanteddev/wds-icon';

import DismissableLayer from '../dismissable-layer';
import { Popper, PopperAnchor, PopperArrow, PopperContent } from '../popper';
import FlexBox from '../flex-box';
import Typography from '../typography';
import NoSsr from '../no-ssr';
import { addOpacity } from '../../utils';
import IconButton from '../icon-button';
import useTransitionStatus from '../../hooks/use-transition-status';
import ComponentOrFragment from '../component-or-fragment';

import {
  TooltipGroupProvider,
  TooltipProvider,
  useTooltipContext,
} from './contexts';
import {
  TOOLTIP_CONTENT_NAME,
  TOOLTIP_GROUP_NAME,
  TOOLTIP_NAME,
  TOOLTIP_TRIGGER_NAME,
} from './constants';
import { tooltipContentStyle, tooltipWrapperStyle } from './style';
import { useTooltip } from './hooks';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';
import type {
  TooltipContentProps,
  TooltipGroupProps,
  TooltipProps,
} from './types';
import type { CSSProperties } from 'react';

const TooltipGroup = ({
  children,
  skipDelayDuration = 300,
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
  enterDelay = 250,
  leaveDelay = 300,
  disableCloseOnPointDown = false,
  disableOpenOnFocus = false,
}: TooltipProps) => {
  const containerId = useId();
  const {
    containerRef,
    open,
    handleMouseOver,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handleMouseDown,
    handleDismiss,
  } = useTooltip({
    mode,
    open: originOpen,
    defaultOpen,
    onOpenChange,
    enterDelay,
    leaveDelay,
    disableCloseOnPointDown,
    disableOpenOnFocus,
  });

  return (
    <TooltipProvider
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
    >
      <Popper>{children}</Popper>
    </TooltipProvider>
  );
};

Tooltip.displayName = TOOLTIP_NAME;

const TooltipTrigger = forwardRef<
  HTMLElement,
  DefaultComponentProps<{}, typeof Slot>
>((props, ref) => {
  const {
    containerId,
    open,
    handleMouseOver,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handleMouseDown,
  } = useTooltipContext(TOOLTIP_TRIGGER_NAME);

  return (
    <PopperAnchor>
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
      />
    </PopperAnchor>
  );
});

TooltipTrigger.displayName = TOOLTIP_TRIGGER_NAME;

const TooltipContent = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<TooltipContentProps, 'div'>
>(
  (
    {
      arrow = true,
      action,
      children,
      position = 'top-center',
      offset = 2,
      container,
      disablePortal,
      closeButton,
      animationDuration = 250,
      referenceHidden = false,
      setContext,
      __wdsCustomChildren,
      ...props
    },
    ref,
  ) => {
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
      handleMouseDown,
    } = useTooltipContext(TOOLTIP_CONTENT_NAME);

    const { hasExited, status } = useTransitionStatus({
      open,
      duration: animationDuration,
    });

    const composedRef = useComposedRefs(ref, containerRef);

    const isAlways = mode === 'always';

    const Wrapper = isAlways ? NoSsr : Fragment;

    const theme = useTheme();

    const overlay = addOpacity(theme.semantic.primary.normal, theme.opacity[5]);

    return !hasExited ? (
      <Wrapper>
        <ComponentOrFragment
          component={DismissableLayer}
          flag={!isAlways}
          asChild
          disableOutsidePointerEvents={false}
          onFocusOutside={(event) => event.preventDefault()}
          onPointerDownOutside={handleMouseDown}
          onDismiss={handleDismiss}
        >
          <PopperContent
            position={position}
            role="tooltip"
            data-status={status}
            id={containerId}
            container={container}
            disablePortal={disablePortal}
            ref={composedRef}
            offset={offset}
            referenceHidden={referenceHidden}
            setContext={setContext}
            wrapperProps={{
              onMouseOver: handleMouseOver,
              onMouseLeave: handleMouseLeave,
              onFocus: handleFocus,
              onBlur: handleBlur,
              style: {
                '--wds-tooltip-transition-duration': `${animationDuration}ms`,
              } as CSSProperties,
            }}
          >
            {Boolean(__wdsCustomChildren) ? (
              __wdsCustomChildren
            ) : (
              <FlexBox {...props} sx={[tooltipWrapperStyle, props.sx]}>
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

                      {Boolean(action) && action}
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

                  {arrow && <PopperArrow overlay={overlay} />}
                </FlexBox>
              </FlexBox>
            )}
          </PopperContent>
        </ComponentOrFragment>
      </Wrapper>
    ) : null;
  },
);

TooltipTrigger.displayName = TOOLTIP_TRIGGER_NAME;

export { TooltipGroup, Tooltip, TooltipTrigger, TooltipContent };
