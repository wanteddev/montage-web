import type { PopoverProps } from '../popover/types';
import type { ListCellProps, ListProps } from '../list/types';
import type { Merge } from '@wanteddev/wds-engine';

export type MenuDefaultProps = {
  defaultValue?: string | Array<string>;
  value?: string | Array<string>;
  onValueChange?: (value?: string | Array<string>) => void;
};
export type MenuProps = Merge<MenuDefaultProps, PopoverProps>;

export type MenuContentDefaultProps = {
  scroll?: boolean;
};
export type MenuContentProps = Merge<MenuContentDefaultProps, ListProps>;

export type MenuItemDefaultProps = {
  variant?: 'normal' | 'radio' | 'checkbox';
  value: string;
};
export type MenuItemProps = Merge<MenuItemDefaultProps, ListCellProps>;
