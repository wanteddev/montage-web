import { css } from '@emotion/react';

import type { Theme } from '@emotion/react';

export const roundCheckboxStyle = (theme: Theme) => css`
  padding: 2px;
  border-radius: 50%;

  span {
    border-radius: 50%;
  }

  & svg {
    pointer-events: none;
  }

  &[aria-checked='true'] {
    span {
      border: none;
      background-color: ${theme.palette.primary.normal};
    }
  }
`;
