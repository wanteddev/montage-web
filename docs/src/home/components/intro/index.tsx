'use client';
import { FlexBox } from '@wanteddev/wds';

import LiquidButton from '@/components/liquid-button';

import { useIntroAnimate } from './hooks';
import { introBackgroundStyle } from './style';

const Intro = () => {
  const { ref, cssProperties } = useIntroAnimate();

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
