import type { PopoverProps } from '../popover/types';
import type { CSSProperties, ReactNode } from 'react';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { MenuGroupProps, MenuItemProps } from '../menu/types';
import type { SelectDefaultProps } from '../select/types';

export type SelectSingleDefaultProps = {
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

export type SelectSingleResponsiveProps = ResponsiveProps<
  Pick<SelectDefaultProps, 'width' | 'height'>
>;

export type SelectSingleProps = Merge<
  Merge<SelectSingleDefaultProps, SelectSingleResponsiveProps>,
  PopoverProps
>;

export type OptionGroupProps = MenuGroupProps;

export type OptionProps = Merge<
  Omit<MenuItemProps, 'variant'>,
  {
    variant?: 'normal' | 'radio';
  }
>;
