import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const wrapperStyle = (theme: Theme) => css`
  width: 100%;
  padding-inline: var(--padding-inline);
  --padding-inline: 20px;

  ${respondMore(theme.breakpoint.sm)} {
    --padding-inline: clamp(20px, calc(8vw - 16px), 80px);
  }
`;

export const contentWrapperStyle = css`
  width: 100%;
  padding-block: 120px 56px;
  transition: padding 0.2s ease-in-out;

  &[data-lnb-hide='false'] {
    padding-block: 56px;
  }
`;
