import { css } from '@wanteddev/wds-engine';

import {
  ellipsisTypographyStyle,
  typographyStyle,
} from '../../utils/typography';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { CardListSkeletonProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';
import type { CardProps } from '../card/types';

const cardListPlatformStyle = ({ platform }: Pick<CardProps, 'platform'>) => {
  switch (platform) {
    case 'desktop':
      return css`
        gap: 16px;

        // thumbnail
        [wds-component='thumbnail'],
        [wds-component='thumbnail-skeleton'] {
          width: 120px;
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
        gap: 12px;

        // thumbnail
        [wds-component='thumbnail'],
        [wds-component='thumbnail-skeleton'] {
          width: 96px;
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

export const cardListStyle =
  ({ xs, sm, md, lg, xl, width, platform }: CardProps) =>
  (theme: Theme) => css`
    width: ${width ?? '100%'};
    max-width: 100%;
    ${cardListPlatformStyle({ platform })}

    &:hover {
      [wds-component='thumbnail'] img {
        transform: scale(1.025);
      }
    }

    // thumbnail
    [wds-component='thumbnail'],
    [wds-component='thumbnail-skeleton'] {
      aspect-ratio: 3 / 2;
    }
    // text
    [wds-component='card-title'] {
      ${ellipsisTypographyStyle(1)}
    }
    [wds-component='card-caption'] {
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
        ${cardListPlatformStyle({ platform: params?.platform })}
        ${params?.sx}
      `,
    )}
  `;

export const cardListContentStyle = css`
  width: 24px;
  height: 24px;
  font-size: 24px;
`;

const cardListSkeletonPlatformStyle = ({
  platform,
  hasLeadingContent,
  hasTrailingContent,
}: Pick<
  CardListSkeletonProps,
  'platform' | 'hasLeadingContent' | 'hasTrailingContent'
>) => {
  switch (platform) {
    case 'desktop':
      return css`
        gap: 16px;
        padding-left: ${hasLeadingContent ? '40px' : '0'};
        padding-right: ${hasTrailingContent ? '40px' : '0'};

        // thumbnail
        [wds-component='thumbnail'],
        [wds-component='thumbnail-skeleton'] {
          width: 120px;
        }
        // skeleton
        [wds-component='card-title-skeleton'] {
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
        [wds-component='thumbnail'],
        [wds-component='thumbnail-skeleton'] {
          width: 96px;
        }
        // skeleton
        [wds-component='card-title-skeleton'] {
          width: 75%;
          height: 22px;
        }
      `;
  }
};

export const cardListSkeletonStyle =
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
  }: CardListSkeletonProps) =>
  (theme: Theme) => css`
    width: ${width ?? '100%'};
    max-width: 100%;

    ${cardListSkeletonPlatformStyle({
      platform,
      hasLeadingContent,
      hasTrailingContent,
    })}

    // thumbnail
    [wds-component='thumbnail'], [wds-component='thumbnail-skeleton'] {
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
        ${cardListSkeletonPlatformStyle({
          platform: params?.platform,
          hasLeadingContent,
          hasTrailingContent,
        })}
        ${params?.sx}
      `,
    )}
  `;
