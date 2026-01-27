/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Category', 'CategoryList', 'CategoryListItem', 'IconButton'],
    icons: ['IconBlank'],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Alternative', value: {} },
        ],
      },
      {
        key: 'Size',
        defaultValue: 'Medium',
        options: [
          { label: 'Small', value: {} },
          { label: 'Medium', value: {} },
          { label: 'Large', value: {} },
          { label: 'Xlarge', value: {} },
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
        key: 'Vertical padding',
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
      const variant = value['Variants'].toLowerCase();
      const horizontalPadding = value['Horizontal padding'].toLowerCase();
      const size = value['Size'].toLowerCase();
      const verticalPadding = value['Vertical padding'].toLowerCase();
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
        case 'xlarge':
          iconButtonSize = 24;
          break;
      }

      if (value['Icon button'] === 'True') {
        iconButton = `<IconButton size={${iconButtonSize}}><IconBlank /></IconButton>`;
      }

      return `
        <Category value="0">
          <CategoryList
            variant="${variant}"
            sx={theme => ({ width: '80%', backgroundColor: theme.semantic.background.normal.normal })}
            horizontalPadding={${horizontalPadding}}
            verticalPadding={${verticalPadding}}
            iconButton={${iconButton}}
            size="${size}"
          >
            <CategoryListItem value="0">
              Active
            </CategoryListItem>
            <CategoryListItem value="1">
              Inactive
            </CategoryListItem>
            <CategoryListItem value="2">
              Inactive
            </CategoryListItem>
            <CategoryListItem value="3">
              Inactive
            </CategoryListItem>
            <CategoryListItem value="4">
              Inactive
            </CategoryListItem>
          </CategoryList>
        </Category>
      `;
    },
  },
  accessibility: [
    {
      keys: ['ArrowRight'],
      description: '다음 요소로 값을 변경합니다. (Category 내부에서 순환)',
    },
    {
      keys: ['ArrowLeft'],
      description: '이전 요소로 값을 변경합니다. (Category 내부에서 순환)',
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
      components: ['Category', 'CategoryList', 'CategoryListItem'],
      render: `<Category value=""><CategoryList sx={{ width: "76px" }}><CategoryListItem value="">Solid</CategoryListItem></CategoryList></Category>`,
    },
    {
      components: ['Category', 'CategoryList', 'CategoryListItem'],
      render: `<Category value=""><CategoryList variant="alternative" sx={{ width: "76px" }}><CategoryListItem value="">Outlined</CategoryListItem></CategoryList></Category>`,
    },
  ],
};
