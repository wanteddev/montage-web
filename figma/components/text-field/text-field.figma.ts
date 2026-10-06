// url=<FIGMA_TEXT_FIELD>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/text-field/index.tsx
// component=TextField

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Leading Icon') === false) {
  const placeholder = figma.selectedInstance.getString('Placeholder');
  const trailingContent = figma.selectedInstance.getBoolean(
    'Trailing Content',
    {
      true: figma.properties.children(['Trailing Content']),
      false: undefined,
    },
  );
  const trailingButton = figma.selectedInstance.getEnum('Trailing Button', {
    True: figma.properties.children(['Trailing Button']),
    False: undefined,
  });
  const status = figma.selectedInstance.getEnum('Status', {
    Normal: undefined,
    Positive: 'positive',
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
  if (trailingContent && trailingContent.type !== 'ERROR') {
    __props['trailingContent'] = trailingContent;
  }
  if (trailingButton && trailingButton.type !== 'ERROR') {
    __props['trailingButton'] = trailingButton;
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
    id: 'TextField',
    imports: ["import { TextField } from '@montage-ui/core';"],
    example: figma.code`<TextField${figma.helpers.react.renderProp(
      'placeholder',
      placeholder,
    )}${figma.helpers.react.renderProp(
      'trailingContent',
      trailingContent,
    )}${figma.helpers.react.renderProp(
      'trailingButton',
      trailingButton,
    )}${figma.helpers.react.renderProp(
      'status',
      status,
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp('size', size)}/>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Leading Icon') === true) {
  const placeholder = figma.selectedInstance.getString('Placeholder');
  const icon = figma.properties.children(['Icon']);
  const trailingContent = figma.selectedInstance.getBoolean(
    'Trailing Content',
    {
      true: figma.properties.children(['Trailing Content']),
      false: undefined,
    },
  );
  const trailingButton = figma.selectedInstance.getEnum('Trailing Button', {
    True: figma.properties.children(['Trailing Button']),
    False: undefined,
  });
  const status = figma.selectedInstance.getEnum('Status', {
    Normal: undefined,
    Positive: 'positive',
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
  if (icon && icon.type !== 'ERROR') {
    __props['icon'] = icon;
  }
  if (trailingContent && trailingContent.type !== 'ERROR') {
    __props['trailingContent'] = trailingContent;
  }
  if (trailingButton && trailingButton.type !== 'ERROR') {
    __props['trailingButton'] = trailingButton;
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
    id: 'TextField',
    imports: [
      "import { TextField, TextFieldContent } from '@montage-ui/core';",
    ],
    example: figma.code`<TextField leadingContent={<TextFieldContent variant="icon">${figma.helpers.react.renderChildren(
      icon,
    )}</TextFieldContent>}${figma.helpers.react.renderProp(
      'placeholder',
      placeholder,
    )}${figma.helpers.react.renderProp(
      'trailingContent',
      trailingContent,
    )}${figma.helpers.react.renderProp(
      'trailingButton',
      trailingButton,
    )}${figma.helpers.react.renderProp(
      'status',
      status,
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp('size', size)}/>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'TextField',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
