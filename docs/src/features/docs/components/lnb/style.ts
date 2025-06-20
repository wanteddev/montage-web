import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbWrapperStyle = (theme: Theme) => css`
  width: 240px;
  top: var(--gnb-height);
  position: sticky !important;
  height: calc(100dvh - var(--gnb-height));
  display: none;
  left: 0px;
  opacity: 1;
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-in;

  --lnb-padding-left: 40px;

  &[data-visible='false'] {
    opacity: 0;
    transform: translateX(-100%);
  }

  [data-radix-scroll-area-content] {
    min-width: initial !important;
    padding: 32px 8px 20px 8px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    display: flex;
  }
`;
