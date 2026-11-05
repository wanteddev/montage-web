import { createContext } from '@radix-ui/react-context';

import createLooseContext from '../../hooks/internal/use-loose-context';

import { MENU_ITEM_NAME, MENU_NAME } from './constants';

import type { MenuDefaultProps } from './types';
import type { RefObject } from 'react';

/**
 * How the menu was opened. Only a keyboard open focuses an item right away;
 * a pointer open leaves no item focused until the user starts navigating.
 */
export type MenuOpenReason = 'click' | 'keyboard';

type MenuContextType = {
  value: MenuDefaultProps['value'];
  onValueChange: (value: MenuDefaultProps['value']) => void;
  openReasonRef: RefObject<MenuOpenReason>;
};

export const [MenuProvider, useMenuContext] =
  createContext<MenuContextType>(MENU_NAME);

type MenuItemContextType = {
  selected?: boolean;
};

export const [MenuItemProvider, useMenuItemContext] =
  createLooseContext<MenuItemContextType>(MENU_ITEM_NAME);
