import { css } from '@emotion/react';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/responsive-props';

import type { ButtonProps, ButtonVariant } from './types';
import type { Theme } from '@emotion/react';

export const buttonStyle =
  ({ xs, sm, md, lg, xl, ...props }: ButtonProps<ButtonVariant>) =>
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

    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
    }

    ${buttonColorStyle(props, theme)}
    ${buttonSizeStyle(props)}
    ${props.fullWidth ? 'width: 100%;' : 'width: fit-content;'}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${buttonSizeStyle(params)}
        ${params?.fullWidth && 'width: 100%;'}
        ${params?.fullWidth === false && 'width: fit-content;'}
        ${params?.css}
      `,
    )}
  `;

const buttonSizeStyle = ({ size }: ButtonProps<ButtonVariant> = {}) => {
  switch (size) {
    case 'large':
      return css`
        border-radius: 10px;
        padding: 12px 28px;
        gap: 6px;

        & > svg {
          font-size: 20px;
        }
        & > span {
          ${typographyStyle('body1_normal', 'bold')}
        }
      `;
    case 'medium':
      return css`
        border-radius: 8px;
        padding: 9px 20px;
        gap: 5px;

        & > svg {
          font-size: 18px;
        }
        & > span {
          ${typographyStyle('body2_normal', 'bold')}
        }
      `;
    case 'small':
      return css`
        border-radius: 6px;
        padding: 7px 14px;
        gap: 4px;

        & > svg {
          font-size: 16px;
        }
        & > span {
          ${typographyStyle('label2', 'bold')}
        }
      `;
  }
};

const buttonColorStyle = (
  { variant, color }: ButtonProps<ButtonVariant> = {},
  theme: Theme,
) => {
  switch (true) {
    case variant === 'solid' && color === 'primary':
      return css`
        color: ${theme.palette.static.white};
        background-color: ${theme.palette.primary.normal};
        box-shadow: none;

        &:disabled {
          color: ${theme.palette.label.assistive};
          background-color: ${theme.palette.interaction.disable};
          box-shadow: none;
        }
      `;
    case variant === 'outlined' && color === 'primary':
      return css`
        color: ${theme.palette.primary.normal};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.palette.primary.normal};

        &:disabled {
          color: ${theme.palette.label.disable};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};
        }
      `;
    case variant === 'outlined' && color === 'secondary':
      return css`
        color: ${theme.palette.primary.normal};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};

        &:disabled {
          color: ${theme.palette.label.disable};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};
        }
      `;
    case variant === 'outlined' && color === 'assistive':
      return css`
        color: ${theme.palette.label.normal};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};

        &:disabled {
          color: ${theme.palette.label.disable};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};
        }
      `;
  }
};
