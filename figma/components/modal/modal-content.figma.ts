// url=<FIGMA_MODAL_CONTENT>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalContent

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import { renderModalContent } from './modal-helpers';

// Standalone, the paddings are compared against the popup defaults.
const content = renderModalContent(figma.selectedInstance, 'popup');

export default finalizeTemplate({
  id: 'ModalContent',
  imports: [
    `import { ${content.usedNames.sort().join(', ')} } from '@montage-ui/core';`,
  ],
  example: content.code ?? figma.code``,
  metadata: { nestable: true },
});
