import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle, typographyStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { EmptyStateProps } from './types';

const emptyStatePlatformStyle =
  ({ platform }: Pick<EmptyStateProps, 'platform'>) =>
  (theme: Theme) => {
    switch (platform) {
      case 'mobile':
        return css`
          width: 335px;
          max-width: 100%;
          padding-top: 8px;
          padding-bottom: 8px;

          [data-role='empty-state-text-heading'] {
            ${typographyStyle('headline1', 'bold')}
          }
          [data-role='empty-state-text-description'] {
            ${typographyStyle('body2_reading')}
            color: ${theme.palette.label.alternative};
          }

          [data-role='empty-state-button'] {
            // button/style.ts size="medium"
            & > svg {
              font-size: 18px;
            }
            & > span {
              ${typographyStyle('body2_normal', 'medium')}
            }
          }
        `;

      case 'desktop':
      default:
        return css`
          width: 400px;
          max-width: 100%;
          padding-top: 12px;
          padding-bottom: 12px;

          [data-role='empty-state-text-heading'] {
            ${typographyStyle('heading2', 'bold')}
          }
          [data-role='empty-state-text-description'] {
            ${typographyStyle('body1_reading')}
            color: ${theme.palette.label.alternative};
          }

          [data-role='empty-state-button'] {
            // button/style.ts size="large"
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
}: Pick<EmptyStateProps, 'padding'>) => {
  switch (padding) {
    case 'compact':
      return css`
        padding-top: 80px;
        padding-bottom: 80px;
      `;
    case 'normal':
    default:
      return css`
        padding-top: 160px;
        padding-bottom: 160px;
      `;
  }
};

export const emptyStateStyle =
  ({ platform, padding, width, xs, sm, md, lg, xl }: EmptyStateProps) =>
  (theme: Theme) => css`
    ${emptyStatePlatformStyle({ platform })(theme)}
    ${emptyStatePaddingStyle({ padding })}
    width: ${width};

    [data-role='empty-state-text-heading'] {
      text-align: center;
      ${typographyStyle('headline1', 'bold')}
    }
    [data-role='empty-state-text-description'] {
      text-align: center;
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${emptyStatePlatformStyle({ platform: params?.platform })(theme)}
        ${emptyStatePaddingStyle({ padding: params?.padding })}
        width: ${params?.width};
        ${params?.sx}
      `,
    )}
  `;
