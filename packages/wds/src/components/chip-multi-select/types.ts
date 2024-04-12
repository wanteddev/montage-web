import type { Merge, ResponsiveProps } from '../../types';
import type { ReactNode } from 'react';

export type ChipMultiSelectDefaultProps = {
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  bold?: boolean;
  size?: 'medium' | 'large';
  invalid?: boolean;
  onCheckedChange?: (state: boolean) => void;
};

export type ChipMultiSelectResponsiveProps = ResponsiveProps<
  Pick<ChipMultiSelectDefaultProps, 'size' | 'bold'>
>;

export type ChipMultiSelectProps = Merge<
  ChipMultiSelectDefaultProps,
  ChipMultiSelectResponsiveProps
>;
