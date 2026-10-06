import { figma } from '@figma/code-connect';

import { Category, CategoryList, CategoryListItem } from '@montage-ui/core';

figma.connect(Category, '<FIGMA_CATEGORY>', {
  props: {
    variant: figma.enum('Variant', {
      Normal: 'normal',
      Alternative: 'alternative',
    }),
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
      XLarge: 'xlarge',
    }),
    horizontalPadding: figma.boolean('Horizontal Padding'),
    verticalPadding: figma.boolean('Vertical Padding'),
    iconButton: figma.boolean('Icon Button', {
      true: figma.children('Icon Button'),
      false: undefined,
    }),
  },
  example: (props) => (
    <Category defaultValue="1">
      <CategoryList {...props}>
        <CategoryListItem value="1">텍스트</CategoryListItem>
        <CategoryListItem value="2">텍스트</CategoryListItem>
        <CategoryListItem value="3">텍스트</CategoryListItem>
      </CategoryList>
    </Category>
  ),
});
