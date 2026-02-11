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
        key: 'Fill width',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
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
      const fillWidth = value['Fill width'] === 'True';
      const verticalPadding = value['Vertical padding'];

      return `
        <Accordion sx={{ width: '80%' }}>
          <AccordionSummary fillWidth={${fillWidth}} verticalPadding="${verticalPadding.toLowerCase()}">
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
