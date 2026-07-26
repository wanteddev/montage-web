import { css, respondMore, respondTo } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const accordionSummaryStyle = (theme: Theme) => css`
  && {
    --list-cell-vertical-padding: 28px;
    --list-cell-horizontal-padding: 0px;
    --list-cell-interaction-padding: 12px;
  }

  border-radius: 0px;
  transition: padding-inline 0.3s ease;

  @media (pointer: fine) {
    &:hover {
      ${respondMore('500px')} {
        --list-cell-horizontal-padding: 10px;
      }

      [data-component='list-cell-content'] {
        color: ${theme.semantic.foreground.neutral.primary};
      }
    }
  }

  ${respondTo(theme.breakpoint.md)} {
    && {
      --list-cell-vertical-padding: 28px;
    }
  }

  [data-component='list-cell-content'] {
    color: ${theme.semantic.foreground.neutral.quaternary};
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
  padding-bottom: 16px;

  ${respondMore(theme.breakpoint.sm)} {
    white-space: pre-wrap;
  }
`;
