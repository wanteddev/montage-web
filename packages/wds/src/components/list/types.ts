import type { Merge, PolymorphicProps } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import type { FlexBox, RadioGroup, Typography } from '..';
import type { FlexBoxProps } from '../flex-box/types';

type FlexBoxWithoutRefProps = ComponentPropsWithoutRef<typeof FlexBox>;

export type ListDefaultProps = {
  radioGroup?: ComponentPropsWithoutRef<typeof RadioGroup>;
};
export type ListProps = Merge<ListDefaultProps, FlexBoxWithoutRefProps>;

export type ListItemDefaultProps = {
  variant?: 'normal' | 'action';
  leftContent?: ReactElement;
  rightContent?: ReactNode;
  listItemBox?: PolymorphicProps<FlexBoxProps, 'div'>;
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
