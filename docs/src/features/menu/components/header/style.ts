import { containerStyle, css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const headerWrapperStyle = (theme: Theme) => css`
  ${theme.platform.ios.navigation}
  position: sticky;
  z-index: ${theme.zIndex.modal};
  top: 0;
  border-bottom: 1px solid ${theme.palette.line.normal.normal};
`;

export const headerStyle = (theme: Theme) => css`
  ${containerStyle(true)(theme)}
  font-size: 40px;
  height: 60px;

  ${respondTo(theme.breakpoint.sm)} {
    font-size: 32px;
    height: 56px;
  }
`;

export const menuToggleStyle = (theme: Theme) => css`
  display: none;

  ${respondTo(theme.breakpoint.sm)} {
    display: flex;
  }

  &[data-state='open'] > [wds-component='with-interaction'] {
    opacity: ${theme.opacity[12]};
  }
`;
