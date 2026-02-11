/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'TopNavigation',
      'TopNavigationButton',
      'Tab',
      'TabList',
      'TabListItem',
      'SegmentedControl',
      'SegmentedControlItem',
      'FlexBox',
      'Avatar',
      'SearchField',
    ],
    icons: ['IconChevronLeft', 'IconClose'],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Display', value: {} },
          { label: 'Floating', value: {} },
          { label: 'Search', value: {} },
        ],
      },
      {
        key: 'Title',
        disabled: (value) => value['Variants'] === 'Search',
        options: [
          { label: 'True', value: {} },
          { label: 'False', value: {} },
        ],
      },
      {
        key: 'Leading button area',
        defaultValue: 'Back button',
        disabled: (value) => value['Variants'] === 'Display',
        options: [
          { label: 'None', value: {} },
          { label: 'Back button', value: {} },
          { label: 'Text button', value: {} },
        ],
      },
      {
        key: 'Trailing button area',
        defaultValue: 'Icon button',
        options: [
          { label: 'None', value: {} },
          { label: 'Icon button', value: {} },
          { label: 'Text button', value: {} },
        ],
      },
      {
        key: 'Toolbar',
        disabled: (value) => value['Variants'] === 'Floating',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Extra toolbar',
        disabled: (value) =>
          value['Toolbar'] === 'False' || value['Variants'] === 'Floating',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Avatar',
        disabled: (value) => value['Variants'] !== 'Display',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
    ],
    render: (value) => {
      const variant = value['Variants'].toLowerCase();
      const avatar =
        value['Avatar'] === 'True' ? '<Avatar size="xsmall" />' : '';
      const tab =
        '<Tab defaultValue=""><TabList horizontalPadding size="medium"><TabListItem value="">Label</TabListItem><TabListItem value="1">Label</TabListItem><TabListItem value="2">Label</TabListItem></TabList></Tab>';
      const segmentedControl =
        '<FlexBox sx={{width: "100%", padding: "8px 20px"}}><SegmentedControl size="small" defaultValue=""><SegmentedControlItem value="">Label</SegmentedControlItem><SegmentedControlItem value="1">Label</SegmentedControlItem><SegmentedControlItem value="2">Label</SegmentedControlItem></SegmentedControl></FlexBox>';

      let trailingContent = '';
      let leadingContent = '';

      switch (value['Trailing button area']) {
        case 'Icon button':
          trailingContent =
            '<TopNavigationButton variant="icon"><IconClose /></TopNavigationButton>';
          break;
        case 'Text button':
          trailingContent =
            '<TopNavigationButton variant="text" color="primary">완료</TopNavigationButton>';
          break;
      }

      if (avatar) {
        trailingContent = `<>${trailingContent}${avatar}</>`;
      }

      switch (value['Leading button area']) {
        case 'Back button':
          leadingContent =
            '<TopNavigationButton variant="icon"><IconChevronLeft /></TopNavigationButton>';
          break;
        case 'Text button':
          leadingContent =
            '<TopNavigationButton variant="text" color="primary">취소</TopNavigationButton>';
          break;
      }

      let toolbar = '';

      if (value['Toolbar'] === 'True') {
        toolbar = tab;
      }

      if (value['Extra toolbar'] === 'True') {
        toolbar = `<>${tab}${segmentedControl}</>`;
      }

      let title = '';

      if (value['Title'] === 'True') {
        title = 'Title';
      }

      if (variant === 'search') {
        title =
          '<SearchField size="small" placeholder="Enter search keyword." />';
      }

      const sx =
        variant === 'floating'
          ? '{ width: "90%", height: "56px" }'
          : '{ width: "90%" }';

      return `
        <TopNavigation
          leadingContent={${leadingContent || 'null'}}
          trailingContent={${trailingContent || 'null'}}
          toolbar={${toolbar || 'null'}}
          variant="${variant}"
          sx={${sx}}
        >
          ${title}
        </TopNavigation>
      `;
    },
  },
  accessibility: [
    {
      keys: ['ArrowRight'],
      description: '다음 요소로 값을 변경합니다. (Tab 내부에서 순환)',
    },
    {
      keys: ['ArrowLeft'],
      description: '이전 요소로 값을 변경합니다. (Tab 내부에서 순환)',
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
  hierarchy: [
    {
      components: ['Tab', 'TabList', 'TabListItem'],
      render: `<Tab value=""><TabList size="large" resize="fill" sx={{ width: "81px", height: "fit-content" }}><TabListItem value="">Tab</TabListItem></TabList></Tab>`,
    },
    {
      components: ['Category', 'CategoryList', 'CategoryListItem'],
      render: `<Category value=""><CategoryList sx={{ width: "81px" }}><CategoryListItem value="">Category</CategoryListItem></CategoryList></Category>`,
    },
  ],
};
