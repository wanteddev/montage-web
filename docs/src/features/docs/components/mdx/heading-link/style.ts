import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const linkStyle = (theme: Theme) => css`
  display: block;
  width: 100%;
  position: relative;

  [data-role='heading-link-area'] {
    left: -36px;
    padding-left: 6px;
    top: 0.25em;
    transform: translate(0px, -0.25em);
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

    ${respondTo('960px')} {
      display: none !important;
    }

    svg {
      color: ${theme.semantic.label.normal};
    }

    &:hover,
    &:focus,
    &:focus-visible {
      opacity: 1;
    }
  }

  &:hover [data-role='heading-link'] {
    opacity: 1;
  }
`;
