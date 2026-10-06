import { figma } from '@figma/code-connect';

import { SectionHeader } from '@montage-ui/core';

figma.connect(SectionHeader, '<FIGMA_SECTION_HEADER>', {
  props: {
    children: figma.string('Heading'),
    headingContent: figma.enum('Show Heading Content', {
      True: figma.slot('Heading Content'),
      False: undefined,
    }),
    trailingContent: figma.boolean('Show Trailing Content', {
      true: figma.slot('Trailing Content'),
      false: undefined,
    }),
    platform: figma.enum('Platform', {
      Desktop: 'desktop',
      Mobile: 'mobile',
    }),
    size: figma.enum('Size', {
      XSmall: 'xsmall',
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: ({ children, ...props }) => (
    <SectionHeader {...props}>{children}</SectionHeader>
  ),
});
