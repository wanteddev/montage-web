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

import { RADIUS_TOKENS } from './constants';
import { previewBoxStyle } from './style';

const FoundationsRadius = () => {
  return (
    <>
      <Box as="p" sx={{ marginBottom: '24px' }}>
        Radius 토큰은 컴포넌트의 모서리 곡률을 정의합니다. 작은 단위(20)부터 큰
        단위(40)까지 점진적으로 증가하며, full은 완전한 원형 또는 캡슐 형태를
        만들 때 사용합니다.
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
          {RADIUS_TOKENS.map((token) => (
            <TokenGridRow key={token.key}>
              <TokenGridCell>{`radius/${token.key}`}</TokenGridCell>
              <TokenGridCell>{token.value}</TokenGridCell>
              <TokenGridCell>
                <Box sx={previewBoxStyle(token.value)} aria-hidden />
              </TokenGridCell>
            </TokenGridRow>
          ))}
        </TokenGridBody>
      </TokenGrid>
    </>
  );
};

export default FoundationsRadius;
