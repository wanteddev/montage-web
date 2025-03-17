import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';

export const popoverStyle = (theme: Theme) => css`
  background-color: ${theme.semantic.background.elevated.normal};
  border-radius: 12px;
  padding: 24px;
  outline-style: none;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.12))
    drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.08))
    drop-shadow(2px 0px 1px rgba(0, 0, 0, 0.08));

  & [wds-component='popper-arrow'] {
    color: ${theme.semantic.background.elevated.normal};
  }
`;
