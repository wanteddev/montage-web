import { figma } from '@figma/code-connect';

import { Checkbox, FormControl, FormField, FormLabel } from '@wanteddev/wds';

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
    <FormField gap={gap} flexDirection="row">
      <FormControl>
        <Checkbox checked size="medium" {...props} />
      </FormControl>
      <FormLabel sx={{ padding: '1px 0px' }}>{label}</FormLabel>
    </FormField>
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
    <FormField gap={gap} flexDirection="row">
      <FormControl>
        <Checkbox size="medium" {...props} />
      </FormControl>
      <FormLabel sx={{ padding: '1px 0px' }}>{label}</FormLabel>
    </FormField>
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
    <FormField gap={gap} flexDirection="row">
      <FormControl>
        <Checkbox indeterminate size="medium" {...props} />
      </FormControl>
      <FormLabel sx={{ padding: '1px 0px' }}>{label}</FormLabel>
    </FormField>
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
    <FormField gap={gap} flexDirection="row">
      <FormControl>
        <Checkbox checked size="small" {...props} />
      </FormControl>
      <FormLabel>{label}</FormLabel>
    </FormField>
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
    <FormField gap={gap} flexDirection="row">
      <FormControl>
        <Checkbox size="small" {...props} />
      </FormControl>
      <FormLabel>{label}</FormLabel>
    </FormField>
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
    <FormField gap={gap} flexDirection="row">
      <FormControl>
        <Checkbox indeterminate size="small" {...props} />
      </FormControl>
      <FormLabel>{label}</FormLabel>
    </FormField>
  ),
});
