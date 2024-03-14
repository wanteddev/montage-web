import { css } from '@emotion/react';

import { createResponsiveStyle } from '@/utils';

import type { BreakPoint } from '@/types';
import type { Theme } from '@emotion/react';
import type { ThumbnailProps } from './types';

export const thumbnailStyle =
  ({ ratio, portrait, xs, sm, md, lg }: ThumbnailProps) =>
  (theme: Theme) => css`
    object-fit: cover;
    width: 100%;

    ${thumbnailRatioStyle({ ratio, portrait })}

    ${createResponsiveStyle(
      { xs, sm, md, lg },
      theme,
    )(
      (params, breakpoint) => css`
        ${(params?.ratio !== undefined || params?.portrait !== undefined) &&
        thumbnailRatioStyle({
          ratio: getPreviousRatio(
            { ratio, xs, sm, md, lg },
            ratio,
            breakpoint!,
          ),
          portrait: getPreviousPortrait(
            { portrait, xs, sm, md, lg },
            portrait,
            breakpoint!,
          ),
        })}
        ${params?.css}
      `,
    )}
  `;

export const thumbnailRatioStyle = ({
  ratio,
  portrait,
}: Pick<ThumbnailProps, 'ratio' | 'portrait'>) => {
  if (!ratio) {
    return;
  }

  const [width, height] = ratio.split(':');

  const parsedRatio = portrait
    ? `${height} / ${width}`
    : `${width} / ${height}`;

  return css`
    aspect-ratio: ${parsedRatio};
  `;
};

const getPreviousRatio = (
  params: ThumbnailProps,
  defaultValue: ThumbnailProps['ratio'],
  breakpoint: keyof BreakPoint,
) => {
  switch (breakpoint) {
    case 'lg':
      return params.lg?.ratio ?? defaultValue;
    case 'md':
      return params.md?.ratio ?? params.lg?.ratio ?? defaultValue;
    case 'sm':
      return (
        params.sm?.ratio ?? params.md?.ratio ?? params.lg?.ratio ?? defaultValue
      );
    case 'xs':
      return (
        params.xs?.ratio ??
        params.sm?.ratio ??
        params.md?.ratio ??
        params.lg?.ratio ??
        defaultValue
      );
  }
};

const getPreviousPortrait = (
  params: ThumbnailProps,
  defaultValue: ThumbnailProps['portrait'],
  breakpoint: keyof BreakPoint,
) => {
  switch (breakpoint) {
    case 'lg':
      return params.lg?.portrait ?? defaultValue;
    case 'md':
      return params.md?.portrait ?? params.lg?.portrait ?? defaultValue;
    case 'sm':
      return (
        params.sm?.portrait ??
        params.md?.portrait ??
        params.lg?.portrait ??
        defaultValue
      );
    case 'xs':
      return (
        params.xs?.portrait ??
        params.sm?.portrait ??
        params.md?.portrait ??
        params.lg?.portrait ??
        defaultValue
      );
  }
};
