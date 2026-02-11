/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Chip'],
    icons: ['IconBlank'],
    variants: [
      {
        key: 'Variants',
        options: [
          {
            label: 'Solid',
            value: { variant: 'solid', size: 'xsmall', children: 'Chip' },
          },
          {
            label: 'Outlined',
            value: { variant: 'outlined', size: 'xsmall', children: 'Chip' },
          },
        ],
      },
      {
        key: 'Leading content option',
        options: [
          { label: 'None', value: { trailingContent: null } },
          { label: 'Icon', value: { leadingContent: '<IconBlank />' } },
          {
            label: 'Image',
            value: {
              leadingContent:
                '<img style={{ width: 14, height: 14 }} src="/components/actions/chip/design/React.png" />',
            },
          },
        ],
      },
      {
        key: 'Trailing content option',
        options: [
          { label: 'None', value: { trailingContent: null } },
          { label: 'Icon', value: { trailingContent: '<IconBlank />' } },
          {
            label: 'Image',
            value: {
              trailingContent:
                '<img style={{ width: 14, height: 14 }} src="/components/actions/chip/design/React.png" />',
            },
          },
        ],
      },
    ],
  },
  hierarchy: [
    {
      components: ['Chip'],
      render: '<Chip size="xsmall" active>Chip</Chip>',
    },
    {
      components: ['Chip'],
      render: '<Chip size="xsmall" variant="outlined" active>Chip</Chip>',
    },
  ],
};
