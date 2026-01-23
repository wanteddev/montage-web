import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sectionLayoutStyle = (theme: Theme) => css`
  &:not(:is([data-role='variants'])):not(:is([data-role='hierarchy'])) {
    h2 {
      padding-top: 0px !important;
      margin-top: 0px !important;
      margin-bottom: 32px !important;
    }

    h3 {
      margin-top: 0px !important;
      margin-bottom: 24px !important;
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
