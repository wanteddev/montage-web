import type {
  Merge,
  ResponsiveProps,
  ThemeColorsToken,
} from '@wanteddev/wds-engine';
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
    | 'avatar'
    | 'large-icon'
    | 'custom';
  height?: 'normal' | 'medium' | 'large';
  disabled?: boolean;
  chevron?: boolean;
};
export type ListItemContentResponsiveProps = ResponsiveProps<
  Pick<ListItemContentDefaultProps, 'height'>
>;
export type ListItemContentProps = Merge<
  ListItemContentDefaultProps,
  ListItemContentResponsiveProps
>;

export type ListCellDefaultProps = {
  padding?: '12px' | '8px' | '16px' | '0px';
  fillWidth?: boolean;
  divider?: boolean;
  disabled?: boolean;
  disableInteraction?: boolean;
};

export type ListCellResponsiveProps = ResponsiveProps<
  Pick<ListCellDefaultProps, 'padding' | 'fillWidth'>
>;

export type ListCellProps = Merge<
  Merge<ListCellDefaultProps, ListCellResponsiveProps>,
  ListItemProps
>;

export type ListTextProps = {
  caption?: ReactNode;
  color?: ThemeColorsToken;
};
