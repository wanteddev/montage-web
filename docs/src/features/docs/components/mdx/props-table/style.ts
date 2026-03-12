import { css } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const defaultValueStyle = (theme: Theme) => css`
  & > code {
    color: ${theme.semantic.label.alternative};
    background-color: ${theme.semantic.fill.normal};
  }
`;
