// url=<FIGMA_AUTOCOMPLETE_GROUP_TITLE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/autocomplete/index.tsx
// component=AutocompleteGroup

import figma from 'figma';

const titleLayer = figma.selectedInstance.findText('제목');
const title = titleLayer.type === 'ERROR' ? '' : titleLayer.textContent;

export default {
  id: 'AutocompleteGroup',
  imports: ["import { AutocompleteGroup } from '@montage-ui/core';"],
  example: figma.tsx`<AutocompleteGroup title=${JSON.stringify(title)}>{/* AutocompleteOption */}</AutocompleteGroup>`,
  metadata: { nestable: true, props: { title } },
};
