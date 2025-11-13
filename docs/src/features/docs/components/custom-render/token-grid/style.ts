import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const gridHeaderStyle = (theme: Theme) => css`
  border-bottom: 1px solid ${theme.semantic.line.normal.alternative};
`;

export const gridHeadCellStyle = css`
  padding-bottom: 16px;
  padding-right: 24px;
  white-space: nowrap;
`;

export const gridCellStyle = css`
  padding-top: 16px;
  padding-right: 24px;
  white-space: nowrap;
`;
