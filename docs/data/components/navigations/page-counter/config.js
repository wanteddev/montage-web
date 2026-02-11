/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Thumbnail', 'PageCounter'],
    icons: [],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Alternative', value: {} },
        ],
      },
      {
        key: 'Size',
        options: [
          { label: 'Small', value: {} },
          { label: 'Medium', value: {} },
        ],
      },
    ],
    render: (value) => {
      const alternative = (value['Variants'] === 'Alternative').toString();
      const size = value['Size'].toLowerCase();

      return `
      <Thumbnail
        src="/components/navigations/page-counter/design/Variants.png"
        ratio="1:1"
        width="55%"
        radius
        overlay={<PageCounter totalPages={5} currentPage={1} alternative={${alternative}} size="${size}" />}
        sx={{
          ['[data-role="thumbnail-overlay"]']: {
            transform: 'none',
            left: 'unset',
            right: '20px',
            top: '20px',
          }
        }}
      />
    `;
    },
  },
};
