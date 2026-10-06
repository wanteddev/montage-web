// url=<FIGMA_POPOVER>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/popover/index.tsx
// component=PopoverContent

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Variant') === 'Normal') {
  const children = figma.selectedInstance.getString('Description');
  const heading = figma.selectedInstance.getEnum('Heading', {
    True: figma.selectedInstance.findText('Heading').__render__(),
    False: undefined,
  });
  const closeButton = figma.selectedInstance.getBoolean('Close Button');
  const position = figma.selectedInstance.getEnum('Position', {
    'Top and Bottom': 'bottom-center',
    'Left and Right': 'right-center',
  });
  const action = figma.selectedInstance.getBoolean('Action', {
    true: figma.properties.children(['Button/Text', 'Text Button/Text Button']),
    false: undefined,
  });
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }
  if (heading && heading.type !== 'ERROR') {
    __props['heading'] = heading;
  }
  if (closeButton && closeButton.type !== 'ERROR') {
    __props['closeButton'] = closeButton;
  }
  if (position && position.type !== 'ERROR') {
    __props['position'] = position;
  }
  if (action && action.type !== 'ERROR') {
    __props['action'] = action;
  }

  template = {
    id: 'PopoverContent',
    imports: [
      "import { Button, Popover, PopoverContent, PopoverTrigger } from '@montage-ui/core';",
    ],
    example: figma.code`<Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent${figma.helpers.react.renderProp(
        'heading',
        heading,
      )}${figma.helpers.react.renderProp(
        'closeButton',
        closeButton,
      )}${figma.helpers.react.renderProp(
        'position',
        position,
      )}${figma.helpers.react.renderProp(
        'action',
        action,
      )}>${figma.helpers.react.renderChildren(children)}</PopoverContent>
    </Popover>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Custom') {
  const position = figma.selectedInstance.getEnum('Position', {
    'Top and Bottom': 'bottom-center',
    'Left and Right': 'right-center',
  });
  const __props: Record<string, unknown> = {};
  if (position && position.type !== 'ERROR') {
    __props['position'] = position;
  }

  template = {
    id: 'PopoverContent',
    imports: [
      "import { Button, Popover, PopoverContent, PopoverTrigger } from '@montage-ui/core';",
    ],
    example: figma.code`<Popover>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <PopoverContent variant="custom"${figma.helpers.react.renderProp(
        'position',
        position,
      )}>
        Content
      </PopoverContent>
    </Popover>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'PopoverContent',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
