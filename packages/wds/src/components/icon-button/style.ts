import { css, getColorByToken } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { IconButtonProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

const getIconButtonSize = ({
  variant,
  size,
}: Pick<IconButtonProps, 'variant' | 'size'>): IconButtonProps['size'] => {
  switch (variant) {
    case 'outlined':
    case 'solid':
      return size ?? 'medium';
    default:
      return typeof size === 'number' ? size : 24;
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
    position: relative;

    &:disabled,
    &[aria-disabled='true'] {
      pointer-events: none;
      cursor: not-allowed;
    }

    & > [wds-component='with-interaction'] {
      width: auto;
      aspect-ratio: 1 / 1;
    }

    ${iconButtonSizeStyle({ size: props.size, variant: props.variant })}
    ${iconButtonColorStyle(props, theme)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params = {}) => css`
        ${iconButtonSizeStyle({ size: params.size, variant: props.variant })}
        ${params.sx}
      `,
    )}
  `;

const iconButtonSizeStyle = (
  params: Pick<IconButtonProps, 'size' | 'variant'>,
) => {
  const size = getIconButtonSize(params);
  const { variant } = params;

  if (typeof size === 'number') {
    return css`
      font-size: ${size}px;
      width: fit-content;
      height: fit-content;

      svg {
        width: initial;
        height: 1em;
      }

      ${variant === 'background' &&
      css`
        padding: 2px;
        font-size: ${size - 4}px;
      `}

      ${(variant === 'solid' || variant === 'outlined') &&
      css`
        padding: 6px;
        width: ${size}px;
        height: ${size}px;

        svg {
          width: 100%;
          height: 100%;
        }
      `}

      [data-role="push-badge-wrapper"] {
        width: 100%;
        height: 100%;
      }
    `;
  }

  switch (size) {
    case 'medium':
      return css`
        font-size: 40px;
        width: fit-content;
        height: fit-content;

        svg {
          width: initial;
          height: 1em;
        }

        ${variant === 'background' &&
        css`
          padding: 2px;
          font-size: 36px;
        `}

        ${(variant === 'solid' || variant === 'outlined') &&
        css`
          padding: 10px;
          width: 40px;
          height: 40px;

          svg {
            width: 100%;
            height: 100%;
          }
        `}

        [data-role="push-badge-wrapper"] {
          width: 100%;
          height: 100%;
        }
      `;
    case 'small':
      return css`
        font-size: 32px;
        width: fit-content;
        height: fit-content;

        svg {
          width: initial;
          height: 1em;
        }

        ${variant === 'background' &&
        css`
          padding: 2px;
          font-size: 28px;
        `}

        ${(variant === 'solid' || variant === 'outlined') &&
        css`
          padding: 7px;
          width: 32px;
          height: 32px;

          svg {
            width: 100%;
            height: 100%;
          }
        `}

        [data-role="push-badge-wrapper"] {
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
          color: ${theme.semantic.label.disable};
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
          ? addOpacity(theme.semantic.static.white, theme.opacity[88])
          : addOpacity(theme.semantic.static.black, theme.opacity[43])};

        ${!alternative &&
        css`
          @supports (-webkit-backdrop-filter: none) {
            color: ${addOpacity(
              theme.atomic.coolNeutral[50],
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
          width: auto;
          height: calc(100% + 8px);
          aspect-ratio: 1 / 1;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: inherit;

          ${alternative
            ? css`
                background-color: ${addOpacity(
                  theme.atomic.coolNeutral[30],
                  theme.opacity[61],
                )};
              `
            : css`
                background-color: ${addOpacity(
                  theme.semantic.static.white,
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
          color: ${addOpacity(theme.atomic.coolNeutral[50], theme.opacity[22])};
          border: none;
          box-shadow: none;

          &::before {
            background-color: ${theme.semantic.fill.alternative};
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
        box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
        background-color: transparent;
        ${Boolean(color) &&
        css`
          color: ${getColorByToken(theme, color!)};
        `}

        &:disabled, &[aria-disabled='true'] {
          color: ${theme.semantic.label.disable};
          background-color: ${theme.semantic.background.normal.normal};
          box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
        }
      `;
    case 'solid':
      return css`
        border: none;
        background-color: ${theme.semantic.primary.normal};

        ${Boolean(color) &&
        css`
          color: ${getColorByToken(theme, color!)};
        `}

        &:disabled, &[aria-disabled='true'] {
          color: ${theme.semantic.label.disable};
          background-color: ${theme.semantic.fill.normal};
          backdrop-filter: blur(32px);
        }
      `;
  }
};

export const backgroundBlendStyle = (theme: Theme) => css`
  position: absolute;
  content: '';
  background-color: ${addOpacity(
    theme.semantic.static.black,
    theme.opacity[5],
  )};
  width: auto;
  height: calc(100% + 8px);
  aspect-ratio: 1 / 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: inherit;

  @supports (-webkit-backdrop-filter: none) {
    background-color: ${addOpacity(theme.semantic.static.black, 0.14)};
  }
`;
