// url=<FIGMA_TEXT_AREA_TRAILING_CONTENT_LARGE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/text-area/index.tsx
// component=TextAreaContent

import figma from 'figma';

import {
  contentResourceImports,
  iconImportStatements,
} from '../text-field/nested-imports';

// Icons inside nested IconButton / Button instances are not hoisted by Code Connect.
const deepIconImports = iconImportStatements(
  contentResourceImports(figma.selectedInstance).deepIcons,
);

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Type') === 'Button') {
  const children = figma.properties.children(['Button/Button']);
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextAreaContent',
    imports: [
      ...deepIconImports,
      "import { TextAreaContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextAreaContent variant="button">${figma.helpers.react.renderChildren(
      children,
    )}</TextAreaContent>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Type') === 'Content Badge'
) {
  const children = figma.properties.children(['Content Badge/Content Badge']);
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextAreaContent',
    imports: [
      ...deepIconImports,
      "import { TextAreaContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextAreaContent variant="content-badge">${figma.helpers.react.renderChildren(
      children,
    )}</TextAreaContent>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Type') === 'Icon Button') {
  const children = figma.properties.children(['Button/Icon/Normal']);
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextAreaContent',
    imports: [
      ...deepIconImports,
      "import { TextAreaContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextAreaContent variant="icon-button">${figma.helpers.react.renderChildren(
      children,
    )}</TextAreaContent>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Type') === 'Icon') {
  const children = figma.properties.children(['Icon']);
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextAreaContent',
    imports: [
      ...deepIconImports,
      "import { TextAreaContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextAreaContent variant="icon">${figma.helpers.react.renderChildren(
      children,
    )}</TextAreaContent>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Type') === 'Primary Icon Button'
) {
  const children = figma.properties.children(['Button/Button']);
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextAreaContent',
    imports: [
      ...deepIconImports,
      "import { TextAreaContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextAreaContent variant="primary-icon-button">${figma.helpers.react.renderChildren(
      children,
    )}</TextAreaContent>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Type') === 'Segmented Control'
) {
  const children = figma.properties.children([
    'Segmented Control/Segmented Control',
  ]);
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextAreaContent',
    imports: [
      ...deepIconImports,
      "import { TextAreaContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextAreaContent variant="segmented-control">${figma.helpers.react.renderChildren(
      children,
    )}</TextAreaContent>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Type') === 'Slot') {
  const children = figma.properties.slot('Slot');
  // An empty slot renders Figma's placeholder layer: emit a self-closing wrapper.
  const hasContent = Boolean(
    children && children.connectedInstances.length > 0,
  );
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextAreaContent',
    imports: [
      ...deepIconImports,
      "import { TextAreaContent } from '@montage-ui/core';",
    ],
    example: hasContent
      ? figma.code`<TextAreaContent variant="custom">${figma.helpers.react.renderChildren(
          children,
        )}</TextAreaContent>`
      : figma.code`<TextAreaContent variant="custom" />`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'TextAreaContent',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
