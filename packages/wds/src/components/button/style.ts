import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { ButtonProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const buttonStyle =
  ({ loading, xs, sm, md, lg, xl, ...props }: ButtonProps) =>
  (theme: Theme) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    box-sizing: border-box;
    line-height: initial;
    white-space: nowrap;
    height: fit-content;
    position: relative;
    cursor: pointer;

    [data-role='button-loading'] {
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
        > *:not([data-role='button-loading']):not(
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

        [data-role='button-loading'] {
          width: 18px;
          height: 18px;
        }

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
                ${typographyStyle('body1', fontWeight)}
              }
            `}
      `;
    case 'medium':
      return css`
        border-radius: 10px;
        padding: 9px 20px;
        gap: 5px;

        [data-role='button-loading'] {
          width: 16px;
          height: 16px;
        }

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
                ${typographyStyle('body2', fontWeight)}
              }
            `}
      `;
    case 'small':
      return css`
        border-radius: 8px;
        padding: 7px 14px;
        gap: 4px;

        [data-role='button-loading'] {
          width: 14px;
          height: 14px;
        }

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
        color: ${theme.semantic.static.white};
        background-color: ${theme.semantic.primary.normal};
        box-shadow: none;

        [data-role='button-loading'] {
          color: inherit;
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.semantic.label.assistive};
          background-color: ${theme.semantic.interaction.disable};
          box-shadow: none;
        }
      `;
    case variant === 'solid' && color === 'assistive':
      return css`
        color: ${theme.semantic.label.neutral};
        background-color: ${theme.semantic.fill.normal};
        box-shadow: none;
        backdrop-filter: blur(32px);
        will-change: backdrop-filter;

        [data-role='button-loading'] {
          color: ${theme.semantic.label.assistive};
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.semantic.label.assistive};
          background-color: ${theme.semantic.interaction.disable};
          box-shadow: none;
          backdrop-filter: none;
        }
      `;
    case variant === 'outlined' && color === 'primary':
      return css`
        color: ${theme.semantic.primary.normal};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};

        [data-role='button-loading'] {
          color: inherit;
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.semantic.label.disable};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
        }
      `;
    case variant === 'outlined' && color === 'assistive':
      return css`
        color: ${theme.semantic.label.normal};
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};

        [data-role='button-loading'] {
          color: ${theme.semantic.label.assistive};
        }

        &:disabled,
        &[aria-disabled='true'] {
          color: ${theme.semantic.label.disable};
          background-color: transparent;
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
        }
      `;
  }
};
