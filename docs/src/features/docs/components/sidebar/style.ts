import { css, respondMore } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sidebarStyle = (theme: Theme) => css`
  width: 160px;
  position: sticky;
  flex-shrink: 0;
  padding: 56px 0px 0px;
  top: var(--gnb-height);
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

  &[data-is-active='true'] {
    color: ${theme.semantic.label.normal};
  }

  &[data-is-active='false']:has(a:hover) {
    color: ${theme.semantic.label.neutral};
  }

  &[data-level='3'] {
    padding-left: 16px;
  }

  a {
    display: block;
    width: fit-content;
    padding: 4px 0px;
  }
`;
