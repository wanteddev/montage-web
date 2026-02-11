/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['TextButton'],
    icons: ['IconBlank'],
    variants: [
      {
        key: 'Color',
        options: [
          { label: 'Primary', value: { color: 'primary', children: 'Button' } },
          {
            label: 'Assistive',
            value: { color: 'assistive', children: 'Button' },
          },
        ],
      },
      {
        key: 'Leading icon',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: { leadingContent: '<IconBlank />' } },
        ],
      },
      {
        key: 'Trailing icon',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: { trailingContent: '<IconBlank />' } },
        ],
      },
    ],
  },
};
