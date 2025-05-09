import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const searchResultGroupStyle = css`
  padding: 0px 8px;
`;

export const searchOptionWrapperStyle = (theme: Theme) => css`
  border: 1px solid ${theme.semantic.line.normal.alternative};
  border-radius: 20px;
  position: relative;
  padding: 12px 24px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: ${theme.semantic.fill.alternative};
    opacity: ${theme.opacity[28]};
  }
`;
