import { css } from '@emotion/react';

import { createResponsiveStyle, getColorByToken } from '@/utils';

import type { BreakPoint } from '@/types';
import type {
  DividerDefaultProps,
  DividerProps,
  DividerResponsiveProps,
} from './types';
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
      (params, breakpoint) => css`
        ${dividerSizeStyle({
          size: getPreviousSize({ xs, sm, md, lg }, size, breakpoint!),
          thickness: params?.thickness,
          vertical: getPreviousVertical(
            { xs, sm, md, lg },
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
  css`
    border-width: ${thickness};
  `}

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

const getPreviousSize = (
  params: DividerResponsiveProps,
  defaultValue: DividerDefaultProps['size'],
  breakpoint: keyof BreakPoint,
) => {
  switch (breakpoint) {
    case 'lg':
      return params.lg?.size ?? defaultValue;
    case 'md':
      return params.md?.size ?? params.lg?.size ?? defaultValue;
    case 'sm':
      return (
        params.sm?.size ?? params.md?.size ?? params.lg?.size ?? defaultValue
      );
    case 'xs':
      return (
        params.xs?.size ??
        params.sm?.size ??
        params.md?.size ??
        params.lg?.size ??
        defaultValue
      );
  }
};

const getPreviousVertical = (
  params: DividerResponsiveProps,
  defaultValue: DividerDefaultProps['vertical'],
  breakpoint: keyof BreakPoint,
) => {
  switch (breakpoint) {
    case 'lg':
      return params.lg?.vertical ?? defaultValue;
    case 'md':
      return params.md?.vertical ?? params.lg?.vertical ?? defaultValue;
    case 'sm':
      return (
        params.sm?.vertical ??
        params.md?.vertical ??
        params.lg?.vertical ??
        defaultValue
      );
    case 'xs':
      return (
        params.xs?.vertical ??
        params.sm?.vertical ??
        params.md?.vertical ??
        params.lg?.vertical ??
        defaultValue
      );
  }
};
