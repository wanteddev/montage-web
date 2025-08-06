import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle, typographyStyle } from '../../utils';
import { toCssValue } from '../../utils/internal/css';

import type { Theme } from '@wanteddev/wds-engine';
import type { FallbackViewProps } from './types';

const fallbackViewPlatformStyle = ({
  platform,
}: Pick<FallbackViewProps, 'platform'>) => {
  switch (platform) {
    case 'mobile':
      return css`
        width: 335px;
        max-width: 100%;

        [wds-component='fallback-view-image'] {
          width: 128px;
          height: 128px;
        }

        [wds-component='fallback-view-image']
          + [wds-component='fallback-view-content'] {
          --wds-fallback-view-bottom-space: 20px;
        }
        [wds-component='fallback-view-content'] {
          padding-top: 8px;
          padding-bottom: calc(8px + var(--wds-fallback-view-bottom-space));
        }

        [data-role='fallback-view-text-title'] {
          ${typographyStyle('headline1', 'bold')}
        }
        [data-role='fallback-view-text-description'] {
          ${typographyStyle('body2-reading')}
        }

        [wds-component='fallback-view-button'] {
          // button/style.ts size="medium"
          border-radius: 10px;
          padding: 9px 20px;
          gap: 5px;

          & > svg {
            font-size: 18px;
          }
          & > span {
            ${typographyStyle('body2', 'medium')}
          }
        }
      `;

    case 'desktop':
      return css`
        width: 400px;
        max-width: 100%;

        [wds-component='fallback-view-image'] {
          width: 160px;
          height: 160px;
        }

        [wds-component='fallback-view-image']
          + [wds-component='fallback-view-content'] {
          --wds-fallback-view-bottom-space: 20px;
        }
        [wds-component='fallback-view-content'] {
          padding-top: 12px;
          padding-bottom: calc(12px + var(--wds-fallback-view-bottom-space));
        }

        [data-role='fallback-view-text-title'] {
          ${typographyStyle('heading2', 'bold')}
        }
        [data-role='fallback-view-text-description'] {
          ${typographyStyle('body1-reading')}
        }

        [wds-component='fallback-view-button'] {
          // button/style.ts size="large"
          border-radius: 12px;
          padding: 12px 28px;
          gap: 6px;

          & > svg {
            font-size: 20px;
          }
          & > span {
            ${typographyStyle('body1', 'medium')}
          }
        }
      `;
  }
};

const fallbackViewPaddingStyle = ({
  padding,
}: Pick<FallbackViewProps, 'padding'>) => {
  switch (padding) {
    case 'compact':
      return css`
        padding-top: 80px;
        padding-bottom: 80px;
      `;
    case 'normal':
      return css`
        padding-top: 160px;
        padding-bottom: 160px;
      `;
  }
};

export const fallbackViewStyle =
  ({ platform, padding, width, xs, sm, md, lg, xl }: FallbackViewProps) =>
  (theme: Theme) => css`
    --wds-fallback-view-bottom-space: 0px;

    ${fallbackViewPlatformStyle({ platform })}
    ${fallbackViewPaddingStyle({ padding })}
    width: ${toCssValue(width)};

    [wds-component='fallback-view-image'] {
      max-width: 100%;
      max-height: 100%;

      img {
        max-width: 100%;
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }

    [data-role='fallback-view-text-title'] {
      text-align: center;
    }
    [data-role='fallback-view-text-description'] {
      text-align: center;
      color: ${theme.semantic.label.alternative};
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${fallbackViewPlatformStyle({ platform: params?.platform })}
        ${fallbackViewPaddingStyle({ padding: params?.padding })}
        ${params?.width !== undefined &&
        css`
          width: ${toCssValue(params.width)};
        `}
        ${params?.sx}
      `,
    )}
  `;
