/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Pagination', 'PaginationSelect', 'PaginationField'],
    icons: [],
    variants: [
      {
        key: 'Variants',
        options: [
          {
            label: 'Extended',
            value: {
              variant: 'extended',
              totalPages: 10,
              boundaryPages: 0,
              siblingPages: 6,
              sx: { width: '100%' },
            },
          },
          {
            label: 'Compact',
            value: {
              variant: 'compact',
              totalPages: 10,
              boundaryPages: 0,
              siblingPages: 6,
              sx: { width: '100%' },
            },
          },
          {
            label: 'Minimize',
            value: {
              variant: 'minimize',
              totalPages: 10,
              boundaryPages: 0,
              siblingPages: 6,
            },
          },
        ],
      },
      {
        key: 'Leading content',
        disabled: (value) => value['Variants'] !== 'Extended',
        options: [
          { label: 'None', value: {} },
          {
            label: 'Per page',
            value: { leadingContent: '<PaginationSelect />' },
          },
          {
            label: 'Move to page',
            value: { leadingContent: '<PaginationField />' },
          },
        ],
      },
      {
        key: 'Trailing content',
        disabled: (value) => value['Variants'] !== 'Extended',
        options: [
          { label: 'None', value: {} },
          {
            label: 'Per page',
            value: { trailingContent: '<PaginationSelect />' },
          },
          {
            label: 'Move to page',
            value: { trailingContent: '<PaginationField />' },
          },
        ],
      },
    ],
  },
};
