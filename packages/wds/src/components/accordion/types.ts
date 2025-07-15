import type { TypographyProps } from '../typography';
import type { Merge, SxProp, WithSxProps } from '@wanteddev/wds-engine';
import type { ListCellContentProps, ListCellProps } from '../list/types';
import type { ReactNode } from 'react';

export type AccordionProps = WithSxProps<{
  expanded?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
  divider?: boolean;
  onChange?: (expanded: boolean) => void;
  disableAnimation?: boolean;
}>;

export type AccordionSummaryProps = ListCellProps;

export type AccordionSummaryContentProps = Merge<
  {
    /**
     * Rotates the content when expanded is true.
     */
    rotate?: boolean;
  },
  ListCellContentProps
>;

export type AccordionDetailsProps = WithSxProps<{
  forceMount?: boolean;
  wrapperSx?: SxProp;
}>;

export type AccordionDescriptionProps = TypographyProps;
export type AccordionContentProps = WithSxProps<{
  children?: ReactNode;
}>;
