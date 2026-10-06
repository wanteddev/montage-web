// url=<FIGMA_AUTOCOMPLETE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/autocomplete/index.tsx
// component=Autocomplete

import figma from 'figma';

import { joinTemplates } from '../../helpers/list-cell';
import { finalizeTemplate } from '../modal/collect-imports';

const instance = figma.selectedInstance;

type InstanceHandle = ReturnType<typeof instance.findInstance>;

// Options and the direct input are rendered here (not as nested instances) so
// the components inside them (icons, avatars, …) can be added to the imports:
// nested imports only travel one template level up.
const render = (layer: InstanceHandle | undefined) =>
  layer && layer.type !== 'ERROR' && layer.hasCodeConnect()
    ? layer.executeTemplate().example
    : undefined;

const options = instance
  .findLayers((layer) => layer.type === 'INSTANCE' && layer.name === 'Cell')
  .map((layer) => render(layer as InstanceHandle))
  .filter(Boolean);
const optionList = options.length > 0 ? joinTemplates(options) : '';

const directInput =
  instance.getBoolean('Direct Input') === true
    ? render(instance.findInstance('Action Button'))
    : undefined;

const titleLayer = instance.findInstance('Title');
const titleText =
  titleLayer.type === 'ERROR' ? undefined : titleLayer.findText('제목');
const list =
  instance.getBoolean('Title') === true
    ? figma.tsx`<AutocompleteGroup title=${JSON.stringify(
        titleText && titleText.type !== 'ERROR' ? titleText.textContent : '',
      )}>
  ${optionList}
</AutocompleteGroup>`
    : optionList;

const directInputOnTop =
  instance.getPropertyValue('Direct Input Position') === 'Top';
const items = (
  directInputOnTop ? [directInput, list] : [list, directInput]
).filter(Boolean);

export default finalizeTemplate({
  id: 'Autocomplete',
  imports: [
    "import { Autocomplete, AutocompleteField, AutocompleteList, TextField } from '@montage-ui/core';",
  ],
  example: figma.tsx`<Autocomplete>
  <AutocompleteField>
    <TextField />
  </AutocompleteField>
  <AutocompleteList>
    ${items.length > 0 ? joinTemplates(items) : ''}
  </AutocompleteList>
</Autocomplete>`,
  metadata: { nestable: true },
});
