import type { MenuContent } from '../menu';
import type { CSSProperties, ComponentProps, ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { MenuGroupProps, MenuItemProps } from '../menu/types';

export type SelectDefaultProps = WithSxProps<{
  /** Whether the select is invalid. */
  invalid?: boolean;
  /** Whether the select is disabled. */
  disabled?: boolean;
  /** The width of the select. */
  width?: CSSProperties['width'];
  /** The height of the select. */
  height?: CSSProperties['height'];
  /** The name of the select. */
  name?: string;
  /** The value of the select. */
  value?: string;
  /** The default value of the select. */
  defaultValue?: string;
  /** The placeholder of the select. */
  placeholder?: string;
  /** The leading content of the select. */
  leadingContent?: ReactNode;
  /** The render function of the select. */
  render?: (label: ReactNode, value: string) => ReactNode;
  /** Callback function when the value changes. */
  onChange?: (value: string) => void;
  /** The content props of the select. */
  contentProps?: ComponentProps<typeof MenuContent>;
  /** Whether the select is open. */
  open?: boolean;
  /** Whether the select is open by default. */
  defaultOpen?: boolean;
  /** Callback function when the open state changes. */
  onOpenChange?: (state: boolean) => void;
  /** Whether to enable the menu action area. */
  enableMenuActionArea?: boolean;
  /**
   * The value selected in the menu when it is open,
   * which can be different from the actual value.
   * This is used when `enableMenuActionArea` is true, allowing you to display a different
   * menu selection state while editing, before confirming the actual value.
   */
  menuValue?: string;
  /** Callback function when the menu value changes. */
  onMenuValueChange?: (value: string) => void;
  children?: ReactNode;
}>;

export type SelectResponsiveProps = ResponsiveProps<
  Pick<SelectDefaultProps, 'width' | 'height'>
>;

export type SelectProps = Merge<SelectDefaultProps, SelectResponsiveProps>;

export type OptionGroupProps = MenuGroupProps;
export type OptionProps = Merge<
  {
    /** The leading content of the option. Pass an element wrapped with `OptionContent`. */
    leadingContent?: ReactNode;
    /** The trailing content of the option. Pass an element wrapped with `OptionContent`. */
    trailingContent?: ReactNode;
  },
  MenuItemProps
>;
