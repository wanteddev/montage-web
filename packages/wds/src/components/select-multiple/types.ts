import type { MenuContent } from '../menu';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { CSSProperties, ComponentProps, ReactNode } from 'react';

export type SelectMultipleDefaultProps = {
  invalid?: boolean;
  disabled?: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  name?: string;
  value?: Array<string>;
  defaultValue?: Array<string>;
  leftContent?: ReactNode;
  onValueChange?: (value: Array<string>) => void;
  placeholder?: string;
  render?: (label: Array<string>, value: Array<string>) => ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
  contentProps?: ComponentProps<typeof MenuContent>;

  enableMenuBottom?: boolean;
  menuValue?: Array<string>;
  onMenuValueChange?: (value: Array<string>) => void;
};

export type SelectMultipleResponsiveProps = ResponsiveProps<
  Pick<SelectMultipleDefaultProps, 'width' | 'height'>
>;

export type SelectMultipleProps = Merge<
  SelectMultipleDefaultProps,
  SelectMultipleResponsiveProps
>;
