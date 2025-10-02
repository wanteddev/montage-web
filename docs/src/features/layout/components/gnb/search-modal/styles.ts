import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const searchModalHeaderStyle = css`
  --wds-top-navigation-padding-x: 16px;
  --wds-top-navigation-padding-y: 16px;
`;

export const modalCloseButtonStyle = (theme: Theme) => css`
  flex-shrink: 0;
  padding: 10px;
  background-color: ${theme.semantic.fill.normal};
  backdrop-filter: blur(32px);
  will-change: backdrop-filter;
  color: ${theme.semantic.label.alternative};
`;
