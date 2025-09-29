import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { AvatarGroupProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const avatarGroupStyle =
  ({ size, xs, sm, md, lg, xl }: AvatarGroupProps) =>
  (theme: Theme) => css`
    width: fit-content;

    & > * {
      position: relative;
    }

    ${avatarGroupSizeStyle(size)}

    [wds-component='avatar'] {
      flex-shrink: 0;
      position: relative;

      &::after {
        content: '';
        width: 100%;
        height: 100%;
        left: 0px;
        position: absolute;
        top: 0px;
        border-radius: inherit;
        border: 1.5px solid ${theme.semantic.background.normal.normal};
        margin: -1.5px;
        box-sizing: content-box;
      }
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${avatarGroupSizeStyle(params?.size)}
        ${params?.sx}
      `,
    )}
  `;

const avatarGroupSizeStyle = (size: AvatarGroupProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        gap: 10px;
        [wds-component='avatar'] {
          margin-left: -8px;

          &:last-child {
            margin-left: 0px;
          }
        }
      `;
    case 'xsmall':
      return css`
        gap: 8px;
        [wds-component='avatar'] {
          margin-left: -6px;

          &:last-child {
            margin-left: 0px;
          }
        }
      `;
  }
};
