import type Typography from '../typography';
import type { TypographyProps } from '../typography/types';
import type { Merge, ResponsiveProps, SxProp } from '@wanteddev/wds-engine';
import type { CSSProperties, ComponentProps, ReactNode } from 'react';
import type { FlexBoxProps } from '../flex-box/types';

export type ListProps = FlexBoxProps;

export type ListCellDefaultProps = {
  verticalPadding?: 'small' | 'medium' | 'large' | 'none';
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
      sx?: SxProp;
    }
  >;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
};

export type ListCellResponsiveProps = ResponsiveProps<
  Pick<
    ListCellDefaultProps,
    'verticalPadding' | 'fillWidth' | 'interactionPadding'
  >
>;

export type ListCellProps = Merge<
  Merge<ListCellDefaultProps, ListCellResponsiveProps>,
  FlexBoxProps
>;

export type ListCellContentDefaultProps = {
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
  size?: 'medium' | 'large' | 'xlarge';
  disabled?: boolean;
  chevron?: boolean;
  children?: ReactNode;
};
export type ListCellContentResponsiveProps = ResponsiveProps<
  Pick<ListCellContentDefaultProps, 'size'>
>;
export type ListCellContentProps = Merge<
  ListCellContentDefaultProps,
  ListCellContentResponsiveProps
>;

export type ListTextProps = ListCellProps['textProps'];
