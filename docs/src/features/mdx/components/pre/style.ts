import { css } from '@emotion/react';

import type { Theme } from '@emotion/react';

export const preWrapperStyle = (theme: Theme) => css`
  max-width: 100%;
  padding: 16px;
  background-color: ${theme.palette.background.normal.normal};
  border-radius: 8px;
  position: relative;
  border: 1px solid ${theme.palette.line.normal.normal};

  & button {
    display: none;
    position: absolute;
    right: 16px;
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
