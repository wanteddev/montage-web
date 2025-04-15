import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbWrapperStyle = (theme: Theme) => css`
  width: 240px;
  box-sizing: content-box;
  flex-shrink: 0;
  top: calc(var(--gnb-height) + var(--layout-padding));
  position: sticky !important;
  padding: 0px var(--layout-padding);
  height: calc(100dvh - var(--gnb-height));
  border-right: 1px solid ${theme.semantic.line.normal.neutral};

  [data-radix-scroll-area-viewport] {
    width: calc(100% + 24px);
    margin-left: -12px;
  }

  [data-radix-scroll-area-content] {
    padding: 0px 0px 16px 0px;
  }

  ${respondTo('1360px')} {
    display: none;
  }
`;
