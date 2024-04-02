import { css } from '@emotion/react';

import type { Theme } from '@emotion/react';

export const menuLinkStyle = (theme: Theme) => css`
  padding: 4px 10px;
  border-radius: 8px;

  &[data-active='true'] {
    background-color: ${theme.palette.fill.strong};
  }
`;
