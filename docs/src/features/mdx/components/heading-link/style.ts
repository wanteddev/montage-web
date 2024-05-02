import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const linkStyle = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  width: 100%;

  svg {
    font-size: 0.75em;
    visibility: hidden;
    color: ${theme.palette.label.alternative};
  }

  &:hover svg {
    visibility: visible;
  }
`;
