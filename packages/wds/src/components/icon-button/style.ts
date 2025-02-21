import { css, getColorByToken } from '@wanteddev/wds-engine';

import { addOpacity, createResponsiveStyle } from '../../utils';

import type { IconButtonProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

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

    &:disabled,
    &[aria-disabled='true'] {
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
        ${params.sx}
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
    alternative,
  }: Pick<
    IconButtonProps,
    'variant' | 'color' | 'interactionColor' | 'alternative'
  >,
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

        &:disabled, &[aria-disabled='true'] {
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
        color: ${alternative
          ? addOpacity(theme.palette.static.white, theme.opacity[88])
          : addOpacity(theme.palette.static.black, theme.opacity[43])};

        ${!alternative &&
        css`
          @supports (-webkit-backdrop-filter: none) {
            color: ${addOpacity(
              theme.palette.coolNeutral[50],
              theme.opacity[61],
            )};
          }
        `}

        svg {
          position: relative;

          ${!alternative &&
          css`
            @supports (-webkit-backdrop-filter: none) {
              will-change: mix-blend-mode;
              mix-blend-mode: plus-darker;
            }
          `}
        }

        ${Boolean(color) &&
        css`
          color: ${getColorByToken(theme, color!)};
        `}

        &::before {
          position: absolute;
          content: '';
          width: calc(100% + 8px);
          height: calc(100% + 8px);
          top: -4px;
          left: -4px;
          border-radius: inherit;

          ${alternative
            ? css`
                background-color: ${addOpacity(
                  theme.palette.coolNeutral[30],
                  theme.opacity[61],
                )};
              `
            : css`
                background-color: ${addOpacity(
                  theme.palette.static.white,
                  theme.opacity[52],
                )};
                will-change: backdrop-filter;
                backdrop-filter: blur(32px) saturate(150%) brightness(150%);

                @supports (-webkit-backdrop-filter: none) {
                  clip-path: inset(0 round 1000px);
                  overflow: auto;
                  border-radius: 0;
                }

                @supports (-moz-appearance: none) {
                  clip-path: inset(0 round 1000px);
                  overflow: auto;
                  border-radius: 0;
                }
              `}
        }

        &:focus-visible {
          outline: none;

          &::before {
            outline-width: 2px;
            outline-style: solid;
            outline-color: Highlight;
            outline-color: -webkit-focus-ring-color;
          }
        }

        &:disabled,
        &[aria-disabled='true'] {
          background-color: transparent;
          color: ${addOpacity(
            theme.palette.coolNeutral[50],
            theme.opacity[22],
          )};
          border: none;
          box-shadow: none;

          &::before {
            background-color: ${theme.palette.fill.alternative};
            backdrop-filter: none;
          }

          svg {
            mix-blend-mode: initial;
          }

          & > [data-role='icon-button-background-blend'] {
            display: none;
          }
          & > [data-role='icon-button-background-blend-layer'] {
            display: none;
          }
        }
      `;
    case 'outlined':
      return css`
        border: none;
        background-color: transparent;
        box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};
        background-color: transparent;
        ${Boolean(color) &&
        css`
          color: ${getColorByToken(theme, color!)};
        `}

        &:disabled, &[aria-disabled='true'] {
          color: ${theme.palette.label.disable};
          background-color: ${theme.palette.background.normal.normal};
          box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.neutral};
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

        &:disabled, &[aria-disabled='true'] {
          color: ${theme.palette.label.disable};
          background-color: ${theme.palette.fill.normal};
          backdrop-filter: blur(32px);
        }
      `;
  }
};

export const backgroundBlendStyle = (theme: Theme) => css`
  position: absolute;
  content: '';
  background-color: ${addOpacity(theme.palette.static.black, theme.opacity[5])};
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  top: -4px;
  left: -4px;
  border-radius: inherit;

  @supports (-webkit-backdrop-filter: none) {
    background-color: ${addOpacity(theme.palette.static.black, 0.14)};
  }
`;
