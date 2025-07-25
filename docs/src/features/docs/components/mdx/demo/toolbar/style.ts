import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

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
    box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.normal};
  }
`;

export const errorStyle = (theme: Theme) => css`
  svg {
    color: ${theme.semantic.status.negative};
  }
`;
