import { FlexBox, Thumbnail, Typography } from '@wanteddev/wds';
import { useId } from 'react';

import Carousel from '@/components/carousel';
import { getImageUrl } from '@/helpers/image';

import { descriptionStyle } from '../style';

import { PRINCIPLES } from './constants';
import { carouselWrapperStyle, thumbnailStyle } from './style';

const Principles = () => {
  const id = useId();

  return (
    <Carousel
      sx={carouselWrapperStyle}
      items={PRINCIPLES.map((principle, idx) => (
        <FlexBox
          key={principle.title}
          gap="12px"
          flexDirection="column"
          aria-labelledby={`carousel-${id}-${idx}`}
          aria-describedby={`carousel-${id}-${idx}-description`}
        >
          <Thumbnail
            src={getImageUrl(principle.image)}
            ratio="1:1"
            alt={principle.title}
            sx={thumbnailStyle}
          />
          <FlexBox flexDirection="column" gap="6px">
            <Typography
              variant="heading1"
              weight="bold"
              as="p"
              color="semantic.label.normal"
              align="center"
              id={`carousel-${id}-${idx}`}
            >
              {principle.title}
            </Typography>
            <Typography
              variant="label2"
              weight="medium"
              as="p"
              color="semantic.label.neutral"
              align="center"
              sx={descriptionStyle}
              id={`carousel-${id}-${idx}-description`}
            >
              {principle.description}
            </Typography>
          </FlexBox>
        </FlexBox>
      ))}
    />
  );
};

export default Principles;
