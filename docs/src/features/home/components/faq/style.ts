import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const accordionSummaryStyle = (theme: Theme) => css`
  --wds-list-cell-vertical-padding: 20px;

  [data-role='list-text-content'] {
    font-family: var(--font-family-wanted-sans);
    font-size: 15px;
    font-weight: 500;
    line-height: 146.7%;
    letter-spacing: -0.21px;
    color: ${theme.semantic.label.normal};

    ${respondMore(theme.breakpoint.sm)} {
      font-size: 16px;
      line-height: 140%;
      font-weight: 600;
      letter-spacing: -0.252px;
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

export const accordionSummaryContentStyle = (theme: Theme) => css`
  font-size: 18px;
  color: ${theme.semantic.label.normal};
  position: relative;

  svg {
    transition:
      transform 0.2s ease-in-out,
      opacity 0.2s ease-in-out;
    position: absolute;
    right: 0px;
    top: 0px;
  }

  ${respondMore(theme.breakpoint.sm)} {
    font-size: 20px;
  }
`;

export const accordionDescriptionStyle = (theme: Theme) => css`
  font-family: var(--font-family-wanted-sans);
  font-size: 14px;
  font-weight: 500;
  line-height: 157.1%;
  letter-spacing: -0.196px;
  color: ${theme.semantic.label.alternative};

  ${respondMore(theme.breakpoint.sm)} {
    white-space: pre-wrap;
    font-size: 15px;
    line-height: 160%;
    letter-spacing: -0.21px;
  }
`;
