// url=<FIGMA_DIVIDER>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/divider/index.tsx
// component=Divider

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Variant') === 'Normal') {
  const vertical = figma.selectedInstance.getBoolean('Vertical');
  const __props: Record<string, unknown> = {};
  if (vertical && vertical.type !== 'ERROR') {
    __props['vertical'] = vertical;
  }

  template = {
    id: 'Divider',
    imports: ["import { Divider } from '@montage-ui/core';"],
    example: figma.code`<Divider${figma.helpers.react.renderProp(
      'vertical',
      vertical,
    )}/>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Thick') {
  template = {
    id: 'Divider',
    imports: ["import { Divider } from '@montage-ui/core';"],
    example: figma.code`<Divider thickness="12px" color="semantic.line.neutral.tertiary" />`,
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Divider',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
