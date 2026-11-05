import type { FlexBoxProps } from '../flex-box/types';
import type { ListCellProps, ListProps } from '../list/types';
import type {
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from '../popover/types';
import type { Merge, WithSxProps } from '@montage-ui/engine';
import type { ReactNode } from 'react';

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
  | 'collisionPadding'
  | 'fallbackAxisSide'
  | 'fallbackAxisOffset'
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
  /**
   * Content displayed in the label's trailing area.
   * Pass an element wrapped with `MenuItemLabelTrailing`.
   */
  labelTrailing?: ReactNode;
  /**
   * Content displayed below the label and description.
   * Pass an element wrapped with `MenuItemExtraContent`.
   */
  extraContent?: ReactNode;
  children?: ReactNode;
  value: string;
}>;
export type MenuItemProps = Merge<MenuItemDefaultProps, ListCellProps>;

export type MenuSubProps = {
  /** Whether the submenu is open. */
  open?: boolean;
  /** Whether the submenu is open by default. */
  defaultOpen?: boolean;
  /** Callback function when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
};

export type MenuSubTriggerDefaultProps = WithSxProps<{
  /**
   * Whether hovering the trigger opens the submenu.
   * Touch and pen always open it on click.
   * @default true
   */
  openOnHover?: boolean;
  /**
   * The delay in milliseconds from the pointer entering the trigger until
   * the submenu opens.
   * @default 100
   */
  enterDelay?: number;
  /**
   * Content displayed in the trailing area.
   * Defaults to a chevron. Pass an element wrapped with `MenuItemContent` to replace it.
   */
  trailingContent?: ReactNode;
}>;
export type MenuSubTriggerProps = Merge<
  MenuSubTriggerDefaultProps,
  Omit<MenuItemProps, 'value' | 'variant'>
>;

export type MenuSubContentProps = Merge<
  {
    /**
     * Where the submenu moves when neither side of the trigger fits, e.g. on
     * a narrow viewport. `'end'` places it below the trigger.
     * @default 'end'
     */
    fallbackAxisSide?: MenuContentProps['fallbackAxisSide'];
    /**
     * The offset from the trigger once the submenu moves below or above it.
     * @default 4
     */
    fallbackAxisOffset?: MenuContentProps['fallbackAxisOffset'];
  },
  Omit<
    MenuContentProps,
    | 'trapped'
    | 'trappedContent'
    | 'disableFocusScope'
    | 'disableOutsidePointerEvents'
  >
>;

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
