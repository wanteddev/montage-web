import type { ListItemProps } from '../list/types';
import type { PopoverTrigger } from '../popover';
import type { FlexBoxProps } from '../flex-box/types';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { PopoverContentProps, PopoverProps } from '../popover/types';
import type { Merge } from '@wanteddev/wds-engine';

export type MenuDefaultProps = {
  defaultValue?: string | Array<string>;
  value?: string | Array<string>;
  onValueChange?: (value?: string | Array<string>) => void;
  children?: ReactNode;
};
export type MenuProps = Merge<MenuDefaultProps, PopoverProps>;

export type MenuTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

export type MenuContentProps = Pick<
  PopoverContentProps,
  | 'position'
  | 'offset'
  | 'container'
  | 'disablePortal'
  | 'trappedContent'
  | 'onMountAutoFocus'
  | 'onUnmountAutoFocus'
  | 'trapped'
  | 'loop'
  | 'referenceHidden'
  | 'setContext'
>;

export type MenuGroupDefaultProps = {
  title?: ReactNode;
  children?: ReactNode;
};
export type MenuGroupProps = Merge<MenuGroupDefaultProps, FlexBoxProps>;

export type MenuItemDefaultProps = {
  variant?: 'normal' | 'radio' | 'checkbox';
  children?: ReactNode;
  value: string;
};
export type MenuItemProps = Merge<MenuItemDefaultProps, ListItemProps>;

export type MenuItemRadioProps = Omit<MenuItemProps, 'variant'>;
export type MenuItemCheckboxProps = Omit<MenuItemProps, 'variant'>;

export type MenuBottomProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  children?: ReactNode;
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
  children?: ReactNode;
};
