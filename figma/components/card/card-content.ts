import figma from 'figma';

type InstanceHandle = ReturnType<typeof figma.selectedInstance.findInstance>;

export type Rendered = {
  code: unknown;
  /** Component names imported from `@montage-ui/core`. */
  coreNames: Array<string>;
  /** Component names imported from `@montage-ui/icon`. */
  iconNames: Array<string>;
};

const optionalBoolean = (instance: InstanceHandle, propName: string) => {
  try {
    return instance.type !== 'ERROR' && instance.getBoolean(propName) === true;
  } catch {
    return false;
  }
};

const renderInstance = (instance: InstanceHandle) =>
  instance.type === 'ERROR' ? undefined : instance.executeTemplate().example;

/**
 * `Card/Resource/*\/Save`: a bookmark toggle. Rendered as `ToggleIcon` with the
 * bookmark icon, `active` when the resource's `Save` variant is on.
 */
export const renderSaveToggle = (save: InstanceHandle): Rendered => {
  const active =
    save.type !== 'ERROR' && save.getPropertyValue('Save') === 'True';

  return {
    code: figma.tsx`<ToggleIcon${active ? ' defaultActive' : ''}>
  <IconBookmark />
</ToggleIcon>`,
    coreNames: ['ToggleIcon'],
    iconNames: ['IconBookmark'],
  };
};

/**
 * `Card/Resource/Normal/Content/*` placed in the Top/Bottom Content slots.
 * Badge resources become `<Row variant="badge">` with their badges; anything
 * else becomes a `custom` row.
 */
export const renderRow = (
  layer: InstanceHandle,
  rowComponent: string,
  position: 'top' | 'bottom',
): Rendered | undefined => {
  if (layer.type === 'ERROR') {
    return undefined;
  }

  const firstBadge = layer.findInstance('Badge');
  if (firstBadge.type === 'ERROR') {
    return {
      code: figma.tsx`<${rowComponent} position="${position}" variant="custom" />`,
      coreNames: [rowComponent],
      iconNames: [],
    };
  }

  const badges = [
    renderInstance(firstBadge),
    ...['Badge 2', 'Badge 3']
      .filter((name) => optionalBoolean(layer, name))
      .map((name) => renderInstance(layer.findInstance(name))),
  ].filter(Boolean);

  return {
    code: figma.tsx`<${rowComponent} position="${position}" variant="badge">
  ${badges.reduce(
    (joined, badge) => figma.tsx`${joined}
  ${badge}`,
  )}
</${rowComponent}>`,
    coreNames: [rowComponent, 'ContentBadge'],
    iconNames: [],
  };
};

/**
 * `Card/Resource/List/{Leading,Trailing} Content/*` placed in ListCard slots.
 */
export const renderListCardContent = (
  layer: InstanceHandle,
): Rendered | undefined => {
  if (layer.type === 'ERROR') {
    return undefined;
  }

  const checkbox = layer.findInstance('Checkbox');
  if (checkbox.type !== 'ERROR') {
    return {
      code: figma.tsx`<ListCardContent variant="checkbox">
  ${renderInstance(checkbox)}
</ListCardContent>`,
      coreNames: ['ListCardContent', 'Checkbox'],
      iconNames: [],
    };
  }

  if (layer.findInstance('Icon/Normal/Chevron Right').type !== 'ERROR') {
    return {
      code: figma.tsx`<ListCardContent variant="icon">
  <IconChevronRight />
</ListCardContent>`,
      coreNames: ['ListCardContent'],
      iconNames: ['IconChevronRight'],
    };
  }

  if (layer.findInstance('Icon/Normal/Bookmark').type !== 'ERROR') {
    const toggle = renderSaveToggle(layer);
    return {
      code: figma.tsx`<ListCardContent variant="toggle-icon">
  ${toggle.code}
</ListCardContent>`,
      coreNames: ['ListCardContent', ...toggle.coreNames],
      iconNames: toggle.iconNames,
    };
  }

  return {
    code: figma.tsx`<ListCardContent variant="custom" />`,
    coreNames: ['ListCardContent'],
    iconNames: [],
  };
};

export const buildImports = (
  coreNames: Array<string>,
  iconNames: Array<string>,
) => {
  const imports = [
    `import { ${[...new Set(coreNames)].sort().join(', ')} } from '@montage-ui/core';`,
  ];
  if (iconNames.length > 0) {
    imports.push(
      `import { ${[...new Set(iconNames)].sort().join(', ')} } from '@montage-ui/icon';`,
    );
  }
  return imports;
};
