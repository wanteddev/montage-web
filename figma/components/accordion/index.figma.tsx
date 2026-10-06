import { figma } from '@figma/code-connect';

import {
  Accordion,
  AccordionContent,
  AccordionDescription,
  AccordionDetails,
  AccordionSummary,
} from '@montage-ui/core';

figma.connect(Accordion, '<FIGMA_ACCORDION>', {
  props: {
    heading: figma.string('Heading'),
    description: figma.boolean('Description', {
      true: figma.string('┗ Text'),
      false: undefined,
    }),
    content: figma.boolean('Show Content', {
      true: figma.slot('Content'),
      false: undefined,
    }),
    divider: figma.boolean('Divider'),
    defaultExpanded: figma.boolean('Expand'),
    verticalPadding: figma.enum('Vertical Padding', {
      Small: 'small',
      Medium: 'medium',
      Large: 'large',
    }),
  },
  example: ({ heading, description, content, verticalPadding, ...props }) => (
    <Accordion {...props}>
      <AccordionSummary verticalPadding={verticalPadding}>
        {heading}
      </AccordionSummary>
      <AccordionDetails>
        <AccordionDescription>{description}</AccordionDescription>
        <AccordionContent>{content}</AccordionContent>
      </AccordionDetails>
    </Accordion>
  ),
});
