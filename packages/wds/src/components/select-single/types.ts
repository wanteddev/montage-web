import type { PopoverProps } from '../popover/types';
import type { CSSProperties } from 'react';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { MenuItemProps } from '../menu/types';
import type { SelectDefaultProps } from '../select/types';

export type SelectSingleDefaultProps = {
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

export type SelectSingleResponsiveProps = ResponsiveProps<
  Pick<SelectDefaultProps, 'width' | 'height'>
>;

export type SelectSingleProps = Merge<
  Merge<SelectSingleDefaultProps, SelectSingleResponsiveProps>,
  PopoverProps
>;

export type OptionProps = Merge<
  Omit<MenuItemProps, 'variant'>,
  {
    variant?: 'normal' | 'radio';
  }
>;
