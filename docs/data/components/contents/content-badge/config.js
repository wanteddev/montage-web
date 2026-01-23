/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['ContentBadge'],
    icons: ['IconBlank'],
    variants: [
      {
        key: 'Variants',
        options: [
          {
            label: 'Solid',
            value: { variant: 'solid', children: 'Label', size: 'medium' },
          },
          {
            label: 'Outlined',
            value: { variant: 'outlined', children: 'Label', size: 'medium' },
          },
        ],
      },
      {
        key: 'Color',
        options: [
          { label: 'Neutral', value: { color: 'neutral' } },
          { label: 'Accent', value: { color: 'accent' } },
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
  hierarchy: [
    {
      components: ['ContentBadge'],
      render: `<ContentBadge sx={{ flexShrink: 0 }} variant="solid" color="accent" size="medium">Badge</ContentBadge>`,
    },
    {
      components: ['ContentBadge'],
      render: `<ContentBadge sx={{ flexShrink: 0 }} variant="outlined" color="accent" size="medium">Badge</ContentBadge>`,
    },
    {
      components: ['ContentBadge'],
      render: `<ContentBadge sx={{ flexShrink: 0 }} variant="solid" color="neutral" size="medium">Badge</ContentBadge>`,
    },
    {
      components: ['ContentBadge'],
      render: `<ContentBadge sx={{ flexShrink: 0 }} variant="outlined" color="neutral" size="medium">Badge</ContentBadge>`,
    },
  ],
};
