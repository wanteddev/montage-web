import { css } from '@wanteddev/wds-engine';

import {
  createResponsiveStyle,
  ellipsisTypographyStyle,
  gradient,
  typographyStyle,
} from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type {
  CardContentItemProps,
  CardProps,
  CardThumbnailProps,
  CardThumbnailResponsiveProps,
} from './types';

const cardPlatformStyle = ({ platform }: Pick<CardProps, 'platform'>) => {
  switch (platform) {
    case 'desktop':
      return css`
        // thumbnail
        [wds-component='thumbnail'],
        [wds-component='thumbnail-skeleton'] {
          width: 100%;
          aspect-ratio: 3 / 2;
        }
        // thumbnail content
        [data-role='card-thumbnail-content-wrapper'] {
          padding: 14px;
        }
        [data-role='card-thumbnail-content-text'] {
          ${typographyStyle('label2', 'bold')}
        }
        [data-role='card-thumbnail-content-toggle-icon'] {
          > button {
            width: 24px;
            height: 24px;
            font-size: 24px;
          }
        }
        // content
        [wds-component='card-content'] {
          padding: 0 6px;
        }
        // text
        [wds-component='card-title'] {
          ${typographyStyle('body1_normal', 'bold')}
        }
        [wds-component='card-caption'] {
          ${typographyStyle('label2', 'medium')}
        }
      `;

    case 'mobile':
      return css`
        // thumbnail
        [wds-component='thumbnail'],
        [wds-component='thumbnail-skeleton'] {
          width: 100%;
          aspect-ratio: 4 / 3;
        }
        // thumbnail content
        [data-role='card-thumbnail-content-wrapper'] {
          padding: 10px;
        }
        [data-role='card-thumbnail-content-text'] {
          ${typographyStyle('caption1', 'bold')}
        }
        [data-role='card-thumbnail-content-toggle-icon'] {
          > button {
            width: 20px;
            height: 20px;
            font-size: 20px;
          }
        }
        // content
        [wds-component='card-content'] {
          padding: 0;
        }
        // text
        [wds-component='card-title'] {
          ${typographyStyle('body2_normal', 'bold')}
        }
      `;
  }
};

export const cardStyle =
  ({ xs, sm, md, lg, xl, width, platform }: CardProps) =>
  (theme: Theme) => css`
    --wds-card-thumbnail-overlay-z-index: 1;
    --wds-card-thumbnail-content-z-index: 2;

    width: ${width ?? '100%'};
    ${cardPlatformStyle({ platform })}

    &:hover {
      [wds-component='thumbnail'] img {
        transform: scale(1.025);
      }
    }

    // thumbnail
    [wds-component='thumbnail'],
    [wds-component='thumbnail-skeleton'] {
      width: 100%;
    }
    // text
    [wds-component='card-title'] {
      ${ellipsisTypographyStyle(2)}
    }
    [wds-component='card-caption'] {
      ${ellipsisTypographyStyle()}
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.width !== undefined &&
        css`
          width: ${params.width};
        `}
        ${cardPlatformStyle({ platform: params?.platform })}
        ${params?.sx}
      `,
    )}
  `;

const cardThumbnailRatioStyle = ({
  ratio,
}: Pick<CardThumbnailProps, 'ratio'>) => {
  if (!ratio) {
    return;
  }

  const [width, height] = ratio.split(':');
  const parsedRatio = `${width} / ${height}`;

  return css`
    & [wds-component='thumbnail'] {
      aspect-ratio: ${parsedRatio};
    }
  `;
};

export const cardThumbnailStyle =
  ({
    ratio,
    xs,
    sm,
    md,
    lg,
    xl,
  }: Pick<CardThumbnailProps, 'ratio'> & CardThumbnailResponsiveProps) =>
  (theme: Theme) => css`
    position: relative;

    ${cardThumbnailRatioStyle({ ratio })}
    [wds-component='thumbnail'] {
      overflow: hidden;

      img {
        will-change: transform;
        transition: transform 0.2s ease;
      }
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${cardThumbnailRatioStyle({ ratio: params?.ratio })}
        ${params?.sx}
      `,
    )}
  `;

export const cardThumbnailContentWrapperStyle = (theme: Theme) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  > * {
    z-index: var(--wds-card-thumbnail-content-z-index);
  }

  // overlay
  &::before {
    ${gradient(theme.palette.static.black, 'bottom')}
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    opacity: ${theme.opacity[35]};
    z-index: var(--wds-card-thumbnail-overlay-z-index);
  }
`;

export const cardThumbnailContentTextStyle = (theme: Theme) => css`
  color: ${theme.palette.static.white};
`;

export const cardThumbnailContentToggleIconStyle = (theme: Theme) => css`
  button[aria-pressed='false'] {
    color: ${theme.palette.static.white};
  }
`;

export const cardContentItemStyle = ({
  variant,
  position,
}: Pick<CardContentItemProps, 'position' | 'variant'>) => css`
  gap: ${variant === 'badge' ? '6px' : 0};

  ${(() => {
    switch (position) {
      case 'top':
        return css`
          margin-bottom: 4px;
        `;
      case 'bottom':
        return css`
          margin-top: 4px;
        `;
    }
  })()};
`;

const cardSkeletonPlatformStyle = ({
  platform,
}: Pick<CardProps, 'platform'>) => {
  switch (platform) {
    case 'desktop':
      return css`
        // thumbnail
        [wds-component='thumbnail'],
        [wds-component='thumbnail-skeleton'] {
          width: 100%;
          aspect-ratio: 3 / 2;
        }
        // content
        [wds-component='card-content'] {
          padding: 0 6px;
        }
        // skeleton
        [wds-component='card-title-skeleton'] {
          width: 100%;
          height: 24px;
        }
      `;

    case 'mobile':
      return css`
        // thumbnail
        [wds-component='thumbnail'],
        [wds-component='thumbnail-skeleton'] {
          width: 100%;
          aspect-ratio: 4 / 3;
        }
        // content
        [wds-component='card-content'] {
          padding: 0;
        }
        // skeleton
        [wds-component='card-title-skeleton'] {
          width: 100%;
          height: 22px;
        }
      `;
  }
};

export const cardSkeletonStyle =
  ({ xs, sm, md, lg, xl, width, platform }: CardProps) =>
  (theme: Theme) => css`
    width: ${width ?? '100%'};
    ${cardSkeletonPlatformStyle({ platform })}

    // thumbnail
    [wds-component='thumbnail'],
    [wds-component='thumbnail-skeleton'] {
      width: 100%;
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.width !== undefined &&
        css`
          width: ${params.width};
        `}
        ${cardSkeletonPlatformStyle({ platform: params?.platform })}
        ${params?.sx}
      `,
    )}
  `;
