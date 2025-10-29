import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const popoverIconStyle = (theme: Theme) => css`
  color: ${theme.semantic.label.normal};
  font-size: 24px;
`;

export const palettePopoverWrapperStyle = css`
  min-width: unset !important;
  max-width: 100%;
  padding-inline: var(--layout-padding-inline);
`;
