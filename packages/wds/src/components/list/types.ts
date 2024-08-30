import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { ReactNode } from 'react';
import type { FlexBoxProps } from '../flex-box/types';

export type ListProps = FlexBoxProps;

export type ListItemDefaultProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  active?: boolean;
  disabled?: boolean;
};

export type ListItemProps = Merge<ListItemDefaultProps, FlexBoxProps>;

export type ListItemContentProps = {
  variant?:
    | 'icon'
    | 'radio'
    | 'checkbox'
    | 'chevron'
    | 'icon-button'
    | 'button'
    | 'switch'
    | 'badge'
    | 'custom';
  disabled?: boolean;
  chevron?: boolean;
};

export type ListCellDefaultProps = {
  padding?: 'normal' | 'small' | 'medium';
  paddingInset?: boolean;
  divider?: boolean;
  disabled?: boolean;
  disableInteraction?: boolean;
};

export type ListCellResponsiveProps = ResponsiveProps<
  Pick<ListCellDefaultProps, 'padding' | 'paddingInset'>
>;

export type ListCellProps = Merge<
  Merge<ListCellDefaultProps, ListCellResponsiveProps>,
  ListItemProps
>;

export type ListTextProps = {
  caption?: ReactNode;
  bold?: boolean;
};
