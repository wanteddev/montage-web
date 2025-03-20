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

    &:hover [data-role='heading-link'] {
      visibility: visible;
    }
  }

  [data-role='heading-link'] {
    pointer-events: auto;
    width: 0.75em;
    height: 0.75em;
    visibility: hidden;
    display: inline-flex;

    ${respondTo('1140px')} {
      visibility: hidden !important;
    }

    svg {
      color: ${theme.semantic.label.normal};
    }

    &:hover {
      visibility: visible;
    }
  }

  &:hover [data-role='heading-link'] {
    visibility: visible;
  }
`;
