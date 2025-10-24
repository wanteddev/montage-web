'use client';
import { Box, Typography } from '@wanteddev/wds';
import { FlexBox } from '@wanteddev/wds';
import Link from 'next/link';

import {
  contentWrapperStyle,
  descriptionStyle,
  marqueeBackgroundOverlayStyle,
  marqueeGroupStyle,
  marqueeImageStyle,
  marqueeWrapperStyle,
  startButtonStyle,
  titleStyle,
  wrapperStyle,
} from './style';
import { IMAGES, RENDER_REPEAT, REVERSE_IMAGES } from './constants';

const Hero = () => {
  return (
    <FlexBox
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={wrapperStyle}
    >
      <FlexBox
        flexDirection="column"
        sx={contentWrapperStyle}
        alignItems="center"
      >
        <FlexBox
          flexDirection="column"
          sx={{
            width: '100%',
            maxWidth: 'var(--layout-max-width)',
          }}
        >
          <FlexBox
            flexDirection="column"
            sx={{ width: '100%' }}
            alignItems="center"
          >
            <Box as="h1" sx={titleStyle}>
              From Separate Core Blocks
              <br />
              To a Seamless Flow
            </Box>

            <Typography
              variant="body2-reading"
              weight="regular"
              as="p"
              color="semantic.label.normal"
              align="center"
              sx={descriptionStyle}
            >
              원티드는 세상의 모든 일하는 사람들이 더 나답게 일하는 세상을
              꿈꿉니다. <br />이 꿈을 현실로 만들기 위해 우리는 디자인 시스템을
              만듭니다.
            </Typography>

            <Box as={Link} href="/docs/getting-started" sx={startButtonStyle}>
              <Typography
                variant="label1"
                weight="medium"
                color="semantic.label.normal"
              >
                Getting Started
              </Typography>
            </Box>
          </FlexBox>
        </FlexBox>

        <FlexBox sx={marqueeWrapperStyle} flexDirection="column" gap="12px">
          <FlexBox gap="var(--marquee-gap)" justifyContent="space-around">
            {Array(RENDER_REPEAT)
              .fill(0)
              .map((_, i) => (
                <FlexBox
                  key={i}
                  alignItems="center"
                  justifyContent="space-around"
                  gap="var(--marquee-gap)"
                  data-role="marquee-wrapper"
                  sx={marqueeGroupStyle}
                >
                  {IMAGES.map((j) => (
                    <Box
                      as="figure"
                      key={j.id}
                      sx={[marqueeImageStyle, { aspectRatio: j.ratio }]}
                    >
                      <Box
                        as="img"
                        src={j.src}
                        alt={`marquee-image-${j.id}`}
                        aria-hidden
                      />
                    </Box>
                  ))}
                </FlexBox>
              ))}
          </FlexBox>

          <FlexBox gap="var(--marquee-gap)" justifyContent="space-around">
            {Array(RENDER_REPEAT)
              .fill(0)
              .map((_, i) => (
                <FlexBox
                  key={i}
                  alignItems="center"
                  justifyContent="space-around"
                  gap="var(--marquee-gap)"
                  data-role="marquee-wrapper"
                  sx={[
                    marqueeGroupStyle,
                    {
                      animationDirection: 'reverse',
                    },
                  ]}
                >
                  {REVERSE_IMAGES.map((j) => (
                    <Box
                      as="figure"
                      key={j.id}
                      sx={[marqueeImageStyle, { aspectRatio: j.ratio }]}
                    >
                      <Box
                        as="img"
                        src={j.src}
                        alt={`marquee-image-${j.id}`}
                        aria-hidden
                      />
                    </Box>
                  ))}
                </FlexBox>
              ))}
          </FlexBox>

          <FlexBox
            aria-hidden
            sx={[
              marqueeBackgroundOverlayStyle,
              { left: 0, ['--overlay-direction']: 'to left' },
            ]}
          >
            <Box aria-hidden data-role="marquee-background-overlay-layer" />
            <Box aria-hidden data-role="marquee-background-overlay-layer" />
            <Box aria-hidden data-role="marquee-background-overlay-layer" />
            <Box aria-hidden data-role="marquee-background-overlay-layer" />
            <Box aria-hidden data-role="marquee-background-overlay-layer" />
            <Box aria-hidden data-role="marquee-background-overlay-layer" />
          </FlexBox>

          <FlexBox
            aria-hidden
            sx={[
              marqueeBackgroundOverlayStyle,
              { right: 0, ['--overlay-direction']: 'to right' },
            ]}
          >
            <Box aria-hidden data-role="marquee-background-overlay-layer" />
            <Box aria-hidden data-role="marquee-background-overlay-layer" />
            <Box aria-hidden data-role="marquee-background-overlay-layer" />
            <Box aria-hidden data-role="marquee-background-overlay-layer" />
            <Box aria-hidden data-role="marquee-background-overlay-layer" />
            <Box aria-hidden data-role="marquee-background-overlay-layer" />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Hero;
