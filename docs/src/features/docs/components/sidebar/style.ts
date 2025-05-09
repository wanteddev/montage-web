import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sidebarStyle = (theme: Theme) => css`
  width: 144px;
  box-sizing: content-box;
  position: sticky;
  padding: 0px 32px;
  top: calc(var(--gnb-height) + 56px);
  height: calc(100dvh - var(--gnb-height) - 56px);
  display: none;

  & > * {
    flex: 1;
  }

  ${respondMore(theme.breakpoint.xl)} {
    display: flex;
  }
`;

export const sidebarContentStyle = (theme: Theme) => css`
  position: relative;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;

  &[aria-current='true'] {
    color: ${theme.semantic.label.normal};
  }

  &[aria-current='false']:has(a:hover) {
    color: ${theme.semantic.label.neutral};
  }

  a {
    display: block;
    width: fit-content;
    padding: 6px 0px;
  }
`;
