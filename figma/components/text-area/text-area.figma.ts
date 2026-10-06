// url=<FIGMA_TEXT_AREA>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/text-area/index.tsx
// component=TextArea

import figma from 'figma';

import {
  contentResourceImports,
  importStatements,
  mergeImports,
} from '../text-field/nested-imports';

// Content resources render further instances (IconButton, Button, icons, …)
// whose imports Code Connect does not hoist, so they are listed explicitly.
const bottom = figma.selectedInstance.getBoolean('Bottom') === true;
const nestedImports = mergeImports(
  contentResourceImports(
    bottom && figma.selectedInstance.getBoolean('┗ Leading Content') === true
      ? figma.selectedInstance.findInstance('Leading Content')
      : undefined,
  ),
  contentResourceImports(
    bottom && figma.selectedInstance.getBoolean('┗ Trailing Content') === true
      ? figma.selectedInstance.findInstance('Trailing Content')
      : undefined,
  ),
);

const placeholder = figma.selectedInstance.getString('Placeholder');
const leadingContent = figma.selectedInstance.getBoolean('Bottom', {
  true: figma.selectedInstance.getBoolean('┗ Leading Content', {
    true: figma.properties.children(['Leading Content']),
    false: undefined,
  }),
  false: undefined,
});
const trailingContent = figma.selectedInstance.getBoolean('Bottom', {
  true: figma.selectedInstance.getBoolean('┗ Trailing Content', {
    true: figma.properties.children(['Trailing Content']),
    false: undefined,
  }),
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
if (trailingContent && trailingContent.type !== 'ERROR') {
  __props['trailingContent'] = trailingContent;
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

export default {
  id: 'TextArea',
  imports: importStatements(['TextArea'], nestedImports),
  example: figma.code`<TextArea${figma.helpers.react.renderProp(
    'placeholder',
    placeholder,
  )}${figma.helpers.react.renderProp(
    'leadingContent',
    leadingContent,
  )}${figma.helpers.react.renderProp(
    'trailingContent',
    trailingContent,
  )}${figma.helpers.react.renderProp(
    'status',
    status,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp('size', size)}/>`,
  metadata: { nestable: true, __props },
};
