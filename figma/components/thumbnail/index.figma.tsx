import { figma } from '@figma/code-connect';

import { Thumbnail } from '@montage-ui/core';

figma.connect(Thumbnail, '<FIGMA_THUMBNAIL>', {
  props: {
    border: figma.boolean('Border'),
    radius: figma.boolean('Radius'),
    overlay: figma.boolean('Overlay', {
      true: figma.instance('┗ Instance'),
      false: undefined,
    }),
    ratio: figma.nestedProps('Ratio', {
      value: figma.enum('Aspect Ratio', {
        '1:1': '1:1',
        '5:4': '5:4',
        '4:3': '4:3',
        '3:2': '3:2',
        '16:10': '16:10',
        '1.618:1': '1.618:1',
        '16:9': '16:9',
        '2:1': '2:1',
        '21:9': '21:9',
        '4:5': '5:4',
        '3:4': '4:3',
        '2:3': '3:2',
        '10:16': '16:10',
        '1:1.618': '1.618:1',
        '9:16': '16:9',
        '1:2': '2:1',
        '9:21': '21:9',
      }),
      portrait: figma.enum('Aspect Ratio', {
        '4:5': true,
        '3:4': true,
        '2:3': true,
        '10:16': true,
        '1:1.618': true,
        '9:16': true,
        '1:2': true,
        '9:21': true,
      }),
    }),
  },
  example: ({ ratio, ...props }) => (
    <Thumbnail
      src="https://example.com/thumbnail.png"
      alt=""
      ratio={ratio.value}
      portrait={ratio.portrait}
      {...props}
    />
  ),
});
