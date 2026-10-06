// url=<FIGMA_STEPPER>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/stepper/index.tsx
// component=Stepper

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Total Count') === '3') {
  const value = figma.selectedInstance.getEnum('Current Step', {
    '1': '1',
    '2': '2',
    '3': '3',
  });
  const label1 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 1'),
    false: undefined,
  });
  const label2 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 2'),
    false: undefined,
  });
  const label3 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 3'),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (value && value.type !== 'ERROR') {
    __props['value'] = value;
  }
  if (label1 && label1.type !== 'ERROR') {
    __props['label1'] = label1;
  }
  if (label2 && label2.type !== 'ERROR') {
    __props['label2'] = label2;
  }
  if (label3 && label3.type !== 'ERROR') {
    __props['label3'] = label3;
  }

  template = {
    id: 'Stepper',
    imports: ["import { Stepper, StepperItem } from '@montage-ui/core';"],
    example: figma.code`<Stepper${figma.helpers.react.renderProp(
      'defaultValue',
      value,
    )}>
      <StepperItem value="1"${figma.helpers.react.renderProp('label', label1)}/>
      <StepperItem value="2"${figma.helpers.react.renderProp('label', label2)}/>
      <StepperItem value="3"${figma.helpers.react.renderProp('label', label3)}/>
    </Stepper>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Total Count') === '4') {
  const value = figma.selectedInstance.getEnum('Current Step', {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
  });
  const label1 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 1'),
    false: undefined,
  });
  const label2 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 2'),
    false: undefined,
  });
  const label3 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 3'),
    false: undefined,
  });
  const label4 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 4'),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (value && value.type !== 'ERROR') {
    __props['value'] = value;
  }
  if (label1 && label1.type !== 'ERROR') {
    __props['label1'] = label1;
  }
  if (label2 && label2.type !== 'ERROR') {
    __props['label2'] = label2;
  }
  if (label3 && label3.type !== 'ERROR') {
    __props['label3'] = label3;
  }
  if (label4 && label4.type !== 'ERROR') {
    __props['label4'] = label4;
  }

  template = {
    id: 'Stepper',
    imports: ["import { Stepper, StepperItem } from '@montage-ui/core';"],
    example: figma.code`<Stepper${figma.helpers.react.renderProp(
      'defaultValue',
      value,
    )}>
      <StepperItem value="1"${figma.helpers.react.renderProp('label', label1)}/>
      <StepperItem value="2"${figma.helpers.react.renderProp('label', label2)}/>
      <StepperItem value="3"${figma.helpers.react.renderProp('label', label3)}/>
      <StepperItem value="4"${figma.helpers.react.renderProp('label', label4)}/>
    </Stepper>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Total Count') === '5') {
  const value = figma.selectedInstance.getEnum('Current Step', {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
  });
  const label1 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 1'),
    false: undefined,
  });
  const label2 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 2'),
    false: undefined,
  });
  const label3 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 3'),
    false: undefined,
  });
  const label4 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 4'),
    false: undefined,
  });
  const label5 = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('Label 5'),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (value && value.type !== 'ERROR') {
    __props['value'] = value;
  }
  if (label1 && label1.type !== 'ERROR') {
    __props['label1'] = label1;
  }
  if (label2 && label2.type !== 'ERROR') {
    __props['label2'] = label2;
  }
  if (label3 && label3.type !== 'ERROR') {
    __props['label3'] = label3;
  }
  if (label4 && label4.type !== 'ERROR') {
    __props['label4'] = label4;
  }
  if (label5 && label5.type !== 'ERROR') {
    __props['label5'] = label5;
  }

  template = {
    id: 'Stepper',
    imports: ["import { Stepper, StepperItem } from '@montage-ui/core';"],
    example: figma.code`<Stepper${figma.helpers.react.renderProp(
      'defaultValue',
      value,
    )}>
      <StepperItem value="1"${figma.helpers.react.renderProp('label', label1)}/>
      <StepperItem value="2"${figma.helpers.react.renderProp('label', label2)}/>
      <StepperItem value="3"${figma.helpers.react.renderProp('label', label3)}/>
      <StepperItem value="4"${figma.helpers.react.renderProp('label', label4)}/>
      <StepperItem value="5"${figma.helpers.react.renderProp('label', label5)}/>
    </Stepper>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Stepper',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
