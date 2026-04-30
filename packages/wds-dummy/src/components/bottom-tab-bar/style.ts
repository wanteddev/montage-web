import { css, respondMore } from '@wanteddev/wds';

import { BOTTOM_TAB_NAVIGATION_HEIGHT } from '../../constants';

import type { Theme } from '@wanteddev/wds';

export const bottomNavigationWrapperStyle = (theme: Theme) => css`
  padding-bottom: ${BOTTOM_TAB_NAVIGATION_HEIGHT};
  padding-bottom: calc(
    constant(safe-area-inset-bottom, 0px) + ${BOTTOM_TAB_NAVIGATION_HEIGHT}
  );
  padding-bottom: calc(
    env(safe-area-inset-bottom, 0px) + ${BOTTOM_TAB_NAVIGATION_HEIGHT}
  );

  ${respondMore(theme.breakpoint.sm)} {
    display: none;
  }
`;

export const bottomNavigationStyle = css`
  z-index: 780;
  height: ${BOTTOM_TAB_NAVIGATION_HEIGHT};
  position: fixed;
  right: 0;
  bottom: calc(env(safe-area-inset-bottom, 0px) + 0px);
  left: 0;
`;

export const bottomNavigationItemStyle = (theme: Theme) => css`
  && {
    color: ${theme.semantic.interaction.inactive};

    &[aria-current='page'] {
      color: ${theme.semantic.primary.normal};
    }
  }
`;
