// url=<FIGMA_TOP_NAVIGATION_LEADING_FLOAT>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/top-navigation/index.tsx
// component=TopNavigationButton

import figma from 'figma';

import { renderLeading } from './top-navigation-shared';

// Back | Icon Button | Text Button; the icon import is re-declared for parents.
const leading = renderLeading(figma.selectedInstance);
const imports = leading?.imports ?? [];

export default {
  id: 'TopNavigationButton',
  imports,
  example: leading ? figma.tsx`${leading.code}` : figma.code``,
  metadata: { nestable: true, props: { imports } },
};
