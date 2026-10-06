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
 * Code Connect only forwards imports one nesting level up. Re-rendered presets
 * therefore report the imports they need: statements declared by the preset
 * (`metadata.props.imports`) plus any `nestedImports` found in its sections.
 * Entries are full import statements and are merged by `coreImport`.
 */
const collectSectionImports = (
  value: unknown,
  sink: Set<string>,
  depth = 0,
) => {
  if (depth > 8 || value === null || typeof value !== 'object') {
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectSectionImports(item, sink, depth + 1));
    return;
  }
  const section = value as {
    nestedImports?: Array<string>;
    resultSections?: unknown;
    sections?: unknown;
  };
  section.nestedImports?.forEach((statement) => sink.add(statement));
  collectSectionImports(section.resultSections, sink, depth + 1);
  collectSectionImports(section.sections, sink, depth + 1);
};

/** Returns the import statements nested anywhere in rendered sections. */
export const collectNestedImports = (value: unknown): Array<string> => {
  const sink = new Set<string>();
  collectSectionImports(value, sink);
  return [...sink];
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
  importSink?: Set<string>,
  itemValue?: string,
) => {
  if (instance.type === 'ERROR' || !instance.hasCodeConnect()) {
    return undefined;
  }

  const { metadata } = instance.executeTemplate();
  // A radio preset renders `RadioGroupItem`, whose `value` must identify the
  // cell inside the surrounding `RadioGroup`: the parent passes its label.
  const radioItem = metadata?.props?.radioItem as string | undefined;
  if (importSink) {
    const declared = metadata?.props?.imports as Array<string> | undefined;
    declared?.forEach((statement) => importSink.add(statement));
    // Only the preset's content: its own example also carries the preset's
    // wrapper import (e.g. `ListCellContent`), which is replaced by `component`.
    collectSectionImports(metadata?.__props?.children, importSink);
  }
  const variant = metadata?.props?.variant as string | undefined;
  const children =
    radioItem !== undefined && itemValue !== undefined
      ? figma.tsx`<RadioGroupItem value=${JSON.stringify(
          itemValue,
        )} tabIndex={-1}${radioItem} />`
      : (metadata?.__props?.children as unknown);
  const variantProp = (variant ? ` variant="${variant}"` : '') + extraProps;

  // Presets pass either rendered sections (`figma.properties.children`), a
  // rendered template (`figma.tsx`), or plain text. Hidden content arrives as
  // an empty list, which renders as a self-closing wrapper.
  const isTemplate =
    typeof children === 'object' &&
    children !== null &&
    'sections' in (children as Record<string, unknown>);
  const isEmpty =
    children === undefined ||
    children === null ||
    children === '' ||
    (Array.isArray(children) && children.length === 0);

  if (isEmpty) {
    return figma.tsx`<${component}${variantProp} />`;
  }

  return figma.tsx`<${component}${variantProp}>${
    isTemplate
      ? children
      : figma.helpers.react.renderChildren(
          children as Parameters<typeof figma.helpers.react.renderChildren>[0],
        )
  }</${component}>`;
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
  itemValue?: string,
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
      usedNames,
      itemValue,
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
  { skipLeading = false }: { skipLeading?: boolean } = {},
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

  const label = cell.getString('Label');
  const leadingContent = skipLeading
    ? undefined
    : renderSlot(
        cell,
        'Show Leading Content',
        'Leading Content',
        names.content,
        usedNames,
        false,
        label,
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
    label,
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
