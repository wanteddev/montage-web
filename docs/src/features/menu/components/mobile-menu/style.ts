import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const menuLinkStyle = (theme: Theme) => css`
  padding: 4px 10px;
  border-radius: 8px;

  &[data-active='true'] {
    background-color: ${theme.palette.fill.strong};
  }
`;
