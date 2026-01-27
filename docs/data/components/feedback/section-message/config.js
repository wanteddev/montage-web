/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['SectionMessage', 'TextButton'],
    icons: ['IconBlank'],
    variants: [
      {
        key: 'Variants',
        options: [
          {
            label: 'Custom',
            value: { variant: 'custom', leadingContent: '<IconBlank />' },
          },
          { label: 'Info', value: { variant: 'info' } },
          { label: 'Positive', value: { variant: 'positive' } },
          { label: 'Cautionary', value: { variant: 'cautionary' } },
          { label: 'Negative', value: { variant: 'negative' } },
        ],
      },
      {
        key: 'Description',
        options: [
          {
            label: 'False',
            value: { children: 'Heading', sx: { width: '90%' }, open: true },
          },
          {
            label: 'True',
            value: {
              description: 'Description',
              children: 'Heading',
              sx: { width: '90%' },
              open: true,
            },
          },
        ],
      },
      {
        key: 'Close button',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: { closeButton: true } },
        ],
      },
      {
        key: 'Action',
        options: [
          { label: 'None', value: {} },
          {
            label: 'Trailing button',
            value: {
              trailingButton: '<TextButton size="small">Button</TextButton>',
            },
          },
          {
            label: 'Bottom button',
            value: {
              bottomButton: '<TextButton size="small">Button</TextButton>',
            },
          },
        ],
      },
    ],
  },
};
