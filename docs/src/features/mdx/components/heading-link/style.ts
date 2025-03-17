import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const linkStyle = (theme: Theme) => css`
  display: block;
  width: 100%;

  svg {
    font-size: 0.75em;
    visibility: hidden;
    color: ${theme.semantic.label.alternative};
    margin-left: 4px;
  }

  &:hover svg {
    visibility: visible;
  }
`;
