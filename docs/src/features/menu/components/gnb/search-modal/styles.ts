import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const searchModalHeaderStyle = css`
  & > div:not([data-role='top-navigation-toolbar']) {
    display: none;
  }
`;

export const searchModalToolbarStyle = css`
  padding: var(--wds-top-navigation-padding-x);
`;

export const modalCloseButtonStyle = (theme: Theme) => css`
  flex-shrink: 0;
  padding: 10px;
  background-color: ${theme.semantic.fill.alternative};
  color: ${theme.semantic.label.alternative};
`;
