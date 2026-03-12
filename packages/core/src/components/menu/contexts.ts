import { createContext } from '@radix-ui/react-context';

import createLooseContext from '../../hooks/internal/use-loose-context';

import { MENU_ITEM_NAME, MENU_NAME } from './constants';

import type { MenuDefaultProps } from './types';

type MenuContextType = {
  value: MenuDefaultProps['value'];
  onValueChange: (value: MenuDefaultProps['value']) => void;
};

export const [MenuProvider, useMenuContext] =
  createContext<MenuContextType>(MENU_NAME);

type MenuItemContextType = {
  selected?: boolean;
};

export const [MenuItemProvider, useMenuItemContext] =
  createLooseContext<MenuItemContextType>(MENU_ITEM_NAME);
