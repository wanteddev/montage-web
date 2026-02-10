import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { addOpacity } from '../../utils';

import type { AvatarProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const avatarWrapperStyle =
  ({ size, variant, xs, sm, md, lg, xl }: AvatarProps) =>
  (theme: Theme) => css`
    background-color: ${theme.semantic.background.normal.normal};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::after {
      box-shadow: inset 0 0 0 1px
        ${addOpacity(theme.semantic.label.normal, theme.opacity[5])};
      content: '';
      width: 100%;
      height: 100%;
      border-radius: inherit;
      color: inherit;
      font-size: inherit;
      position: absolute;
      inset: 0;
    }

    ${avatarSizeStyle(size, variant)}

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
        ${avatarSizeStyle(params?.size, variant)}
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
  background-color: ${theme.semantic.fill.strong};
  color: ${theme.semantic.static.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const avatarSizeStyle = (
  size: AvatarProps['size'],
  variant: AvatarProps['variant'],
) => {
  const getBorderRadius = (rounded: number) => {
    switch (variant) {
      case 'person':
        return css`
          border-radius: 9999px;

          & > [wds-component='with-interaction'],
          & + [wds-component='with-interaction'] {
            border-radius: 9999px;
          }
        `;
      case 'academy':
      case 'company':
        return css`
          border-radius: ${rounded}px;

          & > [wds-component='with-interaction'],
          & + [wds-component='with-interaction'] {
            border-radius: ${rounded + 8}px;
          }

          &::after {
            border-radius: ${rounded + 1.5}px;
          }
        `;
    }
  };

  if (typeof size === 'number') {
    const customRadius = Math.ceil((size * 0.25) / 2) * 2;

    return css`
      width: ${size}px;
      height: ${size}px;
      font-size: calc(${size}px / 1.5);

      ${getBorderRadius(customRadius)}
    `;
  }

  switch (size) {
    case 'xlarge':
      return css`
        width: 56px;
        height: 56px;
        font-size: 37.4px;

        ${getBorderRadius(14)}
      `;
    case 'large':
      return css`
        width: 48px;
        height: 48px;
        font-size: 32px;

        ${getBorderRadius(12)}
      `;
    case 'medium':
      return css`
        width: 40px;
        height: 40px;
        font-size: 26.7px;

        ${getBorderRadius(10)}
      `;
    case 'small':
      return css`
        width: 32px;
        height: 32px;
        font-size: 21.4px;

        ${getBorderRadius(8)}
      `;
    case 'xsmall':
      return css`
        width: 24px;
        height: 24px;
        font-size: 16px;

        ${getBorderRadius(6)}
      `;
  }
};
