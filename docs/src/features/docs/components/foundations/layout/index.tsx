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

import { Heading2, Heading3 } from '../../mdx/section/layout';

import { LAYOUT_GROUPS } from './constants';

const FoundationsLayout = () => {
  return (
    <>
      <Box as="p" sx={{ marginBottom: '40px' }}>
        Layout 토큰은 화면 단위의 거터, 마진, 컴포넌트 간 간격을 정의합니다.
        티셔츠 사이즈(현재는 xs와 lg) 모드를 가지며, 동일한 토큰 이름을
        참조하면서도 뷰포트 사이즈에 따라 다른 값이 적용됩니다. 추가 사이즈는
        시안이 추가되는 시점에 정의됩니다.
      </Box>

      {LAYOUT_GROUPS.map((group, index) => (
        <Box
          as="section"
          key={group.title}
          sx={index === 0 ? undefined : { marginTop: '80px' }}
        >
          <Heading2 content={group.title} />

          <Box as="p" sx={{ marginBottom: '24px' }}>
            {group.description}
          </Box>

          {group.subgroups.map((subgroup) => (
            <Box
              as="div"
              key={subgroup.title}
              sx={{ marginTop: '32px', marginBottom: '24px' }}
            >
              <Heading3
                content={subgroup.title}
                sx={{ '&&': { marginTop: '0px', marginBottom: '12px' } }}
              />

              <TokenGrid>
                <colgroup>
                  <col width="50%" />
                  <col width="25%" />
                  <col width="25%" />
                </colgroup>
                <TokenGridHeader>
                  <TokenGridRow>
                    <TokenGridHead>토큰</TokenGridHead>
                    <TokenGridHead>lg</TokenGridHead>
                    <TokenGridHead>xs</TokenGridHead>
                  </TokenGridRow>
                </TokenGridHeader>
                <TokenGridBody>
                  {subgroup.tokens.map((token) => (
                    <TokenGridRow key={token.token}>
                      <TokenGridCell>{token.token}</TokenGridCell>
                      <TokenGridCell>{token.lg}</TokenGridCell>
                      <TokenGridCell>{token.xs}</TokenGridCell>
                    </TokenGridRow>
                  ))}
                </TokenGridBody>
              </TokenGrid>
            </Box>
          ))}
        </Box>
      ))}
    </>
  );
};

export default FoundationsLayout;
