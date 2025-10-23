import { addOpacity, css, respondMore, respondTo } from '@wanteddev/wds';

import type { Theme } from '@wanteddev/wds';

export const gnbWrapperStyle = (theme: Theme) => css`
  position: sticky;
  z-index: ${theme.zIndex.modal};
  top: 0;
  width: 100%;
  padding: 12px var(--layout-padding-inline);
  backdrop-filter: blur(32px);
  background-color: ${addOpacity(
    theme.semantic.background.normal.normal,
    theme.opacity[88],
  )};
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

  &:has([data-role='gnb-navigation-link']:hover) {
    [data-role='gnb-navigation-link']:not(:hover) {
      color: ${theme.semantic.label.assistive};
    }
  }
`;

export const gnbNavigationLinkStyle = (theme: Theme) => css`
  padding: 12px 10px;
  transition: color 0.2s ease;

  &[aria-current='page'],
  &:hover {
    color: ${theme.semantic.label.normal};
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

// export const gnbVersionStyle = (theme: Theme) => css`
//   padding: 8px 12px;
//   box-shadow: inset 0 0 0 1px ${theme.semantic.line.normal.neutral};
//   border-radius: 1000px;
//   display: none;

//   ${respondMore(theme.breakpoint.lg)} {
//     display: flex;
//   }
// `;

// export const gnbVersionTextStyle = (theme: Theme) => css`
//   text-shadow: 0 0 6px
//     ${addOpacity(theme.semantic.static.black, theme.opacity[8])};
// `;
