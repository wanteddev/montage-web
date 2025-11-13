import { css } from '@wanteddev/wds-engine';

import { ellipsisTypographyStyle, typographyStyle } from '../../utils';
import { createResponsiveStyle } from '../../utils/internal/responsive-props';

import type { TopNavigationProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const topNavigationStyle =
  ({ background, variant, xs, sm, md, lg, xl }: TopNavigationProps) =>
  (theme: Theme) => css`
    width: 100%;
    align-items: center;
    position: relative;
    background-color: transparent;

    ${topNavigationBackgroundStyle({ variant, background }, theme)}
    ${topNavigationVariant(variant)}

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${params?.sx}
      `,
    )}
  `;

export const topNavigationWrapperStyle = (
  variant: TopNavigationProps['variant'],
) => {
  switch (variant) {
    case 'normal':
      return css`
        width: 100%;
        padding: var(--wds-top-navigation-padding-y, 16px)
          var(--wds-top-navigation-padding-x, 16px);
        justify-content: center;
        min-height: var(--wds-top-navigation-min-height, 56px);
        position: relative;
      `;
    case 'display':
      return css`
        padding: var(--wds-top-navigation-padding-y, 16px)
          var(--wds-top-navigation-padding-x, 16px);
        gap: 20px;
        width: 100%;
        position: relative;
      `;
    case 'floating':
      return css`
        padding: var(--wds-top-navigation-padding-y, 16px)
          var(--wds-top-navigation-padding-x, 16px);
        top: 0px;
        left: 0px;
        position: absolute;
        justify-content: center;
        width: 100%;
      `;
    case 'search':
      return css`
        padding: var(--wds-top-navigation-padding-y, 16px)
          var(--wds-top-navigation-padding-x, 16px);
        gap: 12px;
        width: 100%;
        position: relative;
      `;
  }
};

const topNavigationBackgroundStyle = (
  { variant, background }: Pick<TopNavigationProps, 'variant' | 'background'>,
  theme: Theme,
) => {
  if (!background) return;

  switch (variant) {
    case 'floating':
      return css`
        backdrop-filter: none;
        background-color: transparent;
      `;
    default:
      return css`
        ${theme.semantic.platform.ios.navigation}
      `;
  }
};

export const topNavigationFloatingBackgroundStyle = (theme: Theme) => css`
  pointer-events: none;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 72px;
  z-index: 0;
  background: linear-gradient(
    to top,
    transparent,
    ${theme.semantic.background.elevated.normal}
  );

  [data-role='top-navigation-floating-background-layer'] {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    &:nth-child(1) {
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1) 10%,
        rgba(0, 0, 0, 1) 30%,
        rgba(0, 0, 0, 0) 40%
      );
      backdrop-filter: blur(1px);
    }

    &:nth-child(2) {
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 10%,
        rgba(0, 0, 0, 1) 20%,
        rgba(0, 0, 0, 1) 40%,
        rgba(0, 0, 0, 0) 50%
      );
      backdrop-filter: blur(2px);
    }

    &:nth-child(3) {
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 20%,
        rgba(0, 0, 0, 1) 40%,
        rgba(0, 0, 0, 1) 60%,
        rgba(0, 0, 0, 0) 70%
      );
      backdrop-filter: blur(4px);
    }

    &:nth-child(4) {
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 40%,
        rgba(0, 0, 0, 1) 60%,
        rgba(0, 0, 0, 1) 80%,
        rgba(0, 0, 0, 0) 90%
      );
      backdrop-filter: blur(6px);
    }

    &:nth-child(5) {
      mask: linear-gradient(to top, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%);
      backdrop-filter: blur(8px);
    }

    &:nth-child(6) {
      mask: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 70%,
        rgba(0, 0, 0, 1) 100%
      );
      backdrop-filter: blur(10px);
    }
  }
`;

const topNavigationVariant = (variant: TopNavigationProps['variant']) => {
  switch (variant) {
    case 'floating':
      return css`
        position: relative;
        height: fit-content;
      `;
  }
};

export const topNavigationTitleStyle = (
  variant?: TopNavigationProps['variant'],
) => {
  switch (variant) {
    case 'normal':
    case 'floating':
      return css`
        width: 100%;
        justify-content: center;
        max-height: 24px;
        padding: 0px 4px;

        h2 {
          width: var(--wds-top-navigation-title-width, 80%);
          text-align: center;
          ${ellipsisTypographyStyle(2)}
          -webkit-line-clamp: 1;
          word-break: keep-all;
          overflow-wrap: anywhere;
        }
      `;
    case 'search':
      return css`
        width: 100%;
        flex: 1 1 auto;
        padding: 0px;

        [wds-component='search-field'] {
          width: 100%;
        }
      `;
    case 'display':
      return css`
        flex: 1 1 auto;
        max-height: 64px;
        padding: 0px 4px;

        h2 {
          ${ellipsisTypographyStyle(2)}
          ${typographyStyle('title3', 'bold')}
          word-break: keep-all;
          overflow-wrap: anywhere;
        }
      `;
    default:
      return css`
        padding: 0px 4px;
      `;
  }
};

export const topNavigationRightIconStyle = (
  variant?: TopNavigationProps['variant'],
) => {
  switch (variant) {
    case 'normal':
    case 'floating':
      return css`
        position: absolute;
        right: var(--wds-top-navigation-padding-x, 16px);
        top: var(--wds-top-navigation-padding-y, 16px);
      `;
    case 'display':
      return undefined;
  }
};

export const topNavigationLeftIconStyle = (
  variant?: TopNavigationProps['variant'],
) => {
  switch (variant) {
    case 'normal':
    case 'floating':
      return css`
        position: absolute;
        left: var(--wds-top-navigation-padding-x, 16px);
        top: var(--wds-top-navigation-padding-y, 16px);
      `;
    case 'display':
      return undefined;
  }
};

export const topNavigationButtonTextStyle = css`
  padding: 0px;
  flex-shrink: 0;

  & > span {
    ${typographyStyle('headline2', 'regular')}
  }

  [wds-component='with-interaction'] {
    height: calc(100% + 8px);
  }
`;
