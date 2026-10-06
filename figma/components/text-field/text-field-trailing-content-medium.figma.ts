// url=<FIGMA_TEXT_FIELD_TRAILING_CONTENT_MEDIUM>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/text-field/index.tsx
// component=TextFieldContent

import figma from 'figma';

// Medium resources have no text properties; read the text layers directly.
const layerText = (layerName: string) => {
  const text = figma.selectedInstance.findText(layerName);
  return text.type === 'ERROR' ? '' : text.textContent;
};

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Variant') === 'Custom') {
  template = {
    id: 'TextFieldContent',
    imports: ["import { TextFieldContent } from '@montage-ui/core';"],
    example: figma.code`<TextFieldContent variant="custom"/>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Timer') {
  template = {
    id: 'TextFieldContent',
    imports: ["import { TextFieldContent } from '@montage-ui/core';"],
    example: figma.code`<TextFieldContent variant="timer">${layerText('0:00')}</TextFieldContent>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Badge') {
  const children = figma.properties.children(['Content Badge/Content Badge']);
  const __props: Record<string, unknown> = {};
  if (children && children.type !== 'ERROR') {
    __props['children'] = children;
  }

  template = {
    id: 'TextFieldContent',
    imports: ["import { TextFieldContent } from '@montage-ui/core';"],
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
    imports: ["import { TextFieldContent } from '@montage-ui/core';"],
    example: figma.code`<TextFieldContent variant="icon">${figma.helpers.react.renderChildren(
      children,
    )}</TextFieldContent>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Text') {
  template = {
    id: 'TextFieldContent',
    imports: ["import { TextFieldContent } from '@montage-ui/core';"],
    example: figma.code`<TextFieldContent variant="text">${layerText('단위')}</TextFieldContent>`,
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
    imports: ["import { TextFieldContent } from '@montage-ui/core';"],
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
