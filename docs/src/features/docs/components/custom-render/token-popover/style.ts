import { css } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const popoverIconStyle = (theme: Theme) => css`
  color: ${theme.semantic.foreground.neutral.primary};
  font-size: 24px;
`;

export const palettePopoverWrapperStyle = css`
  min-width: unset !important;
  max-width: 100%;
  padding-inline: var(--layout-padding-inline);
`;
