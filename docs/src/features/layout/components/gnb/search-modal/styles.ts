import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const searchModalHeaderStyle = css`
  padding: 16px;

  & > div:not([data-role='top-navigation-toolbar']) {
    display: none;
  }
`;

export const modalCloseButtonStyle = (theme: Theme) => css`
  flex-shrink: 0;
  padding: 10px;
  background-color: ${theme.semantic.fill.normal};
  backdrop-filter: blur(32px);
  will-change: backdrop-filter;
  color: ${theme.semantic.label.alternative};
`;
