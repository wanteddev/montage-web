'use client';
import { Box, Divider, FlexBox, TextButton } from '@wanteddev/wds';
import {
  IconChevronDownSmall,
  IconComponentFill,
  IconDiamondFill,
} from '@wanteddev/wds-icon';
import Link from 'next/link';
import { useRef } from 'react';

import { breakWordStyle } from '@/styles/text';
import LiquidButton from '@/components/liquid-button';

import {
  descriptionTextStyle,
  introBackgroundStyle,
  introWrapperStyle,
  navigationBarLinkGroupStyle,
  navigationBarLinkStyle,
  navigationBarStyle,
  scrollDownIconStyle,
  scrollDownTextStyle,
  scrollDownWrapperStyle,
  titleTextStyle,
  versionInfoStyle,
} from './style';

const Intro = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box as="section" ref={ref} sx={introWrapperStyle}>
      <FlexBox
        flexDirection="column"
        data-role="intro-background"
        sx={introBackgroundStyle}
      >
        <Box as="img" src="/home/Intro.png" alt="Intro" />

        <FlexBox
          flexDirection="column"
          gap="32px"
          alignItems="center"
          justifyContent="center"
          lg={{
            gap: '32px',
          }}
          sx={{
            height: '100%',
            padding: '20px',
          }}
        >
          <FlexBox
            flexDirection="column"
            gap="24px"
            lg={{
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

          <LiquidButton containerRef={ref}>Get Started</LiquidButton>
        </FlexBox>

        <FlexBox
          sx={navigationBarStyle}
          justifyContent="space-between"
          alignItems="center"
          gap="12px"
        >
          <Box as="span" sx={versionInfoStyle}>
            Wanted Design System: Montage V2.0.0
          </Box>

          <FlexBox
            gap="12px"
            alignItems="center"
            sx={navigationBarLinkGroupStyle}
          >
            <TextButton
              variant="assistive"
              color="secondary"
              size="small"
              leadingContent={<IconDiamondFill />}
              as={Link}
              href="/docs/foundations/overview"
              sx={navigationBarLinkStyle}
            >
              Foundations
            </TextButton>

            <Divider vertical size="8px" color="semantic.static.white" />

            <TextButton
              variant="assistive"
              color="secondary"
              size="small"
              leadingContent={<IconComponentFill />}
              as={Link}
              href="/docs/components/overview"
              sx={navigationBarLinkStyle}
            >
              Components
            </TextButton>
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
