import { createContext } from '@radix-ui/react-context';

import { ACCORDION_NAME } from './constants';

type AccordionContextType = {
  expanded: boolean;
  disabled: boolean;
  onExpandedChange: (expanded: boolean) => void;
  summaryId: string;
  detailsId: string;
  disableAnimation: boolean;
};

export const [AccordionProvider, useAccordionContext] =
  createContext<AccordionContextType>(ACCORDION_NAME);
