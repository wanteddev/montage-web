/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'Menu',
      'MenuTrigger',
      'MenuContent',
      'MenuList',
      'MenuItem',
      'Box',
      'MenuActionArea',
      'MenuActionAreaContent',
      'Button',
      'TextButton',
    ],
    icons: [],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Radio', value: {} },
          { label: 'Checkbox', value: {} },
        ],
      },
      {
        key: 'Action area',
        defaultValue: 'True',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Cell padding',
        options: [
          { label: 'Medium', value: {} },
          { label: 'Large', value: {} },
        ],
      },
    ],
    render: (value) => {
      const variant = value['Variants'].toLowerCase();
      const cellPadding = value['Cell padding'].toLowerCase();
      let actionArea = '';

      if (value['Action area'] === 'True') {
        actionArea = `
          <MenuActionArea
            leadingContent={
              <MenuActionAreaContent variant="text-button">
                <TextButton
                  color="assistive"
                  size="small"
                >
                  Alternative action
                </TextButton>
              </MenuActionAreaContent>
            }
            trailingContent={
              <MenuActionAreaContent variant="button">
                <Button size="small">
                  Button
                </Button>
              </MenuActionAreaContent>
            }
          />
        `;
      }

      return `
        <Menu
          open
          defaultValue={${variant === 'checkbox' ? '["item3"]' : '"item3"'}}
        >
          <MenuTrigger>
            <Box sx={{ width: 0 }} />
          </MenuTrigger>
          <MenuContent
            disablePortal
            disableFocusScope
            disableOutsidePointerEvents={false}
            wrapperProps={{
              sx: {
                position: 'relative !important',
                zIndex: '1 !important',
                transform: 'none !important',
              },
            }}
          >
            <MenuList>
              ${new Array(10)
                .fill(null)
                .map(
                  (_, index) => `
                <MenuItem verticalPadding="${cellPadding}" variant="${variant}" value="item${index + 1}" key="item${index + 1}">
                  List item
                </MenuItem>
              `,
                )
                .join('')}
            </MenuList>
  
            ${actionArea}
          </MenuContent>
        </Menu>
      `;
    },
  },
};
