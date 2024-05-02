import { css, keyframes } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { TooltipContentProps } from './types';

const tooltipFadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const tooltipWrapperStyle = css`
  animation: 0.2s ease ${tooltipFadeIn};
  opacity: 1;
  border-radius: 10px;
  backdrop-filter: blur(32px);
`;

export const tooltipContentStyle =
  ({ variant }: TooltipContentProps) =>
  (theme: Theme) => css`
    padding: 14px;
    border-radius: inherit;

    ${variant === 'inverse' &&
    css`
      background-color: ${addOpacity(
        theme.palette.inverse.background,
        theme.opacity[88],
      )};
      color: ${theme.palette.inverse.label};

      button {
        color: ${theme.palette.inverse.primary} !important;
      }

      & [wds-component='popper-arrow'] {
        color: ${addOpacity(
          theme.palette.inverse.background,
          theme.opacity[88],
        )};
      }
    `}

    ${variant === 'normal' &&
    css`
      background-color: ${theme.palette.background.elevated.normal};
      color: ${theme.palette.label.neutral};
      filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.12))
        drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.08))
        drop-shadow(2px 0px 1px rgba(0, 0, 0, 0.08));

      button {
        color: ${theme.palette.inverse.primary} !important;
      }

      & [wds-component='popper-arrow'] {
        color: ${theme.palette.background.elevated.normal};
      }
    `}

    ${variant === 'accent' &&
    css`
      background-color: ${addOpacity(
        theme.palette.inverse.background,
        theme.opacity[88],
      )};
      color: ${theme.palette.inverse.label};
      position: relative;

      & > div > span {
        z-index: 1;
      }

      &::before {
        border-radius: inherit;
        background-color: ${addOpacity(
          theme.palette.primary.normal,
          theme.opacity[22],
        )};
        content: '';
        inset: 0;
        position: absolute;
      }

      button {
        color: ${theme.palette.inverse.label} !important;
      }

      & [wds-component='popper-arrow'] {
        color: ${addOpacity(
          theme.palette.inverse.background,
          theme.opacity[88],
        )};
      }
    `}
  `;
