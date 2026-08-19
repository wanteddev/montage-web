import { css } from '@montage-ui/engine';

import { typographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';
import { toCssValue } from '../../utils/internal/css';

import type { FallbackViewContextType } from './contexts';
import type { Theme } from '@montage-ui/engine';
import type { FallbackViewProps } from './types';

export const fallbackViewStyle =
  ({ platform, padding, width, xs, sm, md, lg, xl }: FallbackViewProps) =>
  (theme: Theme) => css`
    width: ${toCssValue(width)};
    ${fallbackViewPlatformStyle({ platform }, theme)}
    ${fallbackViewPaddingStyle({ padding }, theme)}

    [data-role='fallback-view-text-title'] {
      text-align: center;
      color: ${theme.semantic.foreground.neutral.primary};
      word-break: keep-all;
      overflow-wrap: anywhere;
    }
    [data-role='fallback-view-text-description'] {
      text-align: center;
      color: ${theme.semantic.foreground.neutral.secondary};
      word-break: keep-all;
      overflow-wrap: anywhere;
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${fallbackViewPlatformStyle({ platform: params?.platform }, theme)}
        ${fallbackViewPaddingStyle({ padding: params?.padding }, theme)}
        ${params?.width !== undefined &&
        css`
          width: ${toCssValue(params.width)};
        `}
        ${params?.sx}
      `,
    )}
  `;

const fallbackViewPlatformStyle = (
  { platform }: Pick<FallbackViewProps, 'platform'>,
  theme: Theme,
) => {
  switch (platform) {
    case 'mobile':
      return css`
        width: 335px;
        max-width: 100%;

        --fallback-view-action-area-vertical-gap: ${theme.spacing[8]};
        --fallback-view-action-area-horizontal-gap: ${theme.spacing[10]};

        [data-role='fallback-view-text-title'] {
          ${typographyStyle('headline1', 'bold')}
        }
        [data-role='fallback-view-text-description'] {
          ${typographyStyle('body2-reading')}
        }

        &:has([data-component='fallback-view-image'])
          [data-component='fallback-view-content'] {
          --fallback-view-top-space: ${theme.spacing[8]};
          --fallback-view-bottom-space: 28px;
        }
      `;

    case 'desktop':
      return css`
        width: 400px;
        max-width: 100%;

        --fallback-view-action-area-vertical-gap: ${theme.spacing[10]};
        --fallback-view-action-area-horizontal-gap: ${theme.spacing[12]};

        [data-role='fallback-view-text-title'] {
          ${typographyStyle('heading2', 'bold')}
        }
        [data-role='fallback-view-text-description'] {
          ${typographyStyle('body2-reading', 'regular')}
        }

        &:has([data-component='fallback-view-image'])
          [data-component='fallback-view-content'] {
          --fallback-view-top-space: ${theme.spacing[12]};
          --fallback-view-bottom-space: ${theme.spacing[32]};
        }
      `;
  }
};

const fallbackViewPaddingStyle = (
  { padding }: Pick<FallbackViewProps, 'padding'>,
  theme: Theme,
) => {
  switch (padding) {
    case 'compact':
      return css`
        padding-top: ${theme.spacing[80]};
        padding-bottom: ${theme.spacing[80]};
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

export const fallbackViewContentStyle = css`
  padding-top: var(--fallback-view-top-space, 0px);
  padding-bottom: var(--fallback-view-bottom-space, 0px);
`;
