import { css } from '@emotion/react';

import type { Theme } from '@emotion/react';

export const preWrapperStyle = (theme: Theme) => css`
  max-width: 100%;
  padding: 16px 24px;
  background-color: ${theme.palette.background.elevated.alternative};
  border-radius: 8px;
  position: relative;

  & button {
    display: none;
    position: absolute;
    right: 24px;
    top: 16px;
  }

  &:hover {
    button {
      display: flex;
    }
  }
`;

export const preStyle = css`
  display: block;
`;
