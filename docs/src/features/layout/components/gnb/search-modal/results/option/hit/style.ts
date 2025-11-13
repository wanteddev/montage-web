import { css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const wrapperStyle = css`
  position: relative;

  &:hover:not(:active):not([aria-selected='true']) {
    & > a > [wds-component='with-interaction'] {
      opacity: 0;
    }
  }

  &[aria-selected='true']:not(:active) {
    & > a > [wds-component='with-interaction'] {
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
  color: ${theme.semantic.label.alternative};
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
    color: ${theme.semantic.label.normal};
    ${typographyStyle('label1', 'bold')}
  }
`;

export const captionStyle = (theme: Theme) => css`
  mark {
    background-color: transparent;
    color: ${theme.semantic.label.normal};
    ${typographyStyle('label2', 'bold')}
  }
`;
