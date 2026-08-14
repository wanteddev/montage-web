import type { Typography } from '../typography';
import type { TypographyProps } from '../typography/types';
import type {
  Merge,
  ResponsiveProps,
  SxProp,
  WithSxProps,
} from '@montage-ui/engine';
import type { ComponentProps, ReactNode } from 'react';
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
  variant?: 'inset' | 'full';
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
  /**
   * Content displayed in the label's trailing area.
   * Pass an element wrapped with `ListCellLabelTrailing`.
   */
  labelTrailing?: ReactNode;
  /**
   * Content displayed in the trailing area.
   * Pass an element wrapped with `ListCellExtraContent`.
   */
  extraContent?: ReactNode;
}>;

export type ListCellResponsiveProps = ResponsiveProps<
  Pick<ListCellDefaultProps, 'verticalPadding'>
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
    | 'icon-button'
    | 'toggle-icon'
    | 'text-button'
    | 'button'
    | 'switch'
    | 'content-badge'
    | 'avatar'
    | 'large-icon'
    | 'value'
    | 'thumbnail'
    | 'custom';
  /**
   * Displays the chevron.
   */
  chevron?: boolean;
  children?: ReactNode;
}>;

export type ListCellLabelTrailingProps = WithSxProps<{
  /** The variant of the label trailing. */
  variant?: 'content-badge' | 'verified-check' | 'custom';
}>;

export type ListCellExtraContentProps = WithSxProps<{
  /** The variant of the extra content. */
  variant?: 'content-badge' | 'text' | 'custom';
}>;

export type ListTextProps = Merge<
  Pick<ListCellProps, 'extraContent' | 'labelTrailing'>,
  ListCellProps['textProps']
>;
