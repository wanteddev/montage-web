import type { MenuContent } from '../menu';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { CSSProperties, ComponentProps, ReactNode } from 'react';

export type SelectMultipleDefaultProps = WithSxProps<{
  /** Whether the select multiple is invalid. */
  invalid?: boolean;
  /** Whether the select multiple is disabled. */
  disabled?: boolean;
  /** The width of the select multiple. */
  width?: CSSProperties['width'];
  /** The height of the select multiple. */
  height?: CSSProperties['height'];
  /** The name of the select multiple. */
  name?: string;
  /** The value of the select multiple. */
  value?: Array<string>;
  /** The default value of the select multiple. */
  defaultValue?: Array<string>;
  /** The label when all items are selected. */
  allSelectedLabel?: ReactNode;
  /** The leading content of the select multiple. */
  leadingContent?: ReactNode;
  /** Callback function when the value changes. */
  onChange?: (value: Array<string>) => void;
  /** The placeholder of the select multiple. */
  placeholder?: string;
  /** The render function of the select multiple. */
  render?: (label: Array<ReactNode>, value: Array<string>) => ReactNode;
  /** Whether the select multiple is open. */
  open?: boolean;
  /** Whether the select multiple is open by default. */
  defaultOpen?: boolean;
  /** Whether the select multiple is overflow. */
  overflow?: boolean;
  /** Callback function when the open state changes. */
  onOpenChange?: (state: boolean) => void;
  /** The content props of the select multiple. */
  contentProps?: ComponentProps<typeof MenuContent>;
  children?: ReactNode;
  /** Whether to enable the menu action area. */
  enableMenuActionArea?: boolean;
  /**
   * The value selected in the menu when it is open,
   * which can be different from the actual value.
   * This is used when `enableMenuActionArea` is true, allowing you to display a different
   * menu selection state while editing, before confirming the actual value.
   */
  menuValue?: Array<string>;
  /** Callback function when the menu value changes. */
  onMenuValueChange?: (value: Array<string>) => void;
}>;

export type SelectMultipleResponsiveProps = ResponsiveProps<
  Pick<SelectMultipleDefaultProps, 'width' | 'height'>
>;

export type SelectMultipleProps = Merge<
  SelectMultipleDefaultProps,
  SelectMultipleResponsiveProps
>;
