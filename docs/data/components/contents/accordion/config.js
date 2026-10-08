/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'Accordion',
      'AccordionSummary',
      'AccordionDetails',
      'AccordionDescription',
    ],
    icons: [],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Inset', value: {} },
          { label: 'Full', value: {} },
        ],
      },
      {
        key: 'Vertical padding',
        defaultValue: 'Large',
        options: [
          { label: 'Small', value: {} },
          { label: 'Medium', value: {} },
          { label: 'Large', value: {} },
        ],
      },
    ],
    render: (value) => {
      const variant = value['Variants'].toLowerCase();
      const verticalPadding = value['Vertical padding'];

      return `
        <Accordion sx={{ width: '80%' }}>
          <AccordionSummary variant="${variant}" verticalPadding="${verticalPadding.toLowerCase()}">
            Heading
          </AccordionSummary>
          <AccordionDetails>
            <AccordionDescription>
              We are building a world where everyone can work and grow authentically.
            </AccordionDescription>
          </AccordionDetails>
        </Accordion>
      `;
    },
  },
};
