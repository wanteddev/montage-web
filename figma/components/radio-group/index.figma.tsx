import { figma } from '@figma/code-connect';

import {
  FormControl,
  FormField,
  FormLabel,
  RadioGroupItem,
} from '@wanteddev/wds';

figma.connect(RadioGroupItem, '<FIGMA_CONTROL_RADIO>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Normal: 'normal',
      Small: 'small',
    }),
  },
  example: (props) => <RadioGroupItem value="" {...props} />,
});

figma.connect(RadioGroupItem, '<FIGMA_RADIO>', {
  props: {
    disabled: figma.boolean('Disable'),
    label: figma.string('Label'),
  },
  variant: {
    Size: 'Normal',
  },
  example: ({ label, ...props }) => (
    <FormField flexDirection="row" gap="8px">
      <FormControl>
        <RadioGroupItem value="" size="normal" {...props} />
      </FormControl>
      <FormLabel sx={{ padding: '1px 0' }}>{label}</FormLabel>
    </FormField>
  ),
});

figma.connect(RadioGroupItem, '<FIGMA_RADIO>', {
  props: {
    disabled: figma.boolean('Disable'),
    label: figma.string('Label'),
  },
  variant: {
    Size: 'Small',
  },
  example: ({ label, ...props }) => (
    <FormField flexDirection="row" gap="8px">
      <FormControl>
        <RadioGroupItem value="" size="small" {...props} />
      </FormControl>
      <FormLabel>{label}</FormLabel>
    </FormField>
  ),
});
