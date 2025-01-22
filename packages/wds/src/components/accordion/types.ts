import type { Merge } from '@wanteddev/wds-engine';
import type { ListCellProps } from '../list/types';

export type AccordionProps = {
  expanded?: boolean;
  defaultExpanded?: boolean;
  disabled?: boolean;
  divider?: boolean;
  onChange?: (expanded: boolean) => void;
};

export type AccordionSummaryProps = Merge<
  {
    /**
     * 아코디언이 펼쳐질 때 rightContent의 회전 애니메이션을 비활성화합니다.
     */
    disableExpandIconAnimation?: boolean;
  },
  ListCellProps
>;
