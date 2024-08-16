import type { Merge, PolymorphicProps } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { FlexBox, Typography } from '..';
import type { FlexBoxProps } from '../flex-box/types';

type FlexBoxWithoutRefProps = ComponentPropsWithoutRef<typeof FlexBox>;

export type ListProps = Omit<PolymorphicProps<FlexBoxProps, 'ul'>, 'as'>;

export type ListItemDefaultProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
};
export type ListItemProps = Merge<ListItemDefaultProps, FlexBoxWithoutRefProps>;

export type ListCellDefaultProps = {
  size?: 'normal' | 'small' | 'medium';
  paddingInset?: boolean;
  divider?: boolean;
};
export type ListCellProps = ListItemProps &
  ListCellDefaultProps &
  FlexBoxWithoutRefProps;

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
