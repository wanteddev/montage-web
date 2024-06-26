import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { CompactTooltipContentProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const compactTooltipWrapperStyle = css`
  border-radius: 8px;
  backdrop-filter: blur(32px);
  max-width: 280px;
  transition-property: opacity;
  transition-duration: var(--wds-tooltip-transition-duration, 250ms);

  &[data-status='open'] {
    opacity: 1;
  }

  &[data-status='initial'],
  &[data-status='unmounted'],
  &[data-status='close'] {
    opacity: 0;
  }
`;

export const compactTooltipContentStyle =
  ({ variant }: CompactTooltipContentProps) =>
  (theme: Theme) => css`
    padding: 6px 10px;
    border-radius: inherit;

    ${compactTooltipVariantStyle({ variant }, theme)}
  `;

const compactTooltipVariantStyle = (
  { variant }: CompactTooltipContentProps,
  theme: Theme,
) => {
  switch (variant) {
    case 'normal':
      return css`
        background-color: ${addOpacity(
          theme.palette.inverse.background,
          theme.opacity[88],
        )};
        position: relative;
        color: ${theme.palette.inverse.label};

        &::before {
          border-radius: inherit;
          background-color: ${addOpacity(
            theme.palette.primary.normal,
            theme.opacity[5],
          )};
          content: '';
          inset: 0;
          position: absolute;
        }

        span {
          z-index: 1;
        }
      `;
    case 'inverse':
      return css`
        color: ${theme.palette.label.neutral};
        box-shadow: inset 0 0 1px ${theme.palette.line.normal.neutral};
        background-color: ${addOpacity(
          theme.palette.background.elevated.normal,
          theme.opacity[88],
        )};
      `;
  }
};
