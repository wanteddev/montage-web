import { css } from '@emotion/react';

import {
  createResponsiveStyle,
  getColorByToken,
  getPreviousValue,
} from '@/utils';

import type { DividerProps } from './types';
import type { Theme } from '@emotion/react';

export const dividerStyle =
  ({ vertical, color, size, thickness, xs, sm, md, lg, xl }: DividerProps) =>
  (theme: Theme) => css`
    margin: 0px;
    border-style: solid;
    border-color: ${getColorByToken(theme, color!)};

    ${dividerSizeStyle({ size, vertical, thickness })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params, breakpoint) => css`
        ${dividerSizeStyle({
          size: getPreviousValue(
            { xs, sm, md, lg, xl },
            'size',
            size,
            breakpoint!,
          ),
          thickness: params?.thickness,
          vertical: getPreviousValue(
            { xs, sm, md, lg, xl },
            'vertical',
            vertical,
            breakpoint!,
          ),
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
  (vertical
    ? css`
        border-width: 0px;
        border-right-width: ${thickness};
      `
    : css`
        border-width: 0px;
        border-bottom-width: ${thickness};
      `)}

  ${vertical
    ? css`
        width: 0px;
        height: ${size};
      `
    : css`
        height: 0px;
        width: ${size};
      `};
`;
