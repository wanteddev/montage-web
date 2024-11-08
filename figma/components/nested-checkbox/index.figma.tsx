import { figma } from '@figma/code-connect';

import {
  FormControl,
  FormField,
  FormLabel,
  NestedCheckbox,
} from '@wanteddev/wds';

figma.connect(NestedCheckbox, '<FIGMA_CONTROL_NESTED_CHECKBOX>', {
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
  example: (props) => <NestedCheckbox checked {...props} />,
});

figma.connect(NestedCheckbox, '<FIGMA_CONTROL_NESTED_CHECKBOX>', {
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
  example: (props) => <NestedCheckbox {...props} />,
});

figma.connect(NestedCheckbox, '<FIGMA_NESTED_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    label: figma.string('Label'),
  },
  variant: {
    State: 'Checked',
    Size: 'Normal',
  },
  example: ({ label, ...props }) => (
    <FormField gap="4px" flexDirection="row">
      <FormControl>
        <NestedCheckbox checked size="normal" {...props} />
      </FormControl>
      <FormLabel sx={{ padding: '1px 0px' }}>{label}</FormLabel>
    </FormField>
  ),
});

figma.connect(NestedCheckbox, '<FIGMA_NESTED_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    label: figma.string('Label'),
  },
  variant: {
    State: 'Unchecked',
    Size: 'Normal',
  },
  example: ({ label, ...props }) => (
    <FormField gap="4px" flexDirection="row">
      <FormControl>
        <NestedCheckbox size="normal" {...props} />
      </FormControl>
      <FormLabel sx={{ padding: '1px 0px' }}>{label}</FormLabel>
    </FormField>
  ),
});

figma.connect(NestedCheckbox, '<FIGMA_NESTED_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    label: figma.string('Label'),
  },
  variant: {
    State: 'Checked',
    Size: 'Small',
  },
  example: ({ label, ...props }) => (
    <FormField gap="4px" flexDirection="row">
      <FormControl>
        <NestedCheckbox checked size="small" {...props} />
      </FormControl>
      <FormLabel>{label}</FormLabel>
    </FormField>
  ),
});

figma.connect(NestedCheckbox, '<FIGMA_NESTED_CHECKBOX>', {
  props: {
    disabled: figma.boolean('Disable'),
    label: figma.string('Label'),
  },
  variant: {
    State: 'Unchecked',
    Size: 'Small',
  },
  example: ({ label, ...props }) => (
    <FormField gap="4px" flexDirection="row">
      <FormControl>
        <NestedCheckbox size="small" {...props} />
      </FormControl>
      <FormLabel>{label}</FormLabel>
    </FormField>
  ),
});
