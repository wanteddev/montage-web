// url=<FIGMA_ACCORDION_TRAILING_CUSTOM>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/accordion/index.tsx
// component=AccordionSummaryContent

import figma from 'figma';

export default {
  id: 'AccordionSummaryContent',
  imports: ["import { AccordionSummaryContent } from '@montage-ui/core';"],
  example: figma.tsx`<AccordionSummaryContent variant="custom" />`,
  metadata: { nestable: true, props: { variant: 'custom' } },
};
