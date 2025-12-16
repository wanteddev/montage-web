import { Box, FlexBox, Thumbnail, Typography } from '@wanteddev/wds';
import Link from 'next/link';
import { useId } from 'react';
import { IconArrowUpRight } from '@wanteddev/wds-icon';

import { breakWordStyle } from '@/styles/text';
import { getImageUrl } from '@/helpers/image';

import {
  carouselItemStyle,
  glassBackgroundEffectStyle,
  glassEffectStyle,
  glassShadowEffectStyle,
  itemContainerStyle,
  thumbnailStyle,
  thumbnailWrapperStyle,
  titleStyle,
} from './style';
import { useCursor } from './hooks';

type Props = {
  title: string;
  description: string;
  href: string;
  image: string;
  className?: string;
  lightText: string;
  darkText: string;
};

const BehindItem = ({
  title,
  description,
  href,
  image,
  className,
  lightText,
  darkText,
}: Props) => {
  const id = useId();

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
      gap="20px"
      className={className}
    >
      <FlexBox
        ref={thumbnailRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={thumbnailWrapperStyle}
      >
        <Thumbnail
          ratio="3:2"
          src={getImageUrl(image)}
          aria-hidden
          alt={title.replace(/<[^>]+>/g, '')}
          width="100%"
          sx={thumbnailStyle}
        />

        <Box
          sx={glassBackgroundEffectStyle(
            getImageUrl(lightText),
            getImageUrl(darkText),
          )}
          data-role="glass-background-effect"
          data-visible={isMouseOver}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            backgroundPosition: `${position.backgroundX}px ${position.backgroundY}px`,
          }}
        />

        <Box
          ref={glassRef}
          sx={glassEffectStyle}
          data-role="glass-effect"
          data-visible={isMouseOver}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          <Box sx={glassShadowEffectStyle} />
        </Box>
      </FlexBox>

      <FlexBox flexDirection="column" gap="8px" sx={itemContainerStyle}>
        <FlexBox gap="12px">
          <Typography
            variant="headline2"
            weight="bold"
            color="semantic.label.normal"
            as="p"
            id={`carousel-${id}`}
            md={{
              variant: 'headline1',
            }}
            dangerouslySetInnerHTML={{ __html: title }}
            sx={titleStyle}
          />

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
