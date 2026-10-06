// url=<FIGMA_AUTOCOMPLETE_OPTION>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/autocomplete/index.tsx
// component=AutocompleteOption

import figma from 'figma';

import { finalizeTemplate } from '../modal/collect-imports';
import {
  AUTOCOMPLETE_OPTION_SLOT_NAMES,
  readListCell,
  renderDescriptionProp,
  renderElementProp,
} from '../../helpers/list-cell';
import { coreImport, renderListCellItem } from '../../helpers/menu-item';

// Most variants nest the List Cell as a layer named `Cell`; the Checkbox
// variant names it `Cell/Cell`, which the shared item renderer does not find.
const hasCellLayer =
  figma.selectedInstance.findInstance('Cell').type !== 'ERROR';

const rendered = (() => {
  if (hasCellLayer) {
    return renderListCellItem(
      figma.selectedInstance,
      'AutocompleteOption',
      AUTOCOMPLETE_OPTION_SLOT_NAMES,
      { withMenuItemProps: false },
    );
  }

  const cell = readListCell(
    figma.selectedInstance.findInstance('Cell/Cell'),
    AUTOCOMPLETE_OPTION_SLOT_NAMES,
  );
  const label = cell.label ?? '';
  const example = figma.tsx`<AutocompleteOption value=${JSON.stringify(
    label,
  )}${renderDescriptionProp(cell.description)}${renderElementProp(
    'leadingContent',
    cell.leadingContent,
  )}${renderElementProp('trailingContent', cell.trailingContent)}${renderElementProp(
    'labelTrailing',
    cell.labelTrailing,
  )}${renderElementProp('extraContent', cell.extraContent)}>
  ${label}
</AutocompleteOption>`;

  return { example, usedNames: ['AutocompleteOption', ...cell.usedNames] };
})();

export default finalizeTemplate({
  id: 'AutocompleteOption',
  imports: [coreImport(rendered.usedNames)],
  example: rendered.example,
  metadata: { nestable: true },
});
