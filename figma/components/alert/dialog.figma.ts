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
    // The nested dialog content declares every Alert component it renders
    // (imports propagate one level), so the wrapper adds none to avoid duplicates.
    imports: [],
    example: figma.code`${figma.helpers.react.renderChildren(alert)}`,
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
