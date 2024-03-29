import { css, keyframes } from '@emotion/react';

import type { Theme } from '@emotion/react';
import type { TooltipContentProps } from './types';

const tooltipFadeIn = keyframes`
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
`;

export const tooltipContentStyle =
  ({ variant }: TooltipContentProps) =>
  (theme: Theme) => css`
    padding: 14px;
    border-radius: 10px;
    animation: 0.2s ease ${tooltipFadeIn};
    opacity: 1;

    ${variant === 'inverse' &&
    css`
      background-color: ${theme.palette.inverse.background};
      color: ${theme.palette.inverse.label};

      & [wds-component='popper-arrow'] {
        color: ${theme.palette.inverse.background};
      }
    `}

    ${variant === 'normal' &&
    css`
      background-color: ${theme.palette.background.elevated.normal};
      color: ${theme.palette.label.neutral};
      box-shadow: ${theme.palette.elevation.shadow.emphasize};

      & [wds-component='popper-arrow'] {
        color: ${theme.palette.background.elevated.normal};
      }
    `}
  `;
