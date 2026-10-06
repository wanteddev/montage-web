// url=<FIGMA_ACCORDION_TRAILING_ICON_BUTTON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/accordion/index.tsx
// component=AccordionSummaryContent

import figma from 'figma';

const children = figma.properties.children(['Icon Button']);

// Code Connect forwards imports only one level up: the icon inside the icon
// button is two levels down, so read its import from the Icons wrapper.
const iconButton = figma.selectedInstance.findInstance('Icon Button');
const iconWrapper =
  iconButton.type === 'ERROR' ? undefined : iconButton.findInstance('Icon');
const iconImports =
  iconWrapper && iconWrapper.type !== 'ERROR' && iconWrapper.hasCodeConnect()
    ? ((iconWrapper.executeTemplate().metadata?.props?.imports as
        | Array<string>
        | undefined) ?? [])
    : [];
const imports = [
  "import { AccordionSummaryContent, IconButton } from '@montage-ui/core';",
  ...iconImports,
];

export default {
  id: 'AccordionSummaryContent',
  imports,
  example: figma.tsx`<AccordionSummaryContent variant="icon-button">${figma.helpers.react.renderChildren(
    children,
  )}</AccordionSummaryContent>`,
  metadata: {
    nestable: true,
    props: {
      variant: 'icon-button',
      imports: [
        "import { IconButton } from '@montage-ui/core';",
        ...iconImports,
      ],
    },
    __props: { children },
  },
};
