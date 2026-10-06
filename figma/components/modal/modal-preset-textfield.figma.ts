// url=<FIGMA_MODAL_PRESET_TEXTFIELD>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=FormControl

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import { joinParts } from './modal-helpers';

// The preset stacks labeled fields (`Form Control/Form Control`, which renders
// `FormControl` + its input slot) and a text area (`Textinput/Textarea`), each
// rendered by its own template in layer order.
const FIELD_LAYERS = ['Form Control/Form Control', 'Textinput/Textarea'];

const rendered = figma.selectedInstance
  .findLayers(
    (layer) => layer.type === 'INSTANCE' && FIELD_LAYERS.includes(layer.name),
  )
  .map((layer) =>
    layer.type === 'INSTANCE' && layer.hasCodeConnect()
      ? layer.executeTemplate().example
      : undefined,
  );

export default finalizeTemplate({
  id: 'ModalPresetTextfield',
  imports: ["import { FlexBox } from '@montage-ui/core';"],
  example: figma.tsx`<FlexBox flexDirection="column" gap="20px">
${joinParts(rendered) ?? ''}
</FlexBox>`,
  metadata: { nestable: true },
});
