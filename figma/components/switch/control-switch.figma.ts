// url=<FIGMA_CONTROL_SWITCH>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/switch/index.tsx
// component=Switch

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Platform') === 'Normal') {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const size = figma.selectedInstance.getEnum('Size', {
    Medium: 'medium',
    Small: 'small',
  });
  const checked = figma.selectedInstance.getBoolean('Active');
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }
  if (checked && checked.type !== 'ERROR') {
    __props['checked'] = checked;
  }

  template = {
    id: 'Switch',
    imports: ["import { Switch } from '@montage-ui/core';"],
    example: figma.code`<Switch${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'size',
      size,
    )}${figma.helpers.react.renderProp('defaultChecked', checked)}/>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Switch',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
