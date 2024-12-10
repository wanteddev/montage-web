import type { MenuContent } from '../menu';
import type { CSSProperties, ComponentProps, ReactNode } from 'react';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { MenuGroupProps, MenuItemProps } from '../menu/types';

export type SelectDefaultProps = {
  invalid?: boolean;
  disabled?: boolean;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  leftContent?: ReactNode;
  render?: (label: ReactNode, value: string) => ReactNode;
  onChange?: (value: string) => void;
  contentProps?: ComponentProps<typeof MenuContent>;
  // Popover props
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (state: boolean) => void;

  enableMenuBottom?: boolean;
  menuValue?: string;
  onMenuValueChange?: (value: string) => void;
  children?: ReactNode;
};

export type SelectResponsiveProps = ResponsiveProps<
  Pick<SelectDefaultProps, 'width' | 'height'>
>;

export type SelectProps = Merge<SelectDefaultProps, SelectResponsiveProps>;

export type OptionGroupProps = MenuGroupProps;
export type OptionProps = MenuItemProps;
