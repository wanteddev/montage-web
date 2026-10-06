// url=<FIGMA_MENU_GROUP_TITLE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/menu/index.tsx
// component=MenuGroup

import figma from 'figma';

import { finalizeTemplate } from '../modal/collect-imports';

const titleLayer = figma.selectedInstance.findText('제목');
const title = titleLayer.type === 'ERROR' ? '' : titleLayer.textContent;

// A group title alone has no items; `Menu` reads `props.title` to wrap the
// following items in `<MenuGroup title="…">`.
export default finalizeTemplate({
  id: 'MenuGroup',
  imports: ["import { MenuGroup } from '@montage-ui/core';"],
  example: figma.tsx`<MenuGroup title=${JSON.stringify(title)}>{/* MenuItem */}</MenuGroup>`,
  metadata: { nestable: true, props: { title } },
});
