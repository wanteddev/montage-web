import { figma } from '@figma/code-connect';

import { SectionMessage } from '@montage-ui/core';

const sectionMessageProps = {
  children: figma.string('Heading'),
  variant: figma.enum('Variant', {
    Custom: 'custom',
    Info: 'info',
    Positive: 'positive',
    Cautionary: 'cautionary',
    Negative: 'negative',
  }),
  description: figma.boolean('Description', {
    true: figma.string('┗ Label'),
    false: undefined,
  }),
  closeButton: figma.boolean('Close Button'),
  leadingContent: figma.boolean('\u0008Leading Icon', {
    true: figma.children('Icon'),
    false: undefined,
  }),
};

// The trailing and bottom areas both contain `Text Button/Text Button` layers,
// so the connect is split by which area is shown to route the buttons to the right prop.
figma.connect(SectionMessage, '<FIGMA_SECTION_MESSAGE>', {
  props: sectionMessageProps,
  variant: {
    'Trailing Button': false,
    'Bottom Button': false,
  },
  example: ({ children, ...props }) => (
    <SectionMessage {...props}>{children}</SectionMessage>
  ),
});

figma.connect(SectionMessage, '<FIGMA_SECTION_MESSAGE>', {
  props: {
    ...sectionMessageProps,
    trailingButton: figma.children('Text Button/Text Button'),
  },
  variant: {
    'Trailing Button': true,
    'Bottom Button': false,
  },
  example: ({ children, ...props }) => (
    <SectionMessage {...props}>{children}</SectionMessage>
  ),
});

figma.connect(SectionMessage, '<FIGMA_SECTION_MESSAGE>', {
  props: {
    ...sectionMessageProps,
    bottomButton: figma.children('Text Button/Text Button'),
  },
  variant: {
    'Trailing Button': false,
    'Bottom Button': true,
  },
  example: ({ children, ...props }) => (
    <SectionMessage {...props}>{children}</SectionMessage>
  ),
});

figma.connect(SectionMessage, '<FIGMA_SECTION_MESSAGE>', {
  props: {
    ...sectionMessageProps,
    bottomButton: figma.children('Text Button/Text Button'),
  },
  variant: {
    'Trailing Button': true,
    'Bottom Button': true,
  },
  example: ({ children, ...props }) => (
    <SectionMessage {...props}>{children}</SectionMessage>
  ),
});
