import { css } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const defaultValueStyle = (theme: Theme) => css`
  & > code {
    color: ${theme.semantic.foreground.neutral.tertiary};
    background-color: ${theme.semantic.surface.neutral.secondary};
  }
`;
