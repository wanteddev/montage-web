import { css, respondTo } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const anatomyListStyle = css`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const anatomyItemStyle = (theme: Theme) => css`
  width: calc(33% - 16px - 0.2em);

  ${respondTo(theme.breakpoint.sm)} {
    width: calc(50% - 16px);
  }
`;
