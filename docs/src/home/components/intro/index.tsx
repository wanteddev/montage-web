'use client';
import { Box, FlexBox } from '@wanteddev/wds';

import { breakWordStyle } from '@/styles/text';
import LiquidButton from '@/components/liquid-button';

import { useIntroAnimate } from './hooks';
import {
  descriptionTextStyle,
  introBackgroundStyle,
  introWrapperStyle,
  titleTextStyle,
} from './style';

const Intro = () => {
  const { ref, lnbHide } = useIntroAnimate();

  return (
    <>
      <Box
        as="section"
        ref={ref}
        sx={introWrapperStyle}
        data-lnb-hide={lnbHide}
      >
        <FlexBox
          alignItems="center"
          justifyContent="center"
          data-role="intro-background"
          sx={introBackgroundStyle}
        >
          <FlexBox
            flexDirection="column"
            gap="clamp(32px, 3vw, 3vw)"
            alignItems="center"
          >
            <FlexBox flexDirection="column" gap="clamp(24px, 2vw, 2vw)">
              <Box as="h1" sx={titleTextStyle}>
                Our Work Culture.
                <br />
                MONTAGE
              </Box>
              <Box as="p" sx={[descriptionTextStyle, breakWordStyle]}>
                일하는 사람들의 모든 가능성
                <br />
                원티드의 일하는 방식, MONTAGE.
              </Box>
            </FlexBox>

            <LiquidButton containerRef={ref}>GET STARTED</LiquidButton>
          </FlexBox>
        </FlexBox>
      </Box>

      <FlexBox sx={{ height: '100vh' }} />
    </>
  );
};

export default Intro;
