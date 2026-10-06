// url=<FIGMA_TOP_NAVIGATION_ACTION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/top-navigation/index.tsx
// component=TopNavigationButton

import figma from 'figma';

import { renderAction } from './top-navigation-shared';

// Icon | Text; the icon import is re-declared for parents.
const action = renderAction(figma.selectedInstance);
const imports = action?.imports ?? [];

export default {
  id: 'TopNavigationButton',
  imports,
  example: action ? figma.tsx`${action.code}` : figma.code``,
  metadata: { nestable: true, props: { imports } },
};
