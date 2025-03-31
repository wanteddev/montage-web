import { figma } from '@figma/code-connect';

import { CheckMark, FormControl, FormField, FormLabel } from '@wanteddev/wds';

figma.connect(CheckMark, '<FIGMA_CONTROL_CHECK_MARK>', {
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
  example: (props) => <CheckMark checked {...props} />,
});

figma.connect(CheckMark, '<FIGMA_CONTROL_CHECK_MARK>', {
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
  example: (props) => <CheckMark {...props} />,
});

figma.connect(CheckMark, '<FIGMA_CHECK_MARK>', {
  props: {
    disabled: figma.boolean('Disable'),
    label: figma.string('Label'),
  },
  variant: {
    State: 'Checked',
    Size: 'Medium',
  },
  example: ({ label, ...props }) => (
    <FormField gap="4px" flexDirection="row">
      <FormControl>
        <CheckMark checked size="medium" {...props} />
      </FormControl>
      <FormLabel sx={{ padding: '1px 0px' }}>{label}</FormLabel>
    </FormField>
  ),
});

figma.connect(CheckMark, '<FIGMA_CHECK_MARK>', {
  props: {
    disabled: figma.boolean('Disable'),
    label: figma.string('Label'),
  },
  variant: {
    State: 'Unchecked',
    Size: 'Medium',
  },
  example: ({ label, ...props }) => (
    <FormField gap="4px" flexDirection="row">
      <FormControl>
        <CheckMark size="medium" {...props} />
      </FormControl>
      <FormLabel sx={{ padding: '1px 0px' }}>{label}</FormLabel>
    </FormField>
  ),
});

figma.connect(CheckMark, '<FIGMA_CHECK_MARK>', {
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
        <CheckMark checked size="small" {...props} />
      </FormControl>
      <FormLabel>{label}</FormLabel>
    </FormField>
  ),
});

figma.connect(CheckMark, '<FIGMA_CHECK_MARK>', {
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
        <CheckMark size="small" {...props} />
      </FormControl>
      <FormLabel>{label}</FormLabel>
    </FormField>
  ),
});
