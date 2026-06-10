import { css } from '@montage-ui/engine';

import {
  ellipsisTypographyStyle,
  typographyStyle,
} from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { ListCardSkeletonProps } from './types';
import type { Theme } from '@montage-ui/engine';
import type { CardProps } from '../card/types';

const listCardPlatformStyle = ({ platform }: Pick<CardProps, 'platform'>) => {
  switch (platform) {
    case 'desktop':
      return css`
        gap: 16px;

        // thumbnail
        [data-component='thumbnail'],
        [data-component='thumbnail-skeleton'] {
          width: 120px;
        }
        // text
        [data-component='card-title'] {
          ${typographyStyle('body1', 'bold')}
        }
        [data-component='card-caption'] {
          ${typographyStyle('label2', 'medium')}
        }
      `;
    case 'mobile':
      return css`
        gap: 12px;

        // thumbnail
        [data-component='thumbnail'],
        [data-component='thumbnail-skeleton'] {
          width: 96px;
        }
        // text
        [data-component='card-title'] {
          ${typographyStyle('body2', 'bold')}
        }
        [data-component='card-caption'] {
          ${typographyStyle('label2', 'medium')}
        }
      `;
  }
};

export const listCardStyle =
  ({ xs, sm, md, lg, xl, width, platform }: CardProps) =>
  (theme: Theme) => css`
    width: ${width ?? '100%'};
    max-width: 100%;
    ${listCardPlatformStyle({ platform })}

    &:hover {
      [data-component='thumbnail'] img {
        transform: scale(1.025);
      }
    }

    // thumbnail
    [data-component='thumbnail'],
    [data-component='thumbnail-skeleton'] {
      aspect-ratio: 3 / 2;
    }
    // text
    [data-component='card-title'] {
      ${ellipsisTypographyStyle(1)}
    }
    [data-component='card-caption'] {
      ${ellipsisTypographyStyle(1)}
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
        ${listCardPlatformStyle({ platform: params?.platform })}
        ${params?.sx}
      `,
    )}
  `;

export const listCardContentStyle = css`
  width: 24px;
  height: 24px;
  font-size: 24px;
`;

const listCardSkeletonPlatformStyle = ({
  platform,
  hasLeadingContent,
  hasTrailingContent,
}: Pick<
  ListCardSkeletonProps,
  'platform' | 'hasLeadingContent' | 'hasTrailingContent'
>) => {
  switch (platform) {
    case 'desktop':
      return css`
        gap: 16px;
        padding-left: ${hasLeadingContent ? '40px' : '0'};
        padding-right: ${hasTrailingContent ? '40px' : '0'};

        // thumbnail
        [data-component='thumbnail'],
        [data-component='thumbnail-skeleton'] {
          width: 120px;
        }
        // skeleton
        [data-component='card-title-skeleton'] {
          width: 75%;
          height: 24px;
        }
      `;
    case 'mobile':
      return css`
        gap: 12px;
        padding-left: ${hasLeadingContent ? '36px' : '0'};
        padding-right: ${hasTrailingContent ? '36px' : '0'};

        // thumbnail
        [data-component='thumbnail'],
        [data-component='thumbnail-skeleton'] {
          width: 96px;
        }
        // skeleton
        [data-component='card-title-skeleton'] {
          width: 75%;
          height: 22px;
        }
      `;
  }
};

export const listCardSkeletonStyle =
  ({
    xs,
    sm,
    md,
    lg,
    xl,
    width,
    platform,
    hasLeadingContent,
    hasTrailingContent,
  }: ListCardSkeletonProps) =>
  (theme: Theme) => css`
    width: ${width ?? '100%'};
    max-width: 100%;

    ${listCardSkeletonPlatformStyle({
      platform,
      hasLeadingContent,
      hasTrailingContent,
    })}

    // thumbnail
    [data-component='thumbnail'], [data-component='thumbnail-skeleton'] {
      aspect-ratio: 3 / 2;
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
        ${listCardSkeletonPlatformStyle({
          platform: params?.platform,
          hasLeadingContent,
          hasTrailingContent,
        })}
        ${params?.sx}
      `,
    )}
  `;
