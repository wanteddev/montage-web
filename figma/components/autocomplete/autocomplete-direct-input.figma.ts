// url=<FIGMA_AUTOCOMPLETE_DIRECT_INPUT>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/autocomplete/index.tsx
// component=AutocompleteOption

import figma from 'figma';

import { finalizeTemplate } from '../modal/collect-imports';
import {
  AUTOCOMPLETE_OPTION_SLOT_NAMES,
  renderElementProp,
  renderPreset,
} from '../../helpers/list-cell';
import { coreImport } from '../../helpers/menu-item';

const label = figma.selectedInstance.findText('‘작성영역’ 사용하기');

// The leading preset is a List Cell resource; render it with the autocomplete alias.
const leadingContent = renderPreset(
  figma.selectedInstance.findInstance('Leading Content'),
  AUTOCOMPLETE_OPTION_SLOT_NAMES.content,
);

export default finalizeTemplate({
  id: 'AutocompleteOption',
  imports: [
    coreImport([
      'AutocompleteOption',
      ...(leadingContent ? [AUTOCOMPLETE_OPTION_SLOT_NAMES.content] : []),
    ]),
  ],
  example: figma.tsx`<AutocompleteOption value=""${renderElementProp(
    'leadingContent',
    leadingContent,
  )}>
  ${label.type === 'ERROR' ? '' : label.textContent}
</AutocompleteOption>`,
  metadata: { nestable: true },
});
