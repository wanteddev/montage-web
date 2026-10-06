// url=<FIGMA_CHECKBOX>
// source=https://github.com/wanteddev/montage-web/blob/main/packages/core/src/components/checkbox/index.tsx
// component=Checkbox

import figma from 'figma';

// Branch per variant; unmatched combinations render no snippet.

let template;
if (
  figma.selectedInstance.getPropertyValue('State') === 'Checked' &&
  figma.selectedInstance.getPropertyValue('Size') === 'Medium'
) {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const bold = figma.selectedInstance.getBoolean('Bold');
  const label = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('┗ Text​'),
    false: undefined,
  });
  const gap = figma.selectedInstance.getBoolean('Tight', {
    true: '10px',
    false: '8px',
  });
  const tight = figma.selectedInstance.getBoolean('Tight');
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (bold && bold.type !== 'ERROR') {
    __props['bold'] = bold;
  }
  if (label && label.type !== 'ERROR') {
    __props['label'] = label;
  }
  if (gap && gap.type !== 'ERROR') {
    __props['gap'] = gap;
  }
  if (tight && tight.type !== 'ERROR') {
    __props['tight'] = tight;
  }

  template = {
    id: 'Checkbox',
    imports: [
      "import { Checkbox, FormControl, FormControlField, FormControlLabel } from '@montage-ui/core';",
    ],
    example: figma.code`<FormControl${figma.helpers.react.renderProp(
      'gap',
      gap,
    )} flexDirection="row">
      <FormControlField>
        <Checkbox defaultChecked size="medium"${figma.helpers.react.renderProp(
          'disabled',
          disabled,
        )}${figma.helpers.react.renderProp(
          'bold',
          bold,
        )}${figma.helpers.react.renderProp('tight', tight)}/>
      </FormControlField>
      <FormControlLabel>${figma.helpers.react.renderChildren(
        label,
      )}</FormControlLabel>
    </FormControl>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('State') === 'Unchecked' &&
  figma.selectedInstance.getPropertyValue('Size') === 'Medium'
) {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const bold = figma.selectedInstance.getBoolean('Bold');
  const label = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('┗ Text​'),
    false: undefined,
  });
  const gap = figma.selectedInstance.getBoolean('Tight', {
    true: '10px',
    false: '8px',
  });
  const tight = figma.selectedInstance.getBoolean('Tight');
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (bold && bold.type !== 'ERROR') {
    __props['bold'] = bold;
  }
  if (label && label.type !== 'ERROR') {
    __props['label'] = label;
  }
  if (gap && gap.type !== 'ERROR') {
    __props['gap'] = gap;
  }
  if (tight && tight.type !== 'ERROR') {
    __props['tight'] = tight;
  }

  template = {
    id: 'Checkbox',
    imports: [
      "import { Checkbox, FormControl, FormControlField, FormControlLabel } from '@montage-ui/core';",
    ],
    example: figma.code`<FormControl${figma.helpers.react.renderProp(
      'gap',
      gap,
    )} flexDirection="row">
      <FormControlField>
        <Checkbox size="medium"${figma.helpers.react.renderProp(
          'disabled',
          disabled,
        )}${figma.helpers.react.renderProp(
          'bold',
          bold,
        )}${figma.helpers.react.renderProp('tight', tight)}/>
      </FormControlField>
      <FormControlLabel>${figma.helpers.react.renderChildren(
        label,
      )}</FormControlLabel>
    </FormControl>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('State') === 'Indeterminate' &&
  figma.selectedInstance.getPropertyValue('Size') === 'Medium'
) {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const bold = figma.selectedInstance.getBoolean('Bold');
  const label = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('┗ Text​'),
    false: undefined,
  });
  const gap = figma.selectedInstance.getBoolean('Tight', {
    true: '10px',
    false: '8px',
  });
  const tight = figma.selectedInstance.getBoolean('Tight');
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (bold && bold.type !== 'ERROR') {
    __props['bold'] = bold;
  }
  if (label && label.type !== 'ERROR') {
    __props['label'] = label;
  }
  if (gap && gap.type !== 'ERROR') {
    __props['gap'] = gap;
  }
  if (tight && tight.type !== 'ERROR') {
    __props['tight'] = tight;
  }

  template = {
    id: 'Checkbox',
    imports: [
      "import { Checkbox, FormControl, FormControlField, FormControlLabel } from '@montage-ui/core';",
    ],
    example: figma.code`<FormControl${figma.helpers.react.renderProp(
      'gap',
      gap,
    )} flexDirection="row">
      <FormControlField>
        <Checkbox indeterminate size="medium"${figma.helpers.react.renderProp(
          'disabled',
          disabled,
        )}${figma.helpers.react.renderProp(
          'bold',
          bold,
        )}${figma.helpers.react.renderProp('tight', tight)}/>
      </FormControlField>
      <FormControlLabel>${figma.helpers.react.renderChildren(
        label,
      )}</FormControlLabel>
    </FormControl>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('State') === 'Checked' &&
  figma.selectedInstance.getPropertyValue('Size') === 'Small'
) {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const bold = figma.selectedInstance.getBoolean('Bold');
  const label = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('┗ Text​'),
    false: undefined,
  });
  const gap = figma.selectedInstance.getBoolean('Tight', {
    true: '10px',
    false: '8px',
  });
  const tight = figma.selectedInstance.getBoolean('Tight');
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (bold && bold.type !== 'ERROR') {
    __props['bold'] = bold;
  }
  if (label && label.type !== 'ERROR') {
    __props['label'] = label;
  }
  if (gap && gap.type !== 'ERROR') {
    __props['gap'] = gap;
  }
  if (tight && tight.type !== 'ERROR') {
    __props['tight'] = tight;
  }

  template = {
    id: 'Checkbox',
    imports: [
      "import { Checkbox, FormControl, FormControlField, FormControlLabel } from '@montage-ui/core';",
    ],
    example: figma.code`<FormControl${figma.helpers.react.renderProp(
      'gap',
      gap,
    )} flexDirection="row">
      <FormControlField>
        <Checkbox defaultChecked size="small"${figma.helpers.react.renderProp(
          'disabled',
          disabled,
        )}${figma.helpers.react.renderProp(
          'bold',
          bold,
        )}${figma.helpers.react.renderProp('tight', tight)}/>
      </FormControlField>
      <FormControlLabel>${figma.helpers.react.renderChildren(
        label,
      )}</FormControlLabel>
    </FormControl>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('State') === 'Unchecked' &&
  figma.selectedInstance.getPropertyValue('Size') === 'Small'
) {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const bold = figma.selectedInstance.getBoolean('Bold');
  const label = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('┗ Text​'),
    false: undefined,
  });
  const gap = figma.selectedInstance.getBoolean('Tight', {
    true: '10px',
    false: '8px',
  });
  const tight = figma.selectedInstance.getBoolean('Tight');
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (bold && bold.type !== 'ERROR') {
    __props['bold'] = bold;
  }
  if (label && label.type !== 'ERROR') {
    __props['label'] = label;
  }
  if (gap && gap.type !== 'ERROR') {
    __props['gap'] = gap;
  }
  if (tight && tight.type !== 'ERROR') {
    __props['tight'] = tight;
  }

  template = {
    id: 'Checkbox',
    imports: [
      "import { Checkbox, FormControl, FormControlField, FormControlLabel } from '@montage-ui/core';",
    ],
    example: figma.code`<FormControl${figma.helpers.react.renderProp(
      'gap',
      gap,
    )} flexDirection="row">
      <FormControlField>
        <Checkbox size="small"${figma.helpers.react.renderProp(
          'disabled',
          disabled,
        )}${figma.helpers.react.renderProp(
          'bold',
          bold,
        )}${figma.helpers.react.renderProp('tight', tight)}/>
      </FormControlField>
      <FormControlLabel>${figma.helpers.react.renderChildren(
        label,
      )}</FormControlLabel>
    </FormControl>`,
    metadata: { nestable: true, __props },
  };
} else if (
  figma.selectedInstance.getPropertyValue('State') === 'Indeterminate' &&
  figma.selectedInstance.getPropertyValue('Size') === 'Small'
) {
  const disabled = figma.selectedInstance.getBoolean('Disable');
  const bold = figma.selectedInstance.getBoolean('Bold');
  const label = figma.selectedInstance.getBoolean('Label', {
    true: figma.selectedInstance.getString('┗ Text​'),
    false: undefined,
  });
  const gap = figma.selectedInstance.getBoolean('Tight', {
    true: '10px',
    false: '8px',
  });
  const tight = figma.selectedInstance.getBoolean('Tight');
  const __props: Record<string, unknown> = {};
  if (disabled && disabled.type !== 'ERROR') {
    __props['disabled'] = disabled;
  }
  if (bold && bold.type !== 'ERROR') {
    __props['bold'] = bold;
  }
  if (label && label.type !== 'ERROR') {
    __props['label'] = label;
  }
  if (gap && gap.type !== 'ERROR') {
    __props['gap'] = gap;
  }
  if (tight && tight.type !== 'ERROR') {
    __props['tight'] = tight;
  }

  template = {
    id: 'Checkbox',
    imports: [
      "import { Checkbox, FormControl, FormControlField, FormControlLabel } from '@montage-ui/core';",
    ],
    example: figma.code`<FormControl${figma.helpers.react.renderProp(
      'gap',
      gap,
    )} flexDirection="row">
      <FormControlField>
        <Checkbox indeterminate size="small"${figma.helpers.react.renderProp(
          'disabled',
          disabled,
        )}${figma.helpers.react.renderProp(
          'bold',
          bold,
        )}${figma.helpers.react.renderProp('tight', tight)}/>
      </FormControlField>
      <FormControlLabel>${figma.helpers.react.renderChildren(
        label,
      )}</FormControlLabel>
    </FormControl>`,
    metadata: { nestable: true, __props },
  };
} else {
  // No Code Connect mapping for this variant combination.
  template = {
    id: 'Checkbox',
    imports: [],
    example: figma.code``,
    metadata: { nestable: true },
  };
}

export default template;
