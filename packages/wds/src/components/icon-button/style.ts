import { css } from '@emotion/react';

import { getColorByToken } from '@/utils/color';
import { createResponsiveStyle } from '@/utils';

import type { IconButtonProps } from './types';
import type { Theme } from '@emotion/react';

const getDefaultSize = (
  variant: IconButtonProps['variant'],
): IconButtonProps['size'] => {
  switch (variant) {
    case 'outlined':
    case 'solid':
      return 'normal';
    default:
      return 24;
  }
};

export const iconButtonStyle =
  ({ xs, sm, md, lg, xl, ...props }: IconButtonProps) =>
  (theme: Theme) => css`
    border-radius: 9999px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
    }

    ${iconButtonSizeStyle(
      props.size || getDefaultSize(props.variant),
      props.variant,
    )}
    ${iconButtonColorStyle(props, theme)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params = {}) => css`
        ${iconButtonSizeStyle(params.size, props.variant)}
        ${params.css}
      `,
    )}
  `;

const iconButtonSizeStyle = (
  size: IconButtonProps['size'],
  variant: IconButtonProps['variant'],
) => {
  if (typeof size === 'number') {
    return css`
      width: ${size}px;
      height: ${size}px;

      ${variant === 'background' &&
      css`
        padding: 2px;
      `}

      ${(variant === 'solid' || variant === 'outlined') &&
      css`
        padding: 6px;
      `}

      svg {
        width: 100% !important;
        height: 100% !important;
      }
    `;
  }

  switch (size) {
    case 'normal':
      return css`
        width: 40px;
        height: 40px;

        ${variant === 'background' &&
        css`
          padding: 2px;
        `}

        ${(variant === 'solid' || variant === 'outlined') &&
        css`
          padding: 10px;
        `}

        svg {
          width: 100%;
          height: 100%;
        }
      `;
    case 'small':
      return css`
        width: 32px;
        height: 32px;

        ${variant === 'background' &&
        css`
          padding: 2px;
        `}

        ${(variant === 'solid' || variant === 'outlined') &&
        css`
          padding: 7px;
        `}

        svg {
          width: 100%;
          height: 100%;
        }
      `;
  }
};

const iconButtonColorStyle = (
  {
    variant,
    color,
    interactionColor,
  }: Pick<IconButtonProps, 'variant' | 'color' | 'interactionColor'>,
  theme: Theme,
) => {
  switch (variant) {
    case 'normal':
      return css`
        background-color: transparent;
        ${Boolean(color) &&
        css`
          color: ${getColorByToken(theme, color!)};
        `}
        border: none;
        box-shadow: none;

        ${Boolean(interactionColor) &&
        css`
          & > [wds-component='with-interaction'] {
            background-color: ${getColorByToken(theme, interactionColor!)};
          }
        `}

        &:disabled {
          background-color: transparent;
          color: ${theme.palette.label.disable};
          box-shadow: none;
          border: none;
        }
      `;
    case 'background':
      return css`
        border: none;
        box-shadow: none;
        background-color: transparent;
        ${Boolean(color) &&
        css`
          color: ${getColorByToken(theme, color!)};
        `}

        ${Boolean(interactionColor) &&
        css`
          & > [wds-component='with-interaction'] {
            background-color: ${getColorByToken(theme, interactionColor!)};
          }
        `}

        &::before {
          position: absolute;
          content: '';
          background-color: ${theme.palette.fill.normal};
          width: calc(100% + 8px);
          height: calc(100% + 8px);
          top: -4px;
          left: -4px;
          border-radius: inherit;
        }

        &:disabled {
          background-color: transparent;
          color: ${theme.palette.label.disable};
          border: none;
          box-shadow: none;

          &::before {
            background-color: ${theme.palette.fill.alternative};
          }
        }
      `;
    case 'outlined':
      return css`
        border: none;
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};
        background-color: ${theme.palette.background.normal.normal};
        ${Boolean(color) &&
        css`
          color: ${getColorByToken(theme, color!)};
        `}

        ${Boolean(interactionColor) &&
        css`
          & > [wds-component='with-interaction'] {
            background-color: ${getColorByToken(theme, interactionColor!)};
          }
        `}

        &:disabled {
          color: ${theme.palette.label.disable};
          background-color: ${theme.palette.background.normal.normal};
          box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};
        }
      `;
    case 'solid':
      return css`
        border: none;
        background-color: ${theme.palette.primary.normal};

        ${Boolean(color) &&
        css`
          color: ${getColorByToken(theme, color!)};
        `}

        ${Boolean(interactionColor) &&
        css`
          & > [wds-component='with-interaction'] {
            background-color: ${getColorByToken(theme, interactionColor!)};
          }
        `}

        &:disabled {
          color: ${theme.palette.label.disable};
          background-color: ${theme.palette.fill.normal};
          backdrop-filter: blur(32px);
        }
      `;
  }
};
