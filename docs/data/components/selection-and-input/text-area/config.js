/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FormField',
      'TextArea',
      'TextAreaContent',
      'TextFieldButton',
      'FormControl',
      'FormMessage',
      'FormLabel',
      'ContentBadge',
      'TextButton',
      'FilterButton',
      'IconButton',
    ],
    icons: ['IconBlank'],
    variants: [
      {
        key: 'Resize',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Limited', value: {} },
          { label: 'Fixed', value: {} },
        ],
      },
      {
        key: 'Leading contents',
        defaultValue: 'Character counter',
        options: [
          { label: 'None', value: {} },
          { label: 'Character counter', value: {} },
          { label: 'Button', value: {} },
          { label: 'Icon button', value: {} },
          { label: 'Icon', value: {} },
          { label: 'Badge', value: {} },
          { label: 'Chip', value: {} },
        ],
      },
      {
        key: 'Trailing contents',
        defaultValue: 'Button',
        options: [
          { label: 'None', value: {} },
          { label: 'Character counter', value: {} },
          { label: 'Button', value: {} },
          { label: 'Icon button', value: {} },
          { label: 'Icon', value: {} },
          { label: 'Badge', value: {} },
          { label: 'Chip', value: {} },
        ],
      },
    ],
    render: (value) => {
      let leadingContent = 'null';
      let trailingContent = 'null';
      let rows = {};

      switch (value['Leading contents']) {
        case 'Character counter':
          leadingContent =
            '<TextAreaContent variant="characterCounter">2000</TextAreaContent>';
          break;
        case 'Button':
          leadingContent =
            '<TextAreaContent variant="button"><TextButton size="small" color="assistive">Button</TextButton></TextAreaContent>';
          break;
        case 'Icon button':
          leadingContent =
            '<TextAreaContent variant="icon-button"><IconButton variant="normal"><IconBlank /></IconButton></TextAreaContent>';
          break;
        case 'Icon':
          leadingContent =
            '<TextAreaContent variant="icon"><IconBlank /></TextAreaContent>';
          break;
        case 'Badge':
          leadingContent =
            '<TextAreaContent variant="badge"><ContentBadge color="neutral" size="small">Badge</ContentBadge></TextAreaContent>';
          break;
        case 'Chip':
          leadingContent =
            '<TextAreaContent variant="chip"><FilterButton size="small">Chip</FilterButton></TextAreaContent>';
          break;
        default:
          leadingContent = 'null';
      }

      switch (value['Trailing contents']) {
        case 'Character counter':
          trailingContent =
            '<TextAreaContent variant="characterCounter">2000</TextAreaContent>';
          break;
        case 'Button':
          trailingContent =
            '<TextAreaContent variant="button"><TextButton size="small" variant="primary">Button</TextButton></TextAreaContent>';
          break;
        case 'Icon button':
          trailingContent =
            '<TextAreaContent variant="icon-button"><IconButton variant="solid" size="small"><IconBlank /></IconButton></TextAreaContent>';
          break;
        case 'Icon':
          trailingContent =
            '<TextAreaContent variant="icon"><IconBlank /></TextAreaContent>';
          break;
        case 'Badge':
          trailingContent =
            '<TextAreaContent variant="badge"><ContentBadge color="neutral" size="small">Badge</ContentBadge></TextAreaContent>';
          break;
        case 'Chip':
          trailingContent =
            '<TextAreaContent variant="chip"><FilterButton size="small">Chip</FilterButton></TextAreaContent>';
          break;
        default:
          trailingContent = 'null';
      }

      switch (value['Resize']) {
        case 'Normal':
          rows = {};
          break;
        case 'Limited':
          rows = { maxRows: 3 };
          break;
        case 'Fixed':
          rows = { maxRows: 2 };
          break;
        default:
          rows = {};
      }

      return `
        <FormField sx={{ width: '75%' }}>
          <FormLabel required>Heading</FormLabel>
          <FormControl>
            <TextArea
              placeholder="Placeholder"
              leadingContent={${leadingContent}}
              trailingContent={${trailingContent}}
              width="100%"
              {...${JSON.stringify(rows)}}
            />
          </FormControl>
          <FormMessage>Description</FormMessage>
        </FormField>
      `;
    },
  },
};
