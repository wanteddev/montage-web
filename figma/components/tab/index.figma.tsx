import { figma } from '@figma/code-connect';

import { Tab, TabList, TabListItem } from '@montage-ui/core';

figma.connect(Tab, '<FIGMA_TAB>', {
  props: {
    size: figma.enum('Size', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
    resize: figma.enum('Resize', {
      Hug: 'hug',
      Fill: 'fill',
    }),
    horizontalPadding: figma.boolean('Horizontal Padding'),
    iconButton: figma.boolean('Trailing Icon Button', {
      true: figma.children('Icon Button'),
      false: undefined,
    }),
    tab1: figma.boolean('Tab 1', {
      true: <TabListItem value="1">텍스트</TabListItem>,
      false: undefined,
    }),
    tab2: figma.boolean('Tab 2', {
      true: <TabListItem value="2">텍스트</TabListItem>,
      false: undefined,
    }),
    tab3: figma.boolean('Tab 3', {
      true: <TabListItem value="3">텍스트</TabListItem>,
      false: undefined,
    }),
    tab4: figma.boolean('Tab 4', {
      true: <TabListItem value="4">텍스트</TabListItem>,
      false: undefined,
    }),
    tab5: figma.boolean('Tab 5', {
      true: <TabListItem value="5">텍스트</TabListItem>,
      false: undefined,
    }),
    tab6: figma.boolean('Tab 6', {
      true: <TabListItem value="6">텍스트</TabListItem>,
      false: undefined,
    }),
    tab7: figma.boolean('Tab 7', {
      true: <TabListItem value="7">텍스트</TabListItem>,
      false: undefined,
    }),
    tab8: figma.boolean('Tab 8', {
      true: <TabListItem value="8">텍스트</TabListItem>,
      false: undefined,
    }),
  },
  example: ({ tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8, ...props }) => (
    <Tab defaultValue="1">
      <TabList {...props}>
        {tab1}
        {tab2}
        {tab3}
        {tab4}
        {tab5}
        {tab6}
        {tab7}
        {tab8}
      </TabList>
    </Tab>
  ),
});
