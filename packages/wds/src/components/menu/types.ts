import type { FlexBoxProps } from '../flex-box/types';
import type { ReactNode } from 'react';
import type { PopoverContentProps, PopoverProps } from '../popover/types';
import type { ListCellProps } from '../list/types';
import type { Merge } from '@wanteddev/wds-engine';

export type MenuDefaultProps = {
  defaultValue?: string | Array<string>;
  value?: string | Array<string>;
  onValueChange?: (value?: string | Array<string>) => void;
};
export type MenuProps = Merge<MenuDefaultProps, PopoverProps>;

export type MenuContentPopoverContentProps = Pick<
  PopoverContentProps,
  'position' | 'offset' | 'container' | 'disablePortal'
>;
export type MenuContentProps = MenuContentPopoverContentProps;

export type MenuGroupDefaultProps = {
  title?: ReactNode;
};
export type MenuGroupProps = Merge<MenuGroupDefaultProps, FlexBoxProps>;

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
    | 'button'
    | 'icon-button'
    | 'text-button'
    | 'chip-filter'
    | 'badge'
    | 'custom';
};
