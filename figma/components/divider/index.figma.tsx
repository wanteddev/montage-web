import { figma } from '@figma/code-connect';

import { Divider } from '@wanteddev/wds';

figma.connect(Divider, '<FIGMA_DIVIDER>', {
  props: {
    children: figma.string('Text'),
    leftContent: figma.boolean('Left Content', {
      true: figma.children('Left Content'),
      false: undefined,
    }),
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
