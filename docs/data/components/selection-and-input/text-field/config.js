/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FormField',
      'FlexBox',
      'TextField',
      'TextFieldContent',
      'TextFieldButton',
      'FormControl',
      'FormMessage',
      'FormLabel',
      'ContentBadge',
      'Box',
    ],
    icons: ['IconBlank'],
    variants: [
      {
        key: 'Leading icon',
        options: [
          { label: 'None', value: {} },
          { label: 'Icon', value: {} },
        ],
      },
      {
        key: 'Trailing button',
        options: [
          { label: 'None', value: {} },
          { label: 'Button', value: {} },
        ],
      },
      {
        key: 'Trailing contents',
        options: [
          { label: 'None', value: {} },
          { label: 'Custom', value: {} },
          { label: 'Badge', value: {} },
          { label: 'Text', value: {} },
          { label: 'Icon', value: {} },
          { label: 'Timer', value: {} },
        ],
      },
    ],
    render: (value) => {
      const hasButton = value['Trailing button'] === 'Button';

      const leadingContent =
        value['Leading icon'] === 'Icon'
          ? '<TextFieldContent variant="icon"><IconBlank /></TextFieldContent>'
          : 'null';

      let trailingContent = 'null';

      switch (value['Trailing contents']) {
        case 'Icon':
          trailingContent =
            '<TextFieldContent variant="icon"><IconBlank /></TextFieldContent>';
          break;
        case 'Custom':
          trailingContent =
            '<TextFieldContent variant="custom"><Box sx={theme => ({ width: 24, height: 24, backgroundColor: theme.semantic.accent.background.violet, opacity: 0.08 })} /></TextFieldContent>';
          break;
        case 'Badge':
          trailingContent =
            '<TextFieldContent variant="badge" sx={{padding: "2px 0px"}}><ContentBadge color="neutral">Badge</ContentBadge></TextFieldContent>';
          break;
        case 'Text':
          trailingContent =
            '<TextFieldContent variant="text">원</TextFieldContent>';
          break;
        case 'Timer':
          trailingContent =
            '<TextFieldContent variant="timer">4:59</TextFieldContent>';
          break;
        default:
          trailingContent = 'null';
      }

      return `
      <FormField sx={{ width: '75%' }}>
        <FormLabel required>Heading</FormLabel>
        <FormControl>
          <TextField
            placeholder="Placeholder"
            leadingContent={${leadingContent}}
            trailingContent={${trailingContent}}
            width="100%"
            ${hasButton ? 'trailingButton={<TextFieldButton>Button</TextFieldButton>}' : ''}
          />
        </FormControl>
        <FormMessage>Description</FormMessage>
      </FormField>
    `;
    },
  },
};
