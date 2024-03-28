import { css } from '@emotion/react';

import { createResponsiveStyle } from '@/utils';

import type { FloatingActionProps } from './types';
import type { Theme } from '@emotion/react';

export const floatingActionStyle =
  ({ size, iconSize, xs, sm, md, lg, xl }: FloatingActionProps) =>
  (theme: Theme) => css`
    background-color: ${theme.palette.primary.normal};
    box-shadow: ${theme.palette.elevation.shadow.strong};
    border-radius: 9999px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 16px;
    color: ${theme.palette.static.white};

    ${floatingActionSizeStyle({ size, iconSize })}

    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
      color: ${theme.palette.label.assistive};
      background-color: ${theme.palette.interaction.disable};
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${floatingActionSizeStyle({
          size: params?.size,
          iconSize: params?.iconSize,
        })}
        ${params?.css}
      `,
    )}
  `;

const floatingActionSizeStyle = ({
  size,
  iconSize,
}: Pick<FloatingActionProps, 'size' | 'iconSize'>) => css`
  ${Boolean(size) &&
  css`
    width: ${size};
    height: ${size};
  `}

  ${Boolean(iconSize) &&
  css`
    font-size: ${iconSize};
  `}
`;
