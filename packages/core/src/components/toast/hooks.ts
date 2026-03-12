import { useCallback, useEffect, useRef, useState } from 'react';

import { isCursorDevice } from './helpers';

import type { CSSProperties } from 'react';
import type { RegionToastItem } from '../../stores/region-store';

type UseToastAnimationParams = Pick<
  RegionToastItem,
  'duration' | 'onAnimationEnd'
> & {
  open: boolean;
  setOpen: (open: boolean) => void;
  disablePortal?: boolean;
  component?: 'toast' | 'snackbar';
};

export const useToastAnimation = ({
  open,
  duration,
  onAnimationEnd,
  setOpen,
  disablePortal,
  component = 'toast',
}: UseToastAnimationParams) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const remainingTimeRef = useRef<number | undefined>(undefined);

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
      isCursorDevice() &&
      timeoutRef.current &&
      startTimeRef.current &&
      remainingTimeRef.current
    ) {
      clearTimer();
      // Calculate remaining time
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(
        0,
        remainingTimeRef.current - elapsed,
      );
    }
  };

  const handleMouseLeave = () => {
    if (open && remainingTimeRef.current !== undefined) {
      // Restart timer with remaining time
      startTimer(remainingTimeRef.current);
    }
  };

  const handleAnimationEnd = () => {
    if (open) {
      onAnimationEnd?.('show');
      return;
    }

    onAnimationEnd?.('hide');
  };

  return {
    ref,
    handleAnimationEnd,
    handleMouseEnter,
    handleMouseLeave,
    style: {
      [`--wds-${component}-animation-height`]: `${height}px`,
      [`--wds-${component}-animation-margin-top`]: disablePortal ? 0 : '10px',
    } as CSSProperties,
  };
};
