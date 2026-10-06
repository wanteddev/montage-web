import { figma } from '@figma/code-connect';

import { TextArea, TextAreaContent } from '@montage-ui/core';

figma.connect(TextArea, '<FIGMA_TEXT_AREA>', {
  props: {
    placeholder: figma.string('Placeholder'),
    leadingContent: figma.boolean('Bottom', {
      true: figma.boolean('\u2517 Leading Content', {
        true: figma.children('Leading Content'),
        false: undefined,
      }),
      false: undefined,
    }),
    trailingContent: figma.boolean('Bottom', {
      true: figma.boolean('\u2517 Trailing Content', {
        true: figma.children('Trailing Content'),
        false: undefined,
      }),
      false: undefined,
    }),
    status: figma.enum('Status', {
      Normal: undefined,
      Negative: 'negative',
    }),
    disabled: figma.boolean('Disable'),
    size: figma.enum('Size', {
      Large: 'large',
      Medium: 'medium',
    }),
  },
  example: (props) => <TextArea {...props} />,
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_LEADING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Icon'),
  },
  variant: {
    Type: 'Icon',
  },
  example: ({ children }) => (
    <TextAreaContent variant="icon">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_LEADING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Icon Button'),
  },
  variant: {
    Type: 'Icon Button',
  },
  example: ({ children }) => (
    <TextAreaContent variant="icon-button">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_LEADING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Content Badge/Content Badge'),
  },
  variant: {
    Type: 'Content Badge',
  },
  example: ({ children }) => (
    <TextAreaContent variant="content-badge">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_LEADING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Segmented Control/Segmented Control'),
  },
  variant: {
    Type: 'Segmented Control',
  },
  example: ({ children }) => (
    <TextAreaContent variant="segmented-control">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_LEADING_CONTENT_LARGE>', {
  props: {
    children: figma.slot('Slot'),
  },
  variant: {
    Type: 'Slot',
  },
  example: ({ children }) => (
    <TextAreaContent variant="custom">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_LEADING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Icon'),
  },
  variant: {
    Type: 'Icon',
  },
  example: ({ children }) => (
    <TextAreaContent variant="icon">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_LEADING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Icon Button'),
  },
  variant: {
    Type: 'Icon Button',
  },
  example: ({ children }) => (
    <TextAreaContent variant="icon-button">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_LEADING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Content Badge/Content Badge'),
  },
  variant: {
    Type: 'Content Badge',
  },
  example: ({ children }) => (
    <TextAreaContent variant="content-badge">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_LEADING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Segmented Control/Segmented Control'),
  },
  variant: {
    Type: 'Segmented Control',
  },
  example: ({ children }) => (
    <TextAreaContent variant="segmented-control">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_LEADING_CONTENT_MEDIUM>', {
  props: {
    children: figma.slot('Slot'),
  },
  variant: {
    Type: 'Slot',
  },
  example: ({ children }) => (
    <TextAreaContent variant="custom">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Button/Button'),
  },
  variant: {
    Type: 'Button',
  },
  example: ({ children }) => (
    <TextAreaContent variant="button">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Content Badge/Content Badge'),
  },
  variant: {
    Type: 'Content Badge',
  },
  example: ({ children }) => (
    <TextAreaContent variant="content-badge">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Button/Icon/Normal'),
  },
  variant: {
    Type: 'Icon Button',
  },
  example: ({ children }) => (
    <TextAreaContent variant="icon-button">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Icon'),
  },
  variant: {
    Type: 'Icon',
  },
  example: ({ children }) => (
    <TextAreaContent variant="icon">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Button/Button'),
  },
  variant: {
    Type: 'Primary Icon Button',
  },
  example: ({ children }) => (
    <TextAreaContent variant="primary-icon-button">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_LARGE>', {
  props: {
    children: figma.children('Segmented Control/Segmented Control'),
  },
  variant: {
    Type: 'Segmented Control',
  },
  example: ({ children }) => (
    <TextAreaContent variant="segmented-control">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_LARGE>', {
  props: {
    children: figma.slot('Slot'),
  },
  variant: {
    Type: 'Slot',
  },
  example: ({ children }) => (
    <TextAreaContent variant="custom">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Button/Button'),
  },
  variant: {
    Type: 'Button',
  },
  example: ({ children }) => (
    <TextAreaContent variant="button">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Content Badge/Content Badge'),
  },
  variant: {
    Type: 'Content Badge',
  },
  example: ({ children }) => (
    <TextAreaContent variant="content-badge">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Icon Button'),
  },
  variant: {
    Type: 'Icon Button',
  },
  example: ({ children }) => (
    <TextAreaContent variant="icon-button">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Icon'),
  },
  variant: {
    Type: 'Icon',
  },
  example: ({ children }) => (
    <TextAreaContent variant="icon">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Button/Button'),
  },
  variant: {
    Type: 'Primary Icon Button',
  },
  example: ({ children }) => (
    <TextAreaContent variant="primary-icon-button">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_MEDIUM>', {
  props: {
    children: figma.children('Segmented Control/Segmented Control'),
  },
  variant: {
    Type: 'Segmented Control',
  },
  example: ({ children }) => (
    <TextAreaContent variant="segmented-control">{children}</TextAreaContent>
  ),
});

figma.connect(TextAreaContent, '<FIGMA_TEXT_AREA_TRAILING_CONTENT_MEDIUM>', {
  props: {
    children: figma.slot('Slot'),
  },
  variant: {
    Type: 'Slot',
  },
  example: ({ children }) => (
    <TextAreaContent variant="custom">{children}</TextAreaContent>
  ),
});
