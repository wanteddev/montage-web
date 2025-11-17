import { figma } from '@figma/code-connect';

import { RoundCheckbox } from '@wanteddev/wds';

figma.connect(RoundCheckbox, '<FIGMA_CONTROL_ROUND_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Normal: 'medium',
      Small: 'small',
    }),
  },
  variant: {
    State: 'Checked',
  },
  example: (props) => <RoundCheckbox checked {...props} />,
});

figma.connect(RoundCheckbox, '<FIGMA_CONTROL_ROUND_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Normal: 'medium',
      Small: 'small',
    }),
  },
  variant: {
    State: 'Unchecked',
  },
  example: (props) => <RoundCheckbox {...props} />,
});

figma.connect(RoundCheckbox, '<FIGMA_CONTROL_ROUND_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Normal: 'medium',
      Small: 'small',
    }),
  },
  variant: {
    State: 'Indeterminate',
  },
  example: (props) => <RoundCheckbox indeterminate {...props} />,
});
