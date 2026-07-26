import { css } from '@montage-ui/engine';

import type { Theme } from '@montage-ui/engine';

export const datePopperStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.surface.elevated.primary};
  box-shadow: ${theme.semantic.elevation.shadow.normal.small};
  border-radius: 12px;
  border: 1px solid ${theme.semantic.line.neutral.secondaryOpaque};
  overflow: hidden;
`;
