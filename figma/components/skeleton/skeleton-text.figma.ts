// url=<FIGMA_SKELETON_TEXT>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/skeleton/index.tsx
// component=Skeleton

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Color') === 'Normal') {
  const align = figma.selectedInstance.getEnum('Align', {
    Leading: undefined, // core default
    Center: 'center',
    Trailing: 'right',
  });
  const width = figma.selectedInstance.getEnum('Length', {
    '100%': '100%',
    '75%': '75%',
    '50%': '50%',
    '25%': '25%',
  });
  const __props: Record<string, unknown> = {};
  if (align && align.type !== 'ERROR') {
    __props['align'] = align;
  }
  if (width && width.type !== 'ERROR') {
    __props['width'] = width;
  }

  template = {
    id: 'Skeleton',
    imports: ["import { Skeleton } from '@montage-ui/core';"],
    example: figma.code`<Skeleton variant="text"${figma.helpers.react.renderProp(
      'align',
      align,
    )}${figma.helpers.react.renderProp('width', width)}/>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Color') === 'White') {
  const align = figma.selectedInstance.getEnum('Align', {
    Leading: undefined, // core default
    Center: 'center',
    Trailing: 'right',
  });
  const width = figma.selectedInstance.getEnum('Length', {
    '100%': '100%',
    '75%': '75%',
    '50%': '50%',
    '25%': '25%',
  });
  const __props: Record<string, unknown> = {};
  if (align && align.type !== 'ERROR') {
    __props['align'] = align;
  }
  if (width && width.type !== 'ERROR') {
    __props['width'] = width;
  }

  template = {
    id: 'Skeleton',
    imports: ["import { Skeleton } from '@montage-ui/core';"],
    example: figma.code`<Skeleton variant="text" color="semantic.static.white" opacity="opacity.28"${figma.helpers.react.renderProp(
      'align',
      align,
    )}${figma.helpers.react.renderProp('width', width)}/>`,
    metadata: { nestable: true, __props },
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
