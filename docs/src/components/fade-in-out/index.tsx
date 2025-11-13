import { Box, Slot } from '@wanteddev/wds';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  duration?: string | number;
  delay?: number;
  distance?: string | number;
  variant?: 'top' | 'bottom' | 'left' | 'right';
}>;

const FadeInOut = ({
  duration = 1000,
  delay = 0,
  distance = '20px',
  children,
  variant = 'bottom',
}: Props) => {
  const [state, setState] = useState<
    'animation-pending' | 'animation-start' | 'animation-end'
  >('animation-pending');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const positionX = useMemo(() => {
    switch (variant) {
      case 'left':
        return `-${distance}`;
      case 'right':
        return distance!;
      default:
        return '0';
    }
  }, [variant, distance]);

  const positionY = useMemo(() => {
    switch (variant) {
      case 'top':
        return `-${distance}`;
      case 'bottom':
        return distance!;
      default:
        return '0';
    }
  }, [variant, distance]);

  const startAnimation = useCallback(() => {
    const keyframes: Array<Keyframe> = [
      { transform: `translate3d(${positionX}, ${positionY}, 0)`, opacity: 0 },
      { transform: 'none', opacity: 1 },
    ];

    const content = wrapperRef.current;

    if (!content) {
      return;
    }

    setState('animation-start');

    content
      .animate(keyframes, {
        easing: 'cubic-bezier(0.4, 0.14, 0.3, 1)',
        fill: 'both',
        duration,
        delay,
      })
      .addEventListener('finish', () => {
        setState('animation-end');
      });
  }, [positionX, positionY, duration, delay]);

  useEffect(() => {
    if (!wrapperRef.current || state !== 'animation-pending') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.intersectionRatio > 0) {
          startAnimation();
        }
      },
      {
        threshold: 0.5,
      },
    );
    observer.observe(wrapperRef.current);

    return () => {
      observer.disconnect();
    };
  }, [state, startAnimation]);

  return (
    <Box
      as={Slot}
      data-animation-state={state}
      ref={wrapperRef}
      sx={{ ['&[data-animation-state="animation-pending"]']: { opacity: 0 } }}
    >
      {children}
    </Box>
  );
};

export default FadeInOut;
