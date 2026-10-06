// url=<FIGMA_MENU_ACTION_AREA>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/menu/index.tsx
// component=MenuActionArea

import figma from 'figma';

const leadingContent = figma.selectedInstance.getBoolean('Leading Content', {
  true: figma.selectedInstance.getInstanceSwap('┗ Instance')?.executeTemplate()
    .example,
  false: undefined,
});
const trailingContent = figma.selectedInstance.getBoolean('Trailing Content', {
  true: figma.selectedInstance.getInstanceSwap('┗ Instance᠎')?.executeTemplate()
    .example,
  false: undefined,
});
const __props: Record<string, unknown> = {};
if (leadingContent && leadingContent.type !== 'ERROR') {
  __props['leadingContent'] = leadingContent;
}
if (trailingContent && trailingContent.type !== 'ERROR') {
  __props['trailingContent'] = trailingContent;
}

export default {
  id: 'MenuActionArea',
  imports: ["import { MenuActionArea } from '@montage-ui/core';"],
  example: figma.code`<MenuActionArea${figma.helpers.react.renderProp(
    'leadingContent',
    leadingContent,
  )}${figma.helpers.react.renderProp('trailingContent', trailingContent)}/>`,
  metadata: { nestable: true, __props },
};
