import { css, respondMore, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const accordionSectionWrapperStyle = (theme: Theme) => css`
  @media (pointer: fine) {
    &:has([wds-component='accordion-summary']:hover) {
      [wds-component='accordion-summary']:not(:hover) {
        [wds-component='list-cell-content'] {
          color: ${theme.semantic.label.assistive};
        }
      }
    }
  }
`;

export const accordionSummaryStyle = (theme: Theme) => css`
  && {
    --wds-list-cell-vertical-padding: 32px;
  }
  border-radius: 0px;

  ${respondTo(theme.breakpoint.md)} {
    && {
      --wds-list-cell-vertical-padding: 28px;
    }
  }

  [wds-component='list-cell-content'] {
    color: ${theme.semantic.label.normal};
    transition: color 0.3s ease;
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
