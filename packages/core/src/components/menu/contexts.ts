import { createContext } from '@radix-ui/react-context';

import createLooseContext from '../../hooks/internal/use-loose-context';

import {
  MENU_CONTENT_NAME,
  MENU_ITEM_NAME,
  MENU_NAME,
  MENU_SUB_NAME,
} from './constants';

import type { MenuDefaultProps } from './types';
import type { RefObject } from 'react';

/**
 * How the menu or submenu was opened. Only a keyboard open focuses an item
 * right away; a pointer open leaves no item focused until the user starts
 * navigating.
 */
export type MenuOpenReason = 'hover' | 'click' | 'keyboard';

type MenuContextType = {
  value: MenuDefaultProps['value'];
  onValueChange: (value: MenuDefaultProps['value']) => void;
  /** How the nearest popup (the root menu or a submenu) was opened. */
  openReasonRef: RefObject<MenuOpenReason>;
};

export const [MenuProvider, useMenuContext] =
  createContext<MenuContextType>(MENU_NAME);

type MenuItemContextType = {
  selected?: boolean;
};

export const [MenuItemProvider, useMenuItemContext] =
  createLooseContext<MenuItemContextType>(MENU_ITEM_NAME);

type MenuContentContextType = {
  /** The popup element. Sub triggers inside it close their submenu when it is hovered elsewhere. */
  content: HTMLElement | null;
  /**
   * Set while the popup is moving focus into itself on open. A submenu that
   * opened together with it ignores that focus instead of treating it as the
   * user leaving the submenu.
   */
  mountFocusingRef: RefObject<boolean>;
};

export const [MenuContentProvider, useMenuContentContext] =
  createContext<MenuContentContextType>(MENU_CONTENT_NAME);

type MenuSubContextType = {
  open: boolean;
  onOpenChange: (open: boolean, reason?: MenuOpenReason) => void;
  /**
   * How the open submenu was opened, or last kept open by a press. Unlike the
   * menu's `openReasonRef`, it is not reset on mount; it is reset on close.
   */
  openedByRef: RefObject<MenuOpenReason>;
  trigger: HTMLElement | null;
  onTriggerChange: (trigger: HTMLElement | null) => void;
  content: HTMLElement | null;
  onContentChange: (content: HTMLElement | null) => void;
};

export const [MenuSubProvider, useMenuSubContext] =
  createContext<MenuSubContextType>(MENU_SUB_NAME);
