import { FlexBox, Thumbnail, Typography } from '@wanteddev/wds';
import { useId } from 'react';

import Carousel from '@/components/carousel';

import { descriptionStyle } from '../style';

import { PRINCIPLES } from './constants';
import { carouselItemStyle } from './style';

const Principles = () => {
  const id = useId();

  return (
    <Carousel
      items={PRINCIPLES.map((principle, idx) => (
        <FlexBox
          key={principle.title}
          gap="12px"
          flexDirection="column"
          sx={carouselItemStyle}
          aria-labelledby={`carousel-${id}-${idx}`}
          aria-describedby={`carousel-${id}-${idx}-description`}
        >
          <Thumbnail
            src={principle.image}
            ratio="1:1"
            alt={principle.title}
            sx={{ borderRadius: '24px' }}
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
