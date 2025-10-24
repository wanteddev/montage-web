'use client';
import { FlexBox, Thumbnail, Typography } from '@wanteddev/wds';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useId } from 'react';
import Link from 'next/link';

import { breakWordStyle } from '@/styles/text';

import SectionTitle from '../section/title';
import SectionWrapper from '../section/wrapper';

import { ARTICLE_ITEMS } from './constants';
import { carouselContentStyle, carouselItemStyle } from './style';

const Behind = () => {
  const id = useId();
  const [carouselRef] = useEmblaCarousel(
    {
      dragFree: true,
    },
    [WheelGesturesPlugin()],
  );

  return (
    <SectionWrapper gap="24px">
      <SectionTitle>Behind the System</SectionTitle>

      <FlexBox ref={carouselRef} role="region" aria-roledescription="carousel">
        <FlexBox flexDirection="row" sx={carouselContentStyle}>
          {ARTICLE_ITEMS.map((item, idx) => (
            <FlexBox
              key={item.title}
              as={Link}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={carouselItemStyle}
              flexDirection="column"
              role="group"
              aria-roledescription="carousel slide"
              aria-labelledby={`carousel-${id}-${idx}`}
              aria-describedby={`carousel-${id}-${idx}-description`}
            >
              <Thumbnail
                ratio="3:2"
                src={item.image}
                alt={item.title}
                width="100%"
                sx={{ borderRadius: '24px' }}
              />

              <FlexBox
                flexDirection="column"
                gap="6px"
                sx={{ padding: '12px' }}
              >
                <Typography
                  variant="heading2"
                  weight="bold"
                  color="semantic.label.normal"
                  as="p"
                  id={`carousel-${id}-${idx}`}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  weight="medium"
                  color="semantic.label.alternative"
                  as="p"
                  sx={breakWordStyle}
                  id={`carousel-${id}-${idx}-description`}
                >
                  {item.description}
                </Typography>
              </FlexBox>
            </FlexBox>
          ))}
        </FlexBox>
      </FlexBox>
    </SectionWrapper>
  );
};

export default Behind;
