import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const footerStyle = (theme: Theme) => css`
  position: relative;
  padding: 20px 0px;
  width: 100%;
  gap: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${theme.semantic.line.normal.alternative};
  }

  ${respondMore(theme.breakpoint.sm)} {
    padding: 32px 0px;
  }

  ${respondMore(theme.breakpoint.md)} {
    padding: 64px 0px;
  }
`;

export const footerLinkStyle = (theme: Theme) => css`
  font-family: var(--font-family-wanted-sans);
  font-size: 14px;
  font-weight: 400;
  line-height: 142.9%;
  letter-spacing: 0.203px;
  color: ${theme.semantic.label.neutral};
`;
