import { css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const searchOptionStyle = (theme: Theme) => css`
  mark {
    background-color: transparent;
  }

  &[data-depth='2'] {
    padding-left: 24px;
  }

  &[aria-selected='true'] {
    & > [wds-component='with-interaction'] {
      opacity: 0.05;
    }
  }

  [data-role='list-text-wrapper'] {
    gap: 2px;
  }

  [data-role='list-text-caption'] {
    mark {
      color: ${theme.semantic.label.alternative};
      ${typographyStyle('label2', 'bold')}
    }
  }
`;
