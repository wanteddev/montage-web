/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FallbackView',
      'FallbackViewContent',
      'FallbackViewText',
      'FallbackViewActionArea',
      'FallbackViewActionAreaButton',
    ],
    icons: [],
    variants: [
      {
        key: 'Platform',
        options: [
          { label: 'Desktop', value: {} },
          { label: 'Mobile', value: {} },
        ],
      },
      {
        key: 'Heading',
        options: [
          { label: 'True', value: {} },
          { label: 'False', value: {} },
        ],
      },
      {
        key: 'Button',
        options: [
          { label: 'Single', value: {} },
          { label: 'Horizontal', value: {} },
          { label: 'Vertical', value: {} },
          { label: 'False', value: {} },
        ],
      },
    ],
    render: (value) => {
      const button =
        '<FallbackViewActionAreaButton>Button</FallbackViewActionAreaButton>';
      const actionArea =
        value['Button'] === 'False'
          ? ''
          : `<FallbackViewActionArea variant="${value['Button'].toLowerCase()}">${value['Button'] === 'Single' ? button : `${button}${button}`}</FallbackViewActionArea>`;

      return `
        <FallbackView platform="${value['Platform'].toLowerCase()}" sx={{ padding: '0px' }}>
          <FallbackViewContent>
            <FallbackViewText
              title={${value['Heading'] === 'True' ? '"Heading"' : 'null'}}
              description="Description"
            />

            ${actionArea}
          </FallbackViewContent>
        </FallbackView>
      `;
    },
  },
};
