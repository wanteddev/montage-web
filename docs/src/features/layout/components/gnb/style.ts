import { addOpacity, css, respondMore, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const gnbWrapperStyle = (theme: Theme) => css`
  position: sticky;
  z-index: ${theme.zIndex.modal};
  top: 0;
  width: 100%;
  height: var(--gnb-height);
  padding: 12px var(--layout-padding-inline);
  background-color: ${addOpacity(
    theme.semantic.background.normal.normal,
    theme.opacity[88],
  )};
  backdrop-filter: blur(32px);

  body:has([data-role='route-tab'][data-is-sticky='true']) & {
    background-color: ${theme.semantic.background.normal.normal};
    backdrop-filter: none;
  }
`;

export const gnbContainerStyle = css`
  width: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;
`;

export const gnbNavigationLinkWrapperStyle = (theme: Theme) => css`
  display: none;
  height: 22px;

  ${respondMore(theme.breakpoint.lg)} {
    display: flex;
  }

  @media (pointer: fine) {
    &:has([data-role='gnb-navigation-link']:hover) {
      [data-role='gnb-navigation-link']:not(:hover) {
        color: ${theme.semantic.label.assistive};
      }
    }
  }
`;

export const gnbNavigationLinkStyle = (theme: Theme) => css`
  padding: 12px 10px;
  transition: color 0.2s ease;

  @media (pointer: fine) {
    &:hover {
      color: ${theme.semantic.label.normal};
    }
  }

  &[aria-current='page'] {
    color: ${theme.semantic.label.normal};
  }
`;

export const gnbActionsStyle = (theme: Theme) => css`
  background-color: transparent;
  border-radius: 12px;
  position: relative;
  font-size: 22px;
  color: ${theme.semantic.label.normal};

  & > [wds-component='with-interaction'] {
    width: calc(100% + 16px);
    height: calc(100% + 16px);
  }

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
