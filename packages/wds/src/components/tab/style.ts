import { css } from '@emotion/react';

import { createResponsiveStyle, gradient } from '@/utils';

import type { Theme } from '@emotion/react';
import type { TabProps } from './types';

export const scrollWrapperStyle =
  ({ padding, xs, sm, md, lg }: TabProps) =>
  (theme: Theme) => css`
    width: 100%;
    ${scrollWrapperPaddingStyle(padding)}

    ${createResponsiveStyle(
      { xs, sm, md, lg },
      theme,
    )(
      (params) => css`
        ${scrollWrapperPaddingStyle(params?.padding)}
      `,
    )}
  `;

export const tabStyle =
  ({ padding, size, xs, sm, md, lg }: TabProps) =>
  (theme: Theme) => css`
    width: 100%;
    list-style: none;
    padding: 0;

    & > div {
      min-width: 100%;
      width: max-content;
      border-bottom: 1px solid ${theme.palette.line.normal.alternative};
    }

    ${tabPaddingStyle(padding)}
    ${tabSizeStyle(size)}


		${createResponsiveStyle(
      { xs, sm, md, lg },
      theme,
    )(
      (params) => css`
        ${tabPaddingStyle(params?.padding)}
        ${tabSizeStyle(params?.size)}
				${params?.css}
      `,
    )}
  `;

export const tabItemStyle = (theme: Theme) => css`
  padding: var(--wds-tab-padding-y) var(--wds-tab-padding-x);
  flex-shrink: 0;
  cursor: pointer;
  transition: color 0.2s ease;

  & > span {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: calc(var(--wds-tab-padding-y) * -1 - 3px);
      max-height: 0px;
      height: 2px;
      width: 100%;
      transition: all 0.1s ease-in-out 0.1s;
      background-color: transparent;
      will-change: auto;
    }
  }

  &[aria-current='false'] {
    &:hover {
      color: ${theme.palette.label.alternative};
    }
  }

  &[aria-current='page'] > span::after {
    max-height: 2px;
    background-color: ${theme.palette.label.strong};
  }

  &:focus-visible > span {
    outline: solid 2px Highlight;
    outline: solid 2px -webkit-focus-ring-color;
  }
`;

export const stickyGradientStyle =
  (isSticky: boolean, hasRightIcon: boolean) => (theme: Theme) => css`
    position: sticky;
    right: 0px;
    height: 100%;
    background-color: ${theme.palette.background.normal.normal};

    &::before {
      content: '';
      position: absolute;
      width: 48px;
      height: 100%;
      right: ${hasRightIcon ? 'calc(100% - 1px)' : 'calc(100% + 10px)'};
      transition: opacity 0.2s ease;
      opacity: ${isSticky ? 1 : 0};
      ${gradient(theme.palette.background.normal.normal, 'left')}
    }

    ${!hasRightIcon &&
    css`
      &::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 100%;
        right: calc(100% - 2px);
        transition: opacity 0.2s ease;
        opacity: ${isSticky ? 1 : 0};
        background-color: ${theme.palette.background.normal.normal};
      }
    `}
  `;

const tabSizeStyle = (size: TabProps['size']) => {
  switch (size) {
    case 'small':
      return css`
        li {
          --wds-tab-padding-x: 12px;
          --wds-tab-padding-y: 12px;
          padding: 12px;
        }
      `;
    case 'large':
      css`
        li {
          --wds-tab-padding-x: 12px;
          --wds-tab-padding-y: 14px;
        }
      `;
  }
};

const scrollWrapperPaddingStyle = (padding: TabProps['padding']) => {
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

const tabPaddingStyle = (padding: TabProps['padding']) => {
  switch (padding) {
    case true:
      return css`
        & > div {
          position: relative;
          left: 0;
        }
      `;
    case false:
      return css`
        position: relative;
        left: -12px;
      `;
  }
};
