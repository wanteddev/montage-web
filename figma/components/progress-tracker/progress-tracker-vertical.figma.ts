// url=<FIGMA_PROGRESS_TRACKER_VERTICAL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/progress-tracker/index.tsx
// component=ProgressTracker

import figma from 'figma';

import { executedImports } from '../modal/collect-imports';

const instance = figma.selectedInstance;
const total = Number(instance.getPropertyValue('Total Count')) || 3;
const current = String(instance.getPropertyValue('Current Step'));
const showLabel = instance.getBoolean('Label') === true;
const showLabelContent =
  showLabel && instance.getBoolean('┗ Show Label Content') === true;
const showContent = instance.getBoolean('Show Content') === true;

const imports = new Set<string>([
  "import { ProgressTracker, ProgressTrackerItem } from '@montage-ui/core';",
]);

// Slot props are numbered from the second item on (`Content`, `Content2`, …).
const slotName = (base: string, index: number) =>
  index === 1 ? base : `${base}${index}`;

/**
 * Renders the connected instances placed in a slot (with their imports). Slots
 * holding only the Figma placeholder have no connected instance, so they are
 * rendered as a placeholder comment instead of Figma's raw layer code.
 */
const renderSlot = (name: string, placeholder: string) => {
  const slot = figma.properties.slot(name);
  const connected = slot ? slot.connectedInstances : [];
  if (connected.length === 0) {
    return figma.tsx`{/* ${placeholder} */}`;
  }
  return connected
    .map((child) => {
      const executed = child.executeTemplate();
      executedImports(executed).forEach((statement) => imports.add(statement));
      return executed.example;
    })
    .reduce(
      (joined, code) => figma.tsx`${joined}
    ${code}`,
    );
};

const items = Array.from({ length: total }, (_, offset) => {
  const index = offset + 1;
  const label = showLabel ? instance.getString(`Label ${index}`) : '';
  const labelProp = label ? ` label=${JSON.stringify(label)}` : '';

  let labelContentProp: unknown = '';
  if (showLabelContent) {
    imports.add(
      "import { ProgressTrackerLabelContent } from '@montage-ui/core';",
    );
    labelContentProp = figma.tsx` labelContent={<ProgressTrackerLabelContent variant="custom">
      ${renderSlot(slotName('Label Content', index), '라벨 콘텐츠')}
    </ProgressTrackerLabelContent>}`;
  }

  return showContent
    ? figma.tsx`<ProgressTrackerItem value="${String(index)}"${labelProp}${labelContentProp}>
    ${renderSlot(slotName('Content', index), '콘텐츠')}
  </ProgressTrackerItem>`
    : figma.tsx`<ProgressTrackerItem value="${String(index)}"${labelProp}${labelContentProp} />`;
}).reduce(
  (joined, item) => figma.tsx`${joined}
  ${item}`,
);

export default {
  id: 'ProgressTracker',
  imports: [...imports],
  example: figma.tsx`<ProgressTracker direction="vertical" defaultValue="${current}">
  ${items}
</ProgressTracker>`,
  metadata: { nestable: true, props: { imports: [...imports] } },
};
