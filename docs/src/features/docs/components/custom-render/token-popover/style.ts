import { css } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const popoverIconStyle = (theme: Theme) => css`
  color: ${theme.semantic.foreground.neutral.primary};
  font-size: 24px;
`;
