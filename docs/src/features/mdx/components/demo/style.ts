import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const demoStyle = (hideCode?: boolean) => (theme: Theme) => css`
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  padding: 16px;
  border: 1px solid ${theme.palette.line.normal.normal};
  background-color: ${theme.palette.background.normal.normal};
  position: relative;

  ${hideCode &&
  css`
    border-radius: 8px;
  `}
`;

export const errorStyle = (hideCode?: boolean) => (theme: Theme) => css`
  background-color: ${theme.palette.status.negative};
  color: ${theme.palette.static.white};
  padding: 2px 6px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1;
  border-radius: 4px;

  ${hideCode &&
  css`
    top: 0px;
  `}
`;
