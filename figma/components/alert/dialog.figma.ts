// url=<FIGMA_DIALOG>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/alert/index.tsx
// component=Alert

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Platform') === 'Web') {
  const alert = figma.properties.children(['Alert']);
  const __props: Record<string, unknown> = {};
  if (alert && alert.type !== 'ERROR') {
    __props['alert'] = alert;
  }

  template = {
    id: 'Alert',
    imports: ["import { Alert } from '@montage-ui/core'"],
    example: figma.code`<>${figma.helpers.react.renderChildren(alert)}</>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Alert',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
