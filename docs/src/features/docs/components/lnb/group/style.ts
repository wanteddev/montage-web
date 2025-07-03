import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbAccordionStyle = css`
  padding: 8px 0px 24px;
`;

export const accordionSummaryStyle = css`
  padding-left: var(--lnb-padding-left);

  [data-role='list-text-content'] {
    letter-spacing: -0.014em;
  }
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

export const sectionHeaderStyle = css`
  letter-spacing: -0.014em;
  font-size: 11px;
  padding: 4px 20px 4px var(--lnb-padding-left);
`;

export const utilitiesAccordionGroupStyle = css`
  padding-left: var(--lnb-padding-left);

  [data-role='list-text-content'] {
    letter-spacing: -0.014em;
  }

  && {
    --wds-list-cell-vertical-padding: 4px;
  }
`;
