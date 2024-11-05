import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle, gradient, typographyStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { CardExtraContentProps, CardProps } from './types';

export const cardPlatformStyle = ({
  platform,
}: Pick<CardProps, 'platform'>) => {
  switch (platform) {
    case 'desktop':
      return css`
        // thumbnail
        [wds-component='thumbnail'] {
          width: 100%;
          aspect-ratio: 3 / 2;
        }
        [data-role='card-thumbnail-overlay'] {
          height: 32.5%;
        }
        // thumbnail content
        [data-role='card-thumbnail-content-wrapper'] {
          padding: 14px;
        }
        [data-role='card-thumbnail-content-text'] {
          ${typographyStyle('label2', 'bold')}
        }
        [data-role='card-thumbnail-content-icon'] {
          font-size: 24px;
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
        [wds-component='thumbnail'] {
          width: 100%;
          aspect-ratio: 4 / 3;
        }
        [data-role='card-thumbnail-overlay'] {
          height: 35%;
        }
        // thumbnail content
        [data-role='card-thumbnail-content-wrapper'] {
          padding: 10px;
        }
        [data-role='card-thumbnail-content-text'] {
          ${typographyStyle('caption1', 'bold')}
        }
        [data-role='card-thumbnail-content-icon'] {
          font-size: 20px;
        }

        // text
        [wds-component='card-title'] {
          ${typographyStyle('body2_normal', 'bold')}
        }
      `;
  }
};

export const cardStyle =
  ({ xs, sm, md, lg, xl, width, ...props }: CardProps) =>
  (theme: Theme) => css`
    --wds-card-thumbnail-overlay-z-index: 1;
    --wds-card-thumbnail-content-wrapper-z-index: 2;

    width: ${width ?? '100%'};
    ${cardPlatformStyle(props)}
    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        width: ${params?.width ?? '100%'};
        ${cardPlatformStyle(props)}
        ${params?.sx}
      `,
    )}
  `;

export const cardThumbnailStyle = css`
  position: relative;
`;

export const cardThumbnailContentWrapperStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: var(--wds-card-thumbnail-content-wrapper-z-index);
`;

export const cardThumbnailContentTextStyle = (theme: Theme) => css`
  flex: 1;
  color: ${theme.palette.static.white};
`;

export const cardThumbnailContentIconStyle = (theme: Theme) => css`
  color: ${theme.palette.static.white};
`;

export const cardThumbnailOverlayStyle = (theme: Theme) => css`
  ${gradient(theme.palette.static.black, 'bottom')}
  position: absolute;
  top: 0;
  width: 100%;
  border-radius: 12px;
  opacity: ${theme.opacity[35]};
  z-index: var(--wds-card-thumbnail-overlay-z-index);
`;

export const cardExtraContentStyle = ({
  variant,
  position,
}: Pick<CardExtraContentProps, 'position' | 'variant'>) => css`
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
