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
      Medium: 'medium',
      Small: 'small',
    }),
    tight: figma.boolean('Tight'),
  },
  example: (props) => <RadioGroupItem value="" {...props} />,
});

figma.connect(RadioGroupItem, '<FIGMA_RADIO>', {
  props: {
    disabled: figma.boolean('Disable'),
    label: figma.string('Label'),
    gap: figma.boolean('Tight', {
      true: '10px',
      false: '8px',
    }),
    tight: figma.boolean('Tight'),
  },
  variant: {
    Size: 'Medium',
  },
  example: ({ label, gap, ...props }) => (
    <FormField flexDirection="row" gap={gap}>
      <FormControl>
        <RadioGroupItem value="" size="medium" {...props} />
      </FormControl>
      <FormLabel sx={{ padding: '1px 0' }}>{label}</FormLabel>
    </FormField>
  ),
});

figma.connect(RadioGroupItem, '<FIGMA_RADIO>', {
  props: {
    disabled: figma.boolean('Disable'),
    label: figma.string('Label'),
    gap: figma.boolean('Tight', {
      true: '6px',
      false: '4px',
    }),
    tight: figma.boolean('Tight'),
  },
  variant: {
    Size: 'Small',
  },
  example: ({ label, gap, ...props }) => (
    <FormField flexDirection="row" gap={gap}>
      <FormControl>
        <RadioGroupItem value="" size="small" {...props} />
      </FormControl>
      <FormLabel>{label}</FormLabel>
    </FormField>
  ),
});
