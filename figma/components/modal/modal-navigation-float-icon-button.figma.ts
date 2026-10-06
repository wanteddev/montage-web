// url=<FIGMA_MODAL_NAVIGATION_FLOAT_ICON_BUTTON>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalNavigationButton

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import {
  NAVIGATION_BUTTON_IMPORT,
  renderLayer,
} from './modal-navigation-shared';

// Floating navigation icon button. `Background=True` uses the blurred background style.
const background =
  figma.selectedInstance.getPropertyValue('Background') === 'True';
const iconButton = figma.selectedInstance.findInstance('Icon');
const alternative =
  background &&
  iconButton.type !== 'ERROR' &&
  iconButton.getPropertyValue('Alternative') === 'True';
const icon =
  iconButton.type !== 'ERROR'
    ? renderLayer(iconButton.findInstance('Icon'))
    : undefined;

export default finalizeTemplate({
  id: 'ModalNavigationButton',
  imports: [NAVIGATION_BUTTON_IMPORT],
  example: figma.tsx`<ModalNavigationButton variant="icon-button"${background ? ' background' : ''}${alternative ? ' alternative' : ''}>${icon ?? ''}</ModalNavigationButton>`,
  metadata: { nestable: true },
});
