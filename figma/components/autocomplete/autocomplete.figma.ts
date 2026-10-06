// url=<FIGMA_AUTOCOMPLETE>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/autocomplete/index.tsx
// component=Autocomplete

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (
  figma.selectedInstance.getPropertyValue('Direct Input Position') === 'Top' &&
  figma.selectedInstance.getPropertyValue('Title') === false
) {
  const options = figma.properties.children(['Cell']);
  const directInput = figma.selectedInstance.getBoolean('Direct Input', {
    true: figma.properties.children(['Action Button']),
    false: undefined,
  });
  const title = (function () {
    const nestedLayer25 = figma.selectedInstance.findInstance('Title');
    return {
      text:
        nestedLayer25.type !== 'ERROR'
          ? nestedLayer25.findText('제목').__render__()
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (options && options.type !== 'ERROR') {
    __props['options'] = options;
  }
  if (directInput && directInput.type !== 'ERROR') {
    __props['directInput'] = directInput;
  }
  if (title && title.type !== 'ERROR') {
    __props['title'] = title;
  }

  template = {
    id: 'Autocomplete',
    imports: [
      "import { Autocomplete, AutocompleteField, AutocompleteList, TextField } from '@montage-ui/core';",
    ],
    example: figma.code`<Autocomplete>
      <AutocompleteField>
        <TextField />
      </AutocompleteField>
      <AutocompleteList>
        ${figma.helpers.react.renderChildren(directInput)}
        ${figma.helpers.react.renderChildren(options)}
      </AutocompleteList>
    </Autocomplete>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Direct Input Position') ===
    'Bottom' &&
  figma.selectedInstance.getPropertyValue('Title') === false
) {
  const options = figma.properties.children(['Cell']);
  const directInput = figma.selectedInstance.getBoolean('Direct Input', {
    true: figma.properties.children(['Action Button']),
    false: undefined,
  });
  const title = (function () {
    const nestedLayer26 = figma.selectedInstance.findInstance('Title');
    return {
      text:
        nestedLayer26.type !== 'ERROR'
          ? nestedLayer26.findText('제목').__render__()
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (options && options.type !== 'ERROR') {
    __props['options'] = options;
  }
  if (directInput && directInput.type !== 'ERROR') {
    __props['directInput'] = directInput;
  }
  if (title && title.type !== 'ERROR') {
    __props['title'] = title;
  }

  template = {
    id: 'Autocomplete',
    imports: [
      "import { Autocomplete, AutocompleteField, AutocompleteList, TextField } from '@montage-ui/core';",
    ],
    example: figma.code`<Autocomplete>
      <AutocompleteField>
        <TextField />
      </AutocompleteField>
      <AutocompleteList>
        ${figma.helpers.react.renderChildren(options)}
        ${figma.helpers.react.renderChildren(directInput)}
      </AutocompleteList>
    </Autocomplete>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Direct Input Position') === 'Top' &&
  figma.selectedInstance.getPropertyValue('Title') === true
) {
  const options = figma.properties.children(['Cell']);
  const directInput = figma.selectedInstance.getBoolean('Direct Input', {
    true: figma.properties.children(['Action Button']),
    false: undefined,
  });
  const title = (function () {
    const nestedLayer27 = figma.selectedInstance.findInstance('Title');
    return {
      text:
        nestedLayer27.type !== 'ERROR'
          ? nestedLayer27.findText('제목').__render__()
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (options && options.type !== 'ERROR') {
    __props['options'] = options;
  }
  if (directInput && directInput.type !== 'ERROR') {
    __props['directInput'] = directInput;
  }
  if (title && title.type !== 'ERROR') {
    __props['title'] = title;
  }

  template = {
    id: 'Autocomplete',
    imports: [
      "import { Autocomplete, AutocompleteField, AutocompleteGroup, AutocompleteList, TextField } from '@montage-ui/core';",
    ],
    example: figma.code`<Autocomplete>
      <AutocompleteField>
        <TextField />
      </AutocompleteField>
      <AutocompleteList>
        ${figma.helpers.react.renderChildren(directInput)}
        <AutocompleteGroup${figma.helpers.react.renderProp(
          'title',
          title.text,
        )}>${figma.helpers.react.renderChildren(options)}</AutocompleteGroup>
      </AutocompleteList>
    </Autocomplete>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('Direct Input Position') ===
    'Bottom' &&
  figma.selectedInstance.getPropertyValue('Title') === true
) {
  const options = figma.properties.children(['Cell']);
  const directInput = figma.selectedInstance.getBoolean('Direct Input', {
    true: figma.properties.children(['Action Button']),
    false: undefined,
  });
  const title = (function () {
    const nestedLayer28 = figma.selectedInstance.findInstance('Title');
    return {
      text:
        nestedLayer28.type !== 'ERROR'
          ? nestedLayer28.findText('제목').__render__()
          : undefined,
    };
  })();
  const __props: Record<string, unknown> = {};
  if (options && options.type !== 'ERROR') {
    __props['options'] = options;
  }
  if (directInput && directInput.type !== 'ERROR') {
    __props['directInput'] = directInput;
  }
  if (title && title.type !== 'ERROR') {
    __props['title'] = title;
  }

  template = {
    id: 'Autocomplete',
    imports: [
      "import { Autocomplete, AutocompleteField, AutocompleteGroup, AutocompleteList, TextField } from '@montage-ui/core';",
    ],
    example: figma.code`<Autocomplete>
      <AutocompleteField>
        <TextField />
      </AutocompleteField>
      <AutocompleteList>
        <AutocompleteGroup${figma.helpers.react.renderProp(
          'title',
          title.text,
        )}>${figma.helpers.react.renderChildren(options)}</AutocompleteGroup>
        ${figma.helpers.react.renderChildren(directInput)}
      </AutocompleteList>
    </Autocomplete>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Autocomplete',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
