import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle, typographyStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { EmptyStateImageProps, EmptyStateProps } from './types';

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

        [wds-component='empty-state-image']
          + [wds-component='empty-state-content'] {
          --wds-empty-state-bottom-space: 20px;
        }
        [wds-component='empty-state-content'] {
          padding-top: 8px;
          padding-bottom: calc(8px + var(--wds-empty-state-bottom-space));
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

        [wds-component='empty-state-image']
          + [wds-component='empty-state-content'] {
          --wds-empty-state-bottom-space: 20px;
        }
        [wds-component='empty-state-content'] {
          padding-top: 12px;
          padding-bottom: calc(12px + var(--wds-empty-state-bottom-space));
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
    --wds-empty-state-bottom-space: 0px;

    ${emptyStatePlatformStyle({ platform })}
    ${emptyStatePaddingStyle({ padding })}
    width: ${width};

    [wds-component='empty-state-image'] {
      max-width: 100%;
      max-height: 100%;
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
        ${emptyStatePaddingStyle({ padding: params?.padding })}
        width: ${params?.width};
        ${params?.sx}
      `,
    )}
  `;

const emptyStateImageWidthStyle = ({
  width,
}: Pick<EmptyStateImageProps, 'width'>) => css`
  && {
    width: ${width};
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const emptyStateImageStyle =
  ({ width, xl, lg, md, sm, xs }: EmptyStateImageProps) =>
  (theme: Theme) => css`
    ${emptyStateImageWidthStyle({ width })}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${emptyStateImageWidthStyle({ width: params?.width })}
        ${params?.sx}
      `,
    )}
  `;
