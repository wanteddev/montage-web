import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle, typographyStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { CardProps } from './types';

export const cardPlatformStyle = ({
  platform,
}: Pick<CardProps, 'platform'>) => {
  switch (platform) {
    case 'desktop':
      return css`
        [wds-component='thumbnail'] {
          aspect-ratio: 3 / 2;
        }

        [wds-component='card-content'] {
          padding: 0 6px;
        }
        [wds-component='card-title'] {
          ${typographyStyle('body1_normal', 'bold')}
        }
        [wds-component='card-caption'] {
          ${typographyStyle('label2', 'medium')}
        }
      `;
    case 'mobile':
      return css`
        [wds-component='thumbnail'] {
          aspect-ratio: 4 / 3;
        }

        [wds-component='card-title'] {
          ${typographyStyle('body2_normal', 'bold')}
        }
      `;
  }
};

export const cardStyle =
  ({ xs, sm, md, lg, xl, ...props }: CardProps) =>
  (theme: Theme) => css`
    ${cardPlatformStyle(props)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${cardPlatformStyle(props)}
        ${params?.sx}
      `,
    )}
  `;
