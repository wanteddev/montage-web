import { createContext } from '@radix-ui/react-context';

import { MENU_NAME } from './constants';

import type { MenuDefaultProps } from './types';

type MenuContextType = {
  value: MenuDefaultProps['value'];
  onValueChange: (value: MenuDefaultProps['value']) => void;
};

export const [MenuProvider, useMenuContext] =
  createContext<MenuContextType>(MENU_NAME);
