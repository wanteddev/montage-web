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
  /**
   * The default value of the menu.
   * To use MenuItem as a checkbox, provide an Array<string>.
   */
  defaultValue?: string | Array<string>;
  /**
   * The value of the menu.
   * To use MenuItem as a checkbox, provide an Array<string>.
   */
  value?: string | Array<string>;
  /**
   * Callback function when the value changes.
   */
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
  | 'disableFocusScope'
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
  /**
   * Use 'normal' or 'radio' variant for single selection, and 'checkbox' for multi selection.
   */
  variant?: 'normal' | 'radio' | 'checkbox';
  /**
   * Content displayed in the leading area.
   * Pass an element wrapped with `MenuItemContent`.
   */
  leadingContent?: ReactNode;
  /**
   * Content displayed in the trailing area.
   * Pass an element wrapped with `MenuItemContent`.
   */
  trailingContent?: ReactNode;
  children?: ReactNode;
  value: string;
}>;
export type MenuItemProps = Merge<MenuItemDefaultProps, ListCellProps>;

export type MenuItemRadioProps = Omit<MenuItemProps, 'variant'>;
export type MenuItemCheckboxProps = Omit<MenuItemProps, 'variant'>;

export type MenuActionAreaProps = WithSxProps<{
  /**
   * Content displayed in the leading area.
   * Pass an element wrapped with `MenuActionAreaContent`.
   */
  leadingContent?: ReactNode;
  /**
   * Content displayed in the trailing area.
   * Pass an element wrapped with `MenuActionAreaContent`.
   */
  trailingContent?: ReactNode;
  /**
   * Generally, use leadingContent and trailingContent instead of children.
   */
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
