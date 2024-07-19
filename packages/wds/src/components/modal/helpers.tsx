import { IconClose, IconCloseThick } from '@wanteddev/wds-icon';

import type { TopNavigationProps } from '../top-navigation/types';

export const getDefaultCloseIcon = (
  variant?: TopNavigationProps['variant'],
) => {
  switch (variant) {
    case 'floating':
      return <IconCloseThick />;
    default:
      return <IconClose />;
  }
};
