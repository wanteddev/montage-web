import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

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
