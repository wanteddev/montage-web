import { css } from '@montage-ui/engine';

import { typographyStyle } from '../../utils/typography';
import { addOpacity } from '../../utils/color';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { ButtonProps } from './types';
import type { Theme } from '@montage-ui/engine';

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
    height: auto;
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

    ${buttonColorStyle(props, theme)}
    ${buttonSizeStyle(props, theme)}
    ${props.fullWidth ? 'width: 100%;' : 'width: fit-content;'}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${buttonSizeStyle({ ...params, color: props.color }, theme)}
        ${params?.fullWidth && 'width: 100%;'}
        ${params?.fullWidth === false && 'width: fit-content;'}
        ${params?.sx}
      `,
    )}
  `;

const buttonSizeStyle = (
  { size, iconOnly }: ButtonProps = {},
  theme: Theme,
) => {
  switch (size) {
    case 'large':
      return css`
        border-radius: ${theme.radius[14]};
        min-height: ${theme.dimension[48]};
        padding: 13px ${theme.spacing[20]};
        gap: ${theme.spacing[6]};

        [data-role='button-loading'] {
          width: ${theme.dimension[16]};
          height: ${theme.dimension[16]};
        }

        ${iconOnly
          ? css`
              padding: ${theme.spacing[14]};
              font-size: 20px;

              svg {
                flex-shrink: 0;
              }
            `
          : css`
              & > svg {
                font-size: 20px;
              }
              & > span {
                ${typographyStyle('body2', 'bold')}
              }
            `}
      `;
    case 'medium':
      return css`
        border-radius: ${theme.radius[12]};
        min-height: ${theme.dimension[40]};
        padding: ${theme.spacing[10]} ${theme.spacing[16]};
        gap: ${theme.spacing[4]};

        [data-role='button-loading'] {
          width: ${theme.dimension[14]};
          height: ${theme.dimension[14]};
        }

        ${iconOnly
          ? css`
              padding: 11px;
              font-size: 18px;

              svg {
                flex-shrink: 0;
              }
            `
          : css`
              & > svg {
                font-size: 18px;
              }
              & > span {
                ${typographyStyle('label1', 'bold')}
              }
            `}
      `;
    case 'small':
      return css`
        border-radius: ${theme.radius[10]};
        min-height: ${theme.dimension[32]};
        padding: ${theme.spacing[8]} ${theme.spacing[12]};
        gap: ${theme.spacing[4]};

        [data-role='button-loading'] {
          width: ${theme.dimension[12]};
          height: ${theme.dimension[12]};
        }

        ${iconOnly
          ? css`
              padding: ${theme.spacing[8]};
              font-size: 16px;

              svg {
                flex-shrink: 0;
              }
            `
          : css`
              & > svg {
                font-size: 16px;
              }
              & > span {
                ${typographyStyle('caption1', 'bold')}
              }
            `}
      `;
    case 'xsmall':
      return css`
        border-radius: ${theme.radius[8]};
        min-height: ${theme.dimension[28]};
        padding: ${theme.spacing[6]} ${theme.spacing[10]};
        gap: ${theme.spacing[4]};

        [data-role='button-loading'] {
          width: ${theme.dimension[12]};
          height: ${theme.dimension[12]};
        }

        ${iconOnly
          ? css`
              padding: 7px;
              font-size: 14px;

              svg {
                flex-shrink: 0;
              }
            `
          : css`
              & > svg {
                font-size: 14px;
              }
              & > span {
                ${typographyStyle('caption1', 'bold')}
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
    case variant === 'solid' && color === 'negative':
      return css`
        color: ${theme.semantic.accent.foreground.red};
        background-color: ${addOpacity(
          theme.semantic.status.negative,
          theme.opacity[12],
        )};
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
