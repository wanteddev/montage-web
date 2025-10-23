import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const downloadResourceStyle = (theme: Theme) => css`
  padding: 16px 20px;
  border-radius: 24px;
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
`;
