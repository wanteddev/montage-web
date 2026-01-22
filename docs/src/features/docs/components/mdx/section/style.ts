import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sectionLayoutStyle = (theme: Theme) => css`
  && {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 0px;
      padding-top: 0px;
      border: none;
    }
  }

  margin-bottom: 120px;

  ${respondTo(theme.breakpoint.sm)} {
    margin-bottom: 108px;
  }

  [data-role='section-figure-group']:not(:first-of-type) {
    margin-top: 32px;
    padding-top: 32px;
    border-top: 1px solid ${theme.semantic.line.normal.alternative};
  }
`;
