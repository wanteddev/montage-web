import { figma } from '@figma/code-connect';

import {
  FormControl,
  FormControlField,
  FormControlLabel,
  FormControlMessage,
  FormControlMessageAccessory,
  FormControlNegativeMessage,
  FormControlPositiveMessage,
} from '@montage-ui/core';

figma.connect(FormControl, '<FIGMA_FORM_CONTROL>', {
  props: {
    label: figma.string('\u2517 Text'),
    required: figma.boolean('\u2517 Required'),
    input: figma.slot('Input').connectedInstances,
    footer: figma.boolean('Footer', {
      true: figma.children('Footer'),
      false: undefined,
    }),
    size: figma.enum('Size', {
      Large: 'large',
      Medium: 'medium',
    }),
    labelPlacement: figma.enum('Label Placement', {
      Top: 'top',
      Leading: 'leading',
    }),
  },
  variant: {
    Label: true,
  },
  example: ({ label, required, input, footer, ...props }) => (
    <FormControl {...props}>
      <FormControlLabel required={required}>{label}</FormControlLabel>
      <FormControlField>{input}</FormControlField>
      {footer}
    </FormControl>
  ),
});

figma.connect(FormControl, '<FIGMA_FORM_CONTROL>', {
  props: {
    input: figma.slot('Input').connectedInstances,
    footer: figma.boolean('Footer', {
      true: figma.children('Footer'),
      false: undefined,
    }),
    size: figma.enum('Size', {
      Large: 'large',
      Medium: 'medium',
    }),
    labelPlacement: figma.enum('Label Placement', {
      Top: 'top',
      Leading: 'leading',
    }),
  },
  variant: {
    Label: false,
  },
  example: ({ input, footer, ...props }) => (
    <FormControl {...props}>
      <FormControlField>{input}</FormControlField>
      {footer}
    </FormControl>
  ),
});

figma.connect(FormControlMessage, '<FIGMA_FORM_CONTROL_HELPER_TEXT>', {
  props: {
    children: figma.enum('Description', {
      True: figma.string('\u2517 Text\u200B'),
      False: undefined,
    }),
    accessory: figma.enum('Accessory', {
      True: (
        <FormControlMessageAccessory
          variant="character-counter"
          length={0}
          maxLength={100}
        />
      ),
      False: undefined,
    }),
  },
  example: ({ children, ...props }) => (
    <FormControlMessage {...props}>{children}</FormControlMessage>
  ),
});

figma.connect(
  FormControlPositiveMessage,
  '<FIGMA_FORM_CONTROL_SUCCESS_MESSAGE>',
  {
    props: {
      children: figma.enum('Description', {
        True: figma.string('\u2517 Success Text'),
        False: undefined,
      }),
      accessory: figma.enum('Accessory', {
        True: (
          <FormControlMessageAccessory
            variant="character-counter"
            length={0}
            maxLength={100}
          />
        ),
        False: undefined,
      }),
    },
    example: ({ children, ...props }) => (
      <FormControlPositiveMessage {...props}>
        {children}
      </FormControlPositiveMessage>
    ),
  },
);

figma.connect(
  FormControlNegativeMessage,
  '<FIGMA_FORM_CONTROL_INVALID_MESSAGE>',
  {
    props: {
      children: figma.enum('Description', {
        True: figma.string('\u2517 Invalid Text'),
        False: undefined,
      }),
      accessory: figma.enum('Accessory', {
        True: (
          <FormControlMessageAccessory
            variant="character-counter"
            length={0}
            maxLength={100}
          />
        ),
        False: undefined,
      }),
    },
    example: ({ children, ...props }) => (
      <FormControlNegativeMessage {...props}>
        {children}
      </FormControlNegativeMessage>
    ),
  },
);
