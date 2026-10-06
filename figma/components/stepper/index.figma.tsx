import { figma } from '@figma/code-connect';

import { Stepper, StepperItem } from '@montage-ui/core';

figma.connect(Stepper, '<FIGMA_STEPPER>', {
  props: {
    value: figma.enum('Current Step', {
      '1': '1',
      '2': '2',
      '3': '3',
    }),
    label1: figma.boolean('Label', {
      true: figma.string('Label 1'),
      false: undefined,
    }),
    label2: figma.boolean('Label', {
      true: figma.string('Label 2'),
      false: undefined,
    }),
    label3: figma.boolean('Label', {
      true: figma.string('Label 3'),
      false: undefined,
    }),
  },
  variant: {
    'Total Count': '3',
  },
  example: ({ value, label1, label2, label3 }) => (
    <Stepper value={value}>
      <StepperItem value="1" label={label1} />
      <StepperItem value="2" label={label2} />
      <StepperItem value="3" label={label3} />
    </Stepper>
  ),
});

figma.connect(Stepper, '<FIGMA_STEPPER>', {
  props: {
    value: figma.enum('Current Step', {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
    }),
    label1: figma.boolean('Label', {
      true: figma.string('Label 1'),
      false: undefined,
    }),
    label2: figma.boolean('Label', {
      true: figma.string('Label 2'),
      false: undefined,
    }),
    label3: figma.boolean('Label', {
      true: figma.string('Label 3'),
      false: undefined,
    }),
    label4: figma.boolean('Label', {
      true: figma.string('Label 4'),
      false: undefined,
    }),
  },
  variant: {
    'Total Count': '4',
  },
  example: ({ value, label1, label2, label3, label4 }) => (
    <Stepper value={value}>
      <StepperItem value="1" label={label1} />
      <StepperItem value="2" label={label2} />
      <StepperItem value="3" label={label3} />
      <StepperItem value="4" label={label4} />
    </Stepper>
  ),
});

figma.connect(Stepper, '<FIGMA_STEPPER>', {
  props: {
    value: figma.enum('Current Step', {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
    }),
    label1: figma.boolean('Label', {
      true: figma.string('Label 1'),
      false: undefined,
    }),
    label2: figma.boolean('Label', {
      true: figma.string('Label 2'),
      false: undefined,
    }),
    label3: figma.boolean('Label', {
      true: figma.string('Label 3'),
      false: undefined,
    }),
    label4: figma.boolean('Label', {
      true: figma.string('Label 4'),
      false: undefined,
    }),
    label5: figma.boolean('Label', {
      true: figma.string('Label 5'),
      false: undefined,
    }),
  },
  variant: {
    'Total Count': '5',
  },
  example: ({ value, label1, label2, label3, label4, label5 }) => (
    <Stepper value={value}>
      <StepperItem value="1" label={label1} />
      <StepperItem value="2" label={label2} />
      <StepperItem value="3" label={label3} />
      <StepperItem value="4" label={label4} />
      <StepperItem value="5" label={label5} />
    </Stepper>
  ),
});
