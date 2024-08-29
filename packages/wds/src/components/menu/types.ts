import type { ReactNode } from 'react';
import type { PopoverProps } from '../popover/types';
import type { ListCellProps, ListProps } from '../list/types';
import type { Merge } from '@wanteddev/wds-engine';

export type MenuDefaultProps = {
  defaultValue?: string | Array<string>;
  value?: string | Array<string>;
  onValueChange?: (value?: string | Array<string>) => void;
};
export type MenuProps = Merge<MenuDefaultProps, PopoverProps>;

export type MenuContentDefaultProps = {};
export type MenuContentProps = Merge<MenuContentDefaultProps, ListProps>;

export type MenuGroupDefaultProps = {
  title?: ReactNode;
};

export type MenuItemDefaultProps = {
  variant?: 'normal' | 'radio' | 'checkbox';
  value: string;
};
export type MenuItemProps = Merge<MenuItemDefaultProps, ListCellProps>;

export type MenuItemRadioProps = Omit<MenuItemProps, 'variant'>;
export type MenuItemCheckboxProps = Omit<MenuItemProps, 'variant'>;

export type MenuBottomProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
};
export type MenuBottomContentProps = {
  variant?:
    | 'icon'
    | 'chip-filter'
    | 'badge'
    | 'reset-text-button'
    | 'reset-icon-button'
    | 'custom';
};
