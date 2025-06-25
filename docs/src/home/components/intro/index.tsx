'use client';
import { FlexBox } from '@wanteddev/wds';
import { useRef } from 'react';
import { useScroll } from 'framer-motion';

import LiquidButton from '@/components/liquid-button';
import { useLnbContext } from '@/features/docs/components/lnb/contexts';
import { GNB_HEIGHT } from '@/features/layout/components/gnb/constants';

import { useMotionState } from './hooks';

const Intro = () => {
  const ref = useRef<HTMLDivElement>(null);

  const lnbContext = useLnbContext();

  const { scrollY: scrollYMotionValue } = useScroll();

  const widthOffset = useMotionState(
    scrollYMotionValue,
    [0, GNB_HEIGHT + 24],
    [48, 0],
  );

  const borderRadius = useMotionState(
    scrollYMotionValue,
    [0, GNB_HEIGHT + 24],
    [40, 0],
  );

  return (
    <>
      <FlexBox
        alignItems="center"
        justifyContent="center"
        ref={ref}
        sx={{
          position: 'relative',
          height: '100dvh',
          backgroundImage: 'url(/background-image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          marginTop: 24,
          transition: 'border-radius 0.3s ease-in-out',
        }}
        style={{
          width: lnbContext.hide
            ? `calc(100% - ${widthOffset}px)`
            : 'calc(100% - 48px)',
          borderRadius: lnbContext.hide ? borderRadius : 40,
        }}
      >
        <LiquidButton containerRef={ref}>GET STARTED</LiquidButton>
      </FlexBox>

      <FlexBox sx={{ height: '100vh' }} />
    </>
  );
};

export default Intro;
