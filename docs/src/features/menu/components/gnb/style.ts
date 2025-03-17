import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const gnbWrapperStyle = (theme: Theme) => css`
  position: sticky;
  z-index: ${theme.zIndex.modal};
  top: 0;
  padding: 12px 0px;
  ${theme.semantic.platform.ios.navigation}
  border-bottom: 1px solid ${theme.semantic.line.normal.neutral};
`;

export const gnbItemWrapperStyle = css`
  padding: 8px 0px;
`;

export const gnbActionsStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.fill.normal};
  border-radius: 20px;
  backdrop-filter: blur(32px);
  padding: 16px;
  position: relative;
  font-size: 24px;
`;
