import { figma } from '@figma/code-connect';

import { Divider } from '@wanteddev/wds';

figma.connect(Divider, '<FIGMA_DIVIDER>', {
  props: {
    thickness: figma.enum('Variant', {
      Normal: undefined,
      Thick: '12px',
    }),
    vertical: figma.boolean('Vertical', {
      true: true,
      false: undefined,
    }),
  },
  example: (props) => <Divider {...props} />,
});
