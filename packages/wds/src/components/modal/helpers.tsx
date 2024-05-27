import { IconClose, IconCloseThick } from '@wanteddev/wds-icon';

import type { ModalNavigationProps } from './types';

export const getDefaultCloseIcon = (
  variant?: ModalNavigationProps['variant'],
) => {
  switch (variant) {
    case 'float':
      return <IconCloseThick />;
    default:
      return <IconClose />;
  }
};
