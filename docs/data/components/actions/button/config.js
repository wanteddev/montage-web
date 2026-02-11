/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Button'],
    icons: ['IconBlank'],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Solid', value: { variant: 'solid' } },
          { label: 'Outlined', value: { variant: 'outlined' } },
        ],
      },
      {
        key: 'Color',
        options: [
          { label: 'Primary', value: { color: 'primary' } },
          { label: 'Assistive', value: { color: 'assistive' } },
        ],
      },
      {
        key: 'Icon option',
        options: [
          { label: 'None', value: { children: 'Button' } },
          {
            label: 'Leading icon with label',
            value: { children: 'Button', leadingContent: '<IconBlank />' },
          },
          {
            label: 'Trailing icon with label',
            value: { children: 'Button', trailingContent: '<IconBlank />' },
          },
          {
            label: 'Icon only',
            value: { children: '<IconBlank />', iconOnly: true },
          },
        ],
      },
    ],
  },
  hierarchy: [
    {
      components: ['Button'],
      render: '<Button sx={{width:120}}>Primary</Button>',
    },
    {
      components: ['Button'],
      render:
        '<Button variant="outlined" color="primary" sx={{width:120}}>Primary</Button>',
    },
    {
      components: ['Button'],
      render:
        '<Button variant="solid" color="assistive" sx={{width:120}}>Assistive</Button>',
    },
    {
      components: ['Button'],
      render:
        '<Button variant="outlined" color="assistive" sx={{width:120}}>Assistive</Button>',
    },
  ],
};
