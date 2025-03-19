import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbItemStyle = (theme: Theme) => css`
  & > p > span {
    line-height: 24px;
  }

  &[data-depth='1'] {
    padding-left: 18px;
  }

  &[data-depth='2'] {
    padding-left: 32px;
  }

  &[aria-current='page'] {
    & > [wds-component='with-interaction'] {
      opacity: 0.0375;
    }

    & > p > span {
      color: ${theme.semantic.label.normal};
    }
  }
`;
