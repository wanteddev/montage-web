/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Tab', 'TabList', 'TabListItem', 'IconButton'],
    icons: ['IconBlank'],
    variants: [
      {
        key: 'Resize',
        options: [
          { label: 'Hug', value: {} },
          { label: 'Fill', value: {} },
        ],
      },
      {
        key: 'Size',
        defaultValue: 'Large',
        options: [
          { label: 'Small', value: {} },
          { label: 'Medium', value: {} },
          { label: 'Large', value: {} },
        ],
      },
      {
        key: 'Horizontal padding',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Icon button',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
    ],
    render: (value) => {
      const resize = value['Resize'].toLowerCase();
      const horizontalPadding = value['Horizontal padding'].toLowerCase();
      const size = value['Size'].toLowerCase();
      let iconButton = 'null';

      let iconButtonSize;

      switch (size) {
        case 'small':
          iconButtonSize = 20;
          break;
        case 'medium':
          iconButtonSize = 22;
          break;
        case 'large':
          iconButtonSize = 24;
          break;
      }

      if (value['Icon button'] === 'True') {
        iconButton = `<IconButton size={${iconButtonSize}}><IconBlank /></IconButton>`;
      }

      return `
        <Tab value="0">
          <TabList
            resize="${resize}"
            sx={{ width: '80%', maxWidth: '300px' }}
            horizontalPadding={${horizontalPadding}}
            iconButton={${iconButton}}
            size="${size}"
          >
            <TabListItem value="0">
              Active
            </TabListItem>
            <TabListItem value="1">
              Inactive
            </TabListItem>
            <TabListItem value="2">
              Inactive
            </TabListItem>
            ${resize === 'hug' ? '<TabListItem value="3">Inactive</TabListItem>' : ''}
          </TabList>
        </Tab>
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
