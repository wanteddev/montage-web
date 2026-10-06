// url=<FIGMA_ICONS_WRAPPER_RESPONSIVE>

import figma from 'figma';

const icon = figma.selectedInstance
  .getInstanceSwap('Icon')
  ?.executeTemplate().example;
const __props: Record<string, unknown> = {};
if (icon && icon.type !== 'ERROR') {
  __props['icon'] = icon;
}

export default {
  id: 'IconsWrapperResponsive',
  example: figma.code`${figma.helpers.react.renderChildren(icon)}`,
  metadata: { nestable: true, __props },
};
