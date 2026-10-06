// url=<FIGMA_SKELETON_RECTANGLE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/skeleton/index.tsx
// component=Skeleton

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Color') === 'Normal') {
  template = {
    id: 'Skeleton',
    imports: ["import { Skeleton } from '@montage-ui/core';"],
    example: figma.code`<Skeleton variant="rectangle"/>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Color') === 'White') {
  template = {
    id: 'Skeleton',
    imports: ["import { Skeleton } from '@montage-ui/core';"],
    example: figma.code`<Skeleton variant="rectangle" color="semantic.static.white" opacity="opacity.28"/>`,
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Skeleton',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
