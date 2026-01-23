/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'SectionHeader',
      'IconButton',
      'FilterButton',
      'TextButton',
      'SectionHeaderNavigation',
      'SectionHeaderNavigationButton',
    ],
    icons: ['IconBlank', 'IconChevronLeftSmall', 'IconChevronRightSmall'],
    variants: [
      {
        key: 'Platform',
        options: [
          {
            label: 'Mobile',
            value: {
              platform: 'mobile',
              sx: { width: '75%' },
              children: 'Heading',
            },
          },
          {
            label: 'Desktop',
            value: {
              platform: 'desktop',
              sx: { width: '75%' },
              children: 'Heading',
            },
          },
        ],
      },
      {
        key: 'Heading content',
        defaultValue: 'Filter button',
        options: [
          { label: 'None', value: {} },
          {
            label: 'Filter button',
            value: {
              headingContent:
                '<FilterButton size="small" variant="outlined">Filter</FilterButton>',
            },
          },
          {
            label: 'Icon button',
            value: {
              headingContent:
                '<IconButton size={24}><IconBlank /></IconButton>',
            },
          },
        ],
      },
      {
        key: 'Trailing content',
        defaultValue: 'Text button',
        options: [
          { label: 'None', value: {} },
          {
            label: 'Text button',
            value: {
              trailingContent:
                '<TextButton size="small" color="assistive">Text</TextButton>',
            },
          },
          {
            label: 'Pagination',
            value: {
              trailingContent:
                '<SectionHeaderNavigation><SectionHeaderNavigationButton><IconChevronLeftSmall /></SectionHeaderNavigationButton><SectionHeaderNavigationButton><IconChevronRightSmall /></SectionHeaderNavigationButton></SectionHeaderNavigation>',
            },
          },
          {
            label: 'Icon button',
            value: {
              trailingContent:
                '<IconButton size={24}><IconBlank /></IconButton>',
            },
          },
        ],
      },
    ],
  },
};
