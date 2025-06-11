import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const platformFilterStyle = (theme: Theme) => css`
  align-items: center;
  width: calc(100% - var(--wds-list-cell-interaction-padding) * 2 - 8px);

  & > [wds-component='with-interaction'] {
    border-radius: 6px;
  }

  [data-role='list-text-content-wrapper'] {
    color: ${theme.semantic.label.alternative};
  }

  &[data-active='true'] {
    [data-role='menu-item-icon'],
    [data-role='list-text-content-wrapper'] {
      color: ${theme.semantic.label.normal};
    }

    & > [wds-component='with-interaction'] {
      background-color: ${theme.semantic.primary.normal};
    }
  }
`;
