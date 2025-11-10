import { addOpacity, css, respondMore, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const modalWrapperStyle = (theme: Theme) => css`
  ${respondMore(theme.breakpoint.sm)} {
    align-items: initial;
    padding-top: 80px;
  }
`;

export const modalContainerStyle = (theme: Theme) => css`
  &
    > [data-role='modal-container-scroll-area']
    > [data-orientation='vertical'] {
    padding-block: 20px;
  }

  ${respondTo(theme.breakpoint.sm)} {
    height: fit-content;
  }
`;

export const modalNavigationStyle = (theme: Theme) => css`
  --wds-top-navigation-padding-x: 16px;
  --wds-top-navigation-padding-y: 16px;

  [data-role='top-navigation-wrapper'] {
    gap: 0px;
  }

  ${respondTo(theme.breakpoint.sm)} {
    --wds-top-navigation-padding-y: 12px;
  }
`;

export const modalCloseButtonStyle = (theme: Theme) => css`
  margin-right: 12px;
  ${respondMore(theme.breakpoint.sm)} {
    display: none;
  }
`;

export const searchFieldStyle = (theme: Theme) => css`
  ${respondTo(theme.breakpoint.sm)} {
    padding: 5px 8px;
  }
`;

export const actionAreaStyle = (theme: Theme) => css`
  --wds-action-area-margin-x: 16px;
  --wds-action-area-margin-y: 16px;

  background-color: ${addOpacity(
    theme.semantic.background.normal.normal,
    theme.opacity[88],
  )};
  backdrop-filter: blur(32px);
  border-top: 1px solid ${theme.semantic.line.normal.alternative};

  ${respondTo(theme.breakpoint.sm)} {
    --wds-action-area-margin-x: 20px;
  }
`;

export const kbdStyle = (theme: Theme) => css`
  border-radius: 6px;
  padding: 4px 6px;
  font-size: 14px;
  color: ${theme.semantic.label.alternative};
  background-color: ${theme.semantic.fill.alternative};
  box-shadow:
    inset 0 0 0 1px ${theme.semantic.line.normal.alternative},
    2px 2px 3px 0 rgba(255, 255, 255, 0.05) inset,
    1px -1px 3px 0 rgba(0, 0, 0, 0.05) inset;
`;

export const compactContentStyle = (theme: Theme) => css`
  ${respondTo(theme.breakpoint.sm)} {
    display: none;
  }
`;
