import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const customizeStyle = (theme: Theme) => css`
  padding: 28px 0px;
  gap: 32px;
  align-items: center;
  flex-direction: row;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${theme.semantic.line.normal.alternative};
  }

  ${respondTo(theme.breakpoint.sm)} {
    flex-direction: column;
    align-items: initial;
  }
`;

export const customizeOptionStyle = (theme: Theme) => css`
  color: ${theme.semantic.label.alternative};
  background-color: ${theme.semantic.fill.normal};
`;
