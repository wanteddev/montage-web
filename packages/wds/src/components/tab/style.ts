import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle, gradient, typographyStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { TabListProps } from './types';

export const tabListStyle =
  ({
    isScrollableLeft,
    isScrollableRight,
    resize,
    padding,
    size,
    xs,
    sm,
    md,
    lg,
    xl,
  }: TabListProps & {
    isScrollableLeft: boolean;
    isScrollableRight: boolean;
  }) =>
  (theme: Theme) => css`
    width: 100%;
    list-style: none;
    position: relative;
    padding: 0;
    transition: mask-image 0.2s ease;

    ${isScrollableLeft &&
    css`
      ${gradient('transparent', 'left', '40px')}
    `}

    ${isScrollableRight &&
    css`
      & > div {
        transition: mask-image 0.2s ease;
        ${gradient('transparent', 'right', '40px')}
      }
    `}

    ${tabPaddingStyle({ padding, resize }, theme)}
    ${tabSizeStyle({ size, resize })}

    &::after {
      position: absolute;
      background-color: ${theme.palette.line.normal.alternative};
      content: '';
      left: 0px;
      bottom: 0px;
      height: 1px;
      width: 100%;
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${tabPaddingStyle({ padding: params?.padding, resize }, theme)}
        ${tabSizeStyle({ size: params?.size, resize })}
				${params?.sx}
      `,
    )}
  `;

const tabPaddingStyle = ({ padding, resize }: TabListProps, theme: Theme) => {
  if (resize === 'fill' && padding !== undefined) {
    return css`
      [data-radix-scroll-area-viewport] {
        position: relative;
        left: 0px;
        width: 100%;
      }

      ${padding === true
        ? css`
            ${theme.platform.ios.navigation}
          `
        : css`
            background-color: transparent;
            backdrop-filter: initial;
          `}
    `;
  }

  switch (padding) {
    case true:
      return css`
        ${theme.platform.ios.navigation}

        [data-radix-scroll-area-viewport] {
          position: relative;
          left: 0px;
          width: 100%;
        }
      `;
    case false:
      return css`
        background-color: transparent;
        backdrop-filter: initial;

        [data-radix-scroll-area-viewport] {
          position: relative;
          left: calc(var(--wds-tab-padding-x) * -1);
          width: calc(100% + var(--wds-tab-padding-x));
        }
      `;
  }
};

const tabSizeStyle = ({ size, resize }: TabListProps) => {
  if (resize === 'fill' && size !== undefined) {
    return css`
      --wds-tab-padding-x: 0px;
      --wds-tab-padding-y: 12px;
    `;
  }

  switch (size) {
    case 'small':
      return css`
        --wds-tab-padding-x: 12px;
        --wds-tab-padding-y: 12px;
      `;
    case 'large':
      return css`
        --wds-tab-padding-x: 12px;
        --wds-tab-padding-y: 14px;
      `;
  }
};

export const scrollWrapperStyle =
  ({ padding, resize, xs, sm, md, lg, xl }: TabListProps) =>
  (theme: Theme) => css`
    width: 100%;
    height: fit-content;
    ${scrollWrapperPaddingStyle({ padding, resize })}

    [data-radix-scroll-area-viewport] {
      scroll-behavior: smooth;
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${scrollWrapperPaddingStyle({ padding: params?.padding, resize })}
      `,
    )}
  `;

const scrollWrapperPaddingStyle = ({ padding, resize }: TabListProps) => {
  if (resize === 'fill' && padding !== undefined) {
    return;
  }

  switch (padding) {
    case true:
      return css`
        padding: 0px 8px;
      `;
    case false:
      return css`
        padding: 0px;
      `;
  }
};

export const tabListItemStyle =
  ({ resize }: Pick<TabListProps, 'resize'>) =>
  (theme: Theme) => css`
    padding: var(--wds-tab-padding-y) var(--wds-tab-padding-x);
    flex-shrink: 0;
    cursor: pointer;
    scroll-margin-inline: 25px;
    ${typographyStyle('headline2', 'bold')}

    [data-role="tab-list-item-text-wrapper"] {
      position: relative;
      margin: 0;
      height: 100%;
      padding: 0;
    }

    [data-role='tab-list-item-text'] {
      transition: color 0.2s ease;
    }

    [data-role='tab-list-item-divider'] {
      position: absolute;
      left: 0;
      transition: background-color 0.2s ease;
      bottom: calc(var(--wds-tab-padding-y) * -1);
      max-height: 0px;
      height: 2px;
      width: 100%;
      background-color: transparent;
      will-change: auto;
      margin: 0;
      padding: 0;
      border: none;
    }

    &[aria-selected='false']:hover [data-role='tab-list-item-text'] {
      color: ${theme.palette.label.alternative};
    }

    &[aria-selected='false'] [data-role='tab-list-item-text'] {
      color: ${theme.palette.label.assistive};
      &:hover {
        color: ${theme.palette.label.alternative};
      }
    }

    &[aria-selected='true'] {
      [data-role='tab-list-item-text'] {
        color: ${theme.palette.label.strong};
      }

      [data-role='tab-list-item-divider'] {
        max-height: 2px;
        background-color: ${theme.palette.label.strong};
      }
    }

    &:focus-visible {
      outline-offset: -1px;
    }

    ${tabItemResizeStyle({ resize })}
  `;

const tabItemResizeStyle = ({ resize }: Pick<TabListProps, 'resize'>) => {
  switch (resize) {
    case 'fill':
      return css`
        flex: 1 1 0;
        overflow: hidden;

        [data-role='tab-list-item-text'] {
          width: 100%;
        }

        [data-role='tab-list-item-text'] {
          display: block;
          width: 100%;
          text-align: center;
        }
      `;
  }
};

export const stickyButtonStyle = css`
  position: sticky;
  right: 0px;
  height: 100%;
  flex-shrink: 0;
  padding: 0px var(--wds-tab-padding-x);
`;
