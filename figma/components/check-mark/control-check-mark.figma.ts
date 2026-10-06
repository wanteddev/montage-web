// url=<FIGMA_CONTROL_CHECK_MARK>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/check-mark/index.tsx
// component=CheckMark

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('State') === 'Checked') {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const size = figma.selectedInstance.getEnum('Size', {
    Normal: 'medium',
    Small: 'small',
  });
  const tight = figma.selectedInstance.getBoolean('Tight');
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }
  if (tight && tight.type !== 'ERROR') {
    __props['tight'] = tight;
  }

  template = {
    id: 'CheckMark',
    imports: ["import { CheckMark } from '@montage-ui/core';"],
    example: figma.code`<CheckMark defaultChecked${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'size',
      size,
    )}${figma.helpers.react.renderProp('tight', tight)}/>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('State') === 'Unchecked') {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const size = figma.selectedInstance.getEnum('Size', {
    Normal: 'medium',
    Small: 'small',
  });
  const tight = figma.selectedInstance.getBoolean('Tight');
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }
  if (tight && tight.type !== 'ERROR') {
    __props['tight'] = tight;
  }

  template = {
    id: 'CheckMark',
    imports: ["import { CheckMark } from '@montage-ui/core';"],
    example: figma.code`<CheckMark${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'size',
      size,
    )}${figma.helpers.react.renderProp('tight', tight)}/>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'CheckMark',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
