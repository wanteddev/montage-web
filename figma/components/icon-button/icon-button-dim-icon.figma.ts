// url=<FIGMA_ICON_BUTTON_DIM_ICON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/icon-button/index.tsx
// component=IconButton

import figma from 'figma';

// With `Interaction Effect=Dim`, the icon button's `Icon` layer is this resource
// (one variant per interaction state) wrapping the actual icon. Pass the inner
// icon through so the icon button renders it as its children.
const icon = figma.properties.children(['Icon']);

export default {
  id: 'IconButtonDimIcon',
  imports: [],
  example: figma.code`${figma.helpers.react.renderChildren(icon)}`,
  metadata: { nestable: true },
};
