// url=<FIGMA_ICONS_WRAPPER>

import figma from 'figma';

const icon = figma.selectedInstance
  .getInstanceSwap('Icon')
  ?.executeTemplate().example;
const __props: Record<string, unknown> = {};
if (icon && icon.type !== 'ERROR') {
  __props['icon'] = icon;
}

export default {
  id: 'IconsWrapper',
  example: figma.code`${figma.helpers.react.renderChildren(icon)}`,
  metadata: { nestable: true, __props },
};
