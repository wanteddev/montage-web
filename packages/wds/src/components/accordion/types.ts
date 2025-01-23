import type { Merge } from '@wanteddev/wds-engine';
import type { ListCellContentProps } from '../list/types';

export type AccordionProps = {
  expanded?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
  divider?: boolean;
  onChange?: (expanded: boolean) => void;
};

export type AccordionSummaryContentProps = Merge<
  {
    /**
     * expanded가 변경될 때 rightContent의 회전 애니메이션을 비활성 합니다.
     */
    disableExpandIconAnimation?: boolean;
  },
  ListCellContentProps
>;
