import { css } from '@montage-ui/engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { FilterButtonProps } from './types';
import type { Theme } from '@montage-ui/engine';

export const filterButtonStyle =
  ({ xs, sm, md, lg, xl, ...props }: FilterButtonProps) =>
  (theme: Theme) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    box-sizing: border-box;
    line-height: initial;
    white-space: nowrap;
    height: fit-content;
    cursor: pointer;
    width: fit-content;
    flex-shrink: 0;

    &:disabled {
      pointer-events: none;
      cursor: initial;
    }

    ${filterButtonVariantStyle(props, theme)}
    ${filterButtonSizeStyle(props, theme)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${filterButtonSizeStyle(params, theme)}
        ${params?.sx}
      `,
    )}
  `;

const filterButtonSizeStyle = (
  { size }: FilterButtonProps = {},
  theme: Theme,
) => {
  switch (size) {
    case 'xsmall':
      return css`
        border-radius: ${theme.radius[8]};
        padding: 5px ${theme.spacing[4]} 5px ${theme.spacing[6]};
        gap: ${theme.spacing[0]};

        [data-role='chip-filter-wrapper'] {
          padding: ${theme.spacing[0]} ${theme.spacing[2]};
          gap: ${theme.spacing[2]};
        }

        span {
          ${typographyStyle('caption2', 'medium')}
        }

        [data-role='chip-filter-active-label'] {
          ${typographyStyle('caption2', 'medium')}
        }

        svg {
          font-size: ${theme.dimension[12]};
        }
      `;
    case 'small':
      return css`
        border-radius: ${theme.radius[10]};
        padding: ${`${theme.spacing[8]} ${theme.spacing[6]} ${theme.spacing[8]} ${theme.spacing[8]}`};
        gap: ${theme.spacing[0]};

        [data-role='chip-filter-wrapper'] {
          padding: ${theme.spacing[0]} ${theme.spacing[2]};
          gap: ${theme.spacing[2]};
        }

        span {
          ${typographyStyle('caption1', 'medium')}
        }
        [data-role='chip-filter-active-label'] {
          ${typographyStyle('caption1', 'medium')}
        }

        svg {
          font-size: ${theme.dimension[14]};
        }
      `;
    case 'medium':
      return css`
        border-radius: ${theme.radius[10]};
        padding: ${`9px ${theme.spacing[8]} 9px ${theme.spacing[10]}`};
        gap: ${theme.spacing[0]};

        [data-role='chip-filter-wrapper'] {
          padding: ${theme.spacing[0]} ${theme.spacing[2]};
          gap: ${theme.spacing[4]};
        }

        span {
          ${typographyStyle('label2', 'medium')}
        }
        [data-role='chip-filter-active-label'] {
          ${typographyStyle('label2', 'medium')}
        }

        svg {
          font-size: ${theme.dimension[16]};
        }
      `;
    case 'large':
      return css`
        border-radius: ${theme.radius[10]};
        padding: ${`${theme.spacing[10]} ${theme.spacing[10]} ${theme.spacing[10]} ${theme.spacing[12]}`};
        gap: ${theme.spacing[0]};

        [data-role='chip-filter-wrapper'] {
          padding: ${theme.spacing[0]} ${theme.spacing[2]};
          gap: ${theme.spacing[4]};
        }

        span {
          ${typographyStyle('label1', 'medium')}
        }
        [data-role='chip-filter-active-label'] {
          ${typographyStyle('label1', 'medium')}
        }

        svg {
          font-size: ${theme.dimension[16]};
        }
      `;
  }
};

const filterButtonVariantStyle = (
  { variant }: FilterButtonProps = {},
  theme: Theme,
) => {
  switch (variant) {
    case 'solid':
      return css`
        color: ${theme.semantic.foreground.neutral.primary};
        background-color: ${theme.semantic.surface.neutral.tertiary};
        box-shadow: none;

        &[aria-pressed='true'] {
          color: ${theme.semantic.foreground.brand.primary};
          background-color: ${theme.semantic.surface.brand.subtle};
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.semantic.foreground.disable.primary};
          background-color: ${theme.semantic.surface.disable.primary};
          box-shadow: none;
        }
      `;
    case 'outlined':
      return css`
        color: ${theme.semantic.foreground.neutral.primary};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.secondary};

        &[aria-pressed='true'] {
          background-color: ${theme.semantic.surface.brand.subtle};
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.brand.primary};
          color: ${theme.semantic.foreground.brand.primary};
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.semantic.foreground.disable.primary};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.secondary};
        }
      `;
  }
};
