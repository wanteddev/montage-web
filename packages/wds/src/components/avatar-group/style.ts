import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle } from '../../utils/responsive-props';

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
      box-shadow: inset 0 0 0 1px ${theme.palette.line.normal.normal};
      position: relative;

      &::after {
        content: '';
        width: 100%;
        height: 100%;
        left: 0px;
        position: absolute;
        top: 0px;
        border-radius: inherit;
        border: 1.5px solid var(--palette-background-normal-normal);
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
