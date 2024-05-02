import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/responsive-props';

import type { AvatarProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const avatarWrapperStyle =
  ({ size, variant, xs, sm, md, lg, xl }: AvatarProps) =>
  (theme: Theme) => css`
    background-color: ${theme.palette.background.normal.normal};
    color: ${theme.palette.static.white};
    display: flex;
    align-items: center;
    justify-content: center;

    ${avatarSizeStyle(size, variant)}

    img {
      border-radius: inherit;
      width: inherit;
      height: inherit;
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
  width: inherit;
  height: inherit;
  border-radius: inherit;
  color: inherit;
  font-size: inherit;
  background-color: ${theme.palette.fill.strong};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const avatarSizeStyle = (
  size: AvatarProps['size'],
  variant: AvatarProps['variant'],
) => {
  const getBorderRadius = (rounded: string) => {
    switch (variant) {
      case 'person':
        return css`
          border-radius: 9999px;
        `;
      case 'academic':
      case 'company':
        return css`
          border-radius: ${rounded};
        `;
    }
  };

  switch (size) {
    case 'xlarge':
      return css`
        width: 56px;
        height: 56px;
        font-size: 37.4px;

        ${getBorderRadius('12px')}
      `;
    case 'large':
      return css`
        width: 48px;
        height: 48px;
        font-size: 32px;

        ${getBorderRadius('10px')}
      `;
    case 'medium':
      return css`
        width: 40px;
        height: 40px;
        font-size: 26.7px;

        ${getBorderRadius('8px')}
      `;
    case 'small':
      return css`
        width: 32px;
        height: 32px;
        font-size: 21.4px;

        ${getBorderRadius('6px')}
      `;
    case 'xsmall':
      return css`
        width: 24px;
        height: 24px;
        font-size: 16px;

        ${getBorderRadius('6px')}
      `;
  }
};
