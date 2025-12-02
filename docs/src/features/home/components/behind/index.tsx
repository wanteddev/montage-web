'use client';
import Carousel from '@/components/carousel';
import FadeInOut from '@/components/fade-in-out';

import SectionTitle from '../section/title';
import SectionWrapper from '../section/wrapper';

import { ARTICLE_ITEMS } from './constants';
import { useCarouselAnimation } from './hooks';
import BehindItem from './item';
import { behindStyle } from './style';

const Behind = () => {
  const { containerRef } = useCarouselAnimation();

  return (
    <SectionWrapper
      gap="20px"
      md={{ gap: '24px' }}
      aria-label="Behind the System Section"
    >
      <FadeInOut duration={600}>
        <SectionTitle>Behind the System</SectionTitle>
      </FadeInOut>

      <Carousel
        sx={behindStyle}
        containerRef={containerRef}
        items={ARTICLE_ITEMS.map((item) => (
          <BehindItem key={item.title} {...item} />
        ))}
      />
    </SectionWrapper>
  );
};

export default Behind;
