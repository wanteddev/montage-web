/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Skeleton', 'FlexBox'],
    icons: [],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Text', value: {} },
          { label: 'Rectangle', value: {} },
          { label: 'Circle', value: {} },
        ],
      },
    ],
    render: (value) => {
      switch (value['Variants']) {
        case 'Rectangle':
          return '<Skeleton variant="rectangle" width="64px" height="64px" />';
        case 'Circle':
          return '<Skeleton variant="circle" width="64px" height="64px" />';
        case 'Text':
        default:
          return '<FlexBox flexDirection="column" sx={{ width: "120px" }}><Skeleton variant="text" width="100%" align="center" /><Skeleton variant="text" width="79px" /></FlexBox>';
      }
    },
  },
};
