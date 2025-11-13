import { css, keyframes } from '@wanteddev/wds-engine';

import { addOpacity, typographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { TooltipContentProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

const mountKeyframes = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const unmountKeyframes = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const tooltipWrapperStyle =
  ({ size, xs, sm, md, lg, xl }: TooltipContentProps) =>
  (theme: Theme) => css`
    backdrop-filter: blur(32px);
    max-width: 280px;

    &[data-status='open'] {
      animation: ${mountKeyframes} 200ms ease-in-out;
    }

    &[data-status='close'] {
      animation: ${unmountKeyframes} 200ms ease-in-out;
    }

    ${tooltipWrapperSizeStyle({ size })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${tooltipWrapperSizeStyle({ size: params?.size })}
        ${params?.sx}
      `,
    )}
  `;

export const tooltipWrapperSizeStyle = ({
  size,
}: Pick<TooltipContentProps, 'size'>) => {
  switch (size) {
    case 'small':
      return css`
        border-radius: 6px;

        [data-role='tooltip-content-text'],
        [data-role='tooltip-content-shortcut'] {
          ${typographyStyle('caption2', 'medium')}
        }

        [data-role='tooltip-content-text-wrapper'] {
          padding: 0px;
        }

        [data-role='tooltip-content'] {
          padding: 5px 8px;
        }

        [data-role='tooltip-content-close-button'] {
          font-size: 10px;

          & > [wds-component='with-interaction'] {
            width: calc(100% + 8px);
            height: calc(100% + 8px);
          }
        }

        [data-role='tooltip-content-close-button-wrapper'] {
          padding: 2px 0px;
        }

        [data-role='tooltip-arrow-medium'] {
          display: none;
        }

        [data-role='tooltip-arrow-small'] {
          display: initial;
        }
      `;
    case 'medium':
      return css`
        border-radius: 8px;

        [data-role='tooltip-content-text'],
        [data-role='tooltip-content-shortcut'] {
          ${typographyStyle('label1', 'medium')}
        }

        [data-role='tooltip-content-text-wrapper'] {
          padding: 0px 2px;
        }

        [data-role='tooltip-content'] {
          padding: 8px 10px;
        }

        [data-role='tooltip-content-close-button'] {
          font-size: 16px;

          & > [wds-component='with-interaction'] {
            width: calc(100% + 16px);
            height: calc(100% + 16px);
          }
        }

        [data-role='tooltip-content-close-button-wrapper'] {
          padding: 2px;
        }

        [data-role='tooltip-arrow-medium'] {
          display: initial;
        }

        [data-role='tooltip-arrow-small'] {
          display: none;
        }
      `;
  }
};

export const tooltipContentStyle = (theme: Theme) => css`
  border-radius: inherit;
  background-color: ${addOpacity(
    theme.semantic.inverse.background,
    theme.opacity[88],
  )};
  color: ${theme.semantic.inverse.label};
  position: relative;

  &::before {
    border-radius: inherit;
    background-color: ${addOpacity(
      theme.semantic.primary.normal,
      theme.opacity[5],
    )};
    content: '';
    inset: 0;
    position: absolute;
  }

  button {
    color: ${addOpacity(
      theme.semantic.inverse.label,
      theme.opacity[61],
    )} !important;
  }

  [wds-component='with-interaction'] {
    background: ${theme.semantic.inverse.label};
  }
`;

export const tooltipContentShortcutStyle = (theme: Theme) => css`
  color: ${addOpacity(theme.semantic.inverse.label, theme.opacity[61])};
  width: fit-content;
  flex-shrink: 0;
`;
