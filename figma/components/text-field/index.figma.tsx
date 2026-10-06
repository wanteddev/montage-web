import { figma } from '@figma/code-connect';

import { TextField, TextFieldButton, TextFieldContent } from '@montage-ui/core';

figma.connect(TextField, '<FIGMA_TEXT_FIELD>', {
  props: {
    placeholder: figma.string('Placeholder'),
    trailingContent: figma.boolean('Trailing Content', {
      true: figma.children('Trailing Content'),
      false: undefined,
    }),
    trailingButton: figma.enum('Trailing Button', {
      True: figma.children('Trailing Button'),
      False: undefined,
    }),
    status: figma.enum('Status', {
      Normal: undefined,
      Positive: 'positive',
      Negative: 'negative',
    }),
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Large: 'large',
      Medium: 'medium',
    }),
  },
  variant: {
    'Leading Icon': false,
  },
  example: (props) => <TextField {...props} />,
});

figma.connect(TextField, '<FIGMA_TEXT_FIELD>', {
  props: {
    placeholder: figma.string('Placeholder'),
    icon: figma.children('Icon'),
    trailingContent: figma.boolean('Trailing Content', {
      true: figma.children('Trailing Content'),
      false: undefined,
    }),
    trailingButton: figma.enum('Trailing Button', {
      True: figma.children('Trailing Button'),
      False: undefined,
    }),
    status: figma.enum('Status', {
      Normal: undefined,
      Positive: 'positive',
      Negative: 'negative',
    }),
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Large: 'large',
      Medium: 'medium',
    }),
  },
  variant: {
    'Leading Icon': true,
  },
  example: ({ icon, ...props }) => (
    <TextField
      leadingContent={
        <TextFieldContent variant="icon">{icon}</TextFieldContent>
      }
      {...props}
    />
  ),
});

figma.connect(TextFieldContent, '<FIGMA_TEXT_FIELD_TRAILING_CONTENT_LARGE>', {
  variant: {
    Variant: 'Custom',
  },
  example: () => <TextFieldContent variant="custom" />,
});

figma.connect(TextFieldContent, '<FIGMA_TEXT_FIELD_TRAILING_CONTENT_LARGE>', {
  props: {
    children: figma.string('Time'),
  },
  variant: {
    Variant: 'Timer',
  },
  example: ({ children }) => (
    <TextFieldContent variant="timer">{children}</TextFieldContent>
  ),
});

figma.connect(TextFieldContent, '<FIGMA_TEXT_FIELD_TRAILING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Content Badge/Content Badge'),
  },
  variant: {
    Variant: 'Badge',
  },
  example: ({ children }) => (
    <TextFieldContent variant="badge">{children}</TextFieldContent>
  ),
});

figma.connect(TextFieldContent, '<FIGMA_TEXT_FIELD_TRAILING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Icon'),
  },
  variant: {
    Variant: 'Icon',
  },
  example: ({ children }) => (
    <TextFieldContent variant="icon">{children}</TextFieldContent>
  ),
});

figma.connect(TextFieldContent, '<FIGMA_TEXT_FIELD_TRAILING_CONTENT_LARGE>', {
  props: {
    children: figma.string('Text'),
  },
  variant: {
    Variant: 'Text',
  },
  example: ({ children }) => (
    <TextFieldContent variant="text">{children}</TextFieldContent>
  ),
});

figma.connect(TextFieldContent, '<FIGMA_TEXT_FIELD_TRAILING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Icon Button'),
  },
  variant: {
    Variant: 'Icon Button',
  },
  example: ({ children }) => (
    <TextFieldContent variant="icon-button">{children}</TextFieldContent>
  ),
});

figma.connect(TextFieldContent, '<FIGMA_TEXT_FIELD_TRAILING_CONTENT_MEDIUM>', {
  variant: {
    Variant: 'Custom',
  },
  example: () => <TextFieldContent variant="custom" />,
});

figma.connect(TextFieldContent, '<FIGMA_TEXT_FIELD_TRAILING_CONTENT_MEDIUM>', {
  variant: {
    Variant: 'Timer',
  },
  example: () => <TextFieldContent variant="timer">0:00</TextFieldContent>,
});

figma.connect(TextFieldContent, '<FIGMA_TEXT_FIELD_TRAILING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Content Badge/Content Badge'),
  },
  variant: {
    Variant: 'Badge',
  },
  example: ({ children }) => (
    <TextFieldContent variant="badge">{children}</TextFieldContent>
  ),
});

figma.connect(TextFieldContent, '<FIGMA_TEXT_FIELD_TRAILING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Icon'),
  },
  variant: {
    Variant: 'Icon',
  },
  example: ({ children }) => (
    <TextFieldContent variant="icon">{children}</TextFieldContent>
  ),
});

figma.connect(TextFieldContent, '<FIGMA_TEXT_FIELD_TRAILING_CONTENT_MEDIUM>', {
  variant: {
    Variant: 'Text',
  },
  example: () => <TextFieldContent variant="text">단위</TextFieldContent>,
});

figma.connect(TextFieldContent, '<FIGMA_TEXT_FIELD_TRAILING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Icon Button'),
  },
  variant: {
    Variant: 'Icon Button',
  },
  example: ({ children }) => (
    <TextFieldContent variant="icon-button">{children}</TextFieldContent>
  ),
});

figma.connect(TextFieldButton, '<FIGMA_TEXT_FIELD_BUTTON>', {
  props: {
    children: figma.string('Label'),
    disabled: figma.boolean('Disable'),
  },
  example: ({ children, ...props }) => (
    <TextFieldButton {...props}>{children}</TextFieldButton>
  ),
});
