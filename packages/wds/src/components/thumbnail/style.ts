import { css } from '@wanteddev/wds-engine';

import {
  createResponsiveStyle,
  getPreviousValue,
} from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { Theme } from '@wanteddev/wds-engine';
import type { ThumbnailProps } from './types';

export const thumbnailStyle =
  ({
    ratio,
    portrait,
    radius,
    border,
    width,
    xs,
    sm,
    md,
    lg,
    xl,
  }: ThumbnailProps) =>
  (theme: Theme) => css`
    position: relative;

    ${width !== undefined &&
    css`
      width: ${toCssValue(width)};
    `}

    ${thumbnailRatioStyle({ ratio, portrait })}
    ${thumbnailBorderRadiusStyle({ radius, border }, theme)}

    img {
      border-radius: inherit;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    [data-role='thumbnail-overlay'] {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

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
        ${thumbnailBorderRadiusStyle(params || {}, theme)}
        
        ${params?.width !== undefined &&
        css`
          width: ${toCssValue(params.width)};
        `}

        ${params?.sx}
      `,
    )}
  `;

const thumbnailBorderRadiusStyle = (
  { radius, border }: Pick<ThumbnailProps, 'radius' | 'border'>,
  theme: Theme,
) => css`
  ${radius === true &&
  css`
    border-radius: 12px;
  `}
  ${radius === false &&
  css`
    border-radius: 0px;
  `}

  ${border === true &&
  css`
    position: relative;

    &::after {
      content: '';
      border-radius: inherit;
      inset: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      border: 1px solid ${theme.semantic.line.normal.neutral};
    }
  `}

  ${border === false &&
  css`
    border: none;
  `}
`;

const thumbnailRatioStyle = ({
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
