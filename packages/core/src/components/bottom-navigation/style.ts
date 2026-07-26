import { css } from '@montage-ui/engine';

import type { Theme } from '@montage-ui/engine';

export const bottomNavigationStyle = (theme: Theme) => css`
  ${theme.semantic.platform.ios.navigation}
  border-style: solid;
  border-top-width: 1px;
  border-color: ${theme.semantic.line.neutral.tertiary};
  height: 56px;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &[data-scroll-end='true'] {
    border-color: transparent;
    background-color: transparent;
    backdrop-filter: none;
  }
`;

export const bottomNavigationItemStyle = (theme: Theme) => css`
  color: ${theme.semantic.foreground.inactive.primary};
  padding: 9px 0px;
  background-color: transparent;
  font-size: 24px;

  &[aria-current='page'] {
    color: ${theme.semantic.foreground.brand.primary};
  }
`;
