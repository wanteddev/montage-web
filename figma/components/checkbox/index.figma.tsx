import { figma } from '@figma/code-connect';

import {
  Checkbox,
  FormControl,
  FormControlField,
  FormControlLabel,
} from '@montage-ui/core';

figma.connect(Checkbox, '<FIGMA_CONTROL_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Medium: 'medium',
      Small: 'small',
    }),
  },
  variant: {
    State: 'Checked',
  },
  example: (props) => <Checkbox checked {...props} />,
});

figma.connect(Checkbox, '<FIGMA_CONTROL_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Medium: 'medium',
      Small: 'small',
    }),
  },
  variant: {
    State: 'Unchecked',
  },
  example: (props) => <Checkbox {...props} />,
});

figma.connect(Checkbox, '<FIGMA_CONTROL_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Medium: 'medium',
      Small: 'small',
    }),
  },
  variant: {
    State: 'Indeterminate',
  },
  example: (props) => <Checkbox indeterminate {...props} />,
});

figma.connect(Checkbox, '<FIGMA_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    bold: figma.boolean('Bold'),
    label: figma.string('Label'),
    gap: figma.boolean('Tight', {
      true: '10px',
      false: '8px',
    }),
    tight: figma.boolean('Tight'),
  },
  variant: {
    State: 'Checked',
    Size: 'Medium',
  },
  example: ({ label, gap, ...props }) => (
    <FormControl gap={gap} flexDirection="row">
      <FormControlField>
        <Checkbox checked size="medium" {...props} />
      </FormControlField>
      <FormControlLabel>{label}</FormControlLabel>
    </FormControl>
  ),
});

figma.connect(Checkbox, '<FIGMA_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    bold: figma.boolean('Bold'),
    label: figma.string('Label'),
    gap: figma.boolean('Tight', {
      true: '10px',
      false: '8px',
    }),
    tight: figma.boolean('Tight'),
  },
  variant: {
    State: 'Unchecked',
    Size: 'Medium',
  },
  example: ({ label, gap, ...props }) => (
    <FormControl gap={gap} flexDirection="row">
      <FormControlField>
        <Checkbox size="medium" {...props} />
      </FormControlField>
      <FormControlLabel>{label}</FormControlLabel>
    </FormControl>
  ),
});

figma.connect(Checkbox, '<FIGMA_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    bold: figma.boolean('Bold'),
    label: figma.string('Label'),
    gap: figma.boolean('Tight', {
      true: '10px',
      false: '8px',
    }),
    tight: figma.boolean('Tight'),
  },
  variant: {
    State: 'Indeterminate',
    Size: 'Medium',
  },
  example: ({ label, gap, ...props }) => (
    <FormControl gap={gap} flexDirection="row">
      <FormControlField>
        <Checkbox indeterminate size="medium" {...props} />
      </FormControlField>
      <FormControlLabel>{label}</FormControlLabel>
    </FormControl>
  ),
});

figma.connect(Checkbox, '<FIGMA_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    bold: figma.boolean('Bold'),
    label: figma.string('Label'),
    gap: figma.boolean('Tight', {
      true: '10px',
      false: '8px',
    }),
    tight: figma.boolean('Tight'),
  },
  variant: {
    State: 'Checked',
    Size: 'Small',
  },
  example: ({ label, gap, ...props }) => (
    <FormControl gap={gap} flexDirection="row">
      <FormControlField>
        <Checkbox checked size="small" {...props} />
      </FormControlField>
      <FormControlLabel>{label}</FormControlLabel>
    </FormControl>
  ),
});

figma.connect(Checkbox, '<FIGMA_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    bold: figma.boolean('Bold'),
    label: figma.string('Label'),
    gap: figma.boolean('Tight', {
      true: '10px',
      false: '8px',
    }),
    tight: figma.boolean('Tight'),
  },
  variant: {
    State: 'Unchecked',
    Size: 'Small',
  },
  example: ({ label, gap, ...props }) => (
    <FormControl gap={gap} flexDirection="row">
      <FormControlField>
        <Checkbox size="small" {...props} />
      </FormControlField>
      <FormControlLabel>{label}</FormControlLabel>
    </FormControl>
  ),
});

figma.connect(Checkbox, '<FIGMA_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    bold: figma.boolean('Bold'),
    label: figma.string('Label'),
    gap: figma.boolean('Tight', {
      true: '10px',
      false: '8px',
    }),
    tight: figma.boolean('Tight'),
  },
  variant: {
    State: 'Indeterminate',
    Size: 'Small',
  },
  example: ({ label, gap, ...props }) => (
    <FormControl gap={gap} flexDirection="row">
      <FormControlField>
        <Checkbox indeterminate size="small" {...props} />
      </FormControlField>
      <FormControlLabel>{label}</FormControlLabel>
    </FormControl>
  ),
});
