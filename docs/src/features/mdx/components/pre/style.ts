import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

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
    top: 13px;
  }

  & button:focus,
  & button:focus-visible {
    opacity: 1;
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
