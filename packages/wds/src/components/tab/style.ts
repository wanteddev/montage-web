import { css } from '@wanteddev/wds-engine';

import { createResponsiveStyle, gradient, typographyStyle } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';
import type { TabListProps } from './types';

export const scrollWrapperStyle =
  ({
    padding,
    xs,
    sm,
    md,
    lg,
    xl,
    isSticky,
  }: TabListProps & { isSticky?: boolean }) =>
  (theme: Theme) => css`
    width: 100%;
    height: fit-content;
    ${scrollWrapperPaddingStyle(padding)}
    ${isSticky && gradient('transparent', 'right', '48px')}
    transition: mask-image 0.2s ease;

    [data-radix-scroll-area-viewport] {
      scroll-behavior: smooth;
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${scrollWrapperPaddingStyle(params?.padding)}
      `,
    )}
  `;

export const tabListStyle =
  ({ padding, size, xs, sm, md, lg, xl }: TabListProps) =>
  (theme: Theme) => css`
    width: 100%;
    list-style: none;
    position: relative;
    padding: 0;

    ${tabPaddingStyle(padding)}
    ${tabSizeStyle(size)}

    &::after {
      position: absolute;
      background-color: ${theme.palette.line.normal.alternative};
      content: '';
      left: 0px;
      bottom: -1px;
      height: 1px;
      width: 100%;
    }

    ${createResponsiveStyle(
      { xs, sm, md, lg, xl },
      theme,
    )(
      (params) => css`
        ${tabPaddingStyle(params?.padding)}
        ${tabSizeStyle(params?.size)}
				${params?.sx}
      `,
    )}
  `;

export const tabListItemStyle = (theme: Theme) => css`
  padding: var(--wds-tab-padding-y) var(--wds-tab-padding-x);
  flex-shrink: 0;
  cursor: pointer;

  scroll-margin-inline: 25px;
  ${typographyStyle('headline2', 'bold')}

  & > span {
    transition: color 0.2s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      transition: background-color 0.2s ease;
      bottom: calc(var(--wds-tab-padding-y) * -1 - 2px);
      max-height: 0px;
      height: 2px;
      width: 100%;
      background-color: transparent;
      will-change: auto;
    }
  }

  &[aria-selected='false']:hover > span {
    color: ${theme.palette.label.alternative};
  }

  &[aria-selected='false'] > span {
    color: ${theme.palette.label.assistive};
    &:hover {
      color: ${theme.palette.label.alternative};
    }
  }

  &[aria-selected='true'] > span {
    color: ${theme.palette.label.strong};
    &::after {
      max-height: 2px;
      background-color: ${theme.palette.label.strong};
    }
  }

  &:focus-visible {
    outline: none;

    & > span {
      outline-color: Highlight;
      outline-color: -webkit-focus-ring-color;
      outline-style: solid;
      outline-width: 2px;
      outline-offset: -1px;
    }
  }
`;

export const stickyButtonStyle = css`
  position: sticky;
  right: 0px;
  height: 100%;
  flex-shrink: 0;
  padding: 0px var(--wds-tab-padding-x);
`;

const tabSizeStyle = (size: TabListProps['size']) => {
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

const scrollWrapperPaddingStyle = (padding: TabListProps['padding']) => {
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

const tabPaddingStyle = (padding: TabListProps['padding']) => {
  switch (padding) {
    case true:
      return css`
        [data-radix-scroll-area-viewport] {
          position: relative;
          left: 0px;
          width: 100%;
        }
      `;
    case false:
      return css`
        [data-radix-scroll-area-viewport] {
          position: relative;
          left: calc(var(--wds-tab-padding-x) * -1);
          width: calc(100% + var(--wds-tab-padding-x));
        }
      `;
  }
};
