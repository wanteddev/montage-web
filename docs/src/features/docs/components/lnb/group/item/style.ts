import { addOpacity, css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbItemStyle = (theme: Theme) => css`
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 12px;

  & > [wds-component='with-interaction'] {
    width: 100%;
    height: 100%;
  }

  & > p > span {
    line-height: 24px;
  }

  &[data-depth='1'] {
    padding-left: 30px;
  }

  &[data-depth='2'] {
    padding-left: 44px;
  }

  &[aria-current='page'] {
    background-color: ${addOpacity(
      theme.semantic.primary.normal,
      theme.opacity[5],
    )};

    & > p > span {
      color: ${theme.semantic.primary.normal};
    }
  }
`;
