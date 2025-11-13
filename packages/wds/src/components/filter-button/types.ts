import type { ReactNode } from 'react';
import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';

export type FilterButtonDefaultProps = WithSxProps<{
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  variant?: 'solid' | 'outlined';
  active?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  disableInteraction?: boolean;
  activeLabel?: ReactNode;
  children?: ReactNode;
}>;

export type FilterButtonResponsiveProps = ResponsiveProps<
  Pick<FilterButtonDefaultProps, 'size'>
>;

export type FilterButtonProps = Merge<
  FilterButtonDefaultProps,
  FilterButtonResponsiveProps
>;
