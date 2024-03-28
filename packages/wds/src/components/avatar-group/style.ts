import { css } from '@emotion/react';

import { createResponsiveStyle } from '@/utils';

import type { AvatarGroupProps } from './types';
import type { Theme } from '@emotion/react';

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
      border: 1.5px solid ${theme.palette.background.normal.normal};
      box-shadow: 0 0 0 1px ${theme.palette.line.normal.normal};
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${avatarGroupSizeStyle(params?.size)}
        ${params?.css}
      `,
    )}
  `;

const avatarGroupSizeStyle = (size: AvatarGroupProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        [wds-component='avatar'] {
          margin-left: -8px;

          &:last-child {
            margin-left: 0px;
          }
        }
      `;
    case 'xsmall':
      return css`
        [wds-component='avatar'] {
          margin-left: -6px;

          &:last-child {
            margin-left: 0px;
          }
        }
      `;
  }
};
