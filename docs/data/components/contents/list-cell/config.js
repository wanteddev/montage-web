/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'List',
      'ListCell',
      'ListCellContent',
      'Thumbnail',
      'RadioGroup',
      'RadioGroupItem',
      'Checkbox',
      'Avatar',
      'ContentBadge',
      'IconButton',
      'CheckMark',
      'TextButton',
      'Switch',
      'ToggleIcon',
      'Button',
      'ListCellLabelTrailing',
      'ListCellExtraContent',
    ],
    icons: ['IconBlank'],
    render: (value) => {
      const variant = value['Variants'].toLowerCase();
      const divider = value['Divider'] === 'True';
      const verticalPadding = value['Vertical padding'].toLowerCase();
      const verticalAlign =
        value['Vertical align'] === 'Top' ? 'flex-start' : 'center';
      const textProps =
        value['Description'] === 'True'
          ? "{ description: 'Description' }"
          : '{}';

      const chevron =
        value['Chevron'] === 'True' && value['Trailing content'] !== 'None'
          ? ' chevron'
          : '';

      let labelTrailing = null;
      switch (value['Label trailing']) {
        case 'Content badge':
          labelTrailing =
            '<ListCellLabelTrailing variant="content-badge"><ContentBadge color="neutral">Badge</ContentBadge></ListCellLabelTrailing>';
          break;
        case 'Verified check':
          labelTrailing = '<ListCellLabelTrailing variant="verified-check" />';
          break;
      }

      let extraContent = null;
      switch (value['Extra content']) {
        case 'Text':
          extraContent =
            '<ListCellExtraContent variant="text">Extra text</ListCellExtraContent>';
          break;
        case 'Content badge':
          extraContent =
            '<ListCellExtraContent variant="content-badge"><ContentBadge color="neutral">Badge</ContentBadge></ListCellExtraContent>';
          break;
      }

      let leadingContent = null;

      switch (value['Leading content']) {
        case 'Icon':
          leadingContent =
            '<ListCellContent variant="icon"><IconBlank /></ListCellContent>';
          break;
        case 'Avatar':
          leadingContent =
            '<ListCellContent variant="avatar"><Avatar variant="person" size="medium" /></ListCellContent>';
          break;
        case 'Checkbox':
          leadingContent =
            '<ListCellContent variant="checkbox"><Checkbox /></ListCellContent>';
          break;
        case 'Large icon':
          leadingContent =
            '<ListCellContent variant="large-icon"><IconBlank /></ListCellContent>';
          break;
        case 'Radio':
          leadingContent =
            '<ListCellContent variant="radio"><RadioGroup><RadioGroupItem value="" /></RadioGroup></ListCellContent>';
          break;
        case 'Thumbnail':
          leadingContent =
            '<ListCellContent variant="thumbnail"><Thumbnail border radius ratio="1:1" width="56px" /></ListCellContent>';
          break;
      }

      let trailingContent = null;
      switch (value['Trailing content']) {
        case 'Icon':
          trailingContent = `<ListCellContent variant="icon"${chevron}><IconBlank /></ListCellContent>`;
          break;
        case 'Content badge':
          trailingContent = `<ListCellContent variant="content-badge"${chevron}><ContentBadge color="neutral" size="small">Badge</ContentBadge></ListCellContent>`;
          break;
        case 'Checkbox':
          trailingContent = `<ListCellContent variant="checkbox"${chevron}><CheckMark /></ListCellContent>`;
          break;
        case 'Icon button':
          trailingContent = `<ListCellContent variant="icon-button"${chevron}><IconButton><IconBlank /></IconButton></ListCellContent>`;
          break;
        case 'Switch':
          trailingContent = `<ListCellContent variant="switch"${chevron}><Switch /></ListCellContent>`;
          break;
        case 'Text button':
          trailingContent = `<ListCellContent variant="text-button"${chevron}><TextButton size="small" color="assistive">Text button</TextButton></ListCellContent>`;
          break;
        case 'Toggle icon':
          trailingContent = `<ListCellContent variant="toggle-icon"${chevron}><ToggleIcon size={20}><IconBlank /></ToggleIcon></ListCellContent>`;
          break;
        case 'Button':
          trailingContent = `<ListCellContent variant="button"${chevron}><Button variant="solid" color="assistive">Button</Button></ListCellContent>`;
          break;
        case 'Value':
          trailingContent = `<ListCellContent variant="value"${chevron}>Value</ListCellContent>`;
          break;
      }

      return `
        <List gap="0px" sx={theme => ({ width: '85%', backgroundColor: theme.semantic.background.neutral.primary, borderRadius: '12px', ${variant === 'full' ? "padding: '8px 0px'" : "padding: '8px 20px'"} })}>
          <ListCell verticalPadding="${verticalPadding}" alignItems="${verticalAlign}" variant="${variant}" leadingContent={${leadingContent}} trailingContent={${trailingContent}} labelTrailing={${labelTrailing}} extraContent={${extraContent}} divider={${divider}} textProps={${textProps}}>
            Label
          </ListCell>
          <ListCell verticalPadding="${verticalPadding}" alignItems="${verticalAlign}" variant="${variant}" leadingContent={${leadingContent}} trailingContent={${trailingContent}} labelTrailing={${labelTrailing}} extraContent={${extraContent}} divider={${divider}} textProps={${textProps}}>
            Label
          </ListCell>
          <ListCell verticalPadding="${verticalPadding}" alignItems="${verticalAlign}" variant="${variant}" leadingContent={${leadingContent}} trailingContent={${trailingContent}} labelTrailing={${labelTrailing}} extraContent={${extraContent}} divider={${divider}} textProps={${textProps}}>
            Label
          </ListCell>
        </List>
      `;
    },
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Inset', value: {} },
          { label: 'Full', value: {} },
        ],
      },
      {
        key: 'Vertical padding',
        defaultValue: 'Medium',
        options: [
          { label: 'None', value: {} },
          { label: 'Small', value: {} },
          { label: 'Medium', value: {} },
          { label: 'Large', value: {} },
        ],
      },
      {
        key: 'Vertical align',
        options: [
          { label: 'Top', value: {} },
          { label: 'Center', value: {} },
        ],
      },
      {
        key: 'Description',
        defaultValue: 'True',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Label trailing',
        options: [
          { label: 'None', value: {} },
          { label: 'Content badge', value: {} },
          { label: 'Verified check', value: {} },
        ],
      },
      {
        key: 'Extra content',
        options: [
          { label: 'None', value: {} },
          { label: 'Text', value: {} },
          { label: 'Content badge', value: {} },
        ],
      },
      {
        key: 'Leading content',
        defaultValue: 'Icon',
        options: [
          { label: 'None', value: {} },
          { label: 'Icon', value: {} },
          { label: 'Avatar', value: {} },
          { label: 'Checkbox', value: {} },
          { label: 'Large icon', value: {} },
          { label: 'Radio', value: {} },
          { label: 'Thumbnail', value: {} },
        ],
      },
      {
        key: 'Trailing content',
        defaultValue: 'Value',
        options: [
          { label: 'None', value: {} },
          { label: 'Icon', value: {} },
          { label: 'Content badge', value: {} },
          { label: 'Checkbox', value: {} },
          { label: 'Icon button', value: {} },
          { label: 'Switch', value: {} },
          { label: 'Text button', value: {} },
          { label: 'Toggle icon', value: {} },
          { label: 'Button', value: {} },
          { label: 'Value', value: {} },
        ],
      },
      {
        key: 'Chevron',
        disabled: (value) => value['Trailing content'] === 'None',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Divider',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
    ],
  },
};
