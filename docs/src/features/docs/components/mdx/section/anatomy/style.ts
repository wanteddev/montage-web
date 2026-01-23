import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const anatomyListStyle = css`
  list-style: decimal;
  margin: 0;
`;

export const anatomyItemStyle = (theme: Theme) => css`
  width: calc(33% - 2.6em);
  margin-left: 1.3em;

  ${respondTo(theme.breakpoint.sm)} {
    width: calc(50% - 1.3em - 16px);
  }
`;
