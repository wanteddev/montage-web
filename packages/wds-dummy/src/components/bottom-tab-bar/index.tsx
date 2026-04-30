import { BottomNavigation, BottomNavigationItem, Box } from '@wanteddev/wds';
import { forwardRef } from 'react';
import {
  IconNavigationCareer,
  IconNavigationMypage,
  IconNavigationRecruit,
  IconNavigationSocial,
} from '@wanteddev/wds-icon';

import {
  bottomNavigationItemStyle,
  bottomNavigationStyle,
  bottomNavigationWrapperStyle,
} from './style';

import type { DefaultComponentProps } from '@wanteddev/wds-engine';

/**
 * @description A mobile-only bottom tab bar that is rendered only at viewports below the `sm` breakpoint
 */
const BottomTabBar = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<{}, 'div'>
>((props, ref) => {
  return (
    <Box {...props} sx={[bottomNavigationWrapperStyle, props.sx]} ref={ref}>
      <BottomNavigation
        value=""
        sx={bottomNavigationStyle}
        aria-label="하단 네비게이션"
        role="navigation"
      >
        <BottomNavigationItem
          value="recruit"
          sx={bottomNavigationItemStyle}
          icon={<IconNavigationRecruit />}
          label="채용"
        />
        <BottomNavigationItem
          value="event"
          sx={bottomNavigationItemStyle}
          icon={<IconNavigationCareer />}
          label="교육•이벤트"
        />
        <BottomNavigationItem
          value="social"
          sx={bottomNavigationItemStyle}
          icon={<IconNavigationSocial />}
          label="소셜"
        />
        <BottomNavigationItem
          value="mywanted"
          sx={bottomNavigationItemStyle}
          icon={<IconNavigationMypage />}
          label="MY 원티드"
        />
      </BottomNavigation>
    </Box>
  );
});

BottomTabBar.displayName = 'BottomTabBar';

export { BottomTabBar };
