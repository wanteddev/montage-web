import { addOpacity, css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbItemStyle = (theme: Theme) => css`
  padding-left: var(--lnb-padding-left);

  [data-role='list-text-content'] {
    color: ${theme.semantic.label.alternative};
  }

  &[data-depth='0'] {
    [data-role='list-text-content'] {
      color: ${theme.semantic.label.normal};
    }

    &[aria-current='page'] {
      [data-role='list-text-content'] {
        color: ${theme.semantic.primary.normal};
      }
    }
  }

  &:not([data-depth='0'])[aria-current='page'] {
    background-color: ${addOpacity(theme.semantic.primary.normal, 0.09)};

    [data-role='list-text-content'] {
      color: ${theme.semantic.primary.normal};
    }

    & > [wds-component='with-interaction'] {
      background-color: ${theme.semantic.primary.normal};
    }
  }
`;
