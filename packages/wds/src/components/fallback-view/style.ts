import { css } from '@wanteddev/wds-engine';

import { typographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { FallbackViewContextType } from './contexts';
import type { Theme } from '@wanteddev/wds-engine';
import type { FallbackViewProps } from './types';

export const fallbackViewStyle =
  ({ platform, padding, width, xs, sm, md, lg, xl }: FallbackViewProps) =>
  (theme: Theme) => css`
    width: ${toCssValue(width)};
    ${fallbackViewPlatformStyle({ platform })}
    ${fallbackViewPaddingStyle({ padding })}
    --wds-fallback-view-bottom-space: 0px;

    &:has([wds-component='fallback-view-image'])
      [wds-component='fallback-view-content'] {
      --wds-fallback-view-bottom-space: 20px;
    }

    [data-role='fallback-view-text-title'] {
      text-align: center;
      color: ${theme.semantic.label.normal};
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

const fallbackViewPlatformStyle = ({
  platform,
}: Pick<FallbackViewProps, 'platform'>) => {
  switch (platform) {
    case 'mobile':
      return css`
        width: 335px;
        max-width: 100%;

        [data-role='fallback-view-text-title'] {
          ${typographyStyle('headline1', 'bold')}
        }
        [data-role='fallback-view-text-description'] {
          ${typographyStyle('body2-reading')}
        }
      `;

    case 'desktop':
      return css`
        width: 400px;
        max-width: 100%;

        [data-role='fallback-view-text-title'] {
          ${typographyStyle('heading2', 'bold')}
        }
        [data-role='fallback-view-text-description'] {
          ${typographyStyle('body1-reading')}
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

export const fallbackViewImageStyle =
  ({ platform, responsive }: FallbackViewContextType) =>
  (theme: Theme) => css`
    max-width: 100%;
    max-height: 100%;
    ${fallbackViewImagePlatformStyle({ platform })}

    img {
      max-width: 100%;
    }

    svg {
      width: 100%;
      height: 100%;
    }

    ${createResponsiveStyle(
      responsive || {},
      theme,
    )(
      (params) => css`
        ${fallbackViewImagePlatformStyle({ platform: params?.platform })}
        ${params?.sx}
      `,
    )}
  `;

const fallbackViewImagePlatformStyle = ({
  platform,
}: FallbackViewContextType) => {
  switch (platform) {
    case 'mobile':
      return css`
        width: 128px;
        height: 128px;
      `;
    case 'desktop':
      return css`
        width: 160px;
        height: 160px;
      `;
  }
};

export const fallbackViewContentStyle =
  ({ platform, responsive }: FallbackViewContextType) =>
  (theme: Theme) => css`
    ${fallbackViewContentPlatformStyle({ platform })}

    ${createResponsiveStyle(
      responsive || {},
      theme,
    )(
      (params) => css`
        ${fallbackViewContentPlatformStyle({ platform: params?.platform })}
        ${params?.sx}
      `,
    )}
  `;

const fallbackViewContentPlatformStyle = ({
  platform,
}: FallbackViewContextType) => {
  switch (platform) {
    case 'mobile':
      return css`
        padding-top: 8px;
        padding-bottom: calc(8px + var(--wds-fallback-view-bottom-space));
      `;
    case 'desktop':
      return css`
        padding-top: 12px;
        padding-bottom: calc(12px + var(--wds-fallback-view-bottom-space));
      `;
  }
};
