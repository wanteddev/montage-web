import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const footerStyle = (theme: Theme) => css`
  padding: 64px 0px;
  width: 100%;

  svg {
    color: ${theme.semantic.label.normal};
  }

  ${respondTo(theme.breakpoint.sm)} {
    display: flex;
  }
`;
