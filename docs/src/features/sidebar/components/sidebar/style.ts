import { css } from '@emotion/react';
import { respondTo } from '@wanteddev/wds';

import type { Theme } from '@emotion/react';

export const sidebarStyle = (theme: Theme) => css`
  width: 150px;
  position: sticky;
  top: calc(var(--header-height) + 24px);
  height: calc(100vh - var(--header-height) - 24px);
  display: flex;
  padding-left: 16px;

  ${respondTo(theme.breakpoint.md)} {
    display: none;
  }
`;

export const sidebarContentStyle = css`
  a {
    display: block;
  }

  &[data-level='2'] {
    a {
      margin-left: 0px;
    }
  }

  &[data-level='3'] {
    a {
      margin-left: 15px;
    }
  }
`;
