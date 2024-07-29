import type { Merge, PolymorphicProps } from '@wanteddev/wds-engine';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import type { FlexBox, RadioGroup, Typography } from '..';
import type { FlexBoxProps } from '../flex-box/types';

type FlexBoxWithoutRefProps = ComponentPropsWithoutRef<typeof FlexBox>;

export type ListDefaultProps = {
  /**
   * 내부에 role="radio" 요소가 있는 경우, 내부에서 <RadioGroup />으로 래핑하고 props를 전달합니다.
   */
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
