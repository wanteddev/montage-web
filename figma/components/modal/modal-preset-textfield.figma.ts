// url=<FIGMA_MODAL_PRESET_TEXTFIELD>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=FormControl

import figma from 'figma';

import { joinParts } from './modal-helpers';

// The text fields here are a legacy standalone component without Code
// Connect: render them as labeled `TextField`s from their label/placeholder
// texts. The text area is the current resource, rendered by its own template.
const instance = figma.selectedInstance;
const fields = instance
  .findLayers(
    (layer) =>
      layer.type === 'INSTANCE' &&
      (layer.name === 'Textinput/Textfield' ||
        layer.name === 'Textinput/Textarea'),
  )
  .filter((layer) => layer.type === 'INSTANCE');

let usesFormControl = false;
const rendered = fields.map((field) => {
  if (field.type !== 'INSTANCE') {
    return undefined;
  }
  if (field.hasCodeConnect()) {
    return field.executeTemplate().example;
  }
  const [label = '', placeholder = ''] = field
    .findLayers((layer) => layer.type === 'TEXT')
    .map((text) => (text.type === 'TEXT' ? text.textContent : ''));
  usesFormControl = true;
  return figma.tsx`<FormControl>
  <FormControlLabel>${label}</FormControlLabel>
  <FormControlField>
    <TextField placeholder=${JSON.stringify(placeholder)} />
  </FormControlField>
</FormControl>`;
});

export default {
  id: 'ModalPresetTextfield',
  imports: [
    `import { FlexBox${
      usesFormControl
        ? ', FormControl, FormControlField, FormControlLabel, TextField'
        : ''
    } } from '@montage-ui/core';`,
  ],
  example: figma.tsx`<FlexBox flexDirection="column" gap="20px">
${joinParts(rendered) ?? ''}
</FlexBox>`,
  metadata: { nestable: true },
};
