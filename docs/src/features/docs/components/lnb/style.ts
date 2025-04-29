import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbWrapperStyle = (theme: Theme) => css`
  width: 240px;
  flex-shrink: 0;
  top: var(--gnb-height);
  position: sticky !important;
  height: calc(100dvh - var(--gnb-height));
  border-right: 1px solid ${theme.semantic.line.solid.alternative};

  --lnb-padding-left: 40px;

  [data-radix-scroll-area-content] {
    padding: 0px 0px 16px 0px;
  }

  ${respondTo('1360px')} {
    display: none;
  }
`;
