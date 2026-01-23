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
    ],
    icons: ['IconBlank'],
    render: (value) => {
      const fillWidth = value['Fill width'] === 'True';
      const divider = value['Divider'] === 'True';
      const verticalPadding = value['Vertical padding'].toLowerCase();
      const verticalAlign = value['Vertical align'].toLowerCase();
      const textProps =
        value['Description'] === 'True' ? "{ caption: 'Description' }" : '{}';

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
          trailingContent =
            '<ListCellContent variant="icon"><IconBlank /></ListCellContent>';
          break;
        case 'Badge':
          trailingContent =
            '<ListCellContent variant="badge"><ContentBadge color="neutral">Badge</ContentBadge></ListCellContent>';
          break;
        case 'Checkbox':
          trailingContent =
            '<ListCellContent variant="checkbox"><CheckMark /></ListCellContent>';
          break;
        case 'Icon button':
          trailingContent =
            '<ListCellContent variant="icon-button"><IconButton><IconBlank /></IconButton></ListCellContent>';
          break;
        case 'Switch':
          trailingContent =
            '<ListCellContent variant="switch"><Switch /></ListCellContent>';
          break;
        case 'Text button':
          trailingContent =
            '<ListCellContent variant="button"><TextButton size="small" color="assistive">Text button</TextButton></ListCellContent>';
          break;
        case 'Value':
          trailingContent =
            '<ListCellContent variant="value">Value</ListCellContent>';
          break;
      }

      return `
        <List gap="0px" sx={theme => ({ width: '85%', backgroundColor: theme.semantic.background.normal.normal, borderRadius: '12px', ${fillWidth ? "padding: '8px 0px'" : "padding: '8px 20px'"} })}>
          <ListCell verticalPadding="${verticalPadding}" alignItems="${verticalAlign}" fillWidth={${fillWidth}} leadingContent={${leadingContent}} trailingContent={${trailingContent}} divider={${divider}} textProps={${textProps}}>
            Label
          </ListCell>
          <ListCell verticalPadding="${verticalPadding}" alignItems="${verticalAlign}" fillWidth={${fillWidth}} leadingContent={${leadingContent}} trailingContent={${trailingContent}} divider={${divider}} textProps={${textProps}}>
            Label
          </ListCell>
          <ListCell verticalPadding="${verticalPadding}" alignItems="${verticalAlign}" fillWidth={${fillWidth}} leadingContent={${leadingContent}} trailingContent={${trailingContent}} divider={${divider}} textProps={${textProps}}>
            Label
          </ListCell>
        </List>
      `;
    },
    variants: [
      {
        key: 'Fill width',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
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
          { label: 'Badge', value: {} },
          { label: 'Checkbox', value: {} },
          { label: 'Icon button', value: {} },
          { label: 'Switch', value: {} },
          { label: 'Text button', value: {} },
          { label: 'Value', value: {} },
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
