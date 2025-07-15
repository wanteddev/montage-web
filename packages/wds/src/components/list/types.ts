import type { Typography } from '../typography';
import type { TypographyProps } from '../typography/types';
import type {
  Merge,
  ResponsiveProps,
  SxProp,
  WithSxProps,
} from '@wanteddev/wds-engine';
import type { CSSProperties, ComponentProps, ReactNode } from 'react';
import type { FlexBoxProps } from '../flex-box/types';

export type ListProps = FlexBoxProps;

export type ListCellDefaultProps = WithSxProps<{
  children?: ReactNode;
  verticalPadding?: 'small' | 'medium' | 'large' | 'none';
  fillWidth?: boolean;
  /**
   * When `fillWidth` is false, the left and right padding of the interaction can be specified.
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
}>;

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

export type ListCellContentProps = WithSxProps<{
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
  disabled?: boolean;
  chevron?: boolean;
  children?: ReactNode;
}>;

export type ListTextProps = ListCellProps['textProps'];
