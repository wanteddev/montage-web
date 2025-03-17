import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbGroupStyle = (theme: Theme) => css`
  padding-bottom: 10px;
  color: ${theme.semantic.label.normal};
  font-size: 20px;
`;

export const lnbAccordionStyle = css``;

export const lnbItemStyle = css`
  &[aria-current='page'] {
    & > [wds-component='with-interaction'] {
      opacity: 0.0375;
    }
  }
`;
