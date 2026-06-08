import { css, getColorByToken } from '@montage-ui/engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { Theme, ThemeColorsToken } from '@montage-ui/engine';
import type { TextButtonProps } from './types';

type TextButtonStyleProps = TextButtonProps & {
  overrideColor?: ThemeColorsToken;
};

export const textButtonStyle =
  ({ loading, xs, sm, md, lg, xl, ...props }: TextButtonStyleProps) =>
  (theme: Theme) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    box-sizing: border-box;
    line-height: initial;
    white-space: nowrap;
    height: fit-content;
    width: fit-content;
    cursor: pointer;

    [data-role='text-button-loading'] {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      circle {
        stroke: currentColor;
      }
    }

    ${loading &&
    css`
      cursor: wait;
      &
        > *:not([data-role='text-button-loading']):not(
          [data-component='with-interaction']
        ) {
        visibility: hidden;
      }
    `}

    &:disabled,
    &[aria-disabled='true'] {
      pointer-events: none;
      cursor: initial;
    }

    ${getColorTheme(props, theme)}
    ${textButtonSizeStyle(props, theme)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params = {}) => css`
        ${textButtonSizeStyle(params, theme)}
        ${params.sx}
      `,
    )}
  `;

const getColorTheme = (
  { color, overrideColor }: TextButtonStyleProps,
  theme: Theme,
) => {
  switch (color) {
    case 'primary':
      return css`
        color: ${overrideColor
          ? getColorByToken(theme, overrideColor)
          : theme.semantic.primary.normal};
        background-color: transparent;
        border: none;
        box-shadow: none;

        [data-role='text-button-loading'] {
          color: inherit;
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.semantic.label.disable};
        }
      `;
    case 'assistive':
      return css`
        background-color: transparent;
        border: none;
        box-shadow: none;
        color: ${overrideColor
          ? getColorByToken(theme, overrideColor)
          : theme.semantic.label.alternative};

        [data-role='text-button-loading'] {
          color: ${theme.semantic.label.assistive};
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.semantic.label.disable};
        }
      `;
  }
};

const textButtonSizeStyle = ({ size }: TextButtonProps, theme: Theme) => {
  switch (size) {
    case 'medium':
      return css`
        gap: ${theme.spacing[4]};
        border-radius: ${theme.radius[10]};
        min-height: ${theme.dimension[32]};
        padding: 5px ${theme.spacing[0]};

        [data-role='text-button-loading'] {
          width: ${theme.dimension[14]};
          height: ${theme.dimension[14]};
        }

        & > [data-component='with-interaction'] {
          width: calc(100% + (${theme.spacing[8]} * 2));
          height: 100%;
        }

        & > svg {
          font-size: ${theme.dimension[18]};
        }
        & > span {
          ${typographyStyle('body2', 'bold')}
        }
      `;
    case 'small':
      return css`
        gap: ${theme.spacing[4]};
        border-radius: ${theme.radius[8]};
        min-height: ${theme.dimension[28]};
        padding: ${theme.spacing[4]} ${theme.spacing[0]};

        [data-role='text-button-loading'] {
          width: ${theme.dimension[12]};
          height: ${theme.dimension[12]};
        }

        & > [data-component='with-interaction'] {
          width: calc(100% + (${theme.spacing[6]} * 2));
          height: 100%;
        }

        & > svg {
          font-size: ${theme.dimension[16]};
        }
        & > span {
          ${typographyStyle('label1', 'bold')}
        }
      `;
  }
};
