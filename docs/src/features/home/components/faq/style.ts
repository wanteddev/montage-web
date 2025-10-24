import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const accordionSummaryStyle = (theme: Theme) => css`
  --wds-list-cell-vertical-padding: 20px;
  border-radius: 0px;

  [wds-component='list-cell-content'] {
    color: ${theme.semantic.label.assistive};
    transition: color 0.3s ease;
  }

  &:hover {
    [wds-component='list-cell-content'] {
      color: ${theme.semantic.label.neutral};
    }

    & ~ [data-role='accordion-divider'] {
      opacity: 1 !important;
    }
  }

  &[aria-expanded='true'] {
    [aria-label='open'] {
      opacity: 0;
      transform: rotate(90deg);
    }

    [aria-label='close'] {
      opacity: 1;
      transform: rotate(0deg);
    }
  }

  &[aria-expanded='false'] {
    [aria-label='open'] {
      opacity: 1;
      transform: rotate(0deg);
    }

    [aria-label='close'] {
      opacity: 0;
      transform: rotate(-90deg);
    }
  }
`;

export const accordionSummaryContentStyle = css`
  font-size: 20px;
  position: relative;

  svg {
    transition:
      transform 0.2s ease-in-out,
      opacity 0.2s ease-in-out;
    position: absolute;
    right: 0px;
    top: 0px;
  }
`;

export const accordionDescriptionStyle = (theme: Theme) => css`
  ${respondMore(theme.breakpoint.sm)} {
    white-space: pre-wrap;
  }
`;

export const accordionDetailsStyle = css`
  [data-role='accordion-details-wrapper'] {
    padding-bottom: 32px;
  }
`;
