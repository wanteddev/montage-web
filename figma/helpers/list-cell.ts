import figma from 'figma';

type InstanceHandle = ReturnType<typeof figma.selectedInstance.findInstance>;

/**
 * ListCell based components re-export the same slot wrappers under their own
 * names (e.g. `ListCellContent` = `MenuItemContent` = `OptionContent`).
 * These names decide which wrapper a slot preset is rendered with.
 */
export type ListCellSlotNames = {
  content: string;
  labelTrailing: string;
  extraContent: string;
};

export const LIST_CELL_SLOT_NAMES: ListCellSlotNames = {
  content: 'ListCellContent',
  labelTrailing: 'ListCellLabelTrailing',
  extraContent: 'ListCellExtraContent',
};

export const MENU_ITEM_SLOT_NAMES: ListCellSlotNames = {
  content: 'MenuItemContent',
  labelTrailing: 'MenuItemLabelTrailing',
  extraContent: 'MenuItemExtraContent',
};

export const OPTION_SLOT_NAMES: ListCellSlotNames = {
  content: 'OptionContent',
  labelTrailing: 'OptionLabelTrailing',
  extraContent: 'OptionExtraContent',
};

export const AUTOCOMPLETE_OPTION_SLOT_NAMES: ListCellSlotNames = {
  content: 'AutocompleteOptionContent',
  labelTrailing: 'AutocompleteOptionLabelTrailing',
  extraContent: 'AutocompleteOptionExtraContent',
};

export const ACCORDION_SUMMARY_SLOT_NAMES: ListCellSlotNames = {
  content: 'AccordionSummaryContent',
  labelTrailing: 'AccordionSummaryLabelTrailing',
  extraContent: 'AccordionSummaryExtraContent',
};

export type ListCellData = {
  label: string | undefined;
  description: string | undefined;
  leadingContent: unknown;
  trailingContent: unknown;
  labelTrailing: unknown;
  extraContent: unknown;
  /** Wrapper component names actually used, for the import statement. */
  usedNames: Array<string>;
};

/**
 * Re-renders one connected preset instance with the given wrapper name.
 * Presets expose their wrapper `variant` through `metadata.props.variant`
 * and their content through `metadata.__props.children`.
 */
export const renderPreset = (
  instance: InstanceHandle,
  component: string,
  extraProps = '',
) => {
  if (instance.type === 'ERROR' || !instance.hasCodeConnect()) {
    return undefined;
  }

  const { metadata } = instance.executeTemplate();
  const variant = metadata?.props?.variant as string | undefined;
  const children = metadata?.__props?.children as Parameters<
    typeof figma.helpers.react.renderChildren
  >[0];
  const variantProp = (variant ? ` variant="${variant}"` : '') + extraProps;

  return children
    ? figma.tsx`<${component}${variantProp}>${figma.helpers.react.renderChildren(
        children,
      )}</${component}>`
    : figma.tsx`<${component}${variantProp} />`;
};

/**
 * Re-renders every preset inside a slot with the given wrapper name.
 * With `chevron`, the chevron is attached to the last preset, or rendered as
 * an empty content wrapper when the slot has nothing to show.
 */
const renderSlot = (
  cell: InstanceHandle,
  showPropName: string,
  slotPropName: string,
  component: string,
  usedNames: Set<string>,
  chevron = false,
) => {
  if (cell.type === 'ERROR') {
    return undefined;
  }

  const slot =
    cell.getBoolean(showPropName) === true
      ? cell.getSlot(slotPropName)
      : undefined;
  const instances = slot ? slot.connectedInstances : [];

  if (instances.length === 0) {
    if (!chevron) {
      return undefined;
    }
    usedNames.add(component);
    return figma.tsx`<${component} chevron />`;
  }

  usedNames.add(component);

  const rendered = instances.map((instance, index) =>
    renderPreset(
      instance,
      component,
      chevron && index === instances.length - 1 ? ' chevron' : '',
    ),
  );

  return rendered.length === 1
    ? rendered[0]
    : figma.tsx`<>${joinTemplates(rendered)}</>`;
};

/** Reads label, description and slot contents of a nested `List Cell` instance. */
export const readListCell = (
  cell: InstanceHandle,
  names: ListCellSlotNames,
): ListCellData => {
  const usedNames = new Set<string>();

  if (cell.type === 'ERROR') {
    return {
      label: undefined,
      description: undefined,
      leadingContent: undefined,
      trailingContent: undefined,
      labelTrailing: undefined,
      extraContent: undefined,
      usedNames: [],
    };
  }

  const leadingContent = renderSlot(
    cell,
    'Show Leading Content',
    'Leading Content',
    names.content,
    usedNames,
  );
  // `┗ Chevron` only applies while the cell is interactive.
  const chevron =
    cell.getBoolean('Interaction') === true &&
    cell.getBoolean('┗ Chevron') === true;
  const trailingContent = renderSlot(
    cell,
    'Show Trailing Content',
    'Trailing Content',
    names.content,
    usedNames,
    chevron,
  );
  const labelTrailing = renderSlot(
    cell,
    'Show Label Trailing',
    'Label Trailing',
    names.labelTrailing,
    usedNames,
  );
  const extraContent = renderSlot(
    cell,
    'Show Extra Content',
    'Extra Content',
    names.extraContent,
    usedNames,
  );

  return {
    label: cell.getString('Label'),
    description:
      cell.getBoolean('Description') === true
        ? cell.getString('┗ Text')
        : undefined,
    leadingContent,
    trailingContent,
    labelTrailing,
    extraContent,
    usedNames: [...usedNames],
  };
};

/** Joins rendered template results with line breaks. */
export const joinTemplates = (templates: Array<unknown>) =>
  templates.reduce(
    (joined, template) => figma.tsx`${joined}
${template}`,
  );

/** Renders a JSX prop whose value is a rendered element, or nothing. */
export const renderElementProp = (name: string, value: unknown) =>
  value ? figma.tsx` ${name}={${value}}` : '';

/** Renders `textProps={{ description: "…" }}` when a description exists. */
export const renderDescriptionProp = (description: string | undefined) =>
  description
    ? ` textProps={{ description: ${JSON.stringify(description)} }}`
    : '';
