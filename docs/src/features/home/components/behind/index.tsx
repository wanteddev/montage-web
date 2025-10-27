'use client';
import { FlexBox, Thumbnail, Typography } from '@wanteddev/wds';
import { useId } from 'react';
import Link from 'next/link';
import { IconArrowUpRight } from '@wanteddev/wds-icon';

import { breakWordStyle } from '@/styles/text';
import Carousel from '@/components/carousel';

import SectionTitle from '../section/title';
import SectionWrapper from '../section/wrapper';

import { ARTICLE_ITEMS } from './constants';
import { carouselItemStyle } from './style';

const Behind = () => {
  const id = useId();

  return (
    <SectionWrapper gap="20px" md={{ gap: '24px' }}>
      <SectionTitle>Behind the System</SectionTitle>

      <Carousel
        items={ARTICLE_ITEMS.map((item, idx) => (
          <FlexBox
            key={item.title}
            as={Link}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={carouselItemStyle}
            flexDirection="column"
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

            <FlexBox flexDirection="column" gap="6px" sx={{ padding: '12px' }}>
              <FlexBox gap="12px">
                <Typography
                  variant="headline1"
                  weight="bold"
                  color="semantic.label.normal"
                  as="p"
                  id={`carousel-${id}-${idx}`}
                  md={{
                    variant: 'heading2',
                  }}
                >
                  {item.title}
                </Typography>

                <IconArrowUpRight aria-hidden data-role="interaction-arrow" />
              </FlexBox>

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
      />
    </SectionWrapper>
  );
};

export default Behind;
