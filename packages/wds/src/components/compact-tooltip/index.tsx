import {
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
import { Popper, PopperAnchor, PopperContent } from '../popper';
import FlexBox from '../flex-box';
import Typography from '../typography';

import { CompactTooltipProvider, useCompactTooltipContext } from './contexts';
import {
  COMPACT_TOOLTIP_CONTENT_NAME,
  COMPACT_TOOLTIP_NAME,
  COMPACT_TOOLTIP_TRIGGER_NAME,
} from './constants';
import { compactTooltipContentStyle } from './style';

import type { MergeElementProps } from '../../types';
import type { CompactTooltipContentProps, CompactTooltipProps } from './types';
import type {
  ComponentPropsWithoutRef,
  FocusEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  PropsWithChildren,
} from 'react';

const CompactTooltip = ({
  open: originOpen,
  defaultOpen,
  onOpenChange,
  children,
}: PropsWithChildren<CompactTooltipProps>) => {
  const containerId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const isDismissed = useRef(false);

  const openTimerRef = useRef(0);
  const closeTimerRef = useRef(0);

  const enterDelay = useMemo(() => 250, []);
  const leaveDelay = useMemo(() => 300, []);

  const [open = false, setOpen] = useControllableState({
    prop: originOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const handleOpen = useCallback(() => {
    window.clearTimeout(closeTimerRef.current);
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => setOpen(true), enterDelay);
  }, [enterDelay, setOpen]);

  const handleClose = useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(async () => {
      if (containerRef.current !== null) {
        try {
          containerRef.current.style.opacity = '0';

          await containerRef.current.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 200,
            easing: 'ease',
          }).finished;
          containerRef.current.animate([{ opacity: 0 }], {
            duration: 200,
          });
        } catch (err) {
          //
        }

        setOpen(false);
        isDismissed.current = false;
      } else {
        setOpen(false);
        isDismissed.current = false;
      }
    }, leaveDelay);
  }, [leaveDelay, setOpen]);

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

  const handleFocus: FocusEventHandler<any> = () => {
    if (!isDismissed.current) {
      handleOpen();
    }
  };
  const handleBlur: FocusEventHandler<any> = () => {
    isDismissed.current = true;
    handleClose();
  };

  const handleMouseDown: MouseEventHandler<any> = () => {
    isDismissed.current = true;
    setOpen(false);
  };

  return (
    <CompactTooltipProvider
      isDismissed={isDismissed}
      containerRef={containerRef}
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
    </CompactTooltipProvider>
  );
};

CompactTooltip.displayName = COMPACT_TOOLTIP_NAME;

const CompactTooltipTrigger = forwardRef<
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
  } = useCompactTooltipContext(COMPACT_TOOLTIP_TRIGGER_NAME);

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

CompactTooltipTrigger.displayName = COMPACT_TOOLTIP_TRIGGER_NAME;

const CompactTooltipContent = forwardRef<
  HTMLDivElement,
  MergeElementProps<'div', CompactTooltipContentProps>
>(({ children, shortcut, position = 'top-center', ...props }, ref) => {
  const {
    onOpenChange,
    containerRef,
    containerId,
    open,
    isDismissed,
    handleMouseOver,
    handleMouseLeave,
    handleFocus,
    handleBlur,
  } = useCompactTooltipContext(COMPACT_TOOLTIP_CONTENT_NAME);

  const composedRef = useComposedRefs(ref, containerRef);

  return open ? (
    <>
      <DismissableLayer
        asChild
        onFocusOutside={(event) => event.preventDefault()}
        onDismiss={() => {
          isDismissed.current = true;
          onOpenChange(false);
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
          <FlexBox ref={composedRef} {...props}>
            <div css={compactTooltipContentStyle}>
              <Typography
                id={containerId}
                variant="label2"
                weight="regular"
                color="palette.inverse.label"
              >
                {children}
              </Typography>

              {Boolean(shortcut) && (
                <Typography
                  variant="label2"
                  weight="regular"
                  color="palette.inverse.label"
                  css={(theme) => ({
                    opacity: theme.opacity[61],
                    marginLeft: '4px',
                    display: 'inline-block',
                  })}
                >
                  {shortcut}
                </Typography>
              )}
            </div>
          </FlexBox>
        </PopperContent>
      </DismissableLayer>
    </>
  ) : null;
});

CompactTooltipTrigger.displayName = COMPACT_TOOLTIP_TRIGGER_NAME;

export { CompactTooltip, CompactTooltipTrigger, CompactTooltipContent };
