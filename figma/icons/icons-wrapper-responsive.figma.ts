// url=<FIGMA_ICONS_WRAPPER_RESPONSIVE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/icon/src/index.ts
// component=IconsWrapperResponsive

import figma from 'figma';

import { renderIcon } from '../helpers/icon';

// The Icons wrapper only hosts the swapped icon. Render that icon and re-declare
// its import here, because Code Connect forwards imports only one level up.
const rendered = renderIcon(figma.selectedInstance.getInstanceSwap('Icon'));
const icon = rendered?.code as Parameters<
  typeof figma.helpers.react.renderChildren
>[0];
const imports = rendered?.imports ?? [];

export default {
  id: 'IconsWrapperResponsive',
  imports,
  example: figma.code`${figma.helpers.react.renderChildren(icon)}`,
  metadata: { nestable: true, props: { imports }, __props: { icon } },
};
