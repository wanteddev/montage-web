import type { RadioGroupItemProps } from '../radio-group/types';
import type { Merge } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { FlexBox, Typography } from '..';

type FlexBoxWithoutRefProps = ComponentPropsWithoutRef<typeof FlexBox>;

export type ListProps = FlexBoxWithoutRefProps;

export type ListItemDefaultProps = {
  variant?: 'normal' | 'action';
  // rightContent?: ReactNode;
};
export type ListItemProps = Merge<ListItemDefaultProps, FlexBoxWithoutRefProps>;

export type ListCellProps = FlexBoxWithoutRefProps;

export type ListItemTextDefaultProps = {
  caption?: ReactNode;
  bold?: boolean;
  active?: boolean;
  disabled?: boolean;
};
export type ListItemTextProps = Merge<
  ListItemTextDefaultProps,
  ComponentPropsWithoutRef<typeof Typography>
>;

export type ListItemRadioDefaultProps = {
  label?: ListItemTextProps;
};
export type ListItemRadioProps = Merge<
  ListItemRadioDefaultProps,
  RadioGroupItemProps
>;
