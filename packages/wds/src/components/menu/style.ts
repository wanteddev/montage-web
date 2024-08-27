import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const menuScrollAreaStyle = (theme: Theme) => css`
  width: 320px;
  min-width: 140px;
  border-radius: 16px;
  border: 1px solid ${theme.palette.line.solid.neutral};
  background-color: ${theme.palette.background.elevated.normal};
  box-shadow: inset 0 1px 2px 0 ${addOpacity(theme.palette.static.black, 0.04)};
`;

export const listInMenuStyle = css`
  max-height: 400px;
  padding: 8px 20px;
`;
