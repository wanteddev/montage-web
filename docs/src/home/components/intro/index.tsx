'use client';
import { FlexBox } from '@wanteddev/wds';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useScroll } from 'framer-motion';

import LiquidButton from '@/components/liquid-button';
import { useLnbContext } from '@/features/docs/components/lnb/contexts';

import { useMotionState } from './hooks';
import {
  BORDER_RADIUS,
  PADDING_BOTTOM,
  PADDING_INLINE,
  SCROLL_TRIGGER_POINT,
} from './constants';
import { introBackgroundStyle } from './style';

import type { CSSProperties } from 'react';

const Intro = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollY: scrollYMotionValue } = useScroll();

  const widthOffset = useMotionState(
    scrollYMotionValue,
    [0, SCROLL_TRIGGER_POINT],
    [PADDING_INLINE * 2, 0],
  );

  const borderRadius = useMotionState(
    scrollYMotionValue,
    [0, SCROLL_TRIGGER_POINT],
    [BORDER_RADIUS, 0],
  );

  const heightOffset = useMotionState(
    scrollYMotionValue,
    [0, SCROLL_TRIGGER_POINT],
    [SCROLL_TRIGGER_POINT + PADDING_BOTTOM, 0],
  );

  const lnbHide = useLnbContext().hide;

  const prevLnbHide = useRef(lnbHide);

  const getCssProperties = useCallback(
    (isLnbHidden: boolean): CSSProperties => {
      if (isLnbHidden) {
        return {
          width: `calc(100% - ${widthOffset}px)`,
          height: `calc(100dvh - ${heightOffset}px)`,
          borderRadius: borderRadius,
        };
      }

      return {
        width: `calc(100% - ${PADDING_INLINE * 2}px)`,
        height: `calc(100dvh - ${SCROLL_TRIGGER_POINT + PADDING_BOTTOM}px)`,
        borderRadius: BORDER_RADIUS,
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

  return (
    <>
      <FlexBox
        alignItems="center"
        justifyContent="center"
        ref={ref}
        sx={introBackgroundStyle}
        style={cssProperties}
      >
        <LiquidButton containerRef={ref}>GET STARTED</LiquidButton>
      </FlexBox>

      <FlexBox sx={{ height: '100vh' }} />
    </>
  );
};

export default Intro;
