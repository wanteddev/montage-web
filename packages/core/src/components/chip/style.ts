import { css, getColorByToken } from '@montage-ui/engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { ChipProps } from './types';
import type { Theme, ThemeColorsToken } from '@montage-ui/engine';

type ChipStyleProps = ChipProps & {
  overrideColor?: ThemeColorsToken;
};

export const chipStyle =
  ({
    xs,
    sm,
    md,
    lg,
    xl,
    overrideColor,
    size,
    iconOnly,
    variant,
  }: ChipStyleProps) =>
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
    transition:
      background-color 0.3s ease,
      color 0.3s ease,
      box-shadow 0.3s ease;

    &:disabled,
    &[aria-disabled='true'] {
      pointer-events: none;
      cursor: initial;
    }

    ${chipVariantStyle({ variant, overrideColor }, theme)}
    ${chipSizeStyle({ size, iconOnly }, theme)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${chipSizeStyle({ size: params?.size, iconOnly }, theme)}
        ${params?.sx}
      `,
    )}
  `;

const chipSizeStyle = ({ size, iconOnly }: ChipProps = {}, theme: Theme) => {
  switch (size) {
    case 'xsmall':
      return css`
        border-radius: ${theme.radius[8]};
        padding: 5px ${theme.spacing[6]};
        min-height: ${theme.dimension[24]};
        gap: ${theme.spacing[0]};

        svg {
          font-size: ${theme.dimension[12]};
        }
        & > span {
          ${typographyStyle('caption2', 'medium')}
          padding: ${theme.spacing[0]} ${theme.spacing[2]};
        }
      `;
    case 'small':
      return css`
        border-radius: ${theme.radius[10]};
        min-height: ${theme.dimension[32]};
        padding: ${iconOnly ? '9px' : theme.spacing[8]};
        gap: ${theme.spacing[2]};

        svg {
          font-size: ${theme.dimension[14]};
        }
        & > span {
          ${typographyStyle('caption1', 'medium')}
          padding: ${theme.spacing[0]} ${theme.spacing[2]};
        }
      `;
    case 'medium':
      return css`
        border-radius: ${theme.radius[10]};
        min-height: ${theme.dimension[36]};
        padding: ${iconOnly ? '11px' : `9px ${theme.spacing[10]}`};
        gap: ${theme.spacing[2]};

        svg {
          font-size: ${theme.dimension[14]};
        }

        & > span {
          ${typographyStyle('label2', 'medium')}
          padding: ${theme.spacing[0]} ${theme.spacing[2]};
        }
      `;
    case 'large':
      return css`
        border-radius: ${theme.radius[12]};
        min-height: ${theme.dimension[40]};
        padding: ${iconOnly
          ? theme.spacing[12]
          : `${theme.spacing[10]} ${theme.spacing[12]}`};
        gap: ${theme.spacing[2]};

        svg {
          font-size: ${theme.dimension[16]};
        }

        & > span {
          ${typographyStyle('label1', 'medium')}
          padding: ${theme.spacing[0]} ${theme.spacing[2]};
        }
      `;
  }
};

const chipVariantStyle = (
  { variant, overrideColor }: ChipStyleProps = {},
  theme: Theme,
) => {
  switch (variant) {
    case 'solid':
      return css`
        color: ${overrideColor
          ? getColorByToken(theme, overrideColor)
          : theme.semantic.foreground.neutral.primary};
        background-color: ${theme.semantic.surface.neutral.tertiary};
        box-shadow: none;

        &[data-active='true'] {
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
        color: ${overrideColor
          ? getColorByToken(theme, overrideColor)
          : theme.semantic.foreground.neutral.primary};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.secondary};

        &[data-active='true'] {
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
