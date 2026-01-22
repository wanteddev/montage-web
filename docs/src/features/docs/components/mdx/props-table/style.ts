import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const defaultValueStyle = (theme: Theme) => css`
  & > code > span {
    color: ${theme.semantic.label.alternative};

    &::before {
      background-color: ${theme.semantic.fill.normal};
    }
  }
`;

export const nameStyle = (theme: Theme) => css`
  & > code > span {
    color: ${theme.semantic.accent.foreground.blue};

    &::before {
      background-color: ${theme.semantic.accent.foreground.blue};
    }
  }
`;
