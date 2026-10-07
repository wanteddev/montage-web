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
        key: 'Size',
        defaultValue: 'Xlarge',
        disabled: (value) => value['Variants'] === 'Background',
        options: [
          {
            label: 'Xlarge',
            value: { size: 'xlarge' },
            disabled: (value) => value['Variants'] !== 'Normal',
          },
          {
            label: 'Large',
            value: { size: 'large' },
            disabled: (value) => value['Variants'] !== 'Normal',
          },
          { label: 'Medium', value: { size: 'medium' } },
          { label: 'Small', value: { size: 'small' } },
        ],
      },
      {
        key: 'Interaction effect',
        options: [
          { label: 'Highlight', value: { interactionEffect: 'highlight' } },
          {
            label: 'Dim',
            value: { interactionEffect: 'dim' },
            disabled: (value) => value['Variants'] !== 'Normal',
          },
          { label: 'None', value: { interactionEffect: 'none' } },
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
