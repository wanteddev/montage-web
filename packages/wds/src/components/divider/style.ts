import { css, getColorByToken } from '@wanteddev/wds-engine';

import {
  createResponsiveStyle,
  getPreviousValue,
} from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { DividerProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

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
          thickness: getPreviousValue(
            { xs, sm, md, lg, xl },
            'thickness',
            thickness,
            breakpoint!,
          ),
          vertical: getPreviousValue(
            { xs, sm, md, lg, xl },
            'vertical',
            vertical,
            breakpoint!,
          ),
        })}
        ${params?.sx}
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
        border-right-width: ${toCssValue(thickness)};
      `
    : css`
        border-width: 0px;
        border-bottom-width: ${toCssValue(thickness)};
      `)}

  ${vertical
    ? css`
        width: 0px;
        height: ${toCssValue(size)};
      `
    : css`
        height: 0px;
        width: ${toCssValue(size)};
      `};
`;
