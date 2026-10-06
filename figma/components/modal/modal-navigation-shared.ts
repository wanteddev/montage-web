import figma from 'figma';

import { joinTemplates, renderElementProp } from '../../helpers/list-cell';

type InstanceHandle = ReturnType<typeof figma.selectedInstance.findInstance>;

export const NAVIGATION_IMPORT =
  "import { ModalNavigation, ModalNavigationButton } from '@montage-ui/core';";
export const NAVIGATION_BUTTON_IMPORT =
  "import { ModalNavigationButton } from '@montage-ui/core';";

const isInstance = (
  layer: unknown,
): layer is Exclude<InstanceHandle, { type: 'ERROR' }> =>
  Boolean(layer) && (layer as InstanceHandle).type === 'INSTANCE';

/** Renders a layer with its own Code Connect template, if it has one. */
export const renderLayer = (layer: InstanceHandle | undefined) =>
  isInstance(layer) && layer.hasCodeConnect()
    ? layer.executeTemplate().example
    : undefined;

/** The first instance directly inside a resource (each resource wraps one button). */
const firstChildInstance = (layer: InstanceHandle) =>
  isInstance(layer)
    ? (layer.children.find((child) => child.type === 'INSTANCE') as
        | InstanceHandle
        | undefined)
    : undefined;

const buttonTag = (variant: string, props: string, children?: unknown) =>
  children
    ? figma.tsx`<ModalNavigationButton variant="${variant}"${props}>${children}</ModalNavigationButton>`
    : figma.tsx`<ModalNavigationButton variant="${variant}"${props} />`;

/**
 * Icon based navigation buttons. `layer` is either an icon button
 * (`Button/Icon/Normal`) or the floating wrapper
 * (`…/Trailing/Action/Float/Icon Button`, which adds `Background`).
 * Back / close buttons render the core default icon, so only `icon-button`
 * passes the Figma icon as children.
 */
const renderIconButton = (
  variant: 'icon-button' | 'back-button' | 'close-button',
  layer: InstanceHandle | undefined,
) => {
  let iconButton = layer;
  let props = '';

  if (isInstance(layer) && 'Background' in layer.properties) {
    iconButton = layer.findInstance('Icon');
    if (layer.getPropertyValue('Background') === 'True') {
      props += ' background';
      if (
        isInstance(iconButton) &&
        iconButton.getPropertyValue('Alternative') === 'True'
      ) {
        props += ' alternative';
      }
    }
  }
  if (
    isInstance(iconButton) &&
    iconButton.getPropertyValue('Disable') === 'True'
  ) {
    props += ' disabled';
  }

  const icon =
    variant === 'icon-button' && isInstance(iconButton)
      ? renderLayer(iconButton.findInstance('Icon'))
      : undefined;

  return buttonTag(variant, props, icon);
};

const renderTextButton = (layer: InstanceHandle | undefined) => {
  if (!isInstance(layer)) {
    return buttonTag('text-button', '');
  }
  const props =
    (layer.getPropertyValue('Color') === 'Primary' ? ' color="primary"' : '') +
    (layer.getPropertyValue('Disable') === 'True' ? ' disabled' : '');
  return buttonTag('text-button', props, layer.getString('Label'));
};

/** Leading resources: `Variant` = Back Button | Icon Button | Text Button. */
export const renderLeadingButton = (resource: InstanceHandle) => {
  if (!isInstance(resource)) {
    return undefined;
  }
  const button = firstChildInstance(resource);
  switch (resource.getPropertyValue('Variant')) {
    case 'Back Button':
      return renderIconButton('back-button', button);
    case 'Icon Button':
      return renderIconButton('icon-button', button);
    case 'Text Button':
      return renderTextButton(button);
    default:
      return undefined;
  }
};

/** Trailing action resources: `Variant` = Text | Close Button | Icon. */
export const renderTrailingAction = (resource: InstanceHandle) => {
  if (!isInstance(resource)) {
    return undefined;
  }
  const button = firstChildInstance(resource);
  switch (resource.getPropertyValue('Variant')) {
    case 'Close Button':
      return renderIconButton('close-button', button);
    case 'Icon':
      return renderIconButton('icon-button', button);
    case 'Text':
      return renderTextButton(button);
    default:
      return undefined;
  }
};

/** A close button without background / disabled matches core's default trailing content. */
const isDefaultClose = (resource: InstanceHandle) => {
  if (
    !isInstance(resource) ||
    resource.getPropertyValue('Variant') !== 'Close Button'
  ) {
    return false;
  }
  const button = firstChildInstance(resource);
  if (!isInstance(button)) {
    return true;
  }
  if ('Background' in button.properties) {
    if (button.getPropertyValue('Background') === 'True') {
      return false;
    }
    const inner = button.findInstance('Icon');
    return !(isInstance(inner) && inner.getPropertyValue('Disable') === 'True');
  }
  return button.getPropertyValue('Disable') !== 'True';
};

/** Visible `Button N` actions inside a trailing group (`┗ Button`, `┗ Button 2`, …). */
const visibleActions = (
  owner: InstanceHandle,
  toggles: Array<[layer: string, property: string]>,
) =>
  isInstance(owner)
    ? toggles
        .filter(([, property]) => owner.getBoolean(property) === true)
        .map(([layer]) => owner.findInstance(layer))
        .filter(isInstance)
    : [];

/** Renders the `Modal/Resource/Navigation/Trailing` group (up to 3 actions). */
export const trailingGroupActions = (group: InstanceHandle) =>
  visibleActions(group, [
    ['Button 1', '┗ Button'],
    ['Button 2', '┗ Button 2'],
    ['Button 3', '┗ Button 3'],
  ]);

export const joinElements = (elements: Array<unknown>) => {
  const list = elements.filter(Boolean);
  if (list.length === 0) {
    return undefined;
  }
  return list.length === 1 ? list[0] : figma.tsx`<>${joinTemplates(list)}</>`;
};

type NavigationVariant = 'normal' | 'emphasized' | 'floating' | 'search';

/**
 * Builds `<ModalNavigation>` from a navigation contents instance
 * (`Modal/Resource/Navigation/Resource/Contents/*`).
 * `defaultVariant` is omitted from the output (core picks it per container).
 */
export const renderModalNavigation = (
  bar: InstanceHandle,
  variant: NavigationVariant,
  {
    background = false,
    defaultVariant,
  }: { background?: boolean; defaultVariant?: NavigationVariant } = {},
) => {
  if (!isInstance(bar)) {
    return figma.tsx`<ModalNavigation />`;
  }

  const floating = variant === 'floating';
  const search = variant === 'search';

  // Title (or search field) shown in the navigation row.
  // Property names are looked up trimmed at runtime (`\u2003┗ Text` → `┗ Text`).
  const titleProperty = floating ? '┗ Title​' : '┗ Title';
  const title = search
    ? renderLayer(bar.findInstance('Search field'))
    : bar.getBoolean(titleProperty) === true
      ? bar.getString('┗ Text')
      : undefined;

  const leadingContent =
    bar.getBoolean('┗ Leading Button') === true
      ? renderLeadingButton(bar.findInstance('Leading Button'))
      : undefined;

  // Trailing actions: floating lists `Button 1..3` directly, search has a single
  // action, the others nest a `Trailing` group.
  const showTrailing = bar.getBoolean('┗ Trailing Button') === true;
  let actions: Array<InstanceHandle> = [];
  if (showTrailing) {
    if (floating) {
      actions = visibleActions(bar, [
        ['Button 1', '┗ Button'],
        ['Button 2', '┗ Button 2'],
        ['Button 3', '┗ Button 3'],
      ]);
    } else if (search) {
      actions = [bar.findInstance('Trailing Button')].filter(isInstance);
    } else {
      actions = trailingGroupActions(bar.findInstance('Trailing Button'));
    }
  }
  // Core renders a close button by default: omit it when Figma shows exactly that,
  // and pass `null` to hide it when no trailing action is shown.
  let trailingProp: unknown = '';
  if (actions.length === 0) {
    trailingProp = ' trailingContent={null}';
  } else if (!(actions.length === 1 && isDefaultClose(actions[0]))) {
    trailingProp = renderElementProp(
      'trailingContent',
      joinElements(actions.map(renderTrailingAction)),
    );
  }

  // Toolbar (not rendered by core in the floating variant).
  const toolbar =
    !floating && bar.getBoolean('Tool Bar') === true
      ? joinElements([
          renderLayer(bar.findInstance('Tool')),
          bar.getBoolean('Tool Bar 2') === true
            ? renderLayer(bar.findInstance('Tool 2'))
            : undefined,
        ])
      : undefined;

  const variantProp = variant === defaultVariant ? '' : ` variant="${variant}"`;
  const backgroundProp = floating && background ? ' background' : '';

  const opening = figma.tsx`<ModalNavigation${variantProp}${backgroundProp}${renderElementProp(
    'leadingContent',
    leadingContent,
  )}${trailingProp}${renderElementProp('toolbar', toolbar)}`;

  return title
    ? figma.tsx`${opening}>
  ${title}
</ModalNavigation>`
    : figma.tsx`${opening} />`;
};
