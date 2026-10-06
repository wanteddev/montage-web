// url=<FIGMA_MODAL_NAVIGATION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalNavigation

import figma from 'figma';

import { finalizeTemplate } from './collect-imports';
import {
  NAVIGATION_IMPORT,
  renderModalNavigation,
} from './modal-navigation-shared';

// Popup / bottom sheet navigation. Core is web only, so other platforms render
// no snippet. `emphasized` is the core default for these containers.
const instance = figma.selectedInstance;
const VARIANTS = {
  Emphasized: 'emphasized',
  Floating: 'floating',
  Search: 'search',
} as const;
const variant =
  VARIANTS[instance.getPropertyValue('Variant') as keyof typeof VARIANTS];

export default finalizeTemplate(
  instance.getPropertyValue('Platform') === 'Web' && variant
    ? {
        id: 'ModalNavigation',
        imports: [NAVIGATION_IMPORT],
        example: renderModalNavigation(
          instance.findInstance('┗ Bar'),
          variant,
          {
            background: instance.getBoolean('Background') === true,
            defaultVariant: 'emphasized',
          },
        ),
        metadata: { nestable: true },
      }
    : {
        id: 'ModalNavigation',
        imports: [],
        example: figma.code``,
        metadata: { nestable: true },
      },
);
