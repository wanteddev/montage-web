import { figma } from '@figma/code-connect';

import {
  CheckMark,
  FormControl,
  FormControlField,
  FormControlLabel,
} from '@montage-ui/core';

figma.connect(CheckMark, '<FIGMA_CONTROL_CHECK_MARK>', {
  props: {
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Medium: 'medium',
      Small: 'small',
    }),
    tight: figma.boolean('Tight'),
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
    tight: figma.boolean('Tight'),
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
    gap: figma.boolean('Tight', {
      true: '6px',
      false: '4px',
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
        <CheckMark checked size="medium" {...props} />
      </FormControlField>
      <FormControlLabel>{label}</FormControlLabel>
    </FormControl>
  ),
});

figma.connect(CheckMark, '<FIGMA_CHECK_MARK>', {
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
    State: 'Unchecked',
    Size: 'Medium',
  },
  example: ({ label, gap, ...props }) => (
    <FormControl gap={gap} flexDirection="row">
      <FormControlField>
        <CheckMark size="medium" {...props} />
      </FormControlField>
      <FormControlLabel>{label}</FormControlLabel>
    </FormControl>
  ),
});

figma.connect(CheckMark, '<FIGMA_CHECK_MARK>', {
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
    State: 'Checked',
    Size: 'Small',
  },
  example: ({ label, gap, ...props }) => (
    <FormControl gap={gap} flexDirection="row">
      <FormControlField>
        <CheckMark checked size="small" {...props} />
      </FormControlField>
      <FormControlLabel>{label}</FormControlLabel>
    </FormControl>
  ),
});

figma.connect(CheckMark, '<FIGMA_CHECK_MARK>', {
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
    State: 'Unchecked',
    Size: 'Small',
  },
  example: ({ label, gap, ...props }) => (
    <FormControl gap={gap} flexDirection="row">
      <FormControlField>
        <CheckMark size="small" {...props} />
      </FormControlField>
      <FormControlLabel>{label}</FormControlLabel>
    </FormControl>
  ),
});
