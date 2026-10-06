import { figma } from '@figma/code-connect';

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@montage-ui/core';

figma.connect(Tooltip, '<FIGMA_TOOLTIP>', {
  props: {
    label: figma.string('Label'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
    }),
    shortcut: figma.boolean('Shortcut', {
      true: figma.string('┗ Text'),
      false: undefined,
    }),
    arrow: figma.nestedProps('Arrow', {
      position: figma.enum('Align', {
        Leading: 'top-start',
        Center: 'top-center',
        Trailing: 'top-end',
      }),
    }),
  },
  variant: {
    Position: 'Top',
  },
  example: ({ label, arrow, ...props }) => (
    <Tooltip>
      <TooltipTrigger>
        <Button>Trigger</Button>
      </TooltipTrigger>
      <TooltipContent position={arrow.position} {...props}>
        {label}
      </TooltipContent>
    </Tooltip>
  ),
});

figma.connect(Tooltip, '<FIGMA_TOOLTIP>', {
  props: {
    label: figma.string('Label'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
    }),
    shortcut: figma.boolean('Shortcut', {
      true: figma.string('┗ Text'),
      false: undefined,
    }),
    arrow: figma.nestedProps('Arrow', {
      position: figma.enum('Align', {
        Leading: 'bottom-start',
        Center: 'bottom-center',
        Trailing: 'bottom-end',
      }),
    }),
  },
  variant: {
    Position: 'Bottom',
  },
  example: ({ label, arrow, ...props }) => (
    <Tooltip>
      <TooltipTrigger>
        <Button>Trigger</Button>
      </TooltipTrigger>
      <TooltipContent position={arrow.position} {...props}>
        {label}
      </TooltipContent>
    </Tooltip>
  ),
});

figma.connect(Tooltip, '<FIGMA_TOOLTIP>', {
  props: {
    label: figma.string('Label'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
    }),
    shortcut: figma.boolean('Shortcut', {
      true: figma.string('┗ Text'),
      false: undefined,
    }),
    arrow: figma.nestedProps('Arrow', {
      position: figma.enum('Align', {
        Top: 'left-start',
        Center: 'left-center',
        Bottom: 'left-end',
      }),
    }),
  },
  variant: {
    Position: 'Left',
  },
  example: ({ label, arrow, ...props }) => (
    <Tooltip>
      <TooltipTrigger>
        <Button>Trigger</Button>
      </TooltipTrigger>
      <TooltipContent position={arrow.position} {...props}>
        {label}
      </TooltipContent>
    </Tooltip>
  ),
});

figma.connect(Tooltip, '<FIGMA_TOOLTIP>', {
  props: {
    label: figma.string('Label'),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
    }),
    shortcut: figma.boolean('Shortcut', {
      true: figma.string('┗ Text'),
      false: undefined,
    }),
    arrow: figma.nestedProps('Arrow', {
      position: figma.enum('Align', {
        Top: 'right-start',
        Center: 'right-center',
        Bottom: 'right-end',
      }),
    }),
  },
  variant: {
    Position: 'Right',
  },
  example: ({ label, arrow, ...props }) => (
    <Tooltip>
      <TooltipTrigger>
        <Button>Trigger</Button>
      </TooltipTrigger>
      <TooltipContent position={arrow.position} {...props}>
        {label}
      </TooltipContent>
    </Tooltip>
  ),
});
