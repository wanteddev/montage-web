import figma from 'figma';

import { renderIcon } from '../../helpers/icon';
import { executedImports } from '../modal/collect-imports';

type InstanceHandle = ReturnType<typeof figma.selectedInstance.findInstance>;

/** Rendered code plus the import statements it needs. */
export type Rendered = { code: unknown; imports: Array<string> };

const CORE = (name: string) => `import { ${name} } from '@montage-ui/core';`;

const isInstance = (
  handle: InstanceHandle | undefined,
): handle is InstanceHandle => Boolean(handle) && handle.type !== 'ERROR';

/** Returns the first instance found under any of the given layer names. */
export const findFirst = (parent: InstanceHandle, names: Array<string>) => {
  if (!isInstance(parent)) {
    return undefined;
  }
  for (const name of names) {
    const found = parent.findInstance(name);
    if (isInstance(found)) {
      return found;
    }
  }
  return undefined;
};

/**
 * Renders a nested connected instance and re-declares its imports, because Code
 * Connect forwards imports only one level up (see `executedImports`).
 */
export const renderNested = (
  handle: InstanceHandle | undefined,
): Rendered | undefined => {
  if (!isInstance(handle) || !handle.hasCodeConnect()) {
    return undefined;
  }
  const executed = handle.executeTemplate();
  return { code: executed.example, imports: executedImports(executed) };
};

/**
 * Finds the swapped icon below a button resource. The icon sits in an `Icons`
 * wrapper (an instance exposing the `Icon` swap), sometimes behind the Dim
 * interaction resource, so search the whole subtree for it.
 */
const renderButtonIcon = (button: InstanceHandle): Rendered | undefined => {
  const wrapper = button
    .findLayers(
      (layer) =>
        layer.type === 'INSTANCE' &&
        Object.prototype.hasOwnProperty.call(layer.properties, 'Icon'),
      { traverseInstances: true },
    )
    .find((layer) => layer.type === 'INSTANCE') as InstanceHandle | undefined;
  return isInstance(wrapper)
    ? renderIcon(wrapper.getInstanceSwap('Icon'))
    : undefined;
};

const iconButton = (icon: Rendered | undefined): Rendered => ({
  code: icon
    ? figma.tsx`<TopNavigationButton>
  ${icon.code}
</TopNavigationButton>`
    : figma.tsx`<TopNavigationButton />`,
  imports: [CORE('TopNavigationButton'), ...(icon?.imports ?? [])],
});

const textButton = (text: InstanceHandle): Rendered => {
  const label = isInstance(text) ? text.getString('Label') : '';
  // Both leading and action text buttons are `Text Button/Text Button`
  // instances (`Color` = Primary | Assistive). Only a resolved string is a value;
  // a missing property comes back as an error handle.
  const rawColor = isInstance(text)
    ? text.getEnum('Color', { Primary: 'primary', Assistive: undefined })
    : undefined;
  const color = typeof rawColor === 'string' ? rawColor : undefined;
  const disabled = isInstance(text) && text.getBoolean('Disable') === true;
  return {
    code: figma.tsx`<TopNavigationButton variant="text-button"${
      color ? ` color="${color}"` : ''
    }${disabled ? ' disabled' : ''}>
  ${label}
</TopNavigationButton>`,
    imports: [CORE('TopNavigationButton')],
  };
};

/**
 * Leading resources (`Top Navigation/Resource/Leading/{Normal,Float}/Default`):
 * `Type` is Back | Icon Button | Text Button.
 */
export const renderLeading = (
  leading: InstanceHandle | undefined,
): Rendered | undefined => {
  if (!isInstance(leading)) {
    return undefined;
  }
  const type = leading.getPropertyValue('Type');
  if (type === 'Back') {
    return {
      code: figma.tsx`<TopNavigationButton variant="back-button" />`,
      imports: [CORE('TopNavigationButton')],
    };
  }
  if (type === 'Text Button') {
    return textButton(leading.findInstance('Text'));
  }
  return iconButton(renderButtonIcon(leading));
};

/**
 * A single trailing action (`…/Action/Normal`), shared by the normal and the
 * floating trailing groups. Rendered from its layers so the icon import is
 * re-declared, since Code Connect forwards imports only one level up.
 */
export const renderAction = (
  action: InstanceHandle | undefined,
): Rendered | undefined => {
  if (!isInstance(action)) {
    return undefined;
  }
  if (action.getPropertyValue('Variant') === 'Text') {
    return textButton(action.findInstance('Text'));
  }
  return iconButton(renderButtonIcon(action));
};

const TRAILING_BUTTONS: Array<[layer: string, toggle: string]> = [
  ['Button 1', '┗ Button'],
  ['Button 2', '┗ Button 2'],
  ['Button 3', '┗ Button 3'],
];

/** The trailing group (`…/Trailing/Normal`): up to three toggleable actions. */
export const renderTrailingGroup = (
  group: InstanceHandle | undefined,
): Array<Rendered> => {
  if (!isInstance(group)) {
    return [];
  }
  return TRAILING_BUTTONS.filter(
    ([, toggle]) => group.getBoolean(toggle) === true,
  )
    .map(([layer]) => renderAction(group.findInstance(layer)))
    .filter((rendered): rendered is Rendered => Boolean(rendered));
};

/** Joins rendered parts into one element (a fragment when there are several). */
export const joinRendered = (
  parts: Array<Rendered | undefined>,
): Rendered | undefined => {
  const list = parts.filter(
    (part): part is Rendered => Boolean(part) && Boolean(part.code),
  );
  if (list.length === 0) {
    return undefined;
  }
  const imports = list.flatMap((part) => part.imports);
  if (list.length === 1) {
    return { code: list[0].code, imports };
  }
  const body = list
    .map((part) => part.code)
    .reduce(
      (joined, code) => figma.tsx`${joined}
  ${code}`,
    );
  return {
    code: figma.tsx`<>
  ${body}
</>`,
    imports,
  };
};

/** Renders ` name={…}` for a rendered element, or nothing. */
export const elementProp = (name: string, rendered: Rendered | undefined) =>
  rendered ? figma.tsx` ${name}={${rendered.code}}` : '';

/** De-duplicates import statements. */
export const uniqueImports = (imports: Array<string>) => [...new Set(imports)];

/**
 * Renders a nested icon button instance with its own template and re-declares
 * the imports it needs (`IconButton` and the icon two levels down).
 */
export const renderIconButton = (
  handle: InstanceHandle | undefined,
): Rendered | undefined => {
  const rendered = renderNested(handle);
  if (!rendered || !isInstance(handle)) {
    return undefined;
  }
  const icon = renderButtonIcon(handle);
  return {
    code: rendered.code,
    imports: [
      ...rendered.imports,
      CORE('IconButton'),
      ...(icon?.imports ?? []),
    ],
  };
};
