import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle, typographyStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { EmptyStateProps } from './types';

const emptyStatePlatformStyle = ({
  platform,
}: Pick<EmptyStateProps, 'platform'>) => {
  switch (platform) {
    case 'mobile':
      return css`
        width: 335px;
        max-width: 100%;

        [wds-component='empty-state-image'] {
          width: 128px;
          height: 128px;
        }

        [wds-component='empty-state-content'] {
          padding-top: 8px;
          padding-bottom: 8px;
        }

        [data-role='empty-state-text-heading'] {
          ${typographyStyle('headline1', 'bold')}
        }
        [data-role='empty-state-text-description'] {
          ${typographyStyle('body2_reading')}
        }

        [wds-component='empty-state-button'] {
          // button/style.ts size="medium"
          border-radius: 10px;
          padding: 9px 20px;
          gap: 5px;

          & > svg {
            font-size: 18px;
          }
          & > span {
            ${typographyStyle('body2_normal', 'medium')}
          }
        }
      `;

    case 'desktop':
      return css`
        width: 400px;
        max-width: 100%;

        [wds-component='empty-state-image'] {
          width: 160px;
          height: 160px;
        }

        [wds-component='empty-state-content'] {
          padding-top: 12px;
          padding-bottom: 12px;
        }

        [data-role='empty-state-text-heading'] {
          ${typographyStyle('heading2', 'bold')}
        }
        [data-role='empty-state-text-description'] {
          ${typographyStyle('body1_reading')}
        }

        [wds-component='empty-state-button'] {
          // button/style.ts size="large"
          border-radius: 12px;
          padding: 12px 28px;
          gap: 6px;

          & > svg {
            font-size: 20px;
          }
          & > span {
            ${typographyStyle('body1_normal', 'medium')}
          }
        }
      `;
  }
};

const emptyStatePaddingStyle = ({
  padding,
  hasImage,
}: Pick<EmptyStateProps, 'padding'> & { hasImage: boolean }) => {
  switch (padding) {
    case 'compact':
      return css`
        padding-top: 80px;
        padding-bottom: ${hasImage ? '100px' : '80px'};
      `;
    case 'normal':
    default:
      return css`
        padding-top: 160px;
        padding-bottom: ${hasImage ? '180px' : '160px'};
      `;
  }
};

export const emptyStateStyle =
  ({
    platform,
    padding,
    width,
    hasImage,
    xs,
    sm,
    md,
    lg,
    xl,
  }: EmptyStateProps & { hasImage: boolean }) =>
  (theme: Theme) => css`
    ${emptyStatePlatformStyle({ platform })}
    ${emptyStatePaddingStyle({ padding, hasImage })}
    width: ${width};

    [wds-component='empty-state-image'] {
      max-width: 100%;
      max-height: 100%;

      svg {
        font-size: 10em;
      }
    }

    [data-role='empty-state-text-heading'] {
      text-align: center;
    }
    [data-role='empty-state-text-description'] {
      text-align: center;
      color: ${theme.palette.label.alternative};
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${emptyStatePlatformStyle({ platform: params?.platform })}
        ${emptyStatePaddingStyle({ padding: params?.padding, hasImage })}
        width: ${params?.width};
        ${params?.sx}
      `,
    )}
  `;

export const emptyStateImageStyle = css``;
