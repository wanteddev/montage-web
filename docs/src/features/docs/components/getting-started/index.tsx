'use client';
import { Divider, Thumbnail, Typography } from '@wanteddev/wds';

import { getImageUrl } from '@/helpers/image';

import { Heading2 } from '../mdx/section/layout';

import { descriptionStyle, thumbnailStyle } from './style';
import Resources from './resources';
import Principles from './principles';
import Steps from './steps';

const GettingStarted = () => {
  return (
    <>
      <Thumbnail
        radius
        src={getImageUrl('/getting-started/overview/Image.png')}
        alt="Getting Started"
        aria-hidden
        sx={thumbnailStyle}
      />

      <Heading2 content="What is Montage" />

      <Typography
        variant="body2-reading"
        weight="medium"
        color="semantic.label.neutral"
        as="p"
        sx={[descriptionStyle, { marginBottom: '40px' }]}
      >
        {`원티드의 디자인 시스템 '몽타주(Montage)'는 영화에서 여러 장면을 조합해 새로운 초상을 만드는 몽타주 기법처럼,
우리 각자의 스타일과 구성 요소가 결합함으로써 더욱 아름답고 직관적인 서비스를 만들어가는 것을 의미합니다.
몽타주는 완전한 오픈소스를 목표로 합니다. 미리 구축된 자산을 활용함으로써 더욱 빠르게 높은 완성도의 제품을 만들어보세요.`}
      </Typography>

      <Resources />

      <Divider color="semantic.line.normal.alternative" />

      <Heading2 content="Design Principles" />

      <Principles />

      <Divider color="semantic.line.normal.alternative" />

      <Heading2 content="Getting Started" />

      <Steps />
    </>
  );
};

export default GettingStarted;
