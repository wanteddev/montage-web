import { Box, FlexBox, Thumbnail, Typography } from '@wanteddev/wds';
import Link from 'next/link';
import { useId } from 'react';
import { IconArrowUpRight } from '@wanteddev/wds-icon';

import { breakWordStyle } from '@/styles/text';

import {
  carouselItemStyle,
  glassEffectStyle,
  glassShadowEffectStyle,
  thumbnailStyle,
  thumbnailWrapperStyle,
} from './style';
import { useCursor } from './hooks';
import Filter from './filter';

import type { HTMLAttributes } from 'react';

type Props = {
  title: string;
  description: string;
  href: string;
  image: string;
} & HTMLAttributes<HTMLAnchorElement>;

const BehindItem = ({ title, description, href, image, ...props }: Props) => {
  const id = useId();
  const filterId = useId();

  const {
    handleMouseEnter,
    handleMouseLeave,
    position,
    isMouseOver,
    thumbnailRef,
    glassRef,
  } = useCursor();

  return (
    <FlexBox
      as={Link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={[
        carouselItemStyle,
        {
          [':not([data-animation-state="animation-end"])']: {
            opacity: 0,
          },
        },
      ]}
      flexDirection="column"
      aria-labelledby={`carousel-${id}`}
      aria-describedby={`carousel-${id}-description`}
      {...props}
    >
      <FlexBox
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={thumbnailWrapperStyle}
      >
        <Thumbnail
          ref={thumbnailRef}
          ratio="3:2"
          src={image}
          alt={title}
          width="100%"
          sx={thumbnailStyle}
        />

        <Box
          ref={glassRef}
          sx={glassEffectStyle}
          data-role="glass-effect"
          style={{
            backdropFilter: isMouseOver
              ? `url(#${filterId}) blur(0px) brightness(1) saturate(1.75)`
              : 'none',
            transform: `translate(${position.x}px, ${position.y}px)`,
            display: isMouseOver ? 'block' : 'none',
            willChange: 'backdrop-filter',
          }}
        >
          <Filter filterId={filterId} aria-hidden />
          <Box sx={glassShadowEffectStyle} />
        </Box>
      </FlexBox>

      <FlexBox flexDirection="column" gap="6px" sx={{ padding: '12px' }}>
        <FlexBox gap="12px">
          <Typography
            variant="headline1"
            weight="bold"
            color="semantic.label.normal"
            as="p"
            id={`carousel-${id}`}
            md={{
              variant: 'heading2',
            }}
          >
            {title}
          </Typography>

          <IconArrowUpRight aria-hidden data-role="interaction-arrow" />
        </FlexBox>

        <Typography
          variant="body2"
          weight="medium"
          color="semantic.label.alternative"
          as="p"
          sx={breakWordStyle}
          id={`carousel-${id}-description`}
        >
          {description}
        </Typography>
      </FlexBox>
    </FlexBox>
  );
};

export default BehindItem;
