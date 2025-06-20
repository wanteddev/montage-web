'use client';
import { FlexBox } from '@wanteddev/wds';
import { useRef } from 'react';

import LiquidButton from '@/components/liquid-button';

const Intro = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <FlexBox
      alignItems="center"
      justifyContent="center"
      ref={ref}
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url(/background-image.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <LiquidButton containerRef={ref}>GET STARTED</LiquidButton>
    </FlexBox>
  );
};

export default Intro;
