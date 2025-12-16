import type { TypographyProps } from '../typography';
import type { Merge, SxProp, WithSxProps } from '@wanteddev/wds-engine';
import type { ListCellContentProps, ListCellProps } from '../list/types';
import type { ReactNode } from 'react';

export type AccordionProps = WithSxProps<{
  /** Whether the accordion is expanded. */
  expanded?: boolean;
  /** Whether the accordion is expanded by default. */
  defaultExpanded?: boolean;
  /** Whether to disable the accordion. */
  disabled?: boolean;
  /** Whether to show the divider. */
  divider?: boolean;
  /** Callback function when the expanded state changes. */
  onChange?: (expanded: boolean) => void;
  /** Whether to disable the expand animation. */
  disableAnimation?: boolean;
}>;

export type AccordionSummaryProps = Merge<
  {
    /**
     * Content displayed in the leading area.
     * Pass an element wrapped with `AccordionSummaryContent`.
     */
    leadingContent?: ReactNode;
    /**
     * Content displayed in the trailing area.
     * Pass an element wrapped with `AccordionSummaryContent`.
     */
    trailingContent?: ReactNode;
  },
  Omit<ListCellProps, 'selected' | 'divider'>
>;

export type AccordionSummaryContentProps = Merge<
  {
    /** Rotates the content when expanded is true. */
    rotate?: boolean;
  },
  ListCellContentProps
>;

export type AccordionDetailsProps = WithSxProps<{
  /** Keeps the details mounted in the DOM even when expanded is false. */
  forceMount?: boolean;
  /** The styles for the wrapper. */
  wrapperSx?: SxProp;
}>;

export type AccordionDescriptionProps = TypographyProps;
export type AccordionContentProps = WithSxProps<{
  children?: ReactNode;
}>;
