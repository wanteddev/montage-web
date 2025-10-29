import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const searchOptionStyle = (theme: Theme) => css`
  gap: 4px;

  [data-role='list-text-wrapper'] {
    color: ${theme.semantic.label.alternative};
  }

  mark {
    background-color: transparent;
    color: ${theme.semantic.label.normal};
  }

  &:hover:not(:active):not([aria-selected='true']) {
    & > [wds-component='with-interaction'] {
      opacity: 0;
    }
  }

  &[aria-selected='true']:not(:active) {
    & > [wds-component='with-interaction'] {
      opacity: 0.05;
    }
  }

  [data-role='list-text-wrapper'] {
    gap: 4px;
  }
`;
