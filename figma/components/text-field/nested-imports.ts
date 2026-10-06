import type figma from 'figma';

type InstanceHandle = ReturnType<typeof figma.selectedInstance.findInstance>;

/**
 * Code Connect only hoists the imports of directly nested templates. Content
 * resources (TextFieldContent / TextAreaContent / SelectContent) render further
 * instances (IconButton, Button, icons, …), so their parents list those imports
 * explicitly from the layer structure.
 */

const pascal = (text: string) =>
  text.replace(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, (_, __, char: string) =>
    char.toUpperCase(),
  );

const isInstance = (layer: InstanceHandle | undefined | null) =>
  Boolean(layer) && layer?.type !== 'ERROR';

const safeFind = (layer: InstanceHandle, name: string) => {
  try {
    return layer.findInstance(name);
  } catch {
    return undefined;
  }
};

/** Icon component name of an `Icons/Icons` wrapper (or a layer wrapping one). */
export const iconComponentName = (
  layer: InstanceHandle | undefined,
  depth = 0,
): string | undefined => {
  if (!layer || layer.type === 'ERROR' || depth > 3) {
    return undefined;
  }
  try {
    const swap = layer.getInstanceSwap('Icon');
    if (swap && swap.type !== 'ERROR') {
      const name = swap.getPropertyValue('Name');
      if (typeof name === 'string' && name.trim()) {
        return `Icon${pascal(name.trim())}`;
      }
    }
  } catch {
    // Not an icon wrapper: look one level deeper.
  }
  return iconComponentName(safeFind(layer, 'Icon'), depth + 1);
};

// Layer name of a nested instance → core components it renders.
const CORE_BY_LAYER: Array<[string, Array<string>]> = [
  ['Icon Button', ['IconButton']],
  ['Button/Icon/Normal', ['IconButton']],
  ['Button/Button', ['Button']],
  ['Content Badge/Content Badge', ['ContentBadge']],
  [
    'Segmented Control/Segmented Control',
    ['SegmentedControl', 'SegmentedControlItem'],
  ],
];

export type NestedImports = {
  core: Array<string>;
  icons: Array<string>;
  /** Icons rendered inside nested components (excludes a direct `Icon` layer). */
  deepIcons: Array<string>;
};

/** Components rendered below a content resource instance (not the resource itself). */
export const contentResourceImports = (
  content: InstanceHandle | undefined,
): NestedImports => {
  const core = new Set<string>();
  const deepIcons = new Set<string>();
  if (!content || content.type === 'ERROR') {
    return { core: [], icons: [], deepIcons: [] };
  }
  for (const [layerName, names] of CORE_BY_LAYER) {
    const layer = safeFind(content, layerName);
    if (isInstance(layer)) {
      names.forEach((name) => core.add(name));
      const icon = iconComponentName(layer);
      if (icon) deepIcons.add(icon);
    }
  }
  const directIcon = iconComponentName(safeFind(content, 'Icon'));
  const icons = new Set(deepIcons);
  if (directIcon) icons.add(directIcon);
  return { core: [...core], icons: [...icons], deepIcons: [...deepIcons] };
};

export const mergeImports = (
  ...parts: Array<NestedImports>
): NestedImports => ({
  core: [...new Set(parts.flatMap((part) => part.core))],
  icons: [...new Set(parts.flatMap((part) => part.icons))],
  deepIcons: [...new Set(parts.flatMap((part) => part.deepIcons))],
});

/** One statement per icon, matching the icon batch template's import format. */
export const iconImportStatements = (icons: Array<string>) =>
  [...new Set(icons)]
    .sort()
    .map((icon) => `import { ${icon} } from "@montage-ui/icon";`);

/** Import statements for `@montage-ui/core` names plus any icons. */
export const importStatements = (
  coreNames: Array<string>,
  nested: NestedImports = { core: [], icons: [], deepIcons: [] },
) => {
  const core = [...new Set([...coreNames, ...nested.core])].sort();
  return [
    `import { ${core.join(', ')} } from '@montage-ui/core';`,
    ...iconImportStatements(nested.icons),
  ];
};
