import { css, getColorByToken } from '@wanteddev/wds-engine';

import {
  ellipsisTypographyStyle,
  gradient,
  typographyStyle,
} from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';
import { getWeightMap } from '../typography/style';

import type { TypographyProps } from '../typography/types';
import type { ThumbnailSkeletonProps } from '../thumbnail/types';
import type { Theme } from '@wanteddev/wds-engine';
import type {
  CardContentItemProps,
  CardProps,
  CardThumbnailProps,
  CardTitleProps,
  CardTitleSkeletonProps,
} from './types';

const cardPlatformStyle = ({ platform }: Pick<CardProps, 'platform'>) => {
  switch (platform) {
    case 'desktop':
      return css`
        gap: 8px;
        --wds-card-content-item-top-position-margin-top: 2px;
        --wds-card-content-item-top-position-margin-bottom: 4px;

        --wds-card-content-item-bottom-position-margin-top: 8px;
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
          ${typographyStyle('body1', 'bold')}
        }
        [wds-component='card-caption'] {
          ${typographyStyle('label2', 'medium')}
        }
      `;

    case 'mobile':
      return css`
        gap: 6px;

        --wds-card-content-item-top-position-margin-top: 2px;
        --wds-card-content-item-top-position-margin-bottom: 4px;

        --wds-card-content-item-bottom-position-margin-top: 6px;
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
          ${typographyStyle('caption2', 'bold')}
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
          padding: 0 2px;
        }
        // text
        [wds-component='card-title'] {
          ${typographyStyle('body2', 'bold')}
        }
        [wds-component='card-caption'] {
          ${typographyStyle('label2', 'medium')}
        }
      `;
  }
};

export const cardStyle =
  ({ xs, sm, md, lg, xl, width, platform }: CardProps) =>
  (theme: Theme) => css`
    --wds-card-thumbnail-overlay-z-index: 1;
    --wds-card-thumbnail-content-z-index: 2;

    width: ${toCssValue(width) ?? '100%'};
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

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.width !== undefined &&
        css`
          width: ${toCssValue(params.width)};
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
    & [wds-component='thumbnail'],
    &[wds-component='thumbnail-skeleton'] {
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
  }: Omit<CardThumbnailProps, 'src' | 'width' | 'alt'>) =>
  (theme: Theme) => css`
    position: relative;

    [wds-component='thumbnail'] {
      overflow: hidden;

      img {
        will-change: transform;
        transition: transform 0.2s ease;
      }
    }

    ${cardThumbnailRatioStyle({ ratio })}
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

export const cardThumbnailSkeletonStyle =
  ({ ratio, xs, sm, md, lg, xl }: ThumbnailSkeletonProps) =>
  (theme: Theme) => css`
    width: 100%;
    ${cardThumbnailRatioStyle({ ratio })}
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
    ${gradient(theme.semantic.static.black, 'bottom', '100%', 'mask')}
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
  color: ${theme.semantic.static.white};
`;

export const cardThumbnailContentToggleIconStyle = (theme: Theme) => css`
  button[aria-pressed='false'] {
    color: ${theme.semantic.static.white};
  }
`;

export const cardTitleStyle = (props: CardTitleProps) => (theme: Theme) => css`
  ${ellipsisTypographyStyle(2)}

  &[wds-component='card-title'] {
    ${cardTypographyStyle(props, 'bold')(theme)}
  }
`;

export const cardCaptionStyle =
  (props: TypographyProps) => (theme: Theme) => css`
    ${ellipsisTypographyStyle()}

    &[wds-component='card-caption'] {
      ${cardTypographyStyle(props, 'medium')(theme)}
    }
  `;

export const cardTypographyStyle =
  (props: TypographyProps, defaultWeight?: TypographyProps['weight']) =>
  (theme: Theme) => {
    if (Object.keys(props).length === 0) {
      return undefined;
    }

    const getTypographyStyle = ({ variant, weight }: TypographyProps) => {
      if (!variant && !weight) {
        return undefined;
      }

      if (!variant) {
        return css`
          ${getWeightMap('body1')[weight ?? defaultWeight ?? 'regular']}
        `;
      }

      return typographyStyle(variant, weight);
    };

    const { xs, sm, md, lg, xl } = props;

    return css`
      ${getTypographyStyle(props)}

      ${Boolean(props.color) &&
      css`
        color: ${getColorByToken(theme, props.color!)};
      `}

    ${createResponsiveStyle(
        { xs, sm, md, lg, xl },
        theme,
      )(
        (params) => css`
          ${getTypographyStyle(params ?? {})}
        `,
      )}
    `;
  };

export const cardContentStyle = css`
  overflow: hidden;

  [wds-component='card-title'],
  [wds-component='card-title-skeleton'] {
    margin-bottom: 2px;
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
          margin-top: var(--wds-card-content-item-top-position-margin-top);
          margin-bottom: var(
            --wds-card-content-item-top-position-margin-bottom
          );
        `;
      case 'bottom':
        return css`
          margin-top: var(--wds-card-content-item-bottom-position-margin-top);
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
        gap: 8px;
        --wds-card-content-item-top-position-margin-top: 4px;
        --wds-card-content-item-top-position-margin-bottom: 4px;

        --wds-card-content-item-bottom-position-margin-top: 8px;

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
        gap: 6px;
        --wds-card-content-item-top-position-margin-top: 2px;
        --wds-card-content-item-top-position-margin-bottom: 4px;

        --wds-card-content-item-bottom-position-margin-top: 6px;

        // thumbnail
        [wds-component='thumbnail'],
        [wds-component='thumbnail-skeleton'] {
          width: 100%;
          aspect-ratio: 4 / 3;
        }
        // content
        [wds-component='card-content'] {
          padding: 0 2px;
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

export const cardTitleSkeletonStyle =
  (props: CardTitleSkeletonProps) => (theme: Theme) => css`
    &[wds-component='card-title-skeleton'] {
      ${cardSkeletonWidthStyle(props)(theme)}
    }
  `;

const cardSkeletonWidthStyle =
  ({ width, height, xs, sm, md, lg, xl }: CardTitleSkeletonProps) =>
  (theme: Theme) => {
    return css`
      ${width !== undefined &&
      css`
        width: ${toCssValue(width)};
      `}
      ${height !== undefined &&
      css`
        height: ${toCssValue(height)};
      `}

    ${createResponsiveStyle(
        { xs, sm, md, lg, xl },
        theme,
      )(
        (params) => css`
          ${params?.width !== undefined &&
          css`
            width: ${toCssValue(params.width)};
          `}
          ${params?.height !== undefined &&
          css`
            height: ${toCssValue(params.height)};
          `}
        `,
      )}
    `;
  };
