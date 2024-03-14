import type { Merge, ResponsiveProps } from '@/types';
import type { CSSProperties } from 'react';

export type SelectDefaultProps = {
  invalid?: boolean;
  disabled?: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: any) => void;
  placeholder?: string;
};

export type SelectResponsiveProps = ResponsiveProps<
  Pick<SelectDefaultProps, 'width' | 'height'>
>;

export type SelectProps = Merge<SelectDefaultProps, SelectResponsiveProps>;
