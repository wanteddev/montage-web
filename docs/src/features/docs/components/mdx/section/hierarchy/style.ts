import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sectionHierarchyItemStyle = (theme: Theme) => css`
  padding: 20px 0px;
  gap: 32px;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${theme.semantic.line.normal.alternative};

  ${respondTo(theme.breakpoint.sm)} {
    flex-direction: column;
    gap: 20px;
    align-items: initial;
  }

  &:last-of-type {
    border: none;
  }
`;
