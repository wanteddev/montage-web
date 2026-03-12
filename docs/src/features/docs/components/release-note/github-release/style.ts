import { css } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const releaseStyle = (theme: Theme) => css`
  padding: 16px 0px;

  &:not(:last-child) {
    border-bottom: 1px solid ${theme.semantic.line.normal.alternative};
  }
`;

export const releaseBadgeStyle = (theme: Theme) => css`
  color: ${theme.semantic.label.normal};
  border-radius: 999px;
  padding: 4px 10px;
`;
