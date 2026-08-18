import { css, respondMore } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const toolbarStyle = (theme: Theme) => css`
  flex: 0 0 auto;
  height: var(--playground-toolbar-height);
  padding: 0 12px;
  box-sizing: border-box;
  background-color: ${theme.semantic.background.neutral.primary};
  box-shadow: inset 0 -1px 0 0 ${theme.semantic.line.neutral.primary};

  ${respondMore(theme.breakpoint.sm)} {
    padding: 0 20px;
  }
`;

export const homeLinkStyle = (theme: Theme) => css`
  flex: 0 0 auto;
  color: ${theme.semantic.foreground.neutral.primary};
  border-radius: 8px;
  outline-offset: 4px;
`;

export const titleStyle = (theme: Theme) => css`
  display: none;

  ${respondMore(theme.breakpoint.md)} {
    display: block;
  }
`;

export const actionsStyle = css`
  flex: 0 0 auto;
`;
