// url=<FIGMA_MODAL_NAVIGATION_FULL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/modal/index.tsx
// component=ModalNavigation

import figma from 'figma';

import {
  NAVIGATION_IMPORT,
  renderModalNavigation,
} from './modal-navigation-shared';

// Full modal navigation. Core is web only, so other platforms render no snippet.
// `normal` is the core default for the `full` container.
const instance = figma.selectedInstance;
const VARIANTS = {
  Normal: 'normal',
  Emphasized: 'emphasized',
  Floating: 'floating',
  Search: 'search',
} as const;
const variant =
  VARIANTS[instance.getPropertyValue('Variant') as keyof typeof VARIANTS];

export default instance.getPropertyValue('Platform') === 'Web' && variant
  ? {
      id: 'ModalNavigation',
      imports: [NAVIGATION_IMPORT],
      example: renderModalNavigation(instance.findInstance('┗ Bar'), variant, {
        background: instance.getBoolean('Background') === true,
        defaultVariant: 'normal',
      }),
      metadata: { nestable: true },
    }
  : {
      id: 'ModalNavigation',
      imports: [],
      example: figma.code``,
      metadata: { nestable: true },
    };
