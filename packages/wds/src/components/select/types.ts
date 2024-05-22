import type { Box, Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { CSSProperties, ComponentPropsWithoutRef } from 'react';

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
  wrapperProps?: ComponentPropsWithoutRef<typeof Box<'div'>>;
};

export type SelectResponsiveProps = ResponsiveProps<
  Pick<SelectDefaultProps, 'width' | 'height'>
>;

export type SelectProps = Merge<SelectDefaultProps, SelectResponsiveProps>;
