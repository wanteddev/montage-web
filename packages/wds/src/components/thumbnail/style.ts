import { css } from '@emotion/react';

import { createResponsiveStyle, getPreviousValue } from '@/utils';

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
          ratio: getPreviousValue(
            { xs, sm, md, lg },
            'ratio',
            ratio,
            breakpoint!,
          ),
          portrait: getPreviousValue(
            { xs, sm, md, lg },
            'portrait',
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
