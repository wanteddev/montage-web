import { css, getColorByToken } from '@montage-ui/engine';

import { typographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { Theme } from '@montage-ui/engine';
import type { PushBadgeProps } from './types';

type PushBadgeWrapperStyleProps = PushBadgeProps & {
  shouldFixedWidth: boolean;
};

export const pushBadgeWrapperStyle =
  ({
    shouldFixedWidth,
    offsetX,
    offsetY,
    variant,
    size,
    xs,
    sm,
    md,
    lg,
    xl,
  }: PushBadgeWrapperStyleProps) =>
  (theme: Theme) => css`
    width: fit-content;
    height: fit-content;
    display: inline-flex;
    vertical-align: middle;
    position: relative;
    border-radius: inherit;

    --push-badge-offset-x: ${offsetX ?? '0px'};
    --push-badge-offset-y: ${offsetY ?? '0px'};

    --push-badge-background-color: ${theme.semantic.surface.brand.primary};
    --push-badge-text-color: ${theme.semantic.static.white};

    & > [data-component='push-badge'] {
      ${pushBadgeSizeStyle({ variant, size, shouldFixedWidth }, theme)}
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.size &&
        css`
          & > [data-component='push-badge'] {
            ${pushBadgeSizeStyle(
              { variant, size: params.size, shouldFixedWidth },
              theme,
            )}
          }
        `}

        ${params?.offsetX !== undefined &&
        css`
          --push-badge-offset-x: ${params.offsetX};
        `}
          ${params?.offsetY !== undefined &&
        css`
          --push-badge-offset-y: ${params.offsetY};
        `}
        ${params?.sx}
      `,
    )}
  `;

const pushBadgeSizeStyle = (
  { size, variant, shouldFixedWidth }: PushBadgeWrapperStyleProps,
  theme: Theme,
) => {
  switch (variant) {
    case 'text':
    case 'max-count': {
      switch (size) {
        case 'xsmall':
          return css`
            height: ${theme.dimension[16]};
            min-width: ${theme.dimension[16]};
            padding: 1px ${theme.spacing[4]};
            ${typographyStyle('caption2', 'bold')}

            ${shouldFixedWidth &&
            css`
              width: ${theme.dimension[16]};
            `}

            --push-badge-outline-border-width: 1px;
          `;
        case 'small':
          return css`
            height: ${theme.dimension[20]};
            min-width: ${theme.dimension[20]};
            padding: 3px ${theme.spacing[6]};
            ${typographyStyle('caption2', 'bold')}

            ${shouldFixedWidth &&
            css`
              width: ${theme.dimension[20]};
            `}

            --push-badge-outline-border-width: 1.5px;
          `;
        case 'medium':
          return css`
            height: ${theme.dimension[24]};
            min-width: ${theme.dimension[24]};
            padding: ${theme.spacing[2]} 7px;
            ${typographyStyle('label1', 'bold')}

            ${shouldFixedWidth &&
            css`
              width: ${theme.dimension[24]};
            `}

            --push-badge-outline-border-width: 2px;
          `;
      }
    }
    case 'dot': {
      switch (size) {
        case 'xsmall':
          return css`
            --push-badge-outline-border-width: 1px;

            svg {
              font-size: 5px;
            }
          `;
        case 'small':
          return css`
            --push-badge-outline-border-width: 1.5px;

            svg {
              font-size: 6px;
            }
          `;
        case 'medium':
          return css`
            --push-badge-outline-border-width: 2px;

            svg {
              font-size: 10px;
            }
          `;
      }
    }
  }
};

export const pushBadgeStyle =
  ({
    variant,
    invisible,
    position,
    outlineBorder,
    outlineBorderColor,
  }: PushBadgeProps) =>
  (theme: Theme) => css`
    z-index: 1;
    position: absolute;
    box-sizing: border-box;
    transition: transform 0.2s ease;
    transform-origin: 0% 0%;

    ${outlineBorder &&
    css`
      outline: var(--push-badge-outline-border-width) solid
        ${getColorByToken(
          theme,
          outlineBorderColor ?? 'semantic.background.neutral.primary',
        )};
      outline-offset: 0px;
    `}

    ${pushBadgePositionStyle({ invisible, position })}
    ${pushBadgeVariantStyle({ variant }, theme)}
  `;

// Adjacent sibling can expose `--icon-button-inset` to pull the badge
// inward by that amount (e.g. IconButton normal variant aligning badge to the
// icon edge instead of the padded chrome edge). Defaults to 0px → no effect.
const INSET = 'var(--icon-button-inset, 0px)';

const pushBadgePositionStyle = ({ position, invisible }: PushBadgeProps) => {
  const transform = `${invisible ? 'scale(0)' : 'scale(1)'} translate(-50%, -50%)`;

  switch (position) {
    case 'top-left':
      return css`
        top: calc(0px + var(--push-badge-offset-y) + ${INSET});
        left: calc(0px + var(--push-badge-offset-x) + ${INSET});
        transform: ${transform};
      `;
    case 'top-center':
      return css`
        top: calc(0px + var(--push-badge-offset-y) + ${INSET});
        left: calc(50% + var(--push-badge-offset-x));
        transform: ${transform};
      `;
    case 'top-right':
      return css`
        top: calc(0px + var(--push-badge-offset-y) + ${INSET});
        left: calc(100% + var(--push-badge-offset-x) - ${INSET});
        transform: ${transform};
      `;

    case 'middle-left':
      return css`
        top: calc(50% + var(--push-badge-offset-y));
        left: calc(0px + var(--push-badge-offset-x) + ${INSET});
        transform: ${transform};
      `;
    case 'middle-center':
      return css`
        top: calc(50% + var(--push-badge-offset-y));
        left: calc(50% + var(--push-badge-offset-x));
        transform: ${transform};
      `;
    case 'middle-right':
      return css`
        top: calc(50% + var(--push-badge-offset-y));
        left: calc(100% + var(--push-badge-offset-x) - ${INSET});
        transform: ${transform};
      `;

    case 'bottom-left':
      return css`
        top: calc(100% + var(--push-badge-offset-y) - ${INSET});
        left: calc(0px + var(--push-badge-offset-x) + ${INSET});
        transform: ${transform};
      `;
    case 'bottom-center':
      return css`
        top: calc(100% + var(--push-badge-offset-y) - ${INSET});
        left: calc(50% + var(--push-badge-offset-x));
        transform: ${transform};
      `;
    case 'bottom-right':
      return css`
        top: calc(100% + var(--push-badge-offset-y) - ${INSET});
        left: calc(100% + var(--push-badge-offset-x) - ${INSET});
        transform: ${transform};
      `;
  }
};

const pushBadgeVariantStyle = ({ variant }: PushBadgeProps, theme: Theme) => {
  switch (variant) {
    case 'text':
    case 'max-count':
      return css`
        text-align: center;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        color: var(--push-badge-text-color);
        background-color: var(--push-badge-background-color);
        border-radius: ${theme.radius.full};
      `;
    case 'dot':
    default:
      return css`
        display: inline-flex;
        justify-content: center;
        flex-shrink: 0;
        align-items: center;
        color: var(--push-badge-background-color);
        border-radius: ${theme.radius.full};

        svg {
          width: 1em !important;
          height: 1em !important;
        }
      `;
  }
};
