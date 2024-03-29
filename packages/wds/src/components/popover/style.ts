import { css } from '@emotion/react';

import type { Theme } from '@emotion/react';

export const popoverStyle = (theme: Theme) => css`
  background-color: ${theme.palette.background.elevated.normal};
  border-radius: 12px;
  padding: 24px;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.12))
    drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.08));

  & [wds-component='popper-arrow'] {
    color: ${theme.palette.background.elevated.normal};
  }
`;
