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
    opacity: 0;
    transition: opacity ease 0.12s;
    position: absolute;
    right: 16px;
    top: 16px;
  }

  &:hover {
    button {
      opacity: 1;
    }
  }
`;

export const preStyle = css`
  display: block;
  font-size: 0.9em;
`;
