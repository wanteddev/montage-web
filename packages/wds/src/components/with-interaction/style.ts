import { css } from '@emotion/react';

import type { Theme } from '@emotion/react';

export const hoverInteractionStyle = (theme: Theme) => css`
  opacity: ${theme.opacity[5]};
`;

export const focusInteractionStyle = (theme: Theme) => css`
  opacity: ${theme.opacity[8]};
`;

export const activeInteractionStyle = (theme: Theme) => css`
  opacity: ${theme.opacity[12]};
`;

export const focusVisibleInteractionStyle = (theme: Theme) => css`
  opacity: ${theme.opacity[0]};
`;
