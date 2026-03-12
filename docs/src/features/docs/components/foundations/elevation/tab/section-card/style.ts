import { css } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const sectionCardStyle = (theme: Theme) => css`
  border-radius: 24px;

  &::after {
    border-color: ${theme.semantic.line.normal.alternative};
  }
`;
