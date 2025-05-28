import { useCallback, useEffect, useRef, useState } from 'react';

import { makeTransitionStyle } from './helpers';

import type { CSSProperties } from 'react';
import type { RegionToastItem } from '../../stores/region-store';

type UseToastAnimationParams = Pick<
  RegionToastItem,
  'duration' | 'onAnimationEnd'
> & {
  open: boolean;
  setOpen: (open: boolean) => void;
  disablePortal?: boolean;
  disableAnimation?: boolean;
};

export const useToastAnimation = ({
  open,
  setOpen,
  duration,
  onAnimationEnd,
  disablePortal,
  disableAnimation,
}: UseToastAnimationParams) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();
  const remainingTimeRef = useRef<number>();
  const [containerStyle, setContainerStyle] = useState<CSSProperties>(
    disableAnimation
      ? {}
      : {
          height: 0,
          margin: 0,
          opacity: 0,
        },
  );

  const [isMounted, setIsMounted] = useState(open);
  const [height, setHeight] = useState(0);

  const ref = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) {
        const handleUpdate = () => {
          const clientHeight = el.getBoundingClientRect().height;
          setHeight(clientHeight);
        };

        handleUpdate();
        new MutationObserver(handleUpdate).observe(el, {
          subtree: true,
          childList: true,
          characterData: true,
        });
      }
    },
    [setHeight],
  );

  useEffect(() => {
    if (open) {
      setIsMounted(true);
    } else if (disableAnimation) {
      setIsMounted(false);
    }

    return () => {
      if (!isMounted) {
        setHeight(0);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    setContainerStyle(
      disableAnimation
        ? {}
        : makeTransitionStyle({ open, height, disablePortal }),
    );
  }, [open, height, disablePortal, disableAnimation]);

  const startTimer = useCallback(
    (timeMs: number) => {
      if (timeMs !== Infinity) {
        startTimeRef.current = Date.now();
        remainingTimeRef.current = timeMs;

        timeoutRef.current = setTimeout(() => {
          setOpen(false);
        }, timeMs);
      }
    },
    [setOpen],
  );

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    if (open) {
      const durationMs = typeof duration === 'number' ? duration : 3000;
      startTimer(durationMs);
    }

    return clearTimer;
  }, [open, duration, startTimer, clearTimer]);

  const handleMouseEnter = () => {
    if (
      timeoutRef.current &&
      startTimeRef.current &&
      remainingTimeRef.current
    ) {
      clearTimer();
      // 남은 시간 계산
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(
        0,
        remainingTimeRef.current - elapsed,
      );
    }
  };

  const handleMouseLeave = () => {
    if (open && remainingTimeRef.current !== undefined) {
      // 남은 시간으로 타이머 재시작
      startTimer(remainingTimeRef.current);
    }
  };

  const handleTransitionEnd = () => {
    if (open) {
      onAnimationEnd?.('show');
      return;
    }

    onAnimationEnd?.('hide');
    setIsMounted(false);
  };

  return {
    ref,
    isMounted,
    containerStyle,
    handleMouseEnter,
    handleMouseLeave,
    handleTransitionEnd,
  };
};
