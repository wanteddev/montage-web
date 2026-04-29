'use client';
import { Box, Button, FlexBox, Typography } from '@wanteddev/wds';
import { IconFull } from '@wanteddev/wds-icon';
import { useCallback, useState } from 'react';

import {
  TokenGrid,
  TokenGridBody,
  TokenGridCell,
  TokenGridHead,
  TokenGridHeader,
  TokenGridRow,
} from '@/features/docs/components/custom-render/token-grid';
import Demo from '@/features/docs/components/mdx/demo';

import { Heading2 } from '../../mdx/section/layout';

import {
  COMPONENT_USAGE,
  DESIGN_INTENT,
  RESEARCH_SOURCE_CODE,
  TOKEN_USAGE,
} from './constants';
import {
  showcaseBodyStyle,
  showcaseContentBoxStyle,
  showcaseInternalHeaderStyle,
  showcasePreviewImageStyle,
  showcaseWrapperStyle,
} from './style';
import ViewModeToggle from './view-mode-toggle';
import { DEFAULT_VIEW_MODE } from './view-mode-toggle/constants';

import type { ViewMode } from './view-mode-toggle/constants';

const PREVIEW_ROUTE = '/preview/templates/research';

const TemplatesResearch = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(DEFAULT_VIEW_MODE);

  const handleViewModeChange = useCallback((value: ViewMode) => {
    setViewMode(value);
  }, []);

  const handleOpenInNewTab = useCallback(() => {
    window.open(PREVIEW_ROUTE, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <>
      <Heading2 content="Live demo" />

      <Box as="p" sx={{ marginBottom: '0' }}>
        Preview 모드에서는 디자인 시안 이미지를, Code 모드에서는 해당 화면을
        WDS의 토큰과 컴포넌트로 구현한 소스 코드를 확인할 수 있습니다. 우측
        상단의 새 탭 열기 버튼으로 풀 화면 라이브 미리보기를 새 탭에서 볼 수
        있습니다.
      </Box>

      <Box sx={showcaseWrapperStyle}>
        <Box sx={showcaseContentBoxStyle}>
          <FlexBox
            alignItems="center"
            justifyContent="space-between"
            gap="12px"
            sx={showcaseInternalHeaderStyle}
          >
            <ViewModeToggle
              value={viewMode}
              onValueChange={handleViewModeChange}
            />

            {viewMode === 'preview' && (
              <Button
                variant="outlined"
                color="assistive"
                size="medium"
                iconOnly
                aria-label="새 탭에서 열기"
                onClick={handleOpenInNewTab}
              >
                <IconFull />
              </Button>
            )}
          </FlexBox>

          <Box sx={showcaseBodyStyle}>
            {viewMode === 'preview' ? (
              <Box sx={showcasePreviewImageStyle}>
                <Box
                  as="img"
                  src="/templates/research-home.jpg"
                  alt="원티드 홈 시안"
                />
              </Box>
            ) : (
              <Demo
                code={RESEARCH_SOURCE_CODE}
                viewMode="code"
                embedded
                hideCode={false}
              />
            )}
          </Box>
        </Box>
      </Box>

      <Heading2 sx={{ marginTop: '80px' }} content="Design Intent" />

      <Box as="ul" sx={{ paddingLeft: '20px' }}>
        {DESIGN_INTENT.map((line) => (
          <Typography
            as="li"
            key={line}
            variant="body1"
            color="semantic.label.normal"
            sx={{ marginBottom: '8px' }}
          >
            {line}
          </Typography>
        ))}
      </Box>

      <Heading2 sx={{ marginTop: '80px' }} content="Tokens used" />

      <Box as="p" sx={{ marginBottom: '24px' }}>
        이 화면을 다른 사용 사례에 재현하려면 아래 토큰을 동일하게 사용하세요.
        Layout 토큰은 티셔츠 사이즈(xs/lg)별 값을 가지며 뷰포트 사이즈에 맞춰
        선택해 사용합니다.
      </Box>

      <TokenGrid>
        <colgroup>
          <col width="35%" />
          <col width="20%" />
          <col width="auto" />
        </colgroup>
        <TokenGridHeader>
          <TokenGridRow>
            <TokenGridHead>토큰</TokenGridHead>
            <TokenGridHead>값 (lg)</TokenGridHead>
            <TokenGridHead>사용처</TokenGridHead>
          </TokenGridRow>
        </TokenGridHeader>
        <TokenGridBody>
          {TOKEN_USAGE.map((row) => (
            <TokenGridRow key={row.token}>
              <TokenGridCell>{row.token}</TokenGridCell>
              <TokenGridCell>{row.value}</TokenGridCell>
              <TokenGridCell>{row.usage}</TokenGridCell>
            </TokenGridRow>
          ))}
        </TokenGridBody>
      </TokenGrid>

      <Heading2 sx={{ marginTop: '80px' }} content="Components used" />

      <TokenGrid>
        <colgroup>
          <col width="35%" />
          <col width="auto" />
        </colgroup>
        <TokenGridHeader>
          <TokenGridRow>
            <TokenGridHead>컴포넌트</TokenGridHead>
            <TokenGridHead>역할</TokenGridHead>
          </TokenGridRow>
        </TokenGridHeader>
        <TokenGridBody>
          {COMPONENT_USAGE.map((row) => (
            <TokenGridRow key={row.name}>
              <TokenGridCell>{row.name}</TokenGridCell>
              <TokenGridCell>{row.usage}</TokenGridCell>
            </TokenGridRow>
          ))}
        </TokenGridBody>
      </TokenGrid>
    </>
  );
};

export default TemplatesResearch;
