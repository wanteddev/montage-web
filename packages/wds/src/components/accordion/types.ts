import type { Merge, SxProp } from '@wanteddev/wds-engine';
import type { ListCellContentProps } from '../list/types';

export type AccordionProps = {
  expanded?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
  divider?: boolean;
  onChange?: (expanded: boolean) => void;
  disableAnimation?: boolean;
};

export type AccordionSummaryContentProps = Merge<
  {
    /**
     * expanded가 true 일 때 content를 회전합니다.
     */
    rotate?: boolean;
  },
  ListCellContentProps
>;

export type AccordionDetailsProps = {
  forceMount?: boolean;
  wrapperSx?: SxProp;
};
