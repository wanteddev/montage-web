import type Typography from '../typography';
import type { TypographyProps } from '../typography/types';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { CSSProperties, ComponentProps, ReactNode } from 'react';
import type { FlexBoxProps } from '../flex-box/types';

export type ListProps = FlexBoxProps;

export type ListItemDefaultProps = {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  ellipsis?: boolean;
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
  interactionPadding?: CSSProperties['paddingLeft'];
};

export type ListCellResponsiveProps = ResponsiveProps<
  Pick<ListCellDefaultProps, 'padding' | 'fillWidth' | 'interactionPadding'>
>;

export type ListCellProps = Merge<
  Merge<ListCellDefaultProps, ListCellResponsiveProps>,
  ListItemProps
>;

export type ListTextProps = Merge<
  TypographyProps,
  {
    caption?: ComponentProps<typeof Typography>;
  }
>;
