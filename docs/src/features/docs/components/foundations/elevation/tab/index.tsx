'use client';
import { Divider } from '@wanteddev/wds';
import { useMemo } from 'react';
import { sentenceCase } from 'change-case';

import { Heading2 } from '../../../mdx/section/layout';
import RouteTab from '../../../route-tab';

import SectionCard from './section-card';

const pages = ['normal', 'spread'];

const ElevationTab = () => {
  const tabs = useMemo(() => {
    return pages.map((page) => {
      return {
        title: sentenceCase(page),
        value: `/docs/foundations/base-material/elevation/${page}`,
      };
    });
  }, []);

  return (
    <>
      <Divider
        color="semantic.line.normal.neutral"
        sx={{ marginTop: '56px', marginBottom: '80px' }}
      />

      <Heading2
        id="shadow-type"
        content="Shadow type"
        sx={{ marginBottom: '24px' }}
      />

      <SectionCard
        sx={{ marginBottom: '64px' }}
        data={[
          {
            title: 'Normal',
            description:
              '빛의 위치에 따라 아래 쪽으로 그림자가 생기는 일반적인 경우 사용합니다.',
            image: '/foundations/elevation/Image.png',
          },
          {
            title: 'Spread',
            description:
              'Dialog와 같이 그림자가 사방으로 고르게 퍼져야 하는 경우 사용합니다.',
            image: '/foundations/elevation/Image-1.png',
          },
        ]}
      />

      <RouteTab tabs={tabs} sx={{ marginTop: '0px' }} />
    </>
  );
};

export default ElevationTab;
