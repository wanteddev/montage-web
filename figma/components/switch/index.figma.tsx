import { figma } from '@figma/code-connect';

import { Switch } from '@wanteddev/wds';

figma.connect(Switch, '<FIGMA_CONTROL_SWITCH>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Medium: 'medium',
      Small: 'small',
    }),
    checked: figma.boolean('Active'),
  },
  variant: {
    Platform: 'Normal',
  },
  example: (props) => <Switch {...props} />,
});
