// url=<FIGMA_SELECT>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/select/index.tsx
// component=Select

import figma from 'figma';

import { OPTION_SLOT_NAMES, joinTemplates } from '../../helpers/list-cell';
import { coreImport, renderListCellItem } from '../../helpers/menu-item';

// The open menu is a nested `Menu/Menu` instance. Its items are re-rendered as
// `Option` (the select alias of `MenuItem`) instead of the menu's own snippet.
const menu = figma.selectedInstance.findInstance('Menu/Menu');
const menuItems =
  menu.type === 'ERROR'
    ? []
    : menu.findLayers(
        (layer) =>
          layer.type === 'INSTANCE' &&
          layer.name === 'Cell' &&
          'Vertical Padding' in layer.properties,
      );
const renderedOptions = menuItems.map((item) =>
  renderListCellItem(item as typeof menu, 'Option', OPTION_SLOT_NAMES, {
    withMenuItemProps: true,
  }),
);
const options =
  renderedOptions.length > 0
    ? joinTemplates(renderedOptions.map(({ example }) => example))
    : figma.tsx`<Option value="1">옵션 1</Option>
<Option value="2">옵션 2</Option>`;
// A checkbox menu means multiple selection, which is `SelectMultiple` in code.
const isMultiple =
  menu.type !== 'ERROR' && menu.getPropertyValue('Variant') === 'Checkbox';
const textSelect = isMultiple ? 'SelectMultiple' : 'Select';

const optionImports = [
  'Option',
  ...renderedOptions.flatMap(({ usedNames }) => usedNames),
];

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Render') === 'Text') {
  const placeholder = figma.selectedInstance.getString('Placeholder');
  const leadingContent = figma.selectedInstance.getBoolean('Leading Content', {
    true: (function () {
      const slot = figma.properties.slot('┗ Leading Content');
      return slot
        ? slot.connectedInstances
            .map((instance) => instance.executeTemplate().example)
            .flat()
        : [];
    })(),
    false: undefined,
  });
  const status = figma.selectedInstance.getEnum('Status', {
    Normal: undefined,
    Negative: 'negative',
  });
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const size = figma.selectedInstance.getEnum('Size', {
    Large: 'large',
    Medium: 'medium',
  });
  const __props: Record<string, unknown> = {};
  if (placeholder && placeholder.type !== 'ERROR') {
    __props['placeholder'] = placeholder;
  }
  if (leadingContent && leadingContent.type !== 'ERROR') {
    __props['leadingContent'] = leadingContent;
  }
  if (status && status.type !== 'ERROR') {
    __props['status'] = status;
  }
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }

  template = {
    id: textSelect,
    imports: [coreImport([...optionImports, textSelect])],
    example: figma.code`<${textSelect}${figma.helpers.react.renderProp(
      'placeholder',
      placeholder,
    )}${figma.helpers.react.renderProp(
      'leadingContent',
      leadingContent,
    )}${figma.helpers.react.renderProp(
      'status',
      status,
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp('size', size)}>
      ${options}
    </${textSelect}>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Render') === 'Chip') {
  const placeholder = figma.selectedInstance.getString('Placeholder');
  const leadingContent = figma.selectedInstance.getBoolean('Leading Content', {
    true: (function () {
      const slot = figma.properties.slot('┗ Leading Content');
      return slot
        ? slot.connectedInstances
            .map((instance) => instance.executeTemplate().example)
            .flat()
        : [];
    })(),
    false: undefined,
  });
  const status = figma.selectedInstance.getEnum('Status', {
    Normal: undefined,
    Negative: 'negative',
  });
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const size = figma.selectedInstance.getEnum('Size', {
    Large: 'large',
    Medium: 'medium',
  });
  const overflow = figma.selectedInstance.getBoolean('Overflow');
  const __props: Record<string, unknown> = {};
  if (placeholder && placeholder.type !== 'ERROR') {
    __props['placeholder'] = placeholder;
  }
  if (leadingContent && leadingContent.type !== 'ERROR') {
    __props['leadingContent'] = leadingContent;
  }
  if (status && status.type !== 'ERROR') {
    __props['status'] = status;
  }
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (size && size.type !== 'ERROR') {
    __props['size'] = size;
  }
  if (overflow && overflow.type !== 'ERROR') {
    __props['overflow'] = overflow;
  }

  template = {
    id: 'SelectMultiple',
    imports: [
      coreImport([...optionImports, 'SelectMultiple', 'SelectRenderChip']),
    ],
    example: figma.code`<SelectMultiple render={(labels) => labels.map((label, index) => (<SelectRenderChip key={index}>{label}</SelectRenderChip>))}${figma.helpers.react.renderProp(
      'placeholder',
      placeholder,
    )}${figma.helpers.react.renderProp(
      'leadingContent',
      leadingContent,
    )}${figma.helpers.react.renderProp(
      'status',
      status,
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'size',
      size,
    )}${figma.helpers.react.renderProp('overflow', overflow)}>
      ${options}
    </SelectMultiple>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Select',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
