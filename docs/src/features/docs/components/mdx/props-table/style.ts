import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const defaultValueStyle = (theme: Theme) => css`
  & > code {
    color: ${theme.semantic.label.alternative};
    background-color: ${theme.semantic.fill.normal};
  }
`;
