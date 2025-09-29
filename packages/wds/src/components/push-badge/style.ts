import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { Theme } from '@wanteddev/wds-engine';
import type { PushBadgeProps } from './types';

export const pushBadgeWrapperStyle =
  ({ offsetX, offsetY, variant, size, xs, sm, md, lg, xl }: PushBadgeProps) =>
  (theme: Theme) => css`
    width: fit-content;
    height: fit-content;
    display: inline-flex;
    vertical-align: middle;
    position: relative;
    border-radius: inherit;

    --wds-push-badge-offset-x: ${offsetX ?? '0px'};
    --wds-push-badge-offset-y: ${offsetY ?? '0px'};

    & > [wds-component='push-badge'] {
      ${pushBadgeSizeStyle({ variant, size })}
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.size &&
        css`
          & > [wds-component='push-badge'] {
            ${pushBadgeSizeStyle({ variant, size })}
          }
        `}

        ${params?.offsetX !== undefined &&
        css`
          --wds-push-badge-offset-x: ${params.offsetX};
        `}
          ${params?.offsetY !== undefined &&
        css`
          --wds-push-badge-offset-y: ${params.offsetY};
        `}
        ${params?.sx}
      `,
    )}
  `;

export const pushBadgeStyle =
  ({ variant, invisible, position }: PushBadgeProps) =>
  (theme: Theme) => css`
    z-index: 1;
    position: absolute;
    transition: transform 0.2s ease;
    transform-origin: 0% 0%;

    ${pushBadgePositionStyle({ invisible, position })}
    ${pushBadgeVariantStyle({ variant }, theme)}
  `;

const pushBadgePositionStyle = ({ position, invisible }: PushBadgeProps) => {
  switch (position) {
    case 'top-left':
      return css`
        top: calc(0px + var(--wds-push-badge-offset-y));
        left: calc(0px + var(--wds-push-badge-offset-x));
        transform: scale(0) translate(-50%, -50%);
        ${!invisible &&
        css`
          transform: scale(1) translate(-50%, -50%);
        `}
      `;
    case 'top-center':
      return css`
        top: calc(0px + var(--wds-push-badge-offset-y));
        left: calc(50% + var(--wds-push-badge-offset-x));
        transform: scale(0) translate(-50%, -50%);
        ${!invisible &&
        css`
          transform: scale(1) translate(-50%, -50%);
        `}
      `;
    case 'top-right':
      return css`
        top: calc(0px + var(--wds-push-badge-offset-y));
        left: calc(100% + var(--wds-push-badge-offset-x));
        transform: scale(0) translate(-50%, -50%);
        ${!invisible &&
        css`
          transform: scale(1) translate(-50%, -50%);
        `}
      `;

    case 'middle-left':
      return css`
        top: calc(50% + var(--wds-push-badge-offset-y));
        left: calc(0px + var(--wds-push-badge-offset-x));
        transform: scale(0) translate(-50%, -50%);
        ${!invisible &&
        css`
          transform: scale(1) translate(-50%, -50%);
        `}
      `;
    case 'middle-center':
      return css`
        top: calc(50% + var(--wds-push-badge-offset-y));
        left: calc(50% + var(--wds-push-badge-offset-x));
        transform: scale(0) translate(-50%, -50%);
        ${!invisible &&
        css`
          transform: scale(1) translate(-50%, -50%);
        `}
      `;
    case 'middle-right':
      return css`
        top: calc(50% + var(--wds-push-badge-offset-y));
        left: calc(100% + var(--wds-push-badge-offset-x));
        transform: scale(0) translate(-50%, -50%);
        ${!invisible &&
        css`
          transform: scale(1) translate(-50%, -50%);
        `}
      `;

    case 'bottom-left':
      return css`
        top: calc(100% + var(--wds-push-badge-offset-y));
        left: calc(0px + var(--wds-push-badge-offset-x));
        transform: scale(0) translate(-50%, -50%);
        ${!invisible &&
        css`
          transform: scale(1) translate(-50%, -50%);
        `}
      `;
    case 'bottom-center':
      return css`
        top: calc(100% + var(--wds-push-badge-offset-y));
        left: calc(50% + var(--wds-push-badge-offset-x));
        transform: scale(0) translate(-50%, -50%);
        ${!invisible &&
        css`
          transform: scale(1) translate(-50%, -50%);
        `}
      `;
    case 'bottom-right':
      return css`
        top: calc(100% + var(--wds-push-badge-offset-y));
        left: calc(100% + var(--wds-push-badge-offset-x));
        transform: scale(0) translate(-50%, -50%);
        ${!invisible &&
        css`
          transform: scale(1) translate(-50%, -50%);
        `}
      `;
  }
};

const pushBadgeVariantStyle = ({ variant }: PushBadgeProps, theme: Theme) => {
  switch (variant) {
    case 'dot':
      return css`
        display: inline-flex;
        justify-content: center;
        flex-shrink: 0;
        align-items: center;
        color: ${theme.semantic.primary.normal};

        svg {
          width: 1em !important;
          height: 1em !important;
        }
      `;
    case 'new':
    case 'number':
    default:
      return css`
        text-align: center;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        color: ${theme.semantic.static.white};
        background-color: ${theme.semantic.primary.normal};
        border-radius: 9999px;

        & > [data-role='push-badge-text'] {
          display: block;
        }
      `;
  }
};

const pushBadgeSizeStyle = ({ size, variant }: PushBadgeProps) => {
  switch (variant) {
    case 'dot': {
      switch (size) {
        case 'xsmall':
          return css`
            font-size: 4px;
          `;
        case 'small':
          return css`
            font-size: 6px;
          `;
        case 'medium':
          return css`
            font-size: 8px;
          `;
      }
    }
    case 'new': {
      switch (size) {
        case 'xsmall':
          return css`
            height: 16px;
            min-width: 16px;
            aspect-ratio: 1 / 1;

            [data-role='push-badge-text'] {
              ${typographyStyle('caption2', 'bold')}
              line-height: 1;
            }
          `;
        case 'small':
          return css`
            height: 20px;
            min-width: 20px;
            aspect-ratio: 1 / 1;

            [data-role='push-badge-text'] {
              ${typographyStyle('caption2', 'bold')}
              line-height: 1;
            }
          `;
        case 'medium':
          return css`
            height: 24px;
            min-width: 24px;
            aspect-ratio: 1 / 1;

            [data-role='push-badge-text'] {
              ${typographyStyle('label1', 'bold')}
              line-height: 1;
            }
          `;
      }
    }
    case 'number': {
      switch (size) {
        case 'xsmall':
          return css`
            height: 16px;
            min-width: 16px;
            padding: 1px 4px;

            [data-role='push-badge-text'] {
              ${typographyStyle('caption2', 'bold')}
              line-height: 1;
            }
          `;
        case 'small':
          return css`
            height: 20px;
            min-width: 20px;
            padding: 3px 6px;

            [data-role='push-badge-text'] {
              ${typographyStyle('caption2', 'bold')}
              line-height: 1;
            }
          `;
        case 'medium':
          return css`
            height: 24px;
            min-width: 24px;
            padding: 2px 7px;

            [data-role='push-badge-text'] {
              ${typographyStyle('label1', 'bold')}
              line-height: 1;
            }
          `;
      }
    }
  }
};
