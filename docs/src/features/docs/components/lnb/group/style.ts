import { css } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const lnbAccordionStyle = css`
  padding: 0px;
  margin-top: 4px;
  [data-role='accordion-details-wrapper'] {
    gap: 4px;
  }
`;

export const accordionSummaryStyle = css`
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 12px;

  & > [wds-component='with-interaction'] {
    width: 100%;
    height: 100%;
  }

  &[data-depth='1'] {
    padding-left: 30px;
  }

  &[data-depth='2'] {
    padding-left: 44px;
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
  color: ${theme.semantic.label.alternative};
`;
