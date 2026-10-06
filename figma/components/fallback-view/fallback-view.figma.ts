// url=<FIGMA_FALLBACK_VIEW>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/fallback-view/index.tsx
// component=FallbackView

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (figma.selectedInstance.getPropertyValue('Action Area') === true) {
  const actionArea = figma.properties.children(['Action Area']);
  const title = figma.selectedInstance.getBoolean('Heading', {
    true: figma.selectedInstance.getString('┗ Text'),
    false: undefined,
  });
  const description = figma.selectedInstance.getString('Description');
  const platform = figma.selectedInstance.getEnum('Platform', {
    Desktop: 'desktop',
    Mobile: 'mobile',
  });
  const padding = figma.selectedInstance.getEnum('Padding', {
    Normal: 'normal',
    Compact: 'compact',
  });
  const __props: Record<string, unknown> = {};
  if (actionArea && actionArea.type !== 'ERROR') {
    __props['actionArea'] = actionArea;
  }
  if (title && title.type !== 'ERROR') {
    __props['title'] = title;
  }
  if (description && description.type !== 'ERROR') {
    __props['description'] = description;
  }
  if (platform && platform.type !== 'ERROR') {
    __props['platform'] = platform;
  }
  if (padding && padding.type !== 'ERROR') {
    __props['padding'] = padding;
  }

  template = {
    id: 'FallbackView',
    imports: [
      "import { FallbackView, FallbackViewContent, FallbackViewText } from '@montage-ui/core';",
    ],
    example: figma.code`<FallbackView${figma.helpers.react.renderProp(
      'platform',
      platform,
    )}${figma.helpers.react.renderProp('padding', padding)}>
      <FallbackViewContent>
        <FallbackViewText${figma.helpers.react.renderProp(
          'title',
          title,
        )}${figma.helpers.react.renderProp('description', description)}/>
        ${figma.helpers.react.renderChildren(actionArea)}
      </FallbackViewContent>
    </FallbackView>`,
    metadata: { nestable: true, __props },
  };
} else if (figma.selectedInstance.getPropertyValue('Action Area') === false) {
  const title = figma.selectedInstance.getBoolean('Heading', {
    true: figma.selectedInstance.getString('┗ Text'),
    false: undefined,
  });
  const description = figma.selectedInstance.getString('Description');
  const platform = figma.selectedInstance.getEnum('Platform', {
    Desktop: 'desktop',
    Mobile: 'mobile',
  });
  const padding = figma.selectedInstance.getEnum('Padding', {
    Normal: 'normal',
    Compact: 'compact',
  });
  const __props: Record<string, unknown> = {};
  if (title && title.type !== 'ERROR') {
    __props['title'] = title;
  }
  if (description && description.type !== 'ERROR') {
    __props['description'] = description;
  }
  if (platform && platform.type !== 'ERROR') {
    __props['platform'] = platform;
  }
  if (padding && padding.type !== 'ERROR') {
    __props['padding'] = padding;
  }

  template = {
    id: 'FallbackView',
    imports: [
      "import { FallbackView, FallbackViewContent, FallbackViewText } from '@montage-ui/core';",
    ],
    example: figma.code`<FallbackView${figma.helpers.react.renderProp(
      'platform',
      platform,
    )}${figma.helpers.react.renderProp('padding', padding)}>
      <FallbackViewContent>
        <FallbackViewText${figma.helpers.react.renderProp(
          'title',
          title,
        )}${figma.helpers.react.renderProp('description', description)}/>
      </FallbackViewContent>
    </FallbackView>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'FallbackView',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
