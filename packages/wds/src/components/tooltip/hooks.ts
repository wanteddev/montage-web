import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useCallback, useEffect, useRef } from 'react';

import { isElementDisabled } from '../../utils/internal/element';

import { useTooltipGroupContext } from './contexts';

import type { PointerDownOutsideEvent } from '../dismissable-layer/types';
import type { MouseEvent, MouseEventHandler } from 'react';
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
  enableOpenOnFocusVisibleOnly,
}: TooltipProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const groupContext = useTooltipGroupContext();

  const openTimerRef = useRef(0);
  const closeTimerRef = useRef(0);

  const isMouseDownTriggered = useRef(false);

  const triggerRef = useRef<HTMLElement | null>(null);

  const [open = false, setOpen] = useControllableState({
    prop: originOpen,
    defaultProp: defaultOpen ?? false,
    onChange: (value) => {
      if (value) {
        groupContext?.onOpen();
      } else {
        groupContext?.onClose();
      }
      onOpenChange?.(value);
    },
  });

  // Store the latest state in a ref to ensure setTimeout callbacks access the most recent value.
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
      } else {
        setOpen(false);
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
          setOpen(false);
        }, overrideDelay ?? leaveDelay);
      } else {
        setOpen(false);
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

  const handleMouseOver: MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      if (e.type === 'touchstart' || mode !== 'hover') {
        return;
      }

      if (groupContext?.isOpenWithoutDelayRef.current) {
        handleOpen(0);
      } else {
        handleOpen();
      }
    },
    [handleOpen, groupContext, mode],
  );

  const handleMouseLeave: MouseEventHandler<HTMLElement> = useCallback(
    (e) => {
      if (e.type === 'touchstart' || mode !== 'hover') {
        return;
      }

      if (groupContext?.isOpenWithoutDelayRef.current) {
        handleClose(0);
      } else {
        handleClose();
      }
    },
    [handleClose, groupContext, mode],
  );

  const handleFocus = useCallback(() => {
    if (disableOpenOnFocus || mode !== 'hover') {
      return;
    }

    if (
      !latestOpen.current &&
      !isMouseDownTriggered.current &&
      (enableOpenOnFocusVisibleOnly
        ? triggerRef.current?.matches(':focus-visible')
        : true)
    ) {
      handleOpen(0);
    }

    isMouseDownTriggered.current = false;
  }, [handleOpen, mode, disableOpenOnFocus, enableOpenOnFocusVisibleOnly]);

  const handleBlur = useCallback(() => {
    if (mode === 'hover') {
      if (latestOpen.current) {
        handleClose(0);
      }
    }
  }, [mode, handleClose]);

  const handleMouseDown = useCallback(() => {
    if (mode !== 'hover' || disableCloseOnPointDown) {
      return;
    }

    isMouseDownTriggered.current = true;
    setOpen(false);
    window.clearTimeout(openTimerRef.current);
    window.clearTimeout(closeTimerRef.current);
  }, [mode, setOpen, disableCloseOnPointDown]);

  const handleDismiss = useCallback(() => {
    if (latestOpen.current) {
      setOpen(false);
      window.clearTimeout(openTimerRef.current);
      window.clearTimeout(closeTimerRef.current);
    }
  }, [setOpen]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (
        latestOpen.current ||
        mode !== 'click' ||
        isElementDisabled(e.currentTarget)
      ) {
        return;
      }

      setOpen(!open);
    },
    [setOpen, mode, open],
  );

  const handlePointerDownOutside = useCallback((e: PointerDownOutsideEvent) => {
    if (
      e.currentTarget &&
      triggerRef.current?.contains(e.currentTarget as HTMLElement)
    ) {
      e.preventDefault();
    }
  }, []);

  return {
    triggerRef,
    containerRef,
    open,
    handleMouseOver,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handleMouseDown,
    handleClick,
    handleDismiss,
    handlePointerDownOutside,
  };
};
