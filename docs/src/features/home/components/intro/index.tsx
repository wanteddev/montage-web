'use client';
import { Box, Button, FlexBox } from '@wanteddev/wds';
import {
  IconChevronDownSmall,
  IconComponentFill,
  IconDiamondFill,
} from '@wanteddev/wds-icon';
import Link from 'next/link';

import { breakWordStyle } from '@/styles/text';
import LiquidButton from '@/components/liquid-button';

import { useIntroAnimate } from './hooks';
import {
  descriptionTextStyle,
  introBackgroundStyle,
  introWrapperStyle,
  navigationBarLinkStyle,
  navigationBarStyle,
  scrollDownIconStyle,
  scrollDownTextStyle,
  scrollDownWrapperStyle,
  titleTextStyle,
  versionInfoStyle,
} from './style';
// import IconComponentGradient from './icon-component-gradient';
// import IconDiamondGradient from './icon-diamond-gradient';

const Intro = () => {
  const { ref, lnbHide } = useIntroAnimate();

  return (
    <Box as="section" ref={ref} sx={introWrapperStyle} data-lnb-hide={lnbHide}>
      <FlexBox
        alignItems="center"
        justifyContent="center"
        data-role="intro-background"
        sx={introBackgroundStyle}
      >
        <Box
          as="video"
          autoPlay
          muted
          loop
          controls={false}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'bottom left',
            borderRadius: 'inherit',
            inset: 0,
            zIndex: -1,
          }}
        >
          <source src="/Hero.mp4" type="video/mp4" />
        </Box>
        <FlexBox
          flexDirection="column"
          gap="32px"
          alignItems="center"
          lg={{
            gap: '48px',
          }}
        >
          <FlexBox
            flexDirection="column"
            gap="24px"
            lg={{
              gap: '32px',
            }}
          >
            <Box as="h1" sx={titleTextStyle}>
              Our Work Culture.
              <br />
              MONTAGE
            </Box>
            <Box as="p" sx={[descriptionTextStyle, breakWordStyle]}>
              {
                '일하는 사람들의 모든 가능성, \n원티드가 만든 모두를 위한 일하는 방식'
              }
              <br />
              Wanted Design System — MONTAGE
            </Box>
          </FlexBox>

          <LiquidButton containerRef={ref}>GET STARTED</LiquidButton>
        </FlexBox>

        <FlexBox
          sx={navigationBarStyle}
          justifyContent="space-between"
          gap="12px"
        >
          <Box as="span" sx={versionInfoStyle}>
            Ver 2.0.0
          </Box>

          <FlexBox gap="12px" alignItems="center">
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              // leadingContent={<IconDiamondGradient />}
              leadingContent={<IconDiamondFill />}
              as={Link}
              href="/docs/foundations/overview"
              sx={navigationBarLinkStyle}
            >
              Foundations
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              // leadingContent={<IconComponentGradient />}
              leadingContent={<IconComponentFill />}
              as={Link}
              href="/docs/components/overview"
              sx={navigationBarLinkStyle}
            >
              Components
            </Button>
          </FlexBox>
        </FlexBox>

        <FlexBox
          sx={scrollDownWrapperStyle}
          flexDirection="column"
          gap="6px"
          alignItems="center"
        >
          <IconChevronDownSmall
            aria-label="scroll down"
            sx={scrollDownIconStyle}
          />
          <Box as="span" sx={scrollDownTextStyle}>
            Scroll down
          </Box>
        </FlexBox>
      </FlexBox>
    </Box>
  );
};

export default Intro;
