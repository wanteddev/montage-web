'use client';
import { FlexBox } from '@montage-ui/core';

import FadeInOut from '@/components/fade-in-out';

import SectionTitle from '../section/title';
import SectionWrapper from '../section/wrapper';

import { RESOURCE_ITEMS } from './constants';
import ResourcesItem from './item';

const Resources = () => {
  return (
    <SectionWrapper
      gap="20px"
      md={{ gap: '24px' }}
      aria-label="Resources Section"
    >
      <FadeInOut duration={600}>
        <SectionTitle>Start Your Montage</SectionTitle>
      </FadeInOut>

      <FlexBox
        gap="0px"
        flexDirection="column"
        md={{
          gap: '32px',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {RESOURCE_ITEMS.map((item, idx) => (
          <FadeInOut duration={600} delay={(idx + 1) * 100} key={item.title}>
            <ResourcesItem {...item} />
          </FadeInOut>
        ))}
      </FlexBox>
    </SectionWrapper>
  );
};

export default Resources;
