import { css, getColorByToken } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { Theme, ThemeColorsToken } from '@wanteddev/wds-engine';
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
          [wds-component='with-interaction']
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
    ${textButtonSizeStyle(props)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params = {}) => css`
        ${textButtonSizeStyle(params)}
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

const textButtonSizeStyle = ({ size }: TextButtonProps) => {
  switch (size) {
    case 'medium':
      return css`
        gap: 4px;
        border-radius: 6px;
        padding: 4px 0px;

        [data-role='text-button-loading'] {
          width: 16px;
          height: 16px;
        }

        & > [wds-component='with-interaction'] {
          width: calc(100% + 14px);
          height: 100%;
        }

        & > svg {
          font-size: 20px;
        }
        & > span {
          ${typographyStyle('body1', 'bold')}
        }
      `;
    case 'small':
      return css`
        gap: 4px;
        border-radius: 6px;
        padding: 4px 0px;

        [data-role='text-button-loading'] {
          width: 14px;
          height: 14px;
        }

        & > [wds-component='with-interaction'] {
          width: calc(100% + 12px);
          height: 100%;
        }

        & > svg {
          font-size: 16px;
        }
        & > span {
          ${typographyStyle('label1', 'bold')}
        }
      `;
  }
};
