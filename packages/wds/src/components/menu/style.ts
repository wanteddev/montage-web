import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const menuPopoverContentStyle = (theme: Theme) => css`
  padding: 0;
  filter: none;
  box-shadow: inset 0 1px 2px 0 ${addOpacity(theme.palette.static.black, 0.04)};
  border-radius: 16px;
`;

export const menuScrollAreaStyle = (scroll: boolean) => (theme: Theme) => css`
  width: 320px;
  min-width: 140px;
  border-radius: inherit;
  border: 1px solid ${theme.palette.line.solid.neutral};
  background-color: ${theme.palette.background.elevated.normal};

  [data-orientation='vertical'] {
    display: ${scroll ? 'flex' : 'none'};
  }
`;

export const listInMenuStyle = css`
  max-height: 400px;
  padding: 8px 20px;
`;
