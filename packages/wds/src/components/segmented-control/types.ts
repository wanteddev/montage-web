import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type SegmentedControlDefaultProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (tab: string) => void;
  variant?: 'solid' | 'outlined';
  size?: 'large' | 'medium' | 'small';
};

type SegmentedControlResponsiveProps = ResponsiveProps<
  Pick<SegmentedControlDefaultProps, 'size'>
>;

export type SegmentedControlProps = Merge<
  SegmentedControlDefaultProps,
  SegmentedControlResponsiveProps
>;

export type SegmentedControlItemProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;

  value: string;
};
