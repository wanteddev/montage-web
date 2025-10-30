import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbWrapperStyle = (theme: Theme) => css`
  --lnb-padding: 10px;

  width: calc(160px + var(--lnb-padding) * 2);
  flex-shrink: 0;
  margin-left: calc(var(--lnb-padding) * -1);
  margin-right: calc(var(--lnb-padding) * -1);
  top: var(--gnb-height);
  position: sticky !important;
  height: calc(100dvh - var(--gnb-height));
  display: none;

  [data-radix-scroll-area-content] {
    min-width: initial !important;
    padding: 56px var(--lnb-padding) 20px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    display: flex;
  }
`;
