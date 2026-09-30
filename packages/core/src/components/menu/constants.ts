import type { SlotDefaults } from '../../hooks/internal/use-slot-defaults';
import type { MenuActionAreaContentProps } from './types';

export const MENU_NAME = 'Menu';

export const MENU_TRIGGER_NAME = 'MenuTrigger';
export const MENU_CONTENT_NAME = 'MenuContent';
export const MENU_LIST_NAME = 'MenuList';
export const MENU_GROUP_NAME = 'MenuGroup';

export const MENU_ITEM_NAME = 'MenuItem';
export const MENU_ITEM_CONTENT_NAME = 'MenuItemContent';
export const MENU_ITEM_LABEL_TRAILING_NAME = 'MenuItemLabelTrailing';
export const MENU_ITEM_EXTRA_CONTENT_NAME = 'MenuItemExtraContent';

export const MENU_ITEM_RADIO_NAME = 'MenuItemRadio';
export const MENU_ITEM_CHECKBOX_NAME = 'MenuItemCheckbox';

export const MENU_ACTION_AREA_NAME = 'MenuActionArea';
export const MENU_ACTION_AREA_CONTENT_NAME = 'MenuActionAreaContent';

/** Per action area content variant, the defaults of the components placed in it. */
export const MENU_ACTION_AREA_CONTENT_SLOT_DEFAULTS: Partial<
  Record<NonNullable<MenuActionAreaContentProps['variant']>, SlotDefaults>
> = {
  button: { Button: { size: 'small' } },
  'icon-button': { IconButton: { solid: { size: 'small' } } },
  'text-button': { TextButton: { size: 'small' } },
};
