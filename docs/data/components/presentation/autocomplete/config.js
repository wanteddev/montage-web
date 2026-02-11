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
      'MenuGroup',
      'Box',
      'MenuItemContent',
      'Avatar',
      'Thumbnail',
      'Typography',
    ],
    icons: ['IconSearch', 'IconArrowTurnDownLeft'],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Search', value: {} },
          { label: 'Avatar', value: {} },
          { label: 'Checkbox', value: {} },
          { label: 'Thumbnail', value: {} },
        ],
      },
      {
        key: 'Direct input',
        defaultValue: 'Top',
        options: [
          { label: 'None', value: {} },
          { label: 'Top', value: {} },
          { label: 'Bottom', value: {} },
        ],
      },
    ],
    render: (value) => {
      const variant =
        value['Variants'].toLowerCase() === 'checkbox' ? 'checkbox' : 'normal';

      const trailingContent =
        variant === 'checkbox'
          ? 'null'
          : `
      <MenuItemContent variant="icon" data-role="autocomplete-option-trailing-content">
        <IconArrowTurnDownLeft sx={theme => ({ color: theme.semantic.label.normal })} />
      </MenuItemContent>
    `;

      const directInput = `
      <MenuItem
        value="Typing"
        trailingContent={${trailingContent}}
        sx={theme => ({
          ['[data-role="autocomplete-option-trailing-content"]']: {
            display: 'none',
          },
          ['&[aria-checked="true"] [data-role="autocomplete-option-trailing-content"]']: {
            display: 'flex',
          },
          ['[data-role="list-text-content"]']: {
            color: theme.semantic.label.normal,
            fontWeight: 400,
          },
        })}
      >
        Apply to <Typography variant="body1" weight="bold">‘Typing’</Typography>
      </MenuItem>
    `;

      let leadingContent = 'null';

      switch (value['Variants']) {
        case 'Search':
          leadingContent = `
          <MenuItemContent variant="icon">
            <IconSearch sx={theme => ({ color: theme.semantic.label.assistive })} />
          </MenuItemContent>
        `;
          break;
        case 'Avatar':
          leadingContent = `
          <MenuItemContent variant="avatar">
            <Avatar variant="company" size="medium" />
          </MenuItemContent>
        `;
          break;
        case 'Thumbnail':
          leadingContent = `
          <MenuItemContent variant="thumbnail">
            <Thumbnail radius sx={{ height: '56px', width: '56px' }} />
          </MenuItemContent>
        `;
          break;
      }

      return `
      <Menu
        open
        defaultValue={${variant === 'checkbox' ? '[]' : '""'}}
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
            ${value['Direct input'] === 'Top' ? directInput : ''}
            <MenuGroup title="Heading">
              ${new Array(3)
                .fill(null)
                .map(
                  (_, index) => `
                <MenuItem
                  alignItems="center"
                  variant="${variant}"
                  value="item${index + 1}"
                  key="item${index + 1}"
                  sx={theme => ({
                    ['[data-role="autocomplete-option-trailing-content"]']: {
                      display: 'none',
                    },
                    ['&[aria-checked="true"] [data-role="autocomplete-option-trailing-content"]']: {
                      display: 'flex',
                    },
                    ['[data-role="list-text-content"]']: {
                      color: theme.semantic.label.alternative,
                      fontWeight: 400,
                    },
                  })}
                  trailingContent={${trailingContent}}
                  ${variant !== 'checkbox' ? `leadingContent={${leadingContent}}` : ''}
                >
                  <Typography color="semantic.label.normal" variant="body1" weight="bold">Typing</Typography> Auto complete
                </MenuItem>
              `,
                )
                .join('')}
            </MenuGroup>
            ${value['Direct input'] === 'Bottom' ? directInput : ''}
          </MenuList>
        </MenuContent>
      </Menu>
    `;
    },
  },
};
