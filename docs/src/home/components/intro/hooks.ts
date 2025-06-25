import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useLnbContext } from '@/features/docs/components/lnb/contexts';
import { GNB_HEIGHT } from '@/features/layout/components/gnb/constants';

import type { CSSProperties } from 'react';
import type { MotionValue } from 'framer-motion';

const useMotionState = <T extends number>(
  motionValue: MotionValue<number>,
  inputRange: Array<number>,
  outputRange: Array<T>,
) => {
  const [state, setState] = useState<T>(outputRange[0] as T);

  const value = useTransform(motionValue, inputRange, outputRange);

  useMotionValueEvent(value, 'change', () => {
    setState(value.get());
  });

  return state;
};

const useScrollTriggerPoint = () => {
  const [scrollTriggerPoint, setScrollTriggerPoint] = useState(GNB_HEIGHT + 20);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(min-width: 768px)`);

    const handleChange = () => {
      setScrollTriggerPoint(() =>
        mediaQueryList.matches ? GNB_HEIGHT + 20 : GNB_HEIGHT + 24,
      );
    };

    handleChange();
    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, []);

  return {
    scrollTriggerPoint,
  };
};

export const useIntroAnimate = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY: scrollYMotionValue } = useScroll();
  const { scrollTriggerPoint } = useScrollTriggerPoint();

  const widthOffset = useMotionState(
    scrollYMotionValue,
    [0, scrollTriggerPoint],
    [1, 0],
  );

  const borderRadius = useMotionState(
    scrollYMotionValue,
    [0, scrollTriggerPoint],
    [1, 0],
  );

  const heightOffset = useMotionState(
    scrollYMotionValue,
    [0, scrollTriggerPoint],
    [1, 0],
  );

  const lnbHide = useLnbContext().hide;

  const prevLnbHide = useRef(lnbHide);

  const getCssProperties = useCallback(
    (isLnbHidden: boolean): CSSProperties => {
      if (isLnbHidden) {
        return {
          width: `calc(100% - (var(--intro-background-padding-inline) * 2 * ${widthOffset}))`,
          height: `calc(100dvh - (var(--intro-background-height-offset) * ${heightOffset}))`,
          borderRadius: `calc(var(--intro-background-border-radius) * ${borderRadius})`,
        };
      }

      return {
        width: `calc(100% - (var(--intro-background-padding-inline) * 2))`,
        height: `calc(100dvh - (var(--intro-background-height-offset)))`,
        borderRadius: 'var(--intro-background-border-radius)',
      };
    },
    [widthOffset, heightOffset, borderRadius],
  );

  const [cssProperties, setCssProperties] = useState(getCssProperties(lnbHide));

  useEffect(() => {
    setCssProperties(getCssProperties(lnbHide));
  }, [getCssProperties, lnbHide]);

  useEffect(() => {
    if (prevLnbHide.current !== lnbHide) {
      ref.current?.animate(
        [
          getCssProperties(prevLnbHide.current) as Keyframe,
          getCssProperties(lnbHide) as Keyframe,
        ],
        {
          duration: 200,
          easing: 'ease-in-out',
        },
      );
    }

    prevLnbHide.current = lnbHide;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lnbHide]);

  return {
    ref,
    cssProperties,
  };
};
