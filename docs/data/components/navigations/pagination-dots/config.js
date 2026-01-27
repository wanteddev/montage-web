/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['FlexBox', 'Thumbnail', 'PaginationDots'],
    internals: ['Carousel'],
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
    render: (value) => {
      const color = value['Variants'].toLowerCase();
      const size = value['Size'].toLowerCase();

      return `
      <FlexBox sx={{ width: '55%' }}>
        <Carousel
          paginationDots={{ color: "${color}", size: "${size}" }}
          sources={[
            '/components/navigations/pagination-dots/design/Variants.png',
            '/components/navigations/pagination-dots/design/Variants-1.png',
            '/components/navigations/pagination-dots/design/Variants-2.png',
            '/components/navigations/pagination-dots/design/Variants-3.png',
            '/components/navigations/pagination-dots/design/Variants-4.png',
            '/components/navigations/pagination-dots/design/Variants-5.png',
            '/components/navigations/pagination-dots/design/Variants-6.png',
          ]}
        />
      </FlexBox>
    `;
    },
  },
  accessibility: [
    {
      keys: ['ArrowRight'],
      description: '다음 요소로 값을 변경합니다. (Dots 내부에서 순환)',
    },
    {
      keys: ['ArrowLeft'],
      description: '이전 요소로 값을 변경합니다. (Dots 내부에서 순환)',
    },
    {
      keys: ['Home', 'PageUp'],
      description: '첫 번째 요소로 포커스를 이동합니다.',
    },
    {
      keys: ['End', 'PageDown'],
      description: '마지막 요소로 포커스를 이동합니다.',
    },
    {
      keys: ['Enter'],
      description: '현재 포커스된 요소를 클릭합니다.',
    },
  ],
};
