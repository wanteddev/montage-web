// url=<FIGMA_MODAL_PRESET_CONTAINER>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=FlexBox

import figma from 'figma';

// A text-only sample layout (title, sub title, content, caption). Texts are
// read in layer order and keep the Figma typography.
const instance = figma.selectedInstance;
const texts = instance
  .findLayers((layer) => layer.type === 'TEXT')
  .map((text) => (text.type === 'TEXT' ? text.textContent : ''));
const [title = '', subTitle = '', content = '', caption = ''] = texts;

export default {
  id: 'ModalPresetContainer',
  imports: ["import { FlexBox, Typography } from '@montage-ui/core';"],
  example: figma.tsx`<FlexBox flexDirection="column" gap="16px">
  <Typography variant="headline2" weight="bold">
    ${title}
  </Typography>
  <FlexBox flexDirection="column" gap="8px">
    <FlexBox flexDirection="column" gap="4px">
      <Typography variant="label1" weight="medium" color="semantic.foreground.neutral.tertiary">
        ${subTitle}
      </Typography>
      <Typography variant="headline2" weight="medium">
        ${content}
      </Typography>
    </FlexBox>
    <Typography variant="label1" weight="medium" color="semantic.foreground.neutral.secondary">
      ${caption}
    </Typography>
  </FlexBox>
</FlexBox>`,
  metadata: { nestable: true },
};
