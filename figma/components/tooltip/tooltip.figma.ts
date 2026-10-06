// url=<FIGMA_TOOLTIP>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/tooltip/index.tsx
// component=Tooltip

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Position') === 'Top') {
  const label = figma.selectedInstance.getString('Label');
  const size = figma.selectedInstance.getEnum('Size', {
    Small: 'small',
    Medium: 'medium',
  });
  const shortcut = figma.selectedInstance.getBoolean('Shortcut', {
    true: figma.selectedInstance.getString('┗ Text'),
    false: undefined,
  });
  const arrow = (function () {
    const nestedLayer10 = figma.selectedInstance.findInstance('Arrow');
    return {
      position:
        nestedLayer10.type !== 'ERROR'
          ? nestedLayer10.getEnum('Align', {
              Leading: 'top-start',
              Center: 'top-center',
              Trailing: 'top-end',
            })
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (label && label.type !== 'ERROR') {
    __props['label'] = label;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }
  if (shortcut && shortcut.type !== 'ERROR') {
    __props['shortcut'] = shortcut;
  }
  if (arrow && arrow.type !== 'ERROR') {
    __props['arrow'] = arrow;
  }

  template = {
    id: 'Tooltip',
    imports: [
      "import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@montage-ui/core';",
    ],
    example: figma.code`<Tooltip>
      <TooltipTrigger>
        <Button>Trigger</Button>
      </TooltipTrigger>
      <TooltipContent${figma.helpers.react.renderProp(
        'position',
        arrow.position,
      )}${figma.helpers.react.renderProp(
        'size',
        size,
      )}${figma.helpers.react.renderProp('shortcut', shortcut)}>
        ${figma.helpers.react.renderChildren(label)}
      </TooltipContent>
    </Tooltip>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Position') === 'Bottom') {
  const label = figma.selectedInstance.getString('Label');
  const size = figma.selectedInstance.getEnum('Size', {
    Small: 'small',
    Medium: 'medium',
  });
  const shortcut = figma.selectedInstance.getBoolean('Shortcut', {
    true: figma.selectedInstance.getString('┗ Text'),
    false: undefined,
  });
  const arrow = (function () {
    const nestedLayer11 = figma.selectedInstance.findInstance('Arrow');
    return {
      position:
        nestedLayer11.type !== 'ERROR'
          ? nestedLayer11.getEnum('Align', {
              Leading: 'bottom-start',
              Center: 'bottom-center',
              Trailing: 'bottom-end',
            })
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (label && label.type !== 'ERROR') {
    __props['label'] = label;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }
  if (shortcut && shortcut.type !== 'ERROR') {
    __props['shortcut'] = shortcut;
  }
  if (arrow && arrow.type !== 'ERROR') {
    __props['arrow'] = arrow;
  }

  template = {
    id: 'Tooltip',
    imports: [
      "import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@montage-ui/core';",
    ],
    example: figma.code`<Tooltip>
      <TooltipTrigger>
        <Button>Trigger</Button>
      </TooltipTrigger>
      <TooltipContent${figma.helpers.react.renderProp(
        'position',
        arrow.position,
      )}${figma.helpers.react.renderProp(
        'size',
        size,
      )}${figma.helpers.react.renderProp('shortcut', shortcut)}>
        ${figma.helpers.react.renderChildren(label)}
      </TooltipContent>
    </Tooltip>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Position') === 'Left') {
  const label = figma.selectedInstance.getString('Label');
  const size = figma.selectedInstance.getEnum('Size', {
    Small: 'small',
    Medium: 'medium',
  });
  const shortcut = figma.selectedInstance.getBoolean('Shortcut', {
    true: figma.selectedInstance.getString('┗ Text'),
    false: undefined,
  });
  const arrow = (function () {
    const nestedLayer12 = figma.selectedInstance.findInstance('Arrow');
    return {
      position:
        nestedLayer12.type !== 'ERROR'
          ? nestedLayer12.getEnum('Align', {
              Top: 'left-start',
              Center: 'left-center',
              Bottom: 'left-end',
            })
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (label && label.type !== 'ERROR') {
    __props['label'] = label;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }
  if (shortcut && shortcut.type !== 'ERROR') {
    __props['shortcut'] = shortcut;
  }
  if (arrow && arrow.type !== 'ERROR') {
    __props['arrow'] = arrow;
  }

  template = {
    id: 'Tooltip',
    imports: [
      "import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@montage-ui/core';",
    ],
    example: figma.code`<Tooltip>
      <TooltipTrigger>
        <Button>Trigger</Button>
      </TooltipTrigger>
      <TooltipContent${figma.helpers.react.renderProp(
        'position',
        arrow.position,
      )}${figma.helpers.react.renderProp(
        'size',
        size,
      )}${figma.helpers.react.renderProp('shortcut', shortcut)}>
        ${figma.helpers.react.renderChildren(label)}
      </TooltipContent>
    </Tooltip>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Position') === 'Right') {
  const label = figma.selectedInstance.getString('Label');
  const size = figma.selectedInstance.getEnum('Size', {
    Small: 'small',
    Medium: 'medium',
  });
  const shortcut = figma.selectedInstance.getBoolean('Shortcut', {
    true: figma.selectedInstance.getString('┗ Text'),
    false: undefined,
  });
  const arrow = (function () {
    const nestedLayer13 = figma.selectedInstance.findInstance('Arrow');
    return {
      position:
        nestedLayer13.type !== 'ERROR'
          ? nestedLayer13.getEnum('Align', {
              Top: 'right-start',
              Center: 'right-center',
              Bottom: 'right-end',
            })
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (label && label.type !== 'ERROR') {
    __props['label'] = label;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }
  if (shortcut && shortcut.type !== 'ERROR') {
    __props['shortcut'] = shortcut;
  }
  if (arrow && arrow.type !== 'ERROR') {
    __props['arrow'] = arrow;
  }

  template = {
    id: 'Tooltip',
    imports: [
      "import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@montage-ui/core';",
    ],
    example: figma.code`<Tooltip>
      <TooltipTrigger>
        <Button>Trigger</Button>
      </TooltipTrigger>
      <TooltipContent${figma.helpers.react.renderProp(
        'position',
        arrow.position,
      )}${figma.helpers.react.renderProp(
        'size',
        size,
      )}${figma.helpers.react.renderProp('shortcut', shortcut)}>
        ${figma.helpers.react.renderChildren(label)}
      </TooltipContent>
    </Tooltip>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Tooltip',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
