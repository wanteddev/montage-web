import { figma } from '@figma/code-connect';

import { Switch } from '@wanteddev/wds';

figma.connect(Switch, '<FIGMA_CONTROL_SWITCH>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Normal: 'normal',
      Small: 'small',
    }),
    checked: figma.boolean('Active'),
  },
  example: (props) => <Switch {...props} />,
});
