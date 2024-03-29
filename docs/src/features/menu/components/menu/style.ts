import { css } from '@emotion/react';
import { respondTo } from '@wanteddev/wds';

import type { Theme } from '@emotion/react';

export const menuWrapperStyle = (theme: Theme) => css`
  width: 250px;
  flex-shrink: 0;
  padding-top: 20px;
  top: calc(var(--header-height) + 20px);
  position: sticky;
  height: calc(100vh - var(--header-height) - 20px);

  ${respondTo(theme.breakpoint.sm)} {
    display: none;
  }
`;

export const menuLinkStyle = (theme: Theme) => css`
  padding: 4px 10px;
  border-radius: 8px;

  &[data-active='true'] {
    background-color: ${theme.palette.fill.strong};
  }
`;
