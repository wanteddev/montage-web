// url=<FIGMA_TOP_NAVIGATION_LEADING_NORMAL>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/top-navigation/index.tsx
// component=TopNavigationButton

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Type') === 'Back') {
  template = {
    id: 'TopNavigationButton',
    imports: ["import { TopNavigationButton } from '@montage-ui/core';"],
    example: figma.code`<TopNavigationButton variant="back-button"/>`,
  };
} else if (figma.selectedInstance.getPropertyValue('Type') === 'Icon Button') {
  const icon = (function () {
    const nestedLayer4 = figma.selectedInstance.findInstance('Icon');
    return {
      children:
        nestedLayer4.type !== 'ERROR'
          ? nestedLayer4.__properties__.children(['Icon'])
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (icon && icon.type !== 'ERROR') {
    __props['icon'] = icon;
  }

  template = {
    id: 'TopNavigationButton',
    imports: ["import { TopNavigationButton } from '@montage-ui/core';"],
    example: figma.code`<TopNavigationButton variant="icon-button">
      ${figma.helpers.react.renderChildren(icon.children)}
    </TopNavigationButton>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Type') === 'Text Button') {
  const text = (function () {
    const nestedLayer5 = figma.selectedInstance.findInstance('Text');
    return {
      label:
        nestedLayer5.type !== 'ERROR'
          ? nestedLayer5.getString('Label')
          : undefined,
      color:
        nestedLayer5.type !== 'ERROR'
          ? nestedLayer5.getEnum('Color', {
              Primary: 'primary',
              Assistive: 'assistive',
            })
          : undefined,
      disabled:
        nestedLayer5.type !== 'ERROR'
          ? nestedLayer5.getBoolean('Disable')
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (text && text.type !== 'ERROR') {
    __props['text'] = text;
  }

  template = {
    id: 'TopNavigationButton',
    imports: ["import { TopNavigationButton } from '@montage-ui/core';"],
    example: figma.code`<TopNavigationButton variant="text-button"${figma.helpers.react.renderProp(
      'color',
      text.color,
    )}${figma.helpers.react.renderProp('disabled', text.disabled)}>
      ${figma.helpers.react.renderChildren(text.label)}
    </TopNavigationButton>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'TopNavigationButton',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
