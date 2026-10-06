// url=<FIGMA_MENU>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/menu/index.tsx
// component=Menu

import figma from 'figma';

import { joinTemplates } from '../../helpers/list-cell';
import { coreImport } from '../../helpers/menu-item';

// Every row in the menu is a `Cell` layer; designers swap some rows to the
// group title resource. Rows are walked in order and items following a title
// are wrapped in `<MenuGroup title="…">`.
const rows = figma.selectedInstance.findLayers(
  (layer) => layer.type === 'INSTANCE' && layer.name === 'Cell',
);

const imports = new Set([
  'Button',
  'Menu',
  'MenuContent',
  'MenuList',
  'MenuTrigger',
]);
const groups: Array<{ title: string | undefined; items: Array<unknown> }> = [];

rows.forEach((row) => {
  if (row.type !== 'INSTANCE' || !row.hasCodeConnect()) {
    return;
  }

  const { example, metadata } = row.executeTemplate();
  const props = metadata?.props ?? {};

  if (row.codeConnectId() === 'MenuGroup' || typeof props.title === 'string') {
    imports.add('MenuGroup');
    groups.push({ title: props.title as string, items: [] });
    return;
  }

  ((props.imports as Array<string> | undefined) ?? []).forEach((name) =>
    imports.add(name),
  );
  if (groups.length === 0) {
    groups.push({ title: undefined, items: [] });
  }
  groups[groups.length - 1].items.push(example);
});

const list =
  groups.length === 0
    ? ''
    : joinTemplates(
        groups.map(({ title, items }) => {
          const joined = items.length > 0 ? joinTemplates(items) : '';
          return title === undefined
            ? joined
            : figma.tsx`<MenuGroup title=${JSON.stringify(title)}>
${joined}
</MenuGroup>`;
        }),
      );

const actionArea = figma.selectedInstance.getBoolean('Action Area', {
  true: figma.properties.children(['Menu Action Area']),
  false: undefined,
});

export default {
  id: 'Menu',
  imports: [coreImport([...imports])],
  example: figma.tsx`<Menu>
  <MenuTrigger>
    <Button>Trigger</Button>
  </MenuTrigger>
  <MenuContent>
    <MenuList>
${list}
    </MenuList>
    ${figma.helpers.react.renderChildren(actionArea)}
  </MenuContent>
</Menu>`,
  metadata: { nestable: true },
};
