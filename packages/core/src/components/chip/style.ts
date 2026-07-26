import { css, getColorByToken } from '@montage-ui/engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { addOpacity } from '../../utils';

import type { ChipProps } from './types';
import type { Theme, ThemeColorsToken } from '@montage-ui/engine';

type ChipStyleProps = ChipProps & {
  overrideColor?: ThemeColorsToken;
};

export const chipStyle =
  ({ xs, sm, md, lg, xl, overrideColor, ...props }: ChipStyleProps) =>
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

    ${chipVariantStyle({ ...props, overrideColor }, theme)}
    ${chipSizeStyle(props)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${chipSizeStyle(params)}
        ${params?.sx}
      `,
    )}
  `;

const chipSizeStyle = ({ size }: ChipProps = {}) => {
  switch (size) {
    case 'xsmall':
      return css`
        border-radius: 6px;
        padding: 4px 7px;
        gap: 2px;

        svg {
          font-size: 12px;
        }
        & > span {
          ${typographyStyle('caption1', 'medium')}
          padding: 0 1px;
        }
      `;
    case 'small':
      return css`
        border-radius: 8px;
        padding: 6px 8px;
        gap: 2px;

        svg {
          font-size: 14px;
        }
        & > span {
          ${typographyStyle('label1', 'medium')}
          padding: 0 2px;
        }
      `;
    case 'medium':
      return css`
        border-radius: 8px;
        padding: 7px 11px;
        gap: 3px;

        svg {
          font-size: 14px;
        }

        & > span {
          ${typographyStyle('body2', 'medium')}
          padding: 0 2px;
        }
      `;
    case 'large':
      return css`
        border-radius: 10px;
        padding: 9px 12px;
        gap: 3px;

        svg {
          font-size: 16px;
        }
        & > span {
          ${typographyStyle('body2', 'medium')}
          padding: 0 2px;
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
          color: ${theme.semantic.foreground.neutral.inverse};
          background-color: ${theme.semantic.surface.neutral.inverse};
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
          background-color: ${addOpacity(
            theme.semantic.surface.brand.primary,
            theme.opacity[5],
          )};
          box-shadow: inset 0 0 0 1px
            ${addOpacity(
              theme.semantic.surface.brand.primary,
              theme.opacity[43],
            )};
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
