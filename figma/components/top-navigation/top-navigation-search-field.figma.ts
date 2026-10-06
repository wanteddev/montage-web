// url=<FIGMA_TOP_NAVIGATION_SEARCH_FIELD>

import figma from 'figma';

import { renderNested, uniqueImports } from './top-navigation-shared';

// Renders the nested search field directly (no wrapping fragment).
const field = renderNested(
  figma.selectedInstance.findInstance('Searchfield/Searchfield'),
);
const imports = uniqueImports([
  "import { SearchField } from '@montage-ui/core';",
  ...(field?.imports ?? []),
]);

export default {
  id: 'TopNavigationSearchField',
  imports: field ? imports : [],
  example: field ? figma.tsx`${field.code}` : figma.code``,
  metadata: { nestable: true, props: { imports: field ? imports : [] } },
};
