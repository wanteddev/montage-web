// url=<FIGMA_CATEGORY>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/category/index.tsx
// component=Category

import figma from 'figma';

import {
  elementProp,
  findFirst,
  renderIconButton,
  uniqueImports,
} from '../top-navigation/top-navigation-shared';

const instance = figma.selectedInstance;

// Core CategoryList defaults: `variant="normal"`, `size="medium"`, paddings off.
const variant = instance.getEnum('Variant', {
  Normal: undefined,
  Alternative: 'alternative',
});
const size = instance.getEnum('Size', {
  Small: 'small',
  Medium: undefined,
  Large: 'large',
  XLarge: 'xlarge',
});
const horizontalPadding = instance.getBoolean('Horizontal Padding') === true;
const verticalPadding = instance.getBoolean('Vertical Padding') === true;
const iconButton =
  instance.getBoolean('Icon Button') === true
    ? renderIconButton(
        // The layer keeps its component name in some variants.
        findFirst(instance, ['Icon Button', 'Button/Icon/Normal']),
      )
    : undefined;

// Chips placed in the `Chip list` slot (`Chip 1`…): label (`Text`), `Active`,
// `Disabled`. The active chip becomes the uncontrolled default value.
const chips = instance
  .findLayers(
    (layer) => layer.type === 'INSTANCE' && /^Chip \d+$/.test(layer.name),
  )
  .filter((layer) => layer.type === 'INSTANCE')
  .map((chip, offset) => ({
    value: String(offset + 1),
    label: chip.type === 'INSTANCE' ? chip.getString('Text') : '',
    active:
      chip.type === 'INSTANCE' && chip.getPropertyValue('Active') === 'True',
    disabled:
      chip.type === 'INSTANCE' && chip.getPropertyValue('Disabled') === 'True',
  }));
const defaultValue =
  (chips.find((chip) => chip.active) ?? chips[0])?.value ?? '1';

const list = chips
  .map(
    (chip) =>
      figma.tsx`<CategoryListItem value="${chip.value}"${chip.disabled ? ' disabled' : ''}>
      ${chip.label}
    </CategoryListItem>`,
  )
  .reduce<unknown>(
    (joined, item) =>
      joined === undefined
        ? item
        : figma.tsx`${joined}
    ${item}`,
    undefined,
  );

const imports = uniqueImports([
  "import { Category, CategoryList, CategoryListItem } from '@montage-ui/core';",
  ...(iconButton?.imports ?? []),
]);

export default {
  id: 'Category',
  imports,
  example: figma.tsx`<Category defaultValue="${defaultValue}">
  <CategoryList${variant ? ` variant="${variant}"` : ''}${size ? ` size="${size}"` : ''}${
    horizontalPadding ? ' horizontalPadding' : ''
  }${verticalPadding ? ' verticalPadding' : ''}${elementProp('iconButton', iconButton)}>
    ${list ?? ''}
  </CategoryList>
</Category>`,
  metadata: { nestable: true, props: { imports } },
};
