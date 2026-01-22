/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['IconButton'],
    icons: ['IconHistory'],
    variants: [
      {
        key: 'Variants',
        options: [
          {
            label: 'Normal',
            value: { variant: 'normal', children: '<IconHistory />' },
          },
          {
            label: 'Solid',
            value: { variant: 'solid', children: '<IconHistory />' },
          },
          {
            label: 'Outlined',
            value: { variant: 'outlined', children: '<IconHistory />' },
          },
          {
            label: 'Background',
            value: { variant: 'background', children: '<IconHistory />' },
          },
        ],
      },
      {
        key: 'Alternative',
        disabled: (value) => value['Variants'] !== 'Background',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: { alternative: true } },
        ],
      },
    ],
  },
};
