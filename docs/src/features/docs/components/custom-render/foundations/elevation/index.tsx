import { Divider, Thumbnail } from '@wanteddev/wds';

import { Heading2, Heading3 } from '../../../mdx/section/layout';
import SectionCard from '../../section-card';

import TokenExample from './token-example';
import StyleGrid from './style-grid';
import ShadowGrid from './shadow-grid';

const FoundationsElevation = () => {
  return (
    <>
      <Heading2 content="Shadow type" />

      <SectionCard
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

      <TokenExample />

      <Divider color="semantic.line.normal.alternative" />

      <Heading2 content="Composition" />

      <p>
        더 자연스럽고 현실과 유사한 깊이감을 표현하기 위해 물체 주변으로
        은은하게 퍼지는 주변광 그림자(Ambient shadow)와 특정 방향의 조명에 의해
        생기는 뚜렷한 직사광 그림자(Key shadow)를 레이어링하여 구성합니다.
      </p>

      <Thumbnail
        src="/foundations/elevation/Image-1.png"
        alt="Composition"
        radius
        border
        sx={{
          marginTop: '40px',
          marginBottom: '56px',
          aspectRatio: '41 / 12',
        }}
      />

      <Heading2 content="Style" />

      <StyleGrid />

      <Divider color="semantic.line.normal.alternative" />

      <Heading2 content="Token" />

      <ShadowGrid />

      <Divider color="semantic.line.normal.alternative" />

      <Heading2 content="Use case" />

      <p>
        원티드랩의 시스템 엘리베이션은 기본적으로 각 상황에 맞는 사용 예시가
        존재합니다. 하지만 이를 완전히 지킬 수 없는 상황도 있기 때문에 가능한
        가이드라인대로 사용하는 것을 권장하되, 상황에 적합한 스타일을 사용할 수
        있습니다.
      </p>

      <Heading3 content="Small" sx={{ marginTop: '40px' }} />

      <p>
        Text Input, Search input, Select와 같은 Field 형태 컴포넌트에
        사용합니다.
      </p>

      <Thumbnail
        src="/foundations/elevation/Image-2.png"
        alt="Small"
        radius
        sx={{
          aspectRatio: '41 / 10',
          marginTop: '12px',
          marginBottom: '64px',
        }}
      />

      <Heading3 content="Medium" />

      <p>
        Date picker, Menu, Auto complete 같은 페이지 위에 떠 있는 컴포넌트에
        사용합니다.
      </p>

      <Thumbnail
        src="/foundations/elevation/Image-3.png"
        alt="Medium"
        radius
        sx={{
          aspectRatio: '41 / 16',
          marginTop: '12px',
        }}
      />
    </>
  );
};

export default FoundationsElevation;
