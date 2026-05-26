import type { Merge, ResponsiveProps, WithSxProps } from '@montage-ui/engine';
import type { ReactNode } from 'react';

export type ButtonDefaultProps = WithSxProps<{
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Whether to disable the interaction. */
  disableInteraction?: boolean;
  /** The variant of the button. */
  variant?: 'solid' | 'outlined';
  /**
   * The color of the button.
   * `negative` is only supported with `variant="solid"`.
   */
  color?: 'primary' | 'assistive' | 'negative';
  /** Whether the button is full width. */
  fullWidth?: boolean;
  /** The content displayed in the leading area. */
  leadingContent?: ReactNode;
  /** The content displayed in the trailing area. */
  trailingContent?: ReactNode;
  /** Whether to show only the icon. If `iconOnly` is enabled, you must provide an icon component as the `children`. */
  iconOnly?: boolean;
  /** The content of the button. */
  children?: ReactNode;
  /** Whether the button is loading. */
  loading?: boolean;
  /** When `loading=true`, the event blocking action is disabled. */
  disableLoadingPreventEvents?: boolean;
}>;

export type ButtonResponsiveProps = ResponsiveProps<
  Pick<ButtonDefaultProps, 'fullWidth' | 'size'>
>;

export type ButtonProps = Merge<ButtonDefaultProps, ButtonResponsiveProps>;
