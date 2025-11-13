import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sectionCardStyle = (theme: Theme) => css`
  border-radius: 24px;

  &::after {
    border-color: ${theme.semantic.line.normal.alternative};
  }
`;
