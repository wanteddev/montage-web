// url=<FIGMA_AUTOCOMPLETE_OPTION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/autocomplete/index.tsx
// component=AutocompleteOption

import figma from 'figma';

import { AUTOCOMPLETE_OPTION_SLOT_NAMES } from '../../helpers/list-cell';
import { coreImport, renderListCellItem } from '../../helpers/menu-item';

const { example, usedNames } = renderListCellItem(
  figma.selectedInstance,
  'AutocompleteOption',
  AUTOCOMPLETE_OPTION_SLOT_NAMES,
  { withMenuItemProps: false },
);

export default {
  id: 'AutocompleteOption',
  imports: [coreImport(usedNames)],
  example,
  metadata: { nestable: true },
};
