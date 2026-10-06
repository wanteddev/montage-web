// url=<FIGMA_TOP_NAVIGATION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/top-navigation/index.tsx
// component=TopNavigation

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (
  figma.selectedInstance.getPropertyValue('Platform') === 'Web' &&
  figma.selectedInstance.getPropertyValue('Variant') === 'Normal'
) {
  const background = figma.selectedInstance.getBoolean('Background');
  const toolbar = figma.selectedInstance.getBoolean('Tool Bar', {
    true: figma.properties.instance('┗ Instance'),
    false: undefined,
  });
  const bar = (function () {
    const nestedLayer0 = figma.selectedInstance.findInstance('Bar');
    return {
      title:
        nestedLayer0.type !== 'ERROR'
          ? nestedLayer0.getBoolean('Title ', {
              true: nestedLayer0.getString(' ┗ Text'),
              false: undefined,
            })
          : undefined,
      leadingContent:
        nestedLayer0.type !== 'ERROR'
          ? nestedLayer0.getBoolean('┗ Leading Button', {
              true: nestedLayer0.__properties__.children(['Leading Button']),
              false: undefined,
            })
          : undefined,
      trailingContent:
        nestedLayer0.type !== 'ERROR'
          ? nestedLayer0.getBoolean('┗ Trailing Button', {
              true: nestedLayer0.__properties__.children(['Trailing Button']),
              false: undefined,
            })
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (background && background.type !== 'ERROR') {
    __props['background'] = background;
  }
  if (toolbar && toolbar.type !== 'ERROR') {
    __props['toolbar'] = toolbar;
  }
  if (bar && bar.type !== 'ERROR') {
    __props['bar'] = bar;
  }

  template = {
    id: 'TopNavigation',
    imports: ["import { TopNavigation } from '@montage-ui/core';"],
    example: figma.code`<TopNavigation variant="normal"${figma.helpers.react.renderProp(
      'leadingContent',
      bar.leadingContent,
    )}${figma.helpers.react.renderProp(
      'trailingContent',
      bar.trailingContent,
    )}${figma.helpers.react.renderProp(
      'background',
      background,
    )}${figma.helpers.react.renderProp('toolbar', toolbar)}>
      ${figma.helpers.react.renderChildren(bar.title)}
    </TopNavigation>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Platform') === 'Web' &&
  figma.selectedInstance.getPropertyValue('Variant') === 'Display'
) {
  const background = figma.selectedInstance.getBoolean('Background');
  const toolbar = figma.selectedInstance.getBoolean('Tool Bar', {
    true: figma.properties.instance('┗ Instance'),
    false: undefined,
  });
  const bar = (function () {
    const nestedLayer1 = figma.selectedInstance.findInstance('Bar');
    return {
      title:
        nestedLayer1.type !== 'ERROR'
          ? nestedLayer1.getBoolean('┗ Title ', {
              true: nestedLayer1.getString(' ┗ Text'),
              false: undefined,
            })
          : undefined,
      trailingButton:
        nestedLayer1.type !== 'ERROR'
          ? nestedLayer1.getBoolean('┗ Trailing Button', {
              true: nestedLayer1.__properties__.children(['Trailing Button']),
              false: undefined,
            })
          : undefined,
      avatar:
        nestedLayer1.type !== 'ERROR'
          ? nestedLayer1.getBoolean('┗ Avatar', {
              true: nestedLayer1.__properties__.children(['Avatar']),
              false: undefined,
            })
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (background && background.type !== 'ERROR') {
    __props['background'] = background;
  }
  if (toolbar && toolbar.type !== 'ERROR') {
    __props['toolbar'] = toolbar;
  }
  if (bar && bar.type !== 'ERROR') {
    __props['bar'] = bar;
  }

  template = {
    id: 'TopNavigation',
    imports: ["import { TopNavigation } from '@montage-ui/core';"],
    example: figma.code`<TopNavigation variant="display" trailingContent={<>
          ${figma.helpers.react.renderChildren(bar.trailingButton)}
          ${figma.helpers.react.renderChildren(bar.avatar)}
        </>}${figma.helpers.react.renderProp(
          'background',
          background,
        )}${figma.helpers.react.renderProp('toolbar', toolbar)}>
      ${figma.helpers.react.renderChildren(bar.title)}
    </TopNavigation>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Platform') === 'Web' &&
  figma.selectedInstance.getPropertyValue('Variant') === 'Search'
) {
  const background = figma.selectedInstance.getBoolean('Background');
  const toolbar = figma.selectedInstance.getBoolean('Tool Bar', {
    true: figma.properties.instance('┗ Instance'),
    false: undefined,
  });
  const bar = (function () {
    const nestedLayer2 = figma.selectedInstance.findInstance('Bar');
    return {
      leadingContent:
        nestedLayer2.type !== 'ERROR'
          ? nestedLayer2.getBoolean('┗ Leading Button', {
              true: nestedLayer2.__properties__.children(['Leading Button']),
              false: undefined,
            })
          : undefined,
      trailingContent:
        nestedLayer2.type !== 'ERROR'
          ? nestedLayer2.getBoolean('┗ Trailing Button', {
              true: nestedLayer2.__properties__.children(['Trailing Button']),
              false: undefined,
            })
          : undefined,
      searchField:
        nestedLayer2.type !== 'ERROR'
          ? nestedLayer2.__properties__.children(['Search field'])
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (background && background.type !== 'ERROR') {
    __props['background'] = background;
  }
  if (toolbar && toolbar.type !== 'ERROR') {
    __props['toolbar'] = toolbar;
  }
  if (bar && bar.type !== 'ERROR') {
    __props['bar'] = bar;
  }

  template = {
    id: 'TopNavigation',
    imports: ["import { TopNavigation } from '@montage-ui/core';"],
    example: figma.code`<TopNavigation variant="search"${figma.helpers.react.renderProp(
      'leadingContent',
      bar.leadingContent,
    )}${figma.helpers.react.renderProp(
      'trailingContent',
      bar.trailingContent,
    )}${figma.helpers.react.renderProp(
      'background',
      background,
    )}${figma.helpers.react.renderProp('toolbar', toolbar)}>
      ${figma.helpers.react.renderChildren(bar.searchField)}
    </TopNavigation>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Platform') === 'Web' &&
  figma.selectedInstance.getPropertyValue('Variant') === 'Floating'
) {
  const background = figma.selectedInstance.getBoolean('Background');
  // The floating Nav Bar has no title text in Figma (its `Title` frame only
  // reserves space), and the docs render floating navigations without children.
  const bar = (function () {
    const nestedLayer3 = figma.selectedInstance.findInstance('Nav Bar');
    return {
      leadingContent:
        nestedLayer3.type !== 'ERROR'
          ? nestedLayer3.getBoolean('┗ Leading Button', {
              true: nestedLayer3.__properties__.children([
                'Top Navigation/Resource/Leading/Float/Default',
              ]),
              false: undefined,
            })
          : undefined,
      trailingContent:
        nestedLayer3.type !== 'ERROR'
          ? nestedLayer3.getBoolean('┗ Trailing Button', {
              true: nestedLayer3.__properties__.children(['Trailing Button']),
              false: undefined,
            })
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (background && background.type !== 'ERROR') {
    __props['background'] = background;
  }
  if (bar && bar.type !== 'ERROR') {
    __props['bar'] = bar;
  }

  template = {
    id: 'TopNavigation',
    imports: ["import { TopNavigation } from '@montage-ui/core';"],
    example: figma.code`<TopNavigation variant="floating"${figma.helpers.react.renderProp(
      'leadingContent',
      bar.leadingContent,
    )}${figma.helpers.react.renderProp(
      'trailingContent',
      bar.trailingContent,
    )}${figma.helpers.react.renderProp('background', background)}/>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'TopNavigation',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
