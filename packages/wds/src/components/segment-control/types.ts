import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';

export type SegmentControlDefaultProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (tab: string) => void;
  variant?: 'solid' | 'outlined';
  size?: 'large' | 'medium' | 'small';
};

type SegmentControlResponsiveProps = ResponsiveProps<
  Pick<SegmentControlDefaultProps, 'size'>
>;

export type SegmentControlProps = Merge<
  SegmentControlDefaultProps,
  SegmentControlResponsiveProps
>;

export type SegmentControlItemProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;

  value: string;
};
