import { css, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const sidebarStyle = css`
  width: 160px;
  box-sizing: content-box;
  position: sticky;
  top: calc(var(--gnb-height) + 60px);
  height: calc(100vh - var(--gnb-height) - 40px);
  padding: 0px var(--layout-padding);
  display: flex;
  flex-shrink: 0;

  & > * {
    flex: 1;
  }

  ${respondTo('1720px')} {
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
