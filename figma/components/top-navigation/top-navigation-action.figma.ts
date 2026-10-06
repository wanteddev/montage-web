// url=<FIGMA_TOP_NAVIGATION_ACTION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/top-navigation/index.tsx
// component=TopNavigationButton

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Variant') === 'Icon') {
  const icon = (function () {
    const nestedLayer8 = figma.selectedInstance.findInstance('Icon');
    return {
      children:
        nestedLayer8.type !== 'ERROR'
          ? nestedLayer8.__properties__.children(['Icon'])
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
} else if (figma.selectedInstance.getPropertyValue('Variant') === 'Text') {
  const text = (function () {
    const nestedLayer9 = figma.selectedInstance.findInstance('Text');
    return {
      label:
        nestedLayer9.type !== 'ERROR'
          ? nestedLayer9.getString('Label')
          : undefined,
      color:
        nestedLayer9.type !== 'ERROR'
          ? nestedLayer9.getEnum('Variant', {
              Primary: 'primary',
              Assistive: 'assistive',
            })
          : undefined,
      disabled:
        nestedLayer9.type !== 'ERROR'
          ? nestedLayer9.getBoolean('Disable')
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
