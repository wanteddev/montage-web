import { Divider } from '@wanteddev/wds';

import SectionCard from '../../section-card';
import { Heading2 } from '../../../mdx/section/layout';

const ElevationSummary = () => {
  return (
    <>
      <Divider
        color="semantic.line.normal.alternative"
        sx={{ marginTop: '56px', marginBottom: '80px' }}
      />

      <Heading2 content="Shadow type" sx={{ marginBottom: '24px' }} />

      <SectionCard
        sx={{ marginBottom: '56px' }}
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
            image: '/foundations/elevation/Image.png',
          },
        ]}
      />
    </>
  );
};

export default ElevationSummary;
