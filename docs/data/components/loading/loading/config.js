/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Loading'],
    icons: [],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Circular', value: { variant: 'circular', size: '32px' } },
          {
            label: 'Wanted',
            value: { variant: 'wanted', size: '32px' },
            disabled: () => true,
          },
        ],
      },
    ],
  },
};
