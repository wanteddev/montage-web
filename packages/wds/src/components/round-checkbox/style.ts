import { css } from '@emotion/react';

import type { Theme } from '@emotion/react';

export const roundCheckboxStyle = (theme: Theme) => css`
  padding: 2px;
  border-radius: 9999px;

  span {
    border-radius: 9999px;
  }

  & svg {
    pointer-events: none;
  }

  &[aria-checked='true'] {
    span {
      border: none;
      box-shadow: none;
      background-color: ${theme.palette.primary.normal};
    }
  }
`;
