import { css } from '@wanteddev/wds-engine';

import type { Theme } from '@wanteddev/wds-engine';

export const bottomNavigationStyle = (theme: Theme) => css`
  ${theme.semantic.platform.ios.navigation}
  border-style: solid;
  border-top-width: 1px;
  border-color: var(--wds-bottom-navigation-border-color);
  height: 56px;
`;

export const bottomNavigationItemStyle = (theme: Theme) => css`
  color: ${theme.semantic.interaction.inactive};
  padding: 9px 0px;
  background-color: transparent;
  font-size: 24px;

  &[aria-current='page'] {
    color: ${theme.semantic.primary.normal};
  }
`;
