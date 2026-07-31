import { css } from '@montage-ui/engine';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { AvatarGroupProps } from './types';
import type { Theme } from '@montage-ui/engine';

export const avatarGroupStyle =
  ({ size, xs, sm, md, lg, xl }: AvatarGroupProps) =>
  (theme: Theme) => css`
    width: fit-content;

    & > * {
      position: relative;
    }

    ${avatarGroupSizeStyle(size, theme)}

    [data-component='avatar'] {
      flex-shrink: 0;
      position: relative;

      &::after {
        content: '';
        width: 100%;
        height: 100%;
        left: 0px;
        position: absolute;
        top: 0px;
        border: 1.5px solid ${theme.semantic.background.neutral.primary};
        margin: -1.5px;
        box-sizing: content-box;
      }
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${avatarGroupSizeStyle(params?.size, theme)}
        ${params?.sx}
      `,
    )}
  `;

const avatarGroupSizeStyle = (size: AvatarGroupProps['size'], theme: Theme) => {
  switch (size) {
    case 'small':
      return css`
        gap: ${theme.spacing[10]};
        [data-component='avatar'] {
          margin-left: calc(${theme.spacing[8]} * -1);

          &:last-child {
            margin-left: ${theme.spacing[0]};
          }
        }
      `;
    case 'xsmall':
      return css`
        gap: ${theme.spacing[8]};
        [data-component='avatar'] {
          margin-left: calc(${theme.spacing[6]} * -1);

          &:last-child {
            margin-left: ${theme.spacing[0]};
          }
        }
      `;
  }
};
