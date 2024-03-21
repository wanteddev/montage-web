import {
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Slot } from '@radix-ui/react-slot';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useComposedRefs } from '@radix-ui/react-compose-refs';

import DismissableLayer from '../dismissable-layer';
import { Popper, PopperAnchor, PopperArrow, PopperContent } from '../popper';
import FlexBox from '../flex-box';
import Typography from '../typography';
import NoSsr from '../no-ssr';

import { TooltipProvider, useTooltipContext } from './contexts';
import {
  TOOLTIP_CONTENT_NAME,
  TOOLTIP_NAME,
  TOOLTIP_TRIGGER_NAME,
} from './constants';
import { tooltipContentStyle } from './style';

import type { MergeElementProps } from '@/types';
import type { TooltipContentProps, TooltipProps } from './types';
import type {
  ComponentPropsWithoutRef,
  FocusEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  PropsWithChildren,
} from 'react';

const Tooltip = ({
  mode = 'hover',
  variant = 'normal',
  position = 'top-center',
  open: originOpen,
  defaultOpen = mode === 'always',
  onOpenChange,
  children,
}: PropsWithChildren<TooltipProps>) => {
  const containerId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const isDismissed = useRef(false);

  const openTimerRef = useRef(0);
  const closeTimerRef = useRef(0);

  const enterDelay = useMemo(() => 300, []);
  const leaveDelay = useMemo(() => 300, []);

  const [open = false, setOpen] = useControllableState({
    prop: originOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const handleOpen = useCallback(() => {
    if (mode === 'hover') {
      window.clearTimeout(closeTimerRef.current);
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = window.setTimeout(() => setOpen(true), enterDelay);
    }
  }, [enterDelay, setOpen, mode]);

  const handleClose = useCallback(() => {
    if (mode === 'hover') {
      window.clearTimeout(openTimerRef.current);
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = window.setTimeout(async () => {
        if (containerRef.current !== null) {
          try {
            containerRef.current.style.opacity = '0';

            await containerRef.current.animate(
              [{ opacity: 1 }, { opacity: 0 }],
              {
                duration: 200,
                easing: 'ease',
              },
            ).finished;
            containerRef.current.animate([{ opacity: 0 }], {
              duration: 200,
            });
          } catch (err) {
            //
          }

          setOpen(false);
        } else {
          setOpen(false);
        }
      }, leaveDelay);
    }
  }, [leaveDelay, setOpen, mode]);

  useEffect(() => {
    const openTimer = openTimerRef.current;
    const closeTimer = closeTimerRef.current;

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(closeTimer);
    };
  }, []);

  const handleMouseOver: PointerEventHandler<any> = (e) => {
    if (e.type === 'touchstart') {
      return;
    }

    if (!isDismissed.current) {
      handleOpen();
    }
  };

  const handleMouseLeave: PointerEventHandler<any> = (e) => {
    if (e.type === 'touchstart') {
      return;
    }

    isDismissed.current = false;
    handleClose();
  };

  const handleFocus: FocusEventHandler<any> = handleOpen;
  const handleBlur: FocusEventHandler<any> = handleClose;

  const handleMouseDown: MouseEventHandler<any> = () => {
    if (mode === 'hover') {
      isDismissed.current = true;
      setOpen(false);
    }
  };

  return (
    <TooltipProvider
      isDismissed={isDismissed}
      containerRef={containerRef}
      mode={mode}
      variant={variant}
      position={position}
      containerId={containerId}
      open={open}
      onOpenChange={setOpen}
      handleMouseOver={handleMouseOver}
      handleMouseLeave={handleMouseLeave}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
      handleMouseDown={handleMouseDown}
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
>(({ action, children, ...props }, ref) => {
  const {
    onOpenChange,
    position,
    containerRef,
    containerId,
    variant,
    mode,
    open,
    isDismissed,
    handleMouseOver,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useTooltipContext(TOOLTIP_CONTENT_NAME);

  const composedRef = useComposedRefs(ref, containerRef);

  const Wrapper = mode === 'always' ? NoSsr : Fragment;

  return open ? (
    <Wrapper>
      <DismissableLayer
        asChild
        disableOutsidePointerEvents={false}
        onFocusOutside={(event) => event.preventDefault()}
        onDismiss={() => {
          if (mode === 'hover') {
            isDismissed.current = true;
            onOpenChange(false);
          }
        }}
      >
        <PopperContent
          position={position}
          role="tooltip"
          wrapperProps={{
            onMouseOver: handleMouseOver,
            onMouseLeave: handleMouseLeave,
            onFocus: handleFocus,
            onBlur: handleBlur,
          }}
        >
          <FlexBox
            css={tooltipContentStyle({ variant })}
            ref={composedRef}
            {...props}
          >
            <FlexBox flexDirection="column">
              <Typography
                id={containerId}
                variant="label1_normal"
                weight="medium"
              >
                {children}
              </Typography>

              {Boolean(action) && action}
            </FlexBox>

            <PopperArrow />
          </FlexBox>
        </PopperContent>
      </DismissableLayer>
    </Wrapper>
  ) : null;
});

TooltipTrigger.displayName = TOOLTIP_TRIGGER_NAME;

export { Tooltip, TooltipTrigger, TooltipContent };
