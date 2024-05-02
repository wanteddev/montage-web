import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle, getPreviousValue } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { ThumbnailProps } from './types';

export const thumbnailStyle =
  ({ ratio, portrait, xs, sm, md, lg, xl }: ThumbnailProps) =>
  (theme: Theme) => css`
    object-fit: cover;
    width: 100%;

    ${thumbnailRatioStyle({ ratio, portrait })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params, breakpoint) => css`
        ${(params?.ratio !== undefined || params?.portrait !== undefined) &&
        thumbnailRatioStyle({
          ratio: getPreviousValue(
            { xs, sm, md, lg, xl },
            'ratio',
            ratio,
            breakpoint!,
          ),
          portrait: getPreviousValue(
            { xs, sm, md, lg, xl },
            'portrait',
            portrait,
            breakpoint!,
          ),
        })}
        ${params?.sx}
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
