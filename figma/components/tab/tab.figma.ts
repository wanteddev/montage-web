// url=<FIGMA_TAB>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/tab/index.tsx
// component=Tab

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
});
const resize = figma.selectedInstance.getEnum('Resize', {
  Hug: 'hug',
  Fill: 'fill',
});
const horizontalPadding =
  figma.selectedInstance.getBoolean('Horizontal Padding');
const iconButton = figma.selectedInstance.getBoolean('Trailing Icon Button', {
  true: figma.properties.children(['Icon Button']),
  false: undefined,
});
const tab1 = figma.selectedInstance.getBoolean('Tab 1', {
  true: figma.helpers.react.jsxElement(
    '<TabListItem value="1">텍스트</TabListItem>',
  ),
  false: undefined,
});
const tab2 = figma.selectedInstance.getBoolean('Tab 2', {
  true: figma.helpers.react.jsxElement(
    '<TabListItem value="2">텍스트</TabListItem>',
  ),
  false: undefined,
});
const tab3 = figma.selectedInstance.getBoolean('Tab 3', {
  true: figma.helpers.react.jsxElement(
    '<TabListItem value="3">텍스트</TabListItem>',
  ),
  false: undefined,
});
const tab4 = figma.selectedInstance.getBoolean('Tab 4', {
  true: figma.helpers.react.jsxElement(
    '<TabListItem value="4">텍스트</TabListItem>',
  ),
  false: undefined,
});
const tab5 = figma.selectedInstance.getBoolean('Tab 5', {
  true: figma.helpers.react.jsxElement(
    '<TabListItem value="5">텍스트</TabListItem>',
  ),
  false: undefined,
});
const tab6 = figma.selectedInstance.getBoolean('Tab 6', {
  true: figma.helpers.react.jsxElement(
    '<TabListItem value="6">텍스트</TabListItem>',
  ),
  false: undefined,
});
const tab7 = figma.selectedInstance.getBoolean('Tab 7', {
  true: figma.helpers.react.jsxElement(
    '<TabListItem value="7">텍스트</TabListItem>',
  ),
  false: undefined,
});
const tab8 = figma.selectedInstance.getBoolean('Tab 8', {
  true: figma.helpers.react.jsxElement(
    '<TabListItem value="8">텍스트</TabListItem>',
  ),
  false: undefined,
});
const __props: Record<string, unknown> = {};
if (size && size.type !== 'ERROR') {
  __props['size'] = size;
}
if (resize && resize.type !== 'ERROR') {
  __props['resize'] = resize;
}
if (horizontalPadding && horizontalPadding.type !== 'ERROR') {
  __props['horizontalPadding'] = horizontalPadding;
}
if (iconButton && iconButton.type !== 'ERROR') {
  __props['iconButton'] = iconButton;
}
if (tab1 && tab1.type !== 'ERROR') {
  __props['tab1'] = tab1;
}
if (tab2 && tab2.type !== 'ERROR') {
  __props['tab2'] = tab2;
}
if (tab3 && tab3.type !== 'ERROR') {
  __props['tab3'] = tab3;
}
if (tab4 && tab4.type !== 'ERROR') {
  __props['tab4'] = tab4;
}
if (tab5 && tab5.type !== 'ERROR') {
  __props['tab5'] = tab5;
}
if (tab6 && tab6.type !== 'ERROR') {
  __props['tab6'] = tab6;
}
if (tab7 && tab7.type !== 'ERROR') {
  __props['tab7'] = tab7;
}
if (tab8 && tab8.type !== 'ERROR') {
  __props['tab8'] = tab8;
}

export default {
  id: 'Tab',
  imports: ["import { Tab, TabList, TabListItem } from '@montage-ui/core';"],
  example: figma.code`<Tab defaultValue="1">
      <TabList${figma.helpers.react.renderProp(
        'size',
        size,
      )}${figma.helpers.react.renderProp(
        'resize',
        resize,
      )}${figma.helpers.react.renderProp(
        'horizontalPadding',
        horizontalPadding,
      )}${figma.helpers.react.renderProp('iconButton', iconButton)}>
        ${figma.helpers.react.renderChildren(tab1)}
        ${figma.helpers.react.renderChildren(tab2)}
        ${figma.helpers.react.renderChildren(tab3)}
        ${figma.helpers.react.renderChildren(tab4)}
        ${figma.helpers.react.renderChildren(tab5)}
        ${figma.helpers.react.renderChildren(tab6)}
        ${figma.helpers.react.renderChildren(tab7)}
        ${figma.helpers.react.renderChildren(tab8)}
      </TabList>
    </Tab>`,
  metadata: { nestable: true, __props },
};
