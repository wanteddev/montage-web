// url=<FIGMA_DIALOG_CONTENT>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/alert/index.tsx
// component=Alert

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (
  figma.selectedInstance.getPropertyValue('Platform') === 'Web' &&
  figma.selectedInstance.getPropertyValue('Heading') === true
) {
  const heading = figma.selectedInstance.getString('┗ Text');
  const description = figma.selectedInstance.getString('Body');
  const actions = figma.properties.children(['Action']);
  const __props: Record<string, unknown> = {};
  if (heading && heading.type !== 'ERROR') {
    __props['heading'] = heading;
  }
  if (description && description.type !== 'ERROR') {
    __props['description'] = description;
  }
  if (actions && actions.type !== 'ERROR') {
    __props['actions'] = actions;
  }

  template = {
    id: 'Alert',
    imports: [
      "import { Alert, AlertActionArea, AlertContainer, AlertContent, AlertDescription, AlertHeading, AlertTrigger, Button } from '@montage-ui/core';",
    ],
    example: figma.code`<Alert>
      <AlertTrigger>
        <Button>Trigger</Button>
      </AlertTrigger>
      <AlertContainer>
        <AlertContent>
          <AlertHeading>${figma.helpers.react.renderChildren(
            heading,
          )}</AlertHeading>
          <AlertDescription>${figma.helpers.react.renderChildren(
            description,
          )}</AlertDescription>
        </AlertContent>
        <AlertActionArea>${figma.helpers.react.renderChildren(
          actions,
        )}</AlertActionArea>
      </AlertContainer>
    </Alert>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Platform') === 'Web' &&
  figma.selectedInstance.getPropertyValue('Heading') === false
) {
  const description = figma.selectedInstance.getString('Body');
  const actions = figma.properties.children(['Action']);
  const __props: Record<string, unknown> = {};
  if (description && description.type !== 'ERROR') {
    __props['description'] = description;
  }
  if (actions && actions.type !== 'ERROR') {
    __props['actions'] = actions;
  }

  template = {
    id: 'Alert',
    imports: [
      "import { Alert, AlertActionArea, AlertContainer, AlertContent, AlertDescription, AlertTrigger, Button } from '@montage-ui/core';",
    ],
    example: figma.code`<Alert>
      <AlertTrigger>
        <Button>Trigger</Button>
      </AlertTrigger>
      <AlertContainer>
        <AlertContent>
          <AlertDescription>${figma.helpers.react.renderChildren(
            description,
          )}</AlertDescription>
        </AlertContent>
        <AlertActionArea>${figma.helpers.react.renderChildren(
          actions,
        )}</AlertActionArea>
      </AlertContainer>
    </Alert>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Alert',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
