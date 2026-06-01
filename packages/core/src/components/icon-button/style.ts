import { css, getColorByToken } from '@montage-ui/engine';

import { addOpacity } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import {
  BACKGROUND_PRESET,
  MIN_INTERACTION_SIZE_PX,
  NORMAL_PRESETS,
  OUTLINED_SOLID_PRESETS,
} from './constants';
import {
  maxDimensionToken,
  nearestDimensionToken,
  nearestRadiusToken,
  resolveCompactSize,
} from './helpers';

import type { BackgroundPreset, NormalPreset } from './constants';
import type { IconButtonProps } from './types';
import type { Theme } from '@montage-ui/engine';

export const iconButtonStyle =
  ({ xs, sm, md, lg, xl, ...props }: IconButtonProps) =>
  (theme: Theme) => css`
    border-radius: ${theme.radius.full};
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

    ${iconButtonSizeStyle({ size: props.size, variant: props.variant }, theme)}
    ${iconButtonColorStyle(props, theme)}

  ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params = {}) => css`
        ${iconButtonSizeStyle(
          { size: params.size, variant: props.variant },
          theme,
        )}
        ${params.sx}
      `,
    )}
  `;

// Exposes the gap between the box edge and the icon edge as
// `--wds-icon-button-inset` on the adjacent PushBadge sibling so it can align to
// the icon edge (not the chrome edge). Only normal variant has invisible chrome,
// so this compensation is scoped to 'normal' — other variants keep the badge at
// the visible chrome corner.
const badgeInsetStyle = (inset: string) => css`
  & + [wds-component='push-badge'] {
    --wds-icon-button-inset: ${inset};
  }
`;

// Icon size ratio for custom `number` sizes. normal / background use 2/3 of the
// box; outlined / solid use a tighter 0.47. The result snaps to a dimension token.
const ICON_SIZE_RATIO: Record<
  NonNullable<IconButtonProps['variant']>,
  number
> = {
  normal: 2 / 3,
  background: 2 / 3,
  outlined: 0.47,
  solid: 0.47,
};

// Inset compensates the PushBadge for the gap between the box edge and the icon
// edge: (box − iconSize) / 2.
const insetPx = (box: number, iconSize: number) => `${(box - iconSize) / 2}px`;

const numberSizeStyle = (
  variant: IconButtonProps['variant'],
  size: number,
  theme: Theme,
) => {
  const box = Math.min(
    maxDimensionToken(theme),
    Math.max(MIN_INTERACTION_SIZE_PX, size),
  );
  const iconSize = nearestDimensionToken(
    theme,
    box * ICON_SIZE_RATIO[variant ?? 'normal'],
  );
  return css`
    width: ${box}px;
    height: ${box}px;
    ${variant === 'normal' &&
    css`
      border-radius: ${nearestRadiusToken(theme, box * 0.3)};
      ${badgeInsetStyle(insetPx(box, iconSize))}
    `}

    svg {
      font-size: ${theme.dimension[iconSize as keyof typeof theme.dimension]};
    }
  `;
};

const presetSizeStyle = (
  theme: Theme,
  preset: NormalPreset | BackgroundPreset,
) => css`
  width: ${theme.dimension[preset.box]};
  height: ${theme.dimension[preset.box]};
  ${'radius' in preset &&
  css`
    border-radius: ${theme.radius[preset.radius]};
    ${badgeInsetStyle(insetPx(preset.box, preset.iconSize))}
  `}

  svg {
    font-size: ${theme.dimension[preset.iconSize]};
  }
`;

const iconButtonSizeStyle = (
  params: Pick<IconButtonProps, 'size' | 'variant'>,
  theme: Theme,
) => {
  const { variant, size } = params;

  if (typeof size === 'number') {
    return numberSizeStyle(variant, size, theme);
  }

  switch (variant) {
    case 'normal':
      return presetSizeStyle(theme, NORMAL_PRESETS[size ?? 'xlarge']);
    case 'background':
      return presetSizeStyle(theme, BACKGROUND_PRESET);
    case 'outlined':
    case 'solid':
      return presetSizeStyle(
        theme,
        OUTLINED_SOLID_PRESETS[resolveCompactSize(size)],
      );
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
          inset: 0;
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
          background-color: transparent;
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
  inset: 0;
  border-radius: inherit;

  @supports (-webkit-backdrop-filter: none) {
    background-color: ${addOpacity(theme.semantic.static.black, 0.14)};
  }
`;
