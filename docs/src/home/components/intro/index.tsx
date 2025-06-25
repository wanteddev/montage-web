'use client';
import { FlexBox } from '@wanteddev/wds';
import { useRef } from 'react';
import { useScroll } from 'framer-motion';

import LiquidButton from '@/components/liquid-button';
import { useLnbContext } from '@/features/docs/components/lnb/contexts';
import { GNB_HEIGHT } from '@/features/layout/components/gnb/constants';

import { useMotionState } from './hooks';

const SCROLL_TRIGGER_POINT = GNB_HEIGHT + 24;
const PADDING_INLINE = 48;
const BORDER_RADIUS = 40;

const Intro = () => {
  const ref = useRef<HTMLDivElement>(null);

  const lnbContext = useLnbContext();

  const { scrollY: scrollYMotionValue } = useScroll();

  const widthOffset = useMotionState(
    scrollYMotionValue,
    [0, SCROLL_TRIGGER_POINT],
    [PADDING_INLINE * 2, 0],
  );

  const borderRadius = useMotionState(
    scrollYMotionValue,
    [0, SCROLL_TRIGGER_POINT],
    [40, 0],
  );

  const heightOffset = useMotionState(
    scrollYMotionValue,
    [0, SCROLL_TRIGGER_POINT],
    [SCROLL_TRIGGER_POINT + PADDING_INLINE, 0],
  );

  return (
    <>
      <FlexBox
        alignItems="center"
        justifyContent="center"
        ref={ref}
        sx={{
          position: 'relative',
          backgroundImage: 'url(/background-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          marginTop: 24,
          transition: 'border-radius 0.2s ease-in-out',
        }}
        style={{
          width: lnbContext.hide
            ? `calc(100% - ${widthOffset}px)`
            : `calc(100% - ${PADDING_INLINE * 2}px)`,
          height: lnbContext.hide
            ? `calc(100dvh - ${heightOffset}px)`
            : `calc(100dvh - ${SCROLL_TRIGGER_POINT + PADDING_INLINE}px)`,
          borderRadius: lnbContext.hide ? borderRadius : BORDER_RADIUS,
        }}
      >
        <LiquidButton containerRef={ref}>GET STARTED</LiquidButton>
      </FlexBox>

      <FlexBox sx={{ height: '100vh' }} />
    </>
  );
};

export default Intro;
