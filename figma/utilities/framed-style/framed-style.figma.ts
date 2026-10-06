// url=<FIGMA_FRAMED_STYLE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/utils/framed-style.ts
// component=Box

import figma from 'figma';

// Framed Style is a style utility, not a component: it renders as a `Box`
// styled with `framedStyle()`, wrapping whatever is placed in the Content slot.
const selected = figma.selectedInstance.getPropertyValue('Selected') === 'True';
const disabled = figma.selectedInstance.getPropertyValue('Disabled') === 'True';
const negative =
  figma.selectedInstance.getPropertyValue('Status') === 'Negative';
const content = figma.properties.slot('Content');
// An empty slot only holds Figma's placeholder layer: show a comment instead.
const hasContent = Boolean(content && content.connectedInstances.length > 0);

const params = [
  negative ? "status: 'negative'" : '',
  selected ? 'selected: true' : '',
  disabled ? 'disabled: true' : '',
].filter(Boolean);
const framedStyleCall =
  params.length > 0 ? `framedStyle({ ${params.join(', ')} })` : 'framedStyle()';

export default {
  id: 'FramedStyle',
  imports: ["import { Box, framedStyle } from '@montage-ui/core';"],
  example: figma.tsx`<Box tabIndex={0} sx={${framedStyleCall}}>
  ${hasContent ? figma.helpers.react.renderChildren(content) : '{/* 콘텐츠 */}'}
</Box>`,
  metadata: { nestable: true },
};
