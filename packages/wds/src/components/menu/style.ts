import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const menuPopoverContentStyle = (theme: Theme) => css`
  padding: 0;
  filter: none;
  box-shadow: inset 0 1px 2px 0 ${addOpacity(theme.palette.static.black, 0.04)};
  border-radius: 16px;
`;

export const menuScrollAreaStyle = (theme: Theme) => css`
  width: 320px;
  min-width: 140px;
  border-radius: inherit;
  border: 1px solid ${theme.palette.line.solid.neutral};
  background-color: ${theme.palette.background.elevated.normal};
`;

export const listInMenuStyle = css`
  max-height: 400px;
`;

export const menuGroupTitleStyle = (theme: Theme) => css`
  position: sticky;
  top: 0;
  width: 100%;
  /* width: calc(100% - 13px); */
  padding: 12px 20px 8px;
  z-index: 10;
  margin: auto auto auto 0;
  background-color: ${theme.palette.background.elevated.normal};
`;

export const menuGroupStyle = css`
  width: 100%;
`;

export const menuItemStyle = css`
  width: calc(100% - 40px);
`;
