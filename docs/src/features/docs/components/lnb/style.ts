import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbWrapperStyle = (theme: Theme) => css`
  flex: 0 0 240px;
  top: var(--gnb-height);
  position: sticky !important;
  height: calc(100dvh - var(--gnb-height));
  display: none;

  --lnb-padding-left: 40px;

  [data-radix-scroll-area-content] {
    border-right: 1px solid ${theme.semantic.line.solid.alternative};
    padding: 0px 8px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    display: flex;
  }
`;
