import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sidebarStyle = (theme: Theme) => css`
  width: 200px;
  min-width: 120px;
  position: sticky;
  top: calc(var(--gnb-height) + 40px);
  height: calc(100vh - var(--gnb-height) - 40px);
  display: flex;
  margin-top: 40px;
  flex-shrink: 0;

  & > * {
    flex: 1;
  }

  ${respondTo(theme.breakpoint.md)} {
    display: none;
  }
`;

export const sidebarActiveStyle = (theme: Theme) => css`
  border-left: 1px solid transparent;

  &[aria-current='true'] {
    border-left: 1px solid ${theme.semantic.label.normal};
    color: ${theme.semantic.label.normal};
  }
`;

export const sidebarContentStyle = css`
  position: relative;

  a {
    display: block;
    width: fit-content;
    padding: 6px 12px;
  }

  &[data-level='2'] {
    a {
      padding-left: 12px;
    }
  }

  &[data-level='3'] {
    a {
      padding-left: 24px;
    }
  }
`;
