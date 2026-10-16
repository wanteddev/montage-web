/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['SearchField'],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Solid', value: { variant: 'solid' } },
          { label: 'Outlined', value: { variant: 'outlined' } },
        ],
      },
    ],
  },
};
