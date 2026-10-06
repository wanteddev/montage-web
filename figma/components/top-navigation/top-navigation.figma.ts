// url=<FIGMA_TOP_NAVIGATION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/top-navigation/index.tsx
// component=TopNavigation

import figma from 'figma';

import {
  elementProp,
  findFirst,
  joinRendered,
  renderAction,
  renderLeading,
  renderNested,
  renderTrailingGroup,
  uniqueImports,
} from './top-navigation-shared';

// Property and layer names below are the ones the Code Connect runtime sees: it
// trims surrounding whitespace from property names (e.g. `Title ` → `Title`, and
// the em space before `┗ Text`), and some instances keep their component name as
// the layer name.
const VARIANTS: Record<string, string> = {
  Normal: 'normal',
  Display: 'display',
  Search: 'search',
  Floating: 'floating',
};

const instance = figma.selectedInstance;
const variant = VARIANTS[String(instance.getPropertyValue('Variant'))];

let template;
if (instance.getPropertyValue('Platform') === 'Web' && variant) {
  const bar = instance.findInstance(variant === 'floating' ? 'Nav Bar' : 'Bar');
  const hasBar = bar.type !== 'ERROR';
  const imports = ["import { TopNavigation } from '@montage-ui/core';"];

  // Title (search: the search field takes its place; floating has no title).
  let title: unknown;
  if (hasBar && variant === 'normal' && bar.getBoolean('Title') === true) {
    title = bar.getString('┗ Text');
  } else if (
    hasBar &&
    variant === 'display' &&
    bar.getBoolean('┗ Title') === true
  ) {
    title = bar.getString('┗ Text');
  } else if (hasBar && variant === 'search') {
    const searchField = renderNested(bar.findInstance('Search field'));
    if (searchField) {
      title = searchField.code;
      imports.push(
        ...searchField.imports,
        "import { SearchField } from '@montage-ui/core';",
      );
    }
  }

  const leading =
    hasBar &&
    variant !== 'display' &&
    bar.getBoolean('┗ Leading Button') === true
      ? renderLeading(
          findFirst(bar, [
            'Leading Button',
            'Top Navigation/Resource/Leading/Normal/Default',
            'Top Navigation/Resource/Leading/Float/Default',
          ]),
        )
      : undefined;

  // Trailing: a group of up to three actions (search has a single action).
  const trailingParts = [];
  if (hasBar && bar.getBoolean('┗ Trailing Button') === true) {
    const trailing = bar.findInstance('Trailing Button');
    if (
      trailing.type !== 'ERROR' &&
      Object.prototype.hasOwnProperty.call(trailing.properties, '┗ Button')
    ) {
      trailingParts.push(...renderTrailingGroup(trailing));
    } else {
      trailingParts.push(renderAction(trailing));
    }
  }
  if (hasBar && variant === 'display' && bar.getBoolean('┗ Avatar') === true) {
    trailingParts.push(renderNested(bar.findInstance('Avatar')));
  }
  const trailing = joinRendered(trailingParts);

  // Toolbar: the swapped tool resource (tab / segmented control / category / slot).
  const toolbar =
    variant !== 'floating' && instance.getBoolean('Tool Bar') === true
      ? renderNested(instance.getInstanceSwap('┗ Instance'))
      : undefined;

  for (const part of [leading, trailing, toolbar]) {
    if (part) {
      imports.push(...part.imports);
    }
  }

  // Core defaults: `variant="normal"`, `background` on.
  const variantProp = variant === 'normal' ? '' : ` variant="${variant}"`;
  const backgroundProp =
    instance.getBoolean('Background') === true ? '' : ' background={false}';
  const props = figma.tsx`${variantProp}${elementProp(
    'leadingContent',
    leading,
  )}${elementProp('trailingContent', trailing)}${elementProp(
    'toolbar',
    toolbar,
  )}${backgroundProp}`;

  template = {
    id: 'TopNavigation',
    imports: uniqueImports(imports),
    example: title
      ? figma.tsx`<TopNavigation${props}>
  ${title}
</TopNavigation>`
      : figma.tsx`<TopNavigation${props} />`,
    metadata: { nestable: true, props: { imports: uniqueImports(imports) } },
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
