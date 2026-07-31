import { css } from '@montage-ui/engine';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { AvatarProps } from './types';
import type { Theme } from '@montage-ui/engine';

export const avatarWrapperStyle =
  ({ size, variant, xs, sm, md, lg, xl }: AvatarProps) =>
  (theme: Theme) => css`
    background-color: ${theme.semantic.background.neutral.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::after {
      box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.tertiary};
      content: '';
      width: 100%;
      height: 100%;
      border-radius: inherit;
      color: inherit;
      font-size: inherit;
      position: absolute;
      inset: 0;
    }

    ${avatarSizeStyle({ size, variant }, theme)}

    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background: inherit;
      color: inherit;
      font-size: inherit;
      text-align: center;

      ${variant === 'person'
        ? css`
            object-fit: cover;
          `
        : css`
            object-fit: contain;
          `}
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${avatarSizeStyle({ size: params?.size, variant }, theme)}
        ${params?.sx}
      `,
    )}
  `;

export const fallbackWrapperStyle = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  color: inherit;
  font-size: inherit;
  background-color: ${theme.semantic.surface.neutral.strong};
  color: ${theme.semantic.static.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const avatarSizeStyle = ({ size, variant }: AvatarProps, theme: Theme) => {
  /**
   * When use AvatarButton component
   * `&::before` and `[data-component='with-interaction']` to be render for interaction
   */
  const getCustomSizes = (rounded: number | string, avatarSize: number) => {
    switch (variant) {
      case 'person':
        return css`
          border-radius: ${theme.radius.full};

          &::before {
            border-radius: ${theme.radius.full};
          }

          & > [data-component='with-interaction'],
          & + [data-component='with-interaction'] {
            border-radius: ${theme.radius.full};
          }

          & > [data-component='push-badge'],
          & + [data-component='push-badge'],
          &
            + [data-component='with-interaction']
            + [data-component='push-badge'] {
            --push-badge-additional-inset: ${Math.round(
              0.293 * (avatarSize / 2),
            )}px;
          }
        `;
      case 'academy':
      case 'company':
        return css`
          border-radius: ${typeof rounded === 'number'
            ? `${rounded}px`
            : rounded};

          &::before {
            border-radius: ${typeof rounded === 'number'
              ? `${rounded + 8}px`
              : `calc(${rounded} + 8px)`};
          }

          & > [data-component='with-interaction'],
          & + [data-component='with-interaction'] {
            border-radius: ${typeof rounded === 'number'
              ? `${rounded + 8}px`
              : `calc(${rounded} + 8px)`};
          }

          & > [data-component='push-badge'],
          & + [data-component='push-badge'],
          &
            + [data-component='with-interaction']
            + [data-component='push-badge'] {
            --push-badge-additional-inset: ${Math.round(
              0.293 * (avatarSize * 0.25 + 2),
            )}px;
          }
        `;
    }
  };

  if (typeof size === 'number') {
    const customRadius = Math.ceil((size * 0.25) / 2) * 2 + 2;

    return css`
      width: ${size}px;
      height: ${size}px;
      font-size: calc(${size}px / 1.5);

      ${getCustomSizes(customRadius, size)}
    `;
  }

  switch (size) {
    case 'xlarge':
      return css`
        width: 56px;
        height: 56px;
        font-size: 37.4px;

        ${getCustomSizes(theme.radius[16], 56)}
      `;
    case 'large':
      return css`
        width: 48px;
        height: 48px;
        font-size: 32px;

        ${getCustomSizes(theme.radius[14], 48)}
      `;
    case 'medium':
      return css`
        width: 40px;
        height: 40px;
        font-size: 26.7px;

        ${getCustomSizes(theme.radius[12], 40)}
      `;
    case 'small':
      return css`
        width: 32px;
        height: 32px;
        font-size: 21.4px;

        ${getCustomSizes(theme.radius[10], 32)}
      `;
    case 'xsmall':
      return css`
        width: 24px;
        height: 24px;
        font-size: 16px;

        ${getCustomSizes(theme.radius[8], 24)}
      `;
  }
};
