/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FallbackView',
      'FallbackViewImage',
      'FallbackViewContent',
      'FallbackViewText',
      'FallbackViewButton',
      'Box',
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
        key: 'Image',
        options: [
          { label: 'True', value: {} },
          { label: 'False', value: {} },
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
          { label: 'True', value: {} },
          { label: 'False', value: {} },
        ],
      },
    ],
    render: (value) => {
      const image = `<FallbackViewImage sx={{ padding: '16px' }}><Box sx={theme => ({ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: theme.semantic.fill.normal })} /></FallbackViewImage>`;

      return `
        <FallbackView platform="${value['Platform'].toLowerCase()}" sx={{ padding: '0px' }}>
          ${value['Image'] === 'True' ? image : ''}
          <FallbackViewContent>
            <FallbackViewText
              title={${value['Heading'] === 'True' ? '"Heading"' : 'null'}} 
              description="Description"
            />
  
            ${value['Button'] === 'True' ? '<FallbackViewButton>Button</FallbackViewButton>' : ''}
          </FallbackViewContent>
        </FallbackView>
      `;
    },
  },
};
