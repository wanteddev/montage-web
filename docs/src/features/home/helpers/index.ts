import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const homeTitleStyle = (theme: Theme) => css`
  font-size: 28px;
  line-height: 120%;
  letter-spacing: -0.392px;
  font-style: normal;
  font-weight: 800;
  font-family: var(--font-family-wanted-sans);
  margin-bottom: 20px;

  ${respondMore(theme.breakpoint.sm)} {
    font-size: 32px;
    line-height: 120%;
    letter-spacing: -0.768px;
    margin-bottom: 28px;
  }

  ${respondMore(theme.breakpoint.lg)} {
    font-size: 40px;
    line-height: 120%;
    letter-spacing: -0.96px;
  }
`;
