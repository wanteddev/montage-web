// url=<FIGMA_TOP_NAVIGATION_TRAILING>

import figma from 'figma';

import {
  joinRendered,
  renderTrailingGroup,
  uniqueImports,
} from './top-navigation-shared';

// Up to three toggleable actions, as a fragment when there are several.
const trailing = joinRendered(renderTrailingGroup(figma.selectedInstance));
const imports = uniqueImports(trailing?.imports ?? []);

export default {
  id: 'TopNavigationTrailing',
  imports,
  example: trailing ? figma.tsx`${trailing.code}` : figma.code``,
  metadata: { nestable: true, props: { imports } },
};
