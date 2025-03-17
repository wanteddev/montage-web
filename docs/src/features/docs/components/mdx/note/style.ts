import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const noteStyle = (theme: Theme) => css`
  padding: 20px;
  background-color: ${theme.semantic.fill.alternative};
  border-radius: 20px;
  margin-bottom: 20px;

  svg {
    color: ${theme.semantic.label.alternative};
    font-size: 24px;
  }

  p {
    margin: 0;
  }

  ol,
  ul {
    margin: 0 !important;
  }

  p + p {
    margin-top: 0.75em;
  }
`;
