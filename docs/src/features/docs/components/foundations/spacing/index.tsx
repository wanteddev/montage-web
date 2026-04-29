'use client';
import { Box } from '@wanteddev/wds';

import {
  TokenGrid,
  TokenGridBody,
  TokenGridCell,
  TokenGridHead,
  TokenGridHeader,
  TokenGridRow,
} from '@/features/docs/components/custom-render/token-grid';

import { Heading2 } from '../../mdx/section/layout';

import SpacingScalePreview from './scale-preview';
import { PRIMITIVE_SPACING, SEMANTIC_SPACING_SCALE } from './constants';

const FoundationsSpacing = () => {
  return (
    <>
      <Heading2 content="Primitive" />

      <Box as="p" sx={{ marginBottom: '24px' }}>
        모든 간격 토큰의 원자 단위입니다. 픽셀 값을 그대로 키로 사용하며, 4px
        배수를 기본으로 하되 미세 조정이 필요한 경우 2px 또는 1px 단위로
        보정합니다.
      </Box>

      <TokenGrid>
        <colgroup>
          <col width="30%" />
          <col width="30%" />
          <col width="auto" />
        </colgroup>
        <TokenGridHeader>
          <TokenGridRow>
            <TokenGridHead>토큰</TokenGridHead>
            <TokenGridHead>값</TokenGridHead>
            <TokenGridHead>미리보기</TokenGridHead>
          </TokenGridRow>
        </TokenGridHeader>
        <TokenGridBody>
          {PRIMITIVE_SPACING.map((token) => (
            <TokenGridRow key={token.key}>
              <TokenGridCell>{`spacing/${token.key}`}</TokenGridCell>
              <TokenGridCell>{token.value}</TokenGridCell>
              <TokenGridCell>
                <SpacingScalePreview value={token.value} />
              </TokenGridCell>
            </TokenGridRow>
          ))}
        </TokenGridBody>
      </TokenGrid>

      <Heading2 sx={{ marginTop: '120px' }} content="Semantic Scale" />

      <Box as="p" sx={{ marginBottom: '24px' }}>
        의미가 부여된 간격 스케일입니다. 00부터 150까지의 단계로 구성되어 있으며
        primitive 값을 alias하여 사용합니다. 컴포넌트 패딩과 gap 등 주요
        간격에는 semantic scale을 우선 사용하세요.
      </Box>

      <TokenGrid>
        <colgroup>
          <col width="30%" />
          <col width="30%" />
          <col width="auto" />
        </colgroup>
        <TokenGridHeader>
          <TokenGridRow>
            <TokenGridHead>토큰</TokenGridHead>
            <TokenGridHead>값</TokenGridHead>
            <TokenGridHead>미리보기</TokenGridHead>
          </TokenGridRow>
        </TokenGridHeader>
        <TokenGridBody>
          {SEMANTIC_SPACING_SCALE.map((token) => (
            <TokenGridRow key={token.key}>
              <TokenGridCell>{`spacing/${token.key}`}</TokenGridCell>
              <TokenGridCell>{token.value}</TokenGridCell>
              <TokenGridCell>
                <SpacingScalePreview value={token.value} />
              </TokenGridCell>
            </TokenGridRow>
          ))}
        </TokenGridBody>
      </TokenGrid>
    </>
  );
};

export default FoundationsSpacing;
