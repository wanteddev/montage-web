import type { Merge } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { FlexBox } from '..';

type FlexBoxWithoutRefProps = ComponentPropsWithoutRef<typeof FlexBox>;

export type ListProps = FlexBoxWithoutRefProps;

export type ListItemDefaultProps = {
  variant?: 'normal' | 'action';
  caption?: ReactNode;
  bold?: boolean;
  active?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
};

export type ListItemProps = Merge<ListItemDefaultProps, FlexBoxWithoutRefProps>;

export type ListCellProps = FlexBoxWithoutRefProps;
