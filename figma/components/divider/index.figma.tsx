import { figma } from '@figma/code-connect';

import { Divider } from '@montage-ui/core';

figma.connect(Divider, '<FIGMA_DIVIDER>', {
  props: {
    vertical: figma.boolean('Vertical'),
  },
  variant: {
    Variant: 'Normal',
  },
  example: (props) => <Divider {...props} />,
});

figma.connect(Divider, '<FIGMA_DIVIDER>', {
  variant: {
    Variant: 'Thick',
  },
  example: () => <Divider thickness="12px" />,
});
