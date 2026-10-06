// url=<FIGMA_CATEGORY>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/category/index.tsx
// component=Category

import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  Normal: 'normal',
  Alternative: 'alternative',
});
const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  XLarge: 'xlarge',
});
const horizontalPadding =
  figma.selectedInstance.getBoolean('Horizontal Padding');
const verticalPadding = figma.selectedInstance.getBoolean('Vertical Padding');
const iconButton = figma.selectedInstance.getBoolean('Icon Button', {
  true: figma.properties.children(['Icon Button']),
  false: undefined,
});
const __props: Record<string, unknown> = {};
if (variant && variant.type !== 'ERROR') {
  __props['variant'] = variant;
}
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}
if (horizontalPadding && horizontalPadding.type !== 'ERROR') {
  __props['horizontalPadding'] = horizontalPadding;
}
if (verticalPadding && verticalPadding.type !== 'ERROR') {
  __props['verticalPadding'] = verticalPadding;
}
if (iconButton && iconButton.type !== 'ERROR') {
  __props['iconButton'] = iconButton;
}

export default {
  id: 'Category',
  imports: [
    "import { Category, CategoryList, CategoryListItem } from '@montage-ui/core';",
  ],
  example: figma.code`<Category defaultValue="1">
      <CategoryList${figma.helpers.react.renderProp(
        'variant',
        variant,
      )}${figma.helpers.react.renderProp(
        'size',
        size,
      )}${figma.helpers.react.renderProp(
        'horizontalPadding',
        horizontalPadding,
      )}${figma.helpers.react.renderProp(
        'verticalPadding',
        verticalPadding,
      )}${figma.helpers.react.renderProp('iconButton', iconButton)}>
        <CategoryListItem value="1">텍스트</CategoryListItem>
        <CategoryListItem value="2">텍스트</CategoryListItem>
        <CategoryListItem value="3">텍스트</CategoryListItem>
      </CategoryList>
    </Category>`,
  metadata: { nestable: true, __props },
};
