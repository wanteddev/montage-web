import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sectionHierarchyItemStyle = (theme: Theme) => css`
  padding: 20px 0px;
  gap: 32px;
  flex-direction: row;
  align-items: center;
  position: relative;

  ${respondTo(theme.breakpoint.sm)} {
    flex-direction: column;
    gap: 20px;
    align-items: initial;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${theme.semantic.line.normal.alternative};
  }
`;
