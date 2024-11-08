import { figma } from '@figma/code-connect';

import { Checkbox, FormControl, FormField, FormLabel } from '@wanteddev/wds';

figma.connect(Checkbox, '<FIGMA_CONTROL_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Normal: 'normal',
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
      Normal: 'normal',
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
      Normal: 'normal',
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
  },
  variant: {
    State: 'Checked',
    Size: 'Normal',
  },
  example: ({ label, ...props }) => (
    <FormField gap="8px" flexDirection="row">
      <FormControl>
        <Checkbox checked size="normal" {...props} />
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
  },
  variant: {
    State: 'Unchecked',
    Size: 'Normal',
  },
  example: ({ label, ...props }) => (
    <FormField gap="8px" flexDirection="row">
      <FormControl>
        <Checkbox size="normal" {...props} />
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
  },
  variant: {
    State: 'Indeterminate',
    Size: 'Normal',
  },
  example: ({ label, ...props }) => (
    <FormField gap="8px" flexDirection="row">
      <FormControl>
        <Checkbox indeterminate size="normal" {...props} />
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
  },
  variant: {
    State: 'Checked',
    Size: 'Small',
  },
  example: ({ label, ...props }) => (
    <FormField gap="8px" flexDirection="row">
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
  },
  variant: {
    State: 'Unchecked',
    Size: 'Small',
  },
  example: ({ label, ...props }) => (
    <FormField gap="8px" flexDirection="row">
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
  },
  variant: {
    State: 'Indeterminate',
    Size: 'Small',
  },
  example: ({ label, ...props }) => (
    <FormField gap="8px" flexDirection="row">
      <FormControl>
        <Checkbox indeterminate size="small" {...props} />
      </FormControl>
      <FormLabel>{label}</FormLabel>
    </FormField>
  ),
});
