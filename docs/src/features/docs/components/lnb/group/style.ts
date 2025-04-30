import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbAccordionStyle = css`
  padding: 4px 0px 24px;
`;

export const accordionSummaryStyle = css`
  padding-left: var(--lnb-padding-left);
`;

export const accordionIconContentStyle = css`
  height: 24px;
  align-items: center;
  justify-content: flex-end;
  min-width: initial;
  max-width: initial;
`;

export const accordionIconStyle = (theme: Theme) => css`
  font-size: 16px;
  color: ${theme.semantic.label.assistive};
`;
