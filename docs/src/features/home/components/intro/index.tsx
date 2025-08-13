'use client';
import { Box, FlexBox } from '@wanteddev/wds';
import { useCallback, useRef } from 'react';

import { breakWordStyle } from '@/styles/text';
import LiquidButton from '@/components/liquid-button';
import { GNB_HEIGHT } from '@/features/layout/components/gnb/constants';
// import LiquidButtonCopy from '@/components/liquid-button copy';
// import LiquidButtonCopy2 from '@/components/liquid-button copy 2';

import {
  descriptionTextStyle,
  introBackgroundStyle,
  introWrapperStyle,
  titleTextStyle,
} from './style';
import IntroNavigation from './navigation';

const Intro = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleScrollDown = useCallback(() => {
    window.scrollTo({
      top: (ref.current?.clientHeight ?? 0) + GNB_HEIGHT,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Box as="section" ref={ref} sx={introWrapperStyle}>
      <FlexBox
        flexDirection="column"
        data-role="intro-background"
        sx={introBackgroundStyle}
      >
        <video autoPlay muted loop playsInline>
          <source src="/home/Hero.mp4" type="video/mp4" />
        </video>

        <FlexBox
          flexDirection="column"
          gap="32px"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: '100%',
            padding: '20px',
          }}
        >
          <FlexBox
            flexDirection="column"
            gap="24px"
            md={{
              gap: '40px',
            }}
          >
            <Box as="h1" sx={titleTextStyle}>
              Our Work
              <br />
              Culture.
              <br />
              MONTAGE
            </Box>
            <Box as="p" sx={[descriptionTextStyle, breakWordStyle]}>
              일하는 사람들의 모든 가능성, 원티드 <br />
              원티드가 생각한 협업 문화. 몽타주입니다.
            </Box>
          </FlexBox>

          <FlexBox gap="16px">
            <LiquidButton containerRef={ref}>Get Started</LiquidButton>

            {/* <LiquidButtonCopy containerRef={ref}>Get Started</LiquidButtonCopy>

            <LiquidButtonCopy2 containerRef={ref}>
              Get Started
            </LiquidButtonCopy2> */}
          </FlexBox>
        </FlexBox>

        <IntroNavigation onScrollDown={handleScrollDown} />
      </FlexBox>
    </Box>
  );
};

export default Intro;
