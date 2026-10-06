// url=<FIGMA_SEGMENTED_CONTROL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/segmented-control/index.tsx
// component=SegmentedControl

import figma from 'figma';

import { joinTemplates } from '../../helpers/list-cell';
import {
  iconComponentName,
  iconImportStatements,
} from '../text-field/nested-imports';

const size = figma.selectedInstance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
});
const iconOnly = figma.selectedInstance.getBoolean('Icon Only');
const withIcon =
  figma.selectedInstance.getPropertyValue('Leading Icon') === 'True';

// Segments 1-2 are always shown, 3-6 are toggled by `Segment N` booleans.
const segments = [1, 2, 3, 4, 5, 6].filter(
  (index) =>
    index <= 2 || figma.selectedInstance.getBoolean(`Segment ${index}`),
);

let defaultValue = '0';
// `executeTemplate().example` carries no imports: collect the icon names here.
const iconNames = new Set<string>();
const items = segments.map((index, position) => {
  const value = String(position);
  const knob = figma.selectedInstance.findInstance(`Segment ${index}`);
  if (knob.type === 'ERROR') {
    return figma.tsx`<SegmentedControlItem value="${value}" />`;
  }

  if (knob.getPropertyValue('Active') === 'True') {
    defaultValue = value;
  }

  const label = knob.getString('Text');
  const icon = knob.findInstance('Icon');
  const showIcon = (withIcon || iconOnly) && icon.type !== 'ERROR';
  const iconCode = showIcon ? icon.executeTemplate().example : undefined;
  if (showIcon) {
    const iconName = iconComponentName(icon);
    if (iconName) iconNames.add(iconName);
  }

  if (iconOnly) {
    return figma.tsx`<SegmentedControlItem value="${value}" aria-label=${JSON.stringify(
      label,
    )}>
  ${iconCode ?? ''}
</SegmentedControlItem>`;
  }

  return iconCode
    ? figma.tsx`<SegmentedControlItem value="${value}" leadingIcon={${iconCode}}>
  ${label}
</SegmentedControlItem>`
    : figma.tsx`<SegmentedControlItem value="${value}">
  ${label}
</SegmentedControlItem>`;
});

const imports = [
  "import { SegmentedControl, SegmentedControlItem } from '@montage-ui/core';",
  ...iconImportStatements([...iconNames]),
];

export default {
  id: 'SegmentedControl',
  imports,
  example: figma.tsx`<SegmentedControl defaultValue="${defaultValue}"${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('iconOnly', iconOnly)}>
  ${joinTemplates(items)}
</SegmentedControl>`,
  metadata: { nestable: true, props: { imports } },
};
