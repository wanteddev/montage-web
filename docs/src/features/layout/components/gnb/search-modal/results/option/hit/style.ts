import { css, typographyStyle } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const wrapperStyle = css`
  position: relative;

  &:hover:not(:active):not([aria-selected='true']) {
    & > a > [data-component='with-interaction'] {
      opacity: 0;
    }
  }

  &[aria-selected='true']:not(:active) {
    & > a > [data-component='with-interaction'] {
      opacity: 0.05;
    }
  }
`;

export const linkStyle = css`
  border-radius: 12px;
  width: 100%;
  padding: 8px 0px;
`;

export const contentStyle = (theme: Theme) => css`
  padding: 4px;
  color: ${theme.semantic.foreground.neutral.tertiary};
  flex-shrink: 0;
  height: fit-content;

  & > svg {
    display: block;
  }
`;

export const textStyle = (theme: Theme) => css`
  padding: 2px 0px;
  display: block;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  overflow-wrap: anywhere;
  word-break: keep-all;

  mark {
    background-color: transparent;
    color: ${theme.semantic.foreground.neutral.primary};
    ${typographyStyle('label1', 'bold')}
  }
`;

export const captionStyle = (theme: Theme) => css`
  mark {
    background-color: transparent;
    color: ${theme.semantic.foreground.neutral.primary};
    ${typographyStyle('label2', 'bold')}
  }
`;
