// url=<FIGMA_CONTROL_ROUND_CHECKBOX>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/round-checkbox/index.tsx
// component=RoundCheckbox

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('State') === 'Checked') {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const size = figma.selectedInstance.getEnum('Size', {
    Normal: 'medium',
    Small: 'small',
  });
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }

  template = {
    id: 'RoundCheckbox',
    imports: ["import { RoundCheckbox } from '@montage-ui/core';"],
    example: figma.code`<RoundCheckbox defaultChecked${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp('size', size)}/>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('State') === 'Unchecked') {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const size = figma.selectedInstance.getEnum('Size', {
    Normal: 'medium',
    Small: 'small',
  });
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }

  template = {
    id: 'RoundCheckbox',
    imports: ["import { RoundCheckbox } from '@montage-ui/core';"],
    example: figma.code`<RoundCheckbox${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp('size', size)}/>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('State') === 'Indeterminate'
) {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const size = figma.selectedInstance.getEnum('Size', {
    Normal: 'medium',
    Small: 'small',
  });
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }

  template = {
    id: 'RoundCheckbox',
    imports: ["import { RoundCheckbox } from '@montage-ui/core';"],
    example: figma.code`<RoundCheckbox indeterminate${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp('size', size)}/>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'RoundCheckbox',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
