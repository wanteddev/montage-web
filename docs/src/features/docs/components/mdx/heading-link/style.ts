import { css, respondTo } from '@montage-ui/core';

import type { Theme } from '@montage-ui/core';

export const linkStyle = (theme: Theme) => css`
  display: block;
  width: 100%;
  position: relative;

  [data-role='heading-link-area'] {
    left: -42px;
    padding-left: 6px;
    top: 50%;
    transform: translate(0px, -50%);
    position: absolute;
    width: calc(0.75em + 16px);
    height: 100%;
  }

  [data-role='heading-link'] {
    pointer-events: auto;
    width: 0.75em;
    height: 0.75em;
    opacity: 0;
    display: inline-flex;

    ${respondTo(theme.breakpoint.md)} {
      display: none !important;
    }

    svg {
      color: ${theme.semantic.foreground.neutral.primary};
    }

    @media (pointer: fine) {
      &:hover {
        opacity: 1;
      }
    }

    &:focus,
    &:focus-visible {
      opacity: 1;
    }
  }

  @media (pointer: fine) {
    &:hover [data-role='heading-link'] {
      opacity: 1;
    }
  }
`;
