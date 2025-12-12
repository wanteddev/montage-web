import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type FilterButtonDefaultProps = WithSxProps<{
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  variant?: 'solid' | 'outlined';
  /** Whether the filter button is active. */
  active?: boolean;
  /** Whether the filter button is expanded. */
  expanded?: boolean;
  /** Whether the filter button is disabled. */
  disabled?: boolean;
  /** Whether to disable the interaction. */
  disableInteraction?: boolean;
  /** The active label of the filter button when `active=true`. */
  activeLabel?: ReactNode;
  /** The content of the filter button. */
  children?: ReactNode;
}>;

export type FilterButtonResponsiveProps = ResponsiveProps<
  Pick<FilterButtonDefaultProps, 'size'>
>;

export type FilterButtonProps = Merge<
  FilterButtonDefaultProps,
  FilterButtonResponsiveProps
>;
