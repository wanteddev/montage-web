import { css } from '@emotion/react';
import { respondTo } from '@wanteddev/wds';

import type { Theme } from '@emotion/react';

export const headerWrapperStyle = (theme: Theme) => css`
  ${theme.platform.ios.navigation}

  position: sticky;
  z-index: 1;
  top: 0;
  width: 100%;
  padding: 10px 20px;
  border-bottom: 1px solid ${theme.palette.line.normal.normal};
`;

export const headerStyle = (theme: Theme) => css`
  width: 100%;
  max-width: 1100px;
  font-size: 40px;

  ${respondTo(theme.breakpoint.sm)} {
    font-size: 32px;
  }
`;

export const menuToggleStyle = (theme: Theme) => css`
  display: none;

  ${respondTo(theme.breakpoint.md)} {
    display: flex;
  }

  &[data-state='open'] > [wds-component='with-interaction'] {
    opacity: ${theme.opacity[12]};
  }
`;
