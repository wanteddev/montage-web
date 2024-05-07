import { Fragment, forwardRef, useId } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { useTheme } from '@wanteddev/wds-engine';

import DismissableLayer from '../dismissable-layer';
import { Popper, PopperAnchor, PopperArrow, PopperContent } from '../popper';
import FlexBox from '../flex-box';
import Typography from '../typography';
import NoSsr from '../no-ssr';
import { addOpacity } from '../../utils';

import { TooltipProvider, useTooltipContext } from './contexts';
import {
  TOOLTIP_CONTENT_NAME,
  TOOLTIP_NAME,
  TOOLTIP_TRIGGER_NAME,
} from './constants';
import { tooltipContentStyle, tooltipWrapperStyle } from './style';
import { useTooltip } from './hooks';

import type { MergeElementProps } from '@wanteddev/wds-engine';
import type { TooltipContentProps, TooltipProps } from './types';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

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
}: PropsWithChildren<TooltipProps>) => {
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
  ComponentPropsWithoutRef<typeof Slot>
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
  MergeElementProps<'div', TooltipContentProps>
>(
  (
    {
      arrow = true,
      action,
      children,
      variant = 'normal',
      position = 'top-center',
      container,
      disablePortal,
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

    const composedRef = useComposedRefs(ref, containerRef);

    const Wrapper = mode === 'always' ? NoSsr : Fragment;

    const theme = useTheme();

    const overlay =
      variant === 'accent'
        ? addOpacity(theme.palette.primary.normal, theme.opacity[22])
        : undefined;

    return open ? (
      <Wrapper>
        <DismissableLayer
          asChild
          disableOutsidePointerEvents={false}
          onFocusOutside={(event) => event.preventDefault()}
          onPointerDownOutside={handleMouseDown}
          onDismiss={handleDismiss}
        >
          <PopperContent
            position={position}
            role="tooltip"
            id={containerId}
            container={container}
            disablePortal={disablePortal}
            ref={composedRef}
            wrapperProps={{
              onMouseOver: handleMouseOver,
              onMouseLeave: handleMouseLeave,
              onFocus: handleFocus,
              onBlur: handleBlur,
            }}
          >
            {Boolean(__wdsCustomChildren) ? (
              __wdsCustomChildren
            ) : (
              <FlexBox {...props} sx={[tooltipWrapperStyle, props.sx]}>
                <FlexBox sx={tooltipContentStyle({ variant })}>
                  <FlexBox flexDirection="column" gap="12px">
                    <Typography variant="label1_normal" weight="medium">
                      {children}
                    </Typography>

                    {Boolean(action) && action}
                  </FlexBox>

                  {arrow && <PopperArrow overlay={overlay} />}
                </FlexBox>
              </FlexBox>
            )}
          </PopperContent>
        </DismissableLayer>
      </Wrapper>
    ) : null;
  },
);

TooltipTrigger.displayName = TOOLTIP_TRIGGER_NAME;

export { Tooltip, TooltipTrigger, TooltipContent };
