import { addOpacity, css, respondMore, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const gnbWrapperStyle = (theme: Theme) => css`
  position: sticky;
  z-index: ${theme.zIndex.modal};
  top: 0;
  padding: 12px 20px;
  width: 100%;
  backdrop-filter: blur(32px);
  background-color: ${addOpacity(
    theme.semantic.background.normal.normal,
    theme.opacity[88],
  )};
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  transform: translateY(var(--gnb-translate-y));

  ${respondMore(theme.breakpoint.lg)} {
    padding: 12px 48px;
  }
`;

export const gnbActionsStyle = (theme: Theme) => css`
  background-color: transparent;
  border-radius: 12px;
  padding: 8px;
  position: relative;
  font-size: 22px;
  color: ${theme.semantic.label.normal};

  &[aria-expanded='true'] {
    & > [wds-component='with-interaction'] {
      opacity: ${theme.opacity[8]};
    }
  }
`;

export const gnbHideActionStyle = (theme: Theme) => css`
  display: flex;

  ${respondTo(theme.breakpoint.lg)} {
    display: none;
  }
`;

export const gnbMenuStyle = (theme: Theme) => css`
  display: none;

  ${respondTo(theme.breakpoint.lg)} {
    display: flex;
  }
`;

export const searchBarStyle = (theme: Theme) => css`
  display: flex;
  border-radius: 12px;
  background: ${theme.semantic.fill.normal};
  backdrop-filter: blur(32px);
  padding: 8px 10px;
  margin-right: 4px;
  width: 280px;
  cursor: pointer;

  svg {
    color: ${theme.semantic.label.assistive};
    font-size: 20px;
  }

  ${respondTo(theme.breakpoint.sm)} {
    display: none;
  }
`;

export const kbdWrapperStyle = (theme: Theme) => css`
  box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.alternative};
  background-color: ${theme.semantic.fill.normal};
  border-radius: 6px;
  padding: 2px 6px;
`;

export const gnbSearchButtonStyle = (theme: Theme) => css`
  padding: 9px;
  font-size: 20px;

  ${respondMore(theme.breakpoint.sm)} {
    display: none;
  }
`;

export const menuItemStyle = (theme: Theme) => css`
  align-items: center;
  width: calc(100% - var(--wds-list-cell-interaction-padding) * 2 - 8px);

  & > [wds-component='with-interaction'] {
    border-radius: 6px;
  }

  [data-role='list-text-content-wrapper'] {
    color: ${theme.semantic.label.alternative};
  }

  &[data-active='true'] {
    [data-role='menu-item-icon'],
    [data-role='list-text-content-wrapper'] {
      color: ${theme.semantic.label.normal};
    }

    & > [wds-component='with-interaction'] {
      background-color: ${theme.semantic.primary.normal};
    }
  }

  [wds-component='list-cell-content'] {
    font-size: 18px;
  }
`;
