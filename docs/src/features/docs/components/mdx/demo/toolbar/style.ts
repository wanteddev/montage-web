import { css } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const toolbarStyle = (theme: Theme) => css`
  border-top-width: 0px;
  position: relative;
  padding: 10px 16px;
  overflow: hidden;

  &::before {
    z-index: 0;
    position: absolute;
    content: '';
    height: calc(100% + 2px);
    width: 100%;
    top: -1px;
    left: 0px;
    box-shadow: inset 0 0 0 1px ${theme.semantic.line.neutral.primary};
  }
`;

export const errorStyle = (theme: Theme) => css`
  svg {
    color: ${theme.semantic.foreground.negative.primary};
  }
`;
