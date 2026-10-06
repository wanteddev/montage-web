// url=<FIGMA_TEXT_FIELD_TRAILING_CONTENT_LARGE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/text-field/index.tsx
// component=TextFieldContent

import figma from 'figma';

import { contentResourceImports, iconImportStatements } from './nested-imports';

// Icons inside nested IconButton / Button instances are not hoisted by Code Connect.
const deepIconImports = iconImportStatements(
  contentResourceImports(figma.selectedInstance).deepIcons,
);

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Variant') === 'Custom') {
  template = {
    id: 'TextFieldContent',
    imports: [
      ...deepIconImports,
      "import { TextFieldContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextFieldContent variant="custom"/>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Timer') {
  const children = figma.selectedInstance.getString('Time');
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextFieldContent',
    imports: [
      ...deepIconImports,
      "import { TextFieldContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextFieldContent variant="timer">${figma.helpers.react.renderChildren(
      children,
    )}</TextFieldContent>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Badge') {
  const children = figma.properties.children(['Content Badge/Content Badge']);
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextFieldContent',
    imports: [
      ...deepIconImports,
      "import { TextFieldContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextFieldContent variant="badge">${figma.helpers.react.renderChildren(
      children,
    )}</TextFieldContent>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Icon') {
  const children = figma.properties.children(['Icon']);
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextFieldContent',
    imports: [
      ...deepIconImports,
      "import { TextFieldContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextFieldContent variant="icon">${figma.helpers.react.renderChildren(
      children,
    )}</TextFieldContent>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Text') {
  const children = figma.selectedInstance.getString('Text');
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextFieldContent',
    imports: [
      ...deepIconImports,
      "import { TextFieldContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextFieldContent variant="text">${figma.helpers.react.renderChildren(
      children,
    )}</TextFieldContent>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Variant') === 'Icon Button'
) {
  const children = figma.properties.children(['Icon Button']);
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextFieldContent',
    imports: [
      ...deepIconImports,
      "import { TextFieldContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextFieldContent variant="icon-button">${figma.helpers.react.renderChildren(
      children,
    )}</TextFieldContent>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'TextFieldContent',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
