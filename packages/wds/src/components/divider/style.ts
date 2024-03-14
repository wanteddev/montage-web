import { css } from '@emotion/react';

import { createResponsiveStyle, getColorByToken } from '@/utils';

import type { DividerProps } from './types';
import type { Theme } from '@emotion/react';

export const dividerStyle =
  ({ vertical, color, size, thickness, xs, sm, md, lg }: DividerProps) =>
  (theme: Theme) => css`
    margin: 0px;
    border-style: solid;
    border-color: ${getColorByToken(theme, color!)};

    ${dividerSizeStyle({ size, vertical, thickness })}

    ${createResponsiveStyle(
      { xs, sm, md, lg },
      theme,
    )(
      (params) => css`
        ${dividerSizeStyle({
          size: params?.size,
          thickness: params?.thickness,
          vertical,
        })}
        ${params?.css}
      `,
    )}
  `;

const dividerSizeStyle = ({
  size,
  thickness,
  vertical,
}: Pick<DividerProps, 'size' | 'thickness' | 'vertical'>) => css`
  ${Boolean(thickness) &&
  css`
    border-width: ${thickness};
  `}

  ${Boolean(size) && vertical
    ? css`
        width: 0px;
        height: ${size};
      `
    : css`
        height: 0px;
        width: ${size};
      `};
`;
