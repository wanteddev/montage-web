import { Box, Divider, FlexBox, Typography } from '@wanteddev/wds';
import Link from 'next/link';
import { IconArrowUpRight } from '@wanteddev/wds-icon';
import { useCallback, useEffect, useRef } from 'react';

import {
  hiddenTextStyle,
  itemDividerStyle,
  itemWebpStyle,
  itemWrapperStyle,
} from './style';

import type { AnimationItem } from 'lottie-web';
import type { HTMLAttributes } from 'react';

type Props = {
  title: string;
  href: string;
  updatedAt: string;
  lottie: string;
} & HTMLAttributes<HTMLAnchorElement>;

const ResourcesItem = ({ title, href, updatedAt, lottie, ...props }: Props) => {
  const animationRef = useRef<AnimationItem | null>(null);

  const lottieRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    animationRef.current?.play();
  }, []);

  const handleMouseLeave = useCallback(() => {
    animationRef.current?.goToAndStop(0);
  }, []);

  const loadAnimation = useCallback(async () => {
    if (!lottieRef.current) return;

    const { default: LottiePlayer } = await import(
      'lottie-web/build/player/lottie_svg.min'
    );

    animationRef.current = LottiePlayer.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: lottie,
    });
  }, [lottie]);

  useEffect(() => {
    loadAnimation();

    return () => animationRef.current?.destroy();
  }, [loadAnimation]);

  return (
    <FlexBox
      {...props}
      gap="16px"
      flex="1 0 0"
      alignItems="center"
      md={{
        gap: '26px',
        flexDirection: 'column',
        alignItems: 'initial',
      }}
      sx={itemWrapperStyle}
      as={Link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FlexBox sx={{ position: 'relative' }}>
        <Box ref={lottieRef} sx={itemWebpStyle} />
      </FlexBox>

      <Divider color="semantic.line.normal.neutral" sx={itemDividerStyle} />

      <FlexBox
        gap="6px"
        flex="1"
        justifyContent="space-between"
        alignItems="center"
        md={{
          flexDirection: 'column',
          alignItems: 'initial',
        }}
      >
        <FlexBox gap="12px">
          <Typography
            variant="headline2"
            weight="bold"
            color="semantic.label.normal"
            as="p"
            md={{
              variant: 'headline1',
            }}
            sx={hiddenTextStyle}
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <IconArrowUpRight aria-hidden data-role="interaction-arrow" />
        </FlexBox>

        <Typography
          variant="body2"
          weight="medium"
          color="semantic.label.alternative"
          as="p"
          sx={hiddenTextStyle}
          dangerouslySetInnerHTML={{ __html: updatedAt }}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default ResourcesItem;
