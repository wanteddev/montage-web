import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/responsive-props';

import type { ButtonProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const buttonStyle =
  ({ xs, sm, md, lg, xl, ...props }: ButtonProps) =>
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

    &:disabled,
    &[aria-disabled='true'] {
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
        ${buttonSizeStyle({ ...params, color: props.color })}
        ${params?.fullWidth && 'width: 100%;'}
        ${params?.fullWidth === false && 'width: fit-content;'}
        ${params?.sx}
      `,
    )}
  `;

const buttonSizeStyle = ({ size, iconOnly, color }: ButtonProps = {}) => {
  const fontWeight = color === 'assistive' ? 'medium' : 'bold';

  switch (size) {
    case 'large':
      return css`
        border-radius: 12px;
        padding: 12px 28px;
        gap: 6px;

        ${iconOnly
          ? css`
              padding: 12px;
              font-size: 24px;

              svg {
                flex-shrink: 0;
              }
            `
          : css`
              & > svg {
                font-size: 20px;
              }
              & > span {
                ${typographyStyle('body1_normal', fontWeight)}
              }
            `}
      `;
    case 'medium':
      return css`
        border-radius: 10px;
        padding: 9px 20px;
        gap: 5px;

        ${iconOnly
          ? css`
              padding: 10px;
              font-size: 20px;

              svg {
                flex-shrink: 0;
              }
            `
          : css`
              & > svg {
                font-size: 18px;
              }
              & > span {
                ${typographyStyle('body2_normal', fontWeight)}
              }
            `}
      `;
    case 'small':
      return css`
        border-radius: 8px;
        padding: 7px 14px;
        gap: 4px;

        ${iconOnly
          ? css`
              padding: 7px;
              font-size: 18px;

              svg {
                flex-shrink: 0;
              }
            `
          : css`
              & > svg {
                font-size: 16px;
              }
              & > span {
                ${typographyStyle('label2', fontWeight)}
              }
            `}
      `;
  }
};

const buttonColorStyle = (
  { variant, color }: ButtonProps = {},
  theme: Theme,
) => {
  switch (true) {
    case variant === 'solid' && color === 'primary':
      return css`
        color: ${theme.palette.static.white};
        background-color: ${theme.palette.primary.normal};
        box-shadow: none;

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.palette.label.assistive};
          background-color: ${theme.palette.interaction.disable};
          box-shadow: none;
        }
      `;
    case variant === 'solid' && color === 'assistive':
      return css`
        color: ${theme.palette.label.neutral};
        background-color: ${theme.palette.fill.normal};
        box-shadow: none;
        backdrop-filter: blur(32px);
        will-change: backdrop-filter;

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.palette.label.assistive};
          background-color: ${theme.palette.interaction.disable};
          box-shadow: none;
          backdrop-filter: none;
        }
      `;
    case variant === 'outlined' && color === 'primary':
      return css`
        color: ${theme.palette.primary.normal};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.palette.primary.normal};

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.palette.label.disable};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};
        }
      `;
    case variant === 'outlined' && color === 'secondary':
      return css`
        color: ${theme.palette.primary.normal};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.palette.label.disable};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};
        }
      `;
    case variant === 'outlined' && color === 'assistive':
      return css`
        color: ${theme.palette.label.normal};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.palette.label.disable};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};
        }
      `;
  }
};
