import type { PopoverProps } from '../popover/types';
import type { CSSProperties, ReactNode } from 'react';
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
  onChange?: (value?: string) => void;
  placeholder?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
};

export type SelectResponsiveProps = ResponsiveProps<
  Pick<SelectDefaultProps, 'width' | 'height'>
>;

export type SelectProps = Merge<
  Merge<SelectDefaultProps, SelectResponsiveProps>,
  PopoverProps
>;

export type OptionGroupProps = MenuGroupProps;

export type OptionProps = MenuItemProps;
