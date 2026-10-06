// url=<FIGMA_TAB>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/tab/index.tsx
// component=Tab

import figma from 'figma';

import {
  elementProp,
  renderIconButton,
  uniqueImports,
} from '../top-navigation/top-navigation-shared';

const instance = figma.selectedInstance;

// Core TabList defaults: `size="large"`, `resize="hug"`.
const size = instance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: undefined,
});
const resize = instance.getEnum('Resize', { Hug: undefined, Fill: 'fill' });
const horizontalPadding = instance.getBoolean('Horizontal Padding') === true;
const iconButton =
  instance.getBoolean('Trailing Icon Button') === true
    ? renderIconButton(instance.findInstance('Icon Button'))
    : undefined;

// Tab items (`Tab 1`…`Tab 8`) carry their label (`┗ Text`), `Active` and
// `Disabled`; the active one becomes the uncontrolled default value.
const items = Array.from({ length: 8 }, (_, offset) => offset + 1)
  .filter((index) => instance.getBoolean(`Tab ${index}`) === true)
  .map((index) => {
    const tab = instance.findInstance(`Tab ${index}`);
    const has = tab.type !== 'ERROR';
    return {
      value: String(index),
      label: has ? tab.getString('┗ Text') : '',
      active: has && tab.getPropertyValue('Active') === 'True',
      disabled: has && tab.getPropertyValue('Disabled') === 'True',
    };
  });
const defaultValue =
  (items.find((item) => item.active) ?? items[0])?.value ?? '1';

const list = items
  .map(
    (item) =>
      figma.tsx`<TabListItem value="${item.value}"${item.disabled ? ' disabled' : ''}>
      ${item.label}
    </TabListItem>`,
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
  "import { Tab, TabList, TabListItem } from '@montage-ui/core';",
  ...(iconButton?.imports ?? []),
]);

export default {
  id: 'Tab',
  imports,
  example: figma.tsx`<Tab defaultValue="${defaultValue}">
  <TabList${size ? ` size="${size}"` : ''}${resize ? ` resize="${resize}"` : ''}${
    horizontalPadding ? ' horizontalPadding' : ''
  }${elementProp('iconButton', iconButton)}>
    ${list ?? ''}
  </TabList>
</Tab>`,
  metadata: { nestable: true, props: { imports } },
};
