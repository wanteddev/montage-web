import { css, typographyStyle } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const searchOptionStyle = (theme: Theme) => css`
  &[data-depth='1'] {
    padding-left: 18px;
  }

  mark {
    background-color: transparent;
    color: ${theme.semantic.primary.normal};
    ${typographyStyle('label1', 'medium')}
  }

  [data-role='list-text'] {
    mark {
      ${typographyStyle('body1', 'bold')}
    }
  }

  &:hover {
    & > [wds-component='with-interaction'] {
      opacity: 0;
    }
  }

  &[aria-selected='true'] {
    & > [wds-component='with-interaction'] {
      opacity: 0.05;
    }
  }
`;
