import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const titleStyle = (theme: Theme) => css`
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
  line-height: 133%;
  letter-spacing: -1.088px;
  font-family: var(--font-family-wanted-sans);

  ${respondTo(theme.breakpoint.md)} {
    font-size: 28px;
    font-weight: 600;
    line-height: 133%;
    letter-spacing: -0.952px;
  }
`;
