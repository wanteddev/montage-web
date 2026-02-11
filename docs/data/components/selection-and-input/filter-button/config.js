/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FilterButton',
      'Menu',
      'MenuTrigger',
      'MenuContent',
      'MenuList',
      'MenuItem',
    ],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Solid', value: {} },
          { label: 'Outlined', value: {} },
        ],
      },
      {
        key: 'Size',
        options: [
          { label: 'XSmall', value: {} },
          { label: 'Small', value: {} },
          { label: 'Medium', value: {} },
          { label: 'Large', value: {} },
        ],
      },
    ],
    render: (value) => {
      const props = {
        size: value['Size'].toLowerCase(),
        variant: value['Variants'].toLowerCase(),
      };

      return `
        <Menu>
          <MenuTrigger>
            <FilterButton {...${JSON.stringify(props)}}>Filter</FilterButton>
          </MenuTrigger>
          <MenuContent position="top-start">
            <MenuList>
              <MenuItem value="menu-item-1">Menu item 1</MenuItem>
              <MenuItem value="menu-item-2">Menu item 2</MenuItem>
              <MenuItem value="menu-item-3">Menu item 3</MenuItem>
            </MenuList>
          </MenuContent>
        </Menu>
      `;
    },
  },
  hierarchy: [
    {
      components: ['FilterButton', 'Box'],
      render: `<Box sx={{ width:'102px'}}><FilterButton expanded active size="small" variant="solid" activeLabel="1">Solid</FilterButton></Box>`,
    },
    {
      components: ['FilterButton'],
      render: `<FilterButton expanded active size="small" variant="outlined" activeLabel="1">Outlined</FilterButton>`,
    },
  ],
};
