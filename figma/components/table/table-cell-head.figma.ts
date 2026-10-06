// url=<FIGMA_TABLE_CELL_HEAD>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/table/index.tsx
// component=TableHeadCell

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Content') === 'Text') {
  const text = figma.selectedInstance.getString('Text');
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }

  template = {
    id: 'TableHeadCell',
    imports: ["import { TableHeadCell } from '@montage-ui/core';"],
    example: figma.code`<TableHeadCell>${figma.helpers.react.renderChildren(
      text,
    )}</TableHeadCell>`,
    metadata: { nestable: true, props: { kind: 'head' }, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Content') === 'Order') {
  const text = figma.selectedInstance.getString('Text');
  const icon = figma.properties.children(['Icon']);
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }
  if (icon && icon.type !== 'ERROR') {
    __props['icon'] = icon;
  }

  template = {
    id: 'TableHeadCell',
    imports: ["import { FlexBox, TableHeadCell } from '@montage-ui/core';"],
    example: figma.code`<TableHeadCell>
      <FlexBox alignItems="center" gap="2px">
        ${figma.helpers.react.renderChildren(text)}
        ${figma.helpers.react.renderChildren(icon)}
      </FlexBox>
    </TableHeadCell>`,
    metadata: { nestable: true, props: { kind: 'head' }, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Content') === 'Filter') {
  const text = figma.selectedInstance.getString('Text');
  const icon = figma.properties.children(['Icon']);
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }
  if (icon && icon.type !== 'ERROR') {
    __props['icon'] = icon;
  }

  template = {
    id: 'TableHeadCell',
    imports: ["import { FlexBox, TableHeadCell } from '@montage-ui/core';"],
    example: figma.code`<TableHeadCell>
      <FlexBox alignItems="center" gap="2px">
        ${figma.helpers.react.renderChildren(text)}
        ${figma.helpers.react.renderChildren(icon)}
      </FlexBox>
    </TableHeadCell>`,
    metadata: { nestable: true, props: { kind: 'head' }, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Content') === 'Input') {
  const control = figma.selectedInstance
    .getInstanceSwap('Instance')
    ?.executeTemplate().example;
  const __props: Record<string, unknown> = {};
  if (control && control.type !== 'ERROR') {
    __props['control'] = control;
  }

  template = {
    id: 'TableHeadCell',
    imports: ["import { TableHeadCell } from '@montage-ui/core';"],
    example: figma.code`<TableHeadCell>${figma.helpers.react.renderChildren(
      control,
    )}</TableHeadCell>`,
    metadata: { nestable: true, props: { kind: 'head' }, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'TableHeadCell',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true, props: { kind: 'head' } },
  };
}

export default template;
