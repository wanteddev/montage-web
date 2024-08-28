import type { Slot } from '@radix-ui/react-slot';
import type {
  DefaultComponentProps,
  Merge,
  PolymorphicProps,
  ResponsiveProps,
  SxProp,
} from '@wanteddev/wds-engine';
import type {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';
import type { FlexBox, Typography } from '..';
import type { FlexBoxProps } from '../flex-box/types';

type FlexBoxWithoutRefProps = ComponentPropsWithoutRef<typeof FlexBox>;

export type ListProps = Omit<PolymorphicProps<FlexBoxProps, 'ul'>, 'as'>;

export type ListItemDefaultProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  active?: boolean;
  disabled?: boolean;
};
export type ListItemProps = Merge<ListItemDefaultProps, FlexBoxWithoutRefProps>;

export type ListItemContentDefaultProps = {
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
};
export type ListItemContentSlotProps = DefaultComponentProps<
  Omit<ListItemContentDefaultProps, 'variant'> & { disabled?: boolean },
  typeof Slot
>;

export type ListCellDefaultProps = {
  padding?: 'normal' | 'small' | 'medium';
  paddingInset?: boolean;
  divider?: boolean;
};
export type ListCellResponsiveProps = ResponsiveProps<
  Pick<ListCellDefaultProps, 'padding' | 'paddingInset'>
>;
export type ListCellProps = Merge<
  Merge<ListCellDefaultProps, ListCellResponsiveProps>,
  Merge<ListItemProps, FlexBoxWithoutRefProps>
>;

export type ListTextDefaultProps = {
  caption?: ReactNode;
  bold?: boolean;
};
export type ListTextProps = Merge<
  ListTextDefaultProps,
  ComponentPropsWithoutRef<typeof Typography>
>;

export type ListChevronButtonProps = ComponentPropsWithRef<'button'> & {
  sx?: SxProp;
};
