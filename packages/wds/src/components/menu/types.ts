import type { ListCellProps, ListProps } from '../list/types';
import type { FlexBoxProps } from '../flex-box/types';
import type { ReactNode } from 'react';
import type {
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from '../popover/types';
import type { Merge, WithSxProps } from '@wanteddev/wds-engine';

export type MenuDefaultProps = {
  defaultValue?: string | Array<string>;
  value?: string | Array<string>;
  onValueChange?: (value?: string | Array<string>) => void;
  children?: ReactNode;
};
export type MenuProps = Merge<MenuDefaultProps, PopoverProps>;

export type MenuTriggerProps = PopoverTriggerProps;

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
  | 'referenceHiddenOffsets'
  | 'setContext'
  | 'wrapperProps'
  | 'forceMount'
  | 'onInteractOutside'
  | 'onFocusOutside'
  | 'onPointerDownOutside'
  | 'onDismiss'
  | 'disableOutsidePointerEvents'
  | 'sx'
  | 'children'
>;

export type MenuListProps = ListProps;

export type MenuGroupDefaultProps = WithSxProps<{
  title?: ReactNode;
  children?: ReactNode;
}>;
export type MenuGroupProps = Merge<MenuGroupDefaultProps, FlexBoxProps>;

export type MenuItemDefaultProps = WithSxProps<{
  variant?: 'normal' | 'radio' | 'checkbox';
  children?: ReactNode;
  value: string;
}>;
export type MenuItemProps = Merge<MenuItemDefaultProps, ListCellProps>;

export type MenuItemRadioProps = Omit<MenuItemProps, 'variant'>;
export type MenuItemCheckboxProps = Omit<MenuItemProps, 'variant'>;

export type MenuActionAreaProps = WithSxProps<{
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  children?: ReactNode;
}>;
export type MenuActionAreaContentProps = WithSxProps<{
  variant?:
    | 'icon'
    | 'button'
    | 'icon-button'
    | 'text-button'
    | 'chip-filter'
    | 'badge'
    | 'custom';
  children?: ReactNode;
}>;
