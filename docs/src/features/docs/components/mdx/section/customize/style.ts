import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const customizeStyle = (theme: Theme) => css`
  padding: 28px 0px;
  gap: 32px;
  align-items: center;
  flex-direction: row;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: ${theme.semantic.line.normal.alternative};
  }

  ${respondTo(theme.breakpoint.sm)} {
    flex-direction: column;
    align-items: initial;
  }
`;

export const customizeOptionStyle = (theme: Theme) => css`
  padding: 2px 4px;
  border-radius: 6px;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 138.5%;
  letter-spacing: -0.007px;
  display: inline-flex;
  color: ${theme.semantic.label.alternative};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    border-radius: inherit;
    inset: 0;
    background-color: ${theme.semantic.label.alternative};
    opacity: ${theme.opacity[8]};
  }
`;
