'use client';
import { Box, Thumbnail, Typography } from '@wanteddev/wds';

import { getImageUrl } from '@/helpers/image';

import { Heading2 } from '../../../mdx/section/layout';
import TokenExample from '../token-example';
import { tokenContentStyle } from '../spread/style';

import StyleGrid from './style-grid';
import { NORMAL_TOKENS } from './constants';

const FoundationsElevationNormal = () => {
  return (
    <>
      <TokenExample
        items={NORMAL_TOKENS.map((token) => ({
          token: token.token,
          src: `/foundations/elevation/normal/${token.key}.png`,
          key: token.key,
          render: (
            <Box sx={tokenContentStyle}>
              <Typography
                variant="label1"
                weight="medium"
                color="semantic.label.neutral"
              >
                Default
              </Typography>

              <Typography
                variant="label1"
                weight="medium"
                color="semantic.label.normal"
                sx={{
                  whiteSpace: 'pre-line',
                }}
              >
                {token.values.default}
              </Typography>
              <Typography
                variant="label1"
                weight="medium"
                color="semantic.label.neutral"
              >
                iOS
              </Typography>

              <Typography
                variant="label1"
                weight="medium"
                color="semantic.label.normal"
                sx={{
                  whiteSpace: 'pre-line',
                }}
              >
                {token.values.ios}
              </Typography>
              <Typography
                variant="label1"
                weight="medium"
                color="semantic.label.neutral"
              >
                Android
              </Typography>

              <Typography
                variant="label1"
                weight="medium"
                color="semantic.label.normal"
                sx={{
                  whiteSpace: 'pre-line',
                }}
              >
                {token.values.android}
              </Typography>
            </Box>
          ),
        }))}
      />

      <Heading2
        content="Composition"
        sx={{ '&&:first-of-type': { marginTop: '120px' } }}
      />

      <p>
        더 자연스럽고 현실과 유사한 깊이감을 표현하기 위해 물체 주변으로
        은은하게 퍼지는 주변광 그림자(Ambient shadow)와 특정 방향의 조명에 의해
        생기는 뚜렷한 직사광 그림자(Key shadow)를 레이어링하여 구성합니다.
      </p>

      <Thumbnail
        src={getImageUrl('/foundations/elevation/Image-2.png')}
        alt="Composition"
        aria-hidden
        radius
        border
        sx={{
          marginTop: '40px',
          aspectRatio: '41 / 12',
        }}
      />

      <Heading2 content="Style" sx={{ marginTop: '120px' }} />

      <StyleGrid />
    </>
  );
};

export default FoundationsElevationNormal;
