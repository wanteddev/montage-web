/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FormControl',
      'TextArea',
      'TextAreaContent',
      'FormControlField',
      'FormControlMessage',
      'FormControlLabel',
      'FormControlMessageAccessory',
      'ContentBadge',
      'TextButton',
      'IconButton',
      'Button',
      'SegmentedControl',
      'SegmentedControlItem',
      'Box',
    ],
    icons: ['IconBlank'],
    variants: [
      {
        key: 'Size',
        defaultValue: 'Large',
        options: [
          { label: 'Large', value: {} },
          { label: 'Medium', value: {} },
        ],
      },
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
        options: [
          { label: 'None', value: {} },
          { label: 'Custom', value: {} },
          { label: 'Button', value: {} },
          { label: 'Content badge', value: {} },
          { label: 'Icon', value: {} },
          { label: 'Icon button', value: {} },
          { label: 'Primary icon button', value: {} },
          { label: 'Segmented control', value: {} },
        ],
      },
      {
        key: 'Trailing contents',
        defaultValue: 'Button',
        options: [
          { label: 'None', value: {} },
          { label: 'Custom', value: {} },
          { label: 'Button', value: {} },
          { label: 'Content badge', value: {} },
          { label: 'Icon', value: {} },
          { label: 'Icon button', value: {} },
          { label: 'Primary icon button', value: {} },
          { label: 'Segmented control', value: {} },
        ],
      },
      {
        key: 'Character counter',
        defaultValue: 'True',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
    ],
    render: (value) => {
      let leadingContent = 'null';
      let trailingContent = 'null';
      let rows = {};
      const hasCharacterCounter = value['Character counter'] === 'True';
      const size = value['Size'].toLowerCase();

      const custom =
        '<TextAreaContent variant="custom"><Box sx={theme => ({ width: 24, height: 24, backgroundColor: theme.semantic.surface.accent.violetOpaque, opacity: 0.08 })} /></TextAreaContent>';
      const primaryIconButton =
        '<TextAreaContent variant="primary-icon-button"><Button variant="solid" color="primary" iconOnly><IconBlank /></Button></TextAreaContent>';
      const segmentedControl =
        '<TextAreaContent variant="segmented-control"><SegmentedControl iconOnly defaultValue="1"><SegmentedControlItem value="1" aria-label="Item 1"><IconBlank /></SegmentedControlItem><SegmentedControlItem value="2" aria-label="Item 2"><IconBlank /></SegmentedControlItem></SegmentedControl></TextAreaContent>';

      switch (value['Leading contents']) {
        case 'Custom':
          leadingContent = custom;
          break;
        case 'Button':
          leadingContent =
            '<TextAreaContent variant="button"><TextButton color="assistive">Button</TextButton></TextAreaContent>';
          break;
        case 'Icon button':
          leadingContent =
            '<TextAreaContent variant="icon-button"><IconButton variant="normal"><IconBlank /></IconButton></TextAreaContent>';
          break;
        case 'Primary icon button':
          leadingContent = primaryIconButton;
          break;
        case 'Icon':
          leadingContent =
            '<TextAreaContent variant="icon"><IconBlank /></TextAreaContent>';
          break;
        case 'Content badge':
          leadingContent =
            '<TextAreaContent variant="content-badge"><ContentBadge color="neutral">Badge</ContentBadge></TextAreaContent>';
          break;
        case 'Segmented control':
          leadingContent = segmentedControl;
          break;
        default:
          leadingContent = 'null';
      }

      switch (value['Trailing contents']) {
        case 'Custom':
          trailingContent = custom;
          break;
        case 'Button':
          trailingContent =
            '<TextAreaContent variant="button"><TextButton color="primary">Button</TextButton></TextAreaContent>';
          break;
        case 'Icon button':
          trailingContent =
            '<TextAreaContent variant="icon-button"><IconButton variant="solid"><IconBlank /></IconButton></TextAreaContent>';
          break;
        case 'Primary icon button':
          trailingContent = primaryIconButton;
          break;
        case 'Icon':
          trailingContent =
            '<TextAreaContent variant="icon"><IconBlank /></TextAreaContent>';
          break;
        case 'Content badge':
          trailingContent =
            '<TextAreaContent variant="content-badge"><ContentBadge color="neutral">Badge</ContentBadge></TextAreaContent>';
          break;
        case 'Segmented control':
          trailingContent = segmentedControl;
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
        <FormControl sx={{ width: '75%' }} size="${size}">
          <FormControlLabel required>Heading</FormControlLabel>
          <FormControlField>
            <TextArea
              placeholder="Placeholder"
              leadingContent={${leadingContent}}
              trailingContent={${trailingContent}}
              width="100%"
              {...${JSON.stringify(rows)}}
            />
          </FormControlField>
          <FormControlMessage${hasCharacterCounter ? ' accessory={<FormControlMessageAccessory length={0} maxLength={2000} />}' : ''}>Description</FormControlMessage>
        </FormControl>
      `;
    },
  },
};
