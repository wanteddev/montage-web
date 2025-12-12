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
  /** The vertical padding of the cell. */
  verticalPadding?: 'small' | 'medium' | 'large' | 'none';
  /**
   * Whether to fill the width of the parent.
   * Now, the interaction's padding inline is included in the overall width and the interaction's border radius has been removed.
   */
  fillWidth?: boolean;
  /** When `fillWidth` is false, the left and right padding of the interaction can be specified. */
  interactionPadding?: CSSProperties['paddingLeft'];
  /** Show ellipsis when text overflows. */
  ellipsis?: boolean;
  /** Whether to show the divider. */
  divider?: boolean;
  /** Whether the cell is selected. */
  selected?: boolean;
  /** Whether to disable the cell. */
  disabled?: boolean;
  /** Whether to disable the interaction. */
  disableInteraction?: boolean;
  /**
   * Used to modify the style of rendered text.
   * Due to the internal DOM structure, this option must be used to style the text.
   */
  textProps?: Merge<
    TypographyProps,
    {
      caption?: ReactNode;
      captionProps?: ComponentProps<typeof Typography>;
      children?: ReactNode;
      sx?: SxProp;
    }
  >;
  /**
   * Content displayed in the leading area.
   * Pass an element wrapped with `ListCellContent`.
   */
  leadingContent?: ReactNode;
  /**
   * Content displayed in the trailing area.
   * Pass an element wrapped with `ListCellContent`.
   */
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
  /** The variant of the content. */
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
    | 'value'
    | 'thumbnail'
    | 'custom';
  disabled?: boolean;
  /**
   * Displays the chevron when the variant is 'chevron'.
   */
  chevron?: boolean;
  children?: ReactNode;
}>;

export type ListTextProps = ListCellProps['textProps'];
