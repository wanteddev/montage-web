import { css } from '@wanteddev/wds-engine';

import {
  createResponsiveStyle,
  ellipsisTypographyStyle,
  typographyStyle,
} from '../..';

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
          ${typographyStyle('body1_normal', 'bold')}
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
          ${typographyStyle('body2_normal', 'bold')}
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

    // thumbnail
    [wds-component='thumbnail'], [wds-component='thumbnail-skeleton'] {
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
        width: ${params?.width};
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
