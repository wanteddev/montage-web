import type {
  Merge,
  ResponsiveProps,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type SegmentedControlDefaultProps = WithSxProps<{
  defaultValue?: string;
  value?: string;
  onValueChange?: (tab: string) => void;
  variant?: 'solid' | 'outlined';
  size?: 'large' | 'medium' | 'small';
  children?: ReactNode;
  name?: string;
}>;

type SegmentedControlResponsiveProps = ResponsiveProps<
  Pick<SegmentedControlDefaultProps, 'size'>
>;

export type SegmentedControlProps = Merge<
  SegmentedControlDefaultProps,
  SegmentedControlResponsiveProps
>;

export type SegmentedControlItemProps = WithSxProps<{
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  disabled?: boolean;
  value: string;
  children?: ReactNode;
}>;
