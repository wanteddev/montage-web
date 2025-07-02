import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const customizeStyle = (theme: Theme) => css`
  padding: 24px 20px;
  gap: 20px;
  align-items: center;
  flex-direction: row;

  ${respondTo(theme.breakpoint.sm)} {
    padding: 24px 0px;
    flex-direction: column;
    align-items: initial;
  }
`;
