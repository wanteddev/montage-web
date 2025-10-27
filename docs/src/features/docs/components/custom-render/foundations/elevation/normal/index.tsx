import { Divider, Thumbnail } from '@wanteddev/wds';

import { Heading2 } from '../../../../mdx/section/layout';
import TokenExample from '../token-example';

import StyleGrid from './style-grid';
import ShadowGrid from './shadow-grid';

const NORMAL_TOKENS = ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'] as const;

const FoundationsElevationNormal = () => {
  return (
    <>
      <TokenExample
        items={NORMAL_TOKENS.map((token) => ({
          token,
          src: `/foundations/elevation/normal/${token}.png`,
        }))}
      />

      <Divider
        color="semantic.line.normal.alternative"
        sx={{ '&&': { marginBottom: '24px' } }}
      />

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
    </>
  );
};

export default FoundationsElevationNormal;
