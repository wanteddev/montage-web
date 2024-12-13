import type Typography from '../typography';
import type { TypographyProps } from '../typography/types';
import type { Merge, ResponsiveProps } from '@wanteddev/wds-engine';
import type { CSSProperties, ComponentProps, ReactNode } from 'react';
import type { FlexBoxProps } from '../flex-box/types';

export type ListProps = FlexBoxProps;

export type ListItemDefaultProps = {
  padding?: '12px' | '8px' | '16px' | '0px';
  fillWidth?: boolean;
  /**
   * fillWidth가 false일 때 인터랙션의 좌우 패딩을 지정할 수 있습니다.
   */
  interactionPadding?: CSSProperties['paddingLeft'];
  ellipsis?: boolean;
  divider?: boolean;

  active?: boolean;
  disabled?: boolean;
  disableInteraction?: boolean;

  textProps?: Merge<
    TypographyProps,
    {
      caption?: ReactNode;
      captionProps?: ComponentProps<typeof Typography>;
      children?: ReactNode;
    }
  >;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
};

export type ListItemResponsiveProps = ResponsiveProps<
  Pick<ListItemDefaultProps, 'padding' | 'fillWidth' | 'interactionPadding'>
>;

export type ListItemProps = Merge<
  Merge<ListItemDefaultProps, ListItemResponsiveProps>,
  FlexBoxProps
>;

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
  children?: ReactNode;
};
export type ListItemContentResponsiveProps = ResponsiveProps<
  Pick<ListItemContentDefaultProps, 'height'>
>;
export type ListItemContentProps = Merge<
  ListItemContentDefaultProps,
  ListItemContentResponsiveProps
>;

export type ListTextProps = ListItemProps['textProps'];
