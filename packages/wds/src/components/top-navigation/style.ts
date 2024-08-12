import { css } from '@wanteddev/wds-engine';

import {
  createResponsiveStyle,
  ellipsisTypographyStyle,
  typographyStyle,
} from '../../utils';

import type { TopNavigationButtonProps, TopNavigationProps } from './types';
import type { Theme } from '@wanteddev/wds-engine';

export const topNavigationStyle =
  ({ variant, xs, sm, md, lg, xl }: TopNavigationProps) =>
  (theme: Theme) => css`
    width: 100%;
    align-items: center;
    border-bottom: 1px solid var(--wds-top-navigation-border-color);
    transition: border-color 0.2s ease;
    position: relative;

    [wds-component='tab-list'] {
      &::after {
        background-color: transparent;
      }
    }

    ${topNavigationVariant(variant, theme)}

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
        padding: var(--wds-top-navigation-padding-x, 16px)
          var(--wds-top-navigation-padding-y, 16px);
        justify-content: center;
        min-height: var(--wds-top-navigation-min-height, 56px);
      `;
    case 'extended':
      return css`
        padding: var(--wds-top-navigation-padding-x, 16px)
          var(--wds-top-navigation-padding-y, 16px);
        gap: 16px;
        width: 100%;
        flex-direction: column-reverse;
      `;
    case 'floating':
      return css`
        padding: 0;
      `;
  }
};

const topNavigationVariant = (
  variant: TopNavigationProps['variant'],
  theme: Theme,
) => {
  switch (variant) {
    case 'floating':
      return css`
        position: relative;
      `;
    default:
      return css`
        ${theme.platform.ios.navigation}
      `;
  }
};

export const topNavigationTitleStyle = (
  variant?: TopNavigationProps['variant'],
) => {
  switch (variant) {
    case 'normal':
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
        }
      `;
    case 'extended':
      return css`
        flex: 1 1 auto;
        max-height: 24px;
        padding: 0px 4px;

        h2 {
          ${ellipsisTypographyStyle(2)}
          -webkit-line-clamp: 1;
          ${typographyStyle('title3', 'bold')}
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
      return css`
        position: absolute;
        right: var(--wds-top-navigation-padding-x, 16px);
        top: var(--wds-top-navigation-padding-y, 16px);
      `;
    case 'extended':
      return css`
        margin-left: auto;
      `;
    case 'floating':
      return css`
        position: absolute;
        right: var(--wds-top-navigation-padding-x, 16px);
        top: var(--wds-top-navigation-padding-y, 16px);
      `;
  }
};

export const topNavigationLeftIconStyle = (
  variant?: TopNavigationProps['variant'],
) => {
  switch (variant) {
    case 'normal':
      return css`
        position: absolute;
        left: var(--wds-top-navigation-padding-x, 16px);
        top: var(--wds-top-navigation-padding-y, 16px);
      `;
    case 'extended':
      return undefined;
    case 'floating':
      return css`
        position: absolute;
        left: var(--wds-top-navigation-padding-x, 16px);
        top: var(--wds-top-navigation-padding-y, 16px);
      `;
  }
};

export const topNavigationButtonFloat = ({
  alternative,
}: TopNavigationButtonProps) => css`
  padding: 1px 6px;
  width: fit-content;
  flex-shrink: 0;

  p {
    position: relative;
  }

  ${!alternative &&
  css`
    p {
      will-change: mix-blend-mode;
      mix-blend-mode: difference;
    }
  `}

  &:disabled, &[aria-disabled='true'] {
    p {
      mix-blend-mode: initial;
    }
  }
`;

export const topNavigationButtonTextStyle = (theme: Theme) => css`
  color: ${theme.palette.label.normal};
  padding: 0px;
  flex-shrink: 0;

  & > span {
    ${typographyStyle('body2_normal', 'regular')}
  }

  [wds-component='with-interaction'] {
    height: calc(100% + 8px);
  }
`;
