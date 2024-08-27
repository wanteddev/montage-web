import type { ListCellProps, ListProps } from '../list/types';
import type { Merge } from '@wanteddev/wds-engine';

export type MenuDefaultProps = {
  // container?:
  // open?: boolean;
  defaultValue?: string | Array<string>;
  value?: string | Array<string>;
  onValueChange?: (value?: string | Array<string>) => void;
};
export type MenuProps = MenuDefaultProps;

export type MenuContentDefaultProps = {
  scroll?: boolean;
};
export type MenuContentProps = Merge<MenuContentDefaultProps, ListProps>;

export type MenuItemDefaultProps = {
  variant?: 'normal' | 'radio' | 'checkbox';
  value: string;
};
export type MenuItemProps = Merge<MenuItemDefaultProps, ListCellProps>;
