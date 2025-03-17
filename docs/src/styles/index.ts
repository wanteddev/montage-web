import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const layoutStyle = (theme: Theme) => css`
  width: 100%;
  margin: 0 auto;
  max-width: 1800px;
  padding: 0 20px;

  ${respondMore(theme.breakpoint.lg)} {
    padding: 0px 40px;
  }

  ${respondMore(theme.breakpoint.xl)} {
    padding: 0px 40px;
  }
`;
