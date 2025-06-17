import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbWrapperStyle = (theme: Theme) => css`
  flex: 1 0 240px;
  top: var(--gnb-height);
  position: sticky !important;
  height: calc(100dvh - var(--gnb-height));
  display: none;
  left: 0px;
  transition:
    transform 0.2s ease,
    margin-left 0.2s ease;

  --lnb-padding-left: 40px;

  &[aria-hidden='true'] {
    transform: translateX(-100%);
    margin-left: -240px;
  }

  [data-radix-scroll-area-content] {
    min-width: initial !important;
    padding: 32px 8px 20px 8px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    display: flex;
  }
`;
