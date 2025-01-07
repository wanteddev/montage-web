import { css } from '@wanteddev/wds-engine';

import { addOpacity } from '../../utils';

import type { Theme } from '@wanteddev/wds-engine';

export const datePopperStyle = (theme: Theme) => css`
  background-color: ${theme.palette.background.normal.normal};
  box-shadow: 0px 1px 2px 0px ${addOpacity(theme.palette.static.black, 0.03)};
  border-radius: 12px;
  border: 1px solid ${theme.palette.line.normal.alternative};
  overflow: hidden;
`;
