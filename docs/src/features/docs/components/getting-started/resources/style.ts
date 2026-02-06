import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const resourceItemStyle = (theme: Theme) => css`
  border-radius: 12px;
  padding: 20px 24px;
  background: transparent;
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
`;
