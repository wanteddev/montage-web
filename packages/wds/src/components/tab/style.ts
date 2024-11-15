import { css } from '@wanteddev/wds-engine';

import {
  createResponsiveStyle,
  getGradientMaskImage,
  getPreviousValue,
  typographyStyle,
} from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { TabListProps } from './types';

export const tabListStyle =
  ({ resize, padding, size, xs, sm, md, lg, xl }: TabListProps) =>
  (theme: Theme) => css`
    width: 100%;
    list-style: none;
    position: relative;
    padding: 0;
    margin: 0;

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
      (params, breakpoint) => css`
        ${(Boolean(params?.resize) ||
          Boolean(params?.size) ||
          params?.padding !== undefined) &&
        css`
          ${tabPaddingStyle(
            {
              padding: getPreviousValue(
                { xs, sm, md, lg, xl },
                'padding',
                padding,
                breakpoint!,
              ),
              resize: getPreviousValue(
                { xs, sm, md, lg, xl },
                'resize',
                resize,
                breakpoint!,
              )!,
            },
            theme,
          )}
          ${tabSizeStyle({
            size: getPreviousValue(
              { xs, sm, md, lg, xl },
              'size',
              size,
              breakpoint!,
            ),
            resize: getPreviousValue(
              { xs, sm, md, lg, xl },
              'resize',
              resize,
              breakpoint!,
            ),
          })}
        `}
        ${params?.sx}
      `,
    )}
  `;

const tabPaddingStyle = ({ padding, resize }: TabListProps, theme: Theme) => {
  if (resize === 'fill') {
    return css`
      [data-radix-scroll-area-viewport] {
        position: relative;
        left: 0px;
        width: 100%;
      }

      --wds-tab-list-item-flex: 1 1 0;
      --wds-tab-list-item-overflow: hidden;
      --wds-tab-list-item-text-display: block;
      --wds-tab-list-item-text-align: center;
      --wds-tab-right-content-padding: 0px;

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

        --wds-tab-list-item-flex: 0 0 auto;
        --wds-tab-list-item-overflow: initial;
        --wds-tab-list-item-text-display: inline;
        --wds-tab-list-item-text-align: initial;
        --wds-tab-right-content-padding: 0px 16px 0px 4px;
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

        --wds-tab-list-item-flex: 0 0 auto;
        --wds-tab-list-item-overflow: initial;
        --wds-tab-list-item-text-display: inline;
        --wds-tab-list-item-text-align: initial;
        --wds-tab-right-content-padding: 0px;
      `;
  }
};

const tabSizeStyle = ({ size, resize }: TabListProps) => {
  switch (size) {
    case 'small':
      return css`
        --wds-tab-padding-x: ${resize === 'fill' ? '0px' : '12px'};
        --wds-tab-padding-y: 9px;

        [wds-component='tab-list-item'] {
          ${typographyStyle('body2_normal', 'bold')}
        }
      `;
    case 'medium':
      return css`
        --wds-tab-padding-x: ${resize === 'fill' ? '0px' : '12px'};
        --wds-tab-padding-y: 12px;

        [wds-component='tab-list-item'] {
          ${typographyStyle('headline2', 'bold')}
        }
      `;
    case 'large':
      return css`
        --wds-tab-padding-x: ${resize === 'fill' ? '0px' : '12px'};
        --wds-tab-padding-y: 14px;

        [wds-component='tab-list-item'] {
          ${typographyStyle('headline2', 'bold')}
        }
      `;
  }
};

export const scrollWrapperStyle =
  ({
    isScrollableLeft,
    isScrollableRight,
    padding,
    resize,
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
    height: fit-content;
    background-color: transparent;

    ${(isScrollableLeft || isScrollableRight) &&
    css`
      mask-composite: intersect;
      mask-image: ${[
        isScrollableRight && getGradientMaskImage('right', '48px'),
        isScrollableLeft && getGradientMaskImage('left', '48px'),
      ]
        .filter(Boolean)
        .join(', ')};
    `}

    ${scrollWrapperPaddingStyle({ padding, resize })}

    [data-radix-scroll-area-viewport] {
      scroll-behavior: smooth;
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params, breakpoint) => css`
        ${(params?.padding !== undefined || Boolean(params?.resize)) &&
        css`
          ${scrollWrapperPaddingStyle({
            padding: getPreviousValue(
              { xs, sm, md, lg, xl },
              'padding',
              padding,
              breakpoint!,
            ),
            resize: getPreviousValue(
              { xs, sm, md, lg, xl },
              'resize',
              resize,
              breakpoint!,
            ),
          })}
        `}
      `,
    )}
  `;

const scrollWrapperPaddingStyle = ({ padding, resize }: TabListProps) => {
  if (resize === 'fill') {
    return css`
      padding: 0px;
    `;
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

export const tabListItemStyle = (theme: Theme) => css`
  padding: var(--wds-tab-padding-y) var(--wds-tab-padding-x);
  cursor: pointer;
  scroll-margin-inline: 25px;
  flex: var(--wds-tab-list-item-flex, 0 0 auto);
  overflow: var(--wds-tab-list-item-overflow, initial);

  [data-role='tab-list-item-text-wrapper'] {
    position: relative;
    margin: 0;
    height: 100%;
    padding: 0;
  }

  [data-role='tab-list-item-text'] {
    transition: color 0.2s ease;
    display: var(--wds-tab-list-item-text-display, inline);
    text-align: var(--wds-tab-list-item-text-align, initial);
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
    outline: none;
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
`;

export const stickyButtonStyle = css`
  position: sticky;
  right: 0px;
  height: 100%;
  flex-shrink: 0;
  padding: var(--wds-tab-right-content-padding, 0px);
`;
