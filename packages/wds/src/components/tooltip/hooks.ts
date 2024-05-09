import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useCallback, useEffect, useRef } from 'react';

import type { PointerDownOutsideEvent } from '@radix-ui/react-dismissable-layer';
import type { FocusEventHandler, MouseEvent, MouseEventHandler } from 'react';
import type { TooltipProps } from './types';

export const useTooltip = ({
  mode,
  open: originOpen,
  defaultOpen,
  onOpenChange,
  enterDelay,
  leaveDelay,
  disableCloseOnPointDown,
  disableOpenOnFocus,
}: TooltipProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const openTimerRef = useRef(0);
  const closeTimerRef = useRef(0);

  const [open = false, setOpen] = useControllableState({
    prop: originOpen,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  // setTimeout 에서 최신 state를 가지기 위해 ref로도 저장해야함.
  const latestOpen = useRef(open);

  useEffect(() => {
    latestOpen.current = open;
  }, [open]);

  const handleOpen = useCallback(
    (overrideDelay?: number) => {
      if (mode === 'hover') {
        window.clearTimeout(closeTimerRef.current);
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = window.setTimeout(() => {
          setOpen(true);
        }, overrideDelay ?? enterDelay);
      }
    },
    [enterDelay, setOpen, mode],
  );

  const handleClose = useCallback(
    (overrideDelay?: number) => {
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
            } catch (err) {
              //
            }

            setOpen(false);
          }
        }, overrideDelay ?? leaveDelay);
      }
    },
    [leaveDelay, setOpen, mode],
  );

  useEffect(() => {
    const openTimer = openTimerRef.current;
    const closeTimer = closeTimerRef.current;

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(closeTimer);
    };
  }, []);

  const handleMouseOver: MouseEventHandler<any> = useCallback(
    (e) => {
      if (e.type === 'touchstart') {
        return;
      }

      handleOpen();
    },
    [handleOpen],
  );

  const handleMouseLeave: MouseEventHandler<any> = useCallback(
    (e) => {
      if (e.type === 'touchstart') {
        return;
      }

      handleClose();
    },
    [handleClose],
  );

  const handleFocus: FocusEventHandler<any> = useCallback(() => {
    if (!disableOpenOnFocus && mode === 'hover') {
      if (!latestOpen.current) {
        handleOpen(0);
      }
    }
  }, [handleOpen, mode, disableOpenOnFocus]);

  const handleBlur: FocusEventHandler<any> = useCallback(() => {
    if (mode === 'hover') {
      if (latestOpen.current) {
        setOpen(false);
        window.clearTimeout(openTimerRef.current);
        window.clearTimeout(closeTimerRef.current);
      }
    }
  }, [mode, setOpen]);

  const handleMouseDown: (
    event: PointerDownOutsideEvent | MouseEvent<any>,
  ) => void = useCallback(
    (e) => {
      e.preventDefault();
      if (mode === 'hover' && !disableCloseOnPointDown) {
        setOpen(false);
        window.clearTimeout(openTimerRef.current);
        window.clearTimeout(closeTimerRef.current);
      }
    },
    [mode, setOpen, disableCloseOnPointDown],
  );

  const handleDismiss = useCallback(() => {
    if (mode === 'hover') {
      if (latestOpen.current) {
        setOpen(false);
        window.clearTimeout(openTimerRef.current);
        window.clearTimeout(closeTimerRef.current);
      }
    }
  }, [mode, setOpen]);

  return {
    containerRef,
    open,
    handleMouseOver,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handleMouseDown,
    handleDismiss,
  };
};
