// url=<FIGMA_ACCORDION_TRAILING_ICON_BUTTON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/accordion/index.tsx
// component=AccordionSummaryContent

import figma from 'figma';

const children = figma.properties.children(['Icon Button']);

export default {
  id: 'AccordionSummaryContent',
  imports: ["import { AccordionSummaryContent } from '@montage-ui/core';"],
  example: figma.tsx`<AccordionSummaryContent variant="icon-button">${figma.helpers.react.renderChildren(
    children,
  )}</AccordionSummaryContent>`,
  metadata: {
    nestable: true,
    props: { variant: 'icon-button' },
    __props: { children },
  },
};
