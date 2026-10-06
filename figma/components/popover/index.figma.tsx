import { figma } from '@figma/code-connect';

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@montage-ui/core';

figma.connect(PopoverContent, '<FIGMA_POPOVER>', {
  props: {
    children: figma.string('Description'),
    heading: figma.enum('Heading', {
      True: figma.textContent('Heading'),
      False: undefined,
    }),
    closeButton: figma.boolean('Close Button'),
    position: figma.enum('Position', {
      'Top and Bottom': 'bottom-center',
      'Left and Right': 'right-center',
    }),
    action: figma.boolean('Action', {
      true: figma.children(['Button/Text', 'Text Button/Text Button']),
      false: undefined,
    }),
  },
  variant: {
    Variant: 'Normal',
  },
  example: ({ children, ...props }) => (
    <Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent {...props}>{children}</PopoverContent>
    </Popover>
  ),
});

figma.connect(PopoverContent, '<FIGMA_POPOVER>', {
  props: {
    position: figma.enum('Position', {
      'Top and Bottom': 'bottom-center',
      'Left and Right': 'right-center',
    }),
  },
  variant: {
    Variant: 'Custom',
  },
  example: (props) => (
    <Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent variant="custom" {...props}>
        Content
      </PopoverContent>
    </Popover>
  ),
});
