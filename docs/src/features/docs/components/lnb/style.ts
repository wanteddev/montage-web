import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbWrapperStyle = (theme: Theme) => css`
  width: 280px;
  flex-shrink: 0;
  margin-top: 40px;
  top: calc(var(--gnb-height) + 40px);
  position: sticky !important;
  height: calc(100dvh - var(--gnb-height) - 40px);

  [data-radix-scroll-area-content] {
    padding: 0px 0px 16px 0px;
  }

  ${respondTo(theme.breakpoint.lg)} {
    display: none;
  }
`;
