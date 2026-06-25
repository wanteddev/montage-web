/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FormControl',
      'FlexBox',
      'FormControlField',
      'FormControlLabel',
      'Checkbox',
    ],
    icons: [],
    variants: [
      {
        key: 'Size',
        defaultValue: 'Medium',
        options: [
          { label: 'Small', value: {} },
          { label: 'Medium', value: {} },
        ],
      },
      {
        key: 'Tight',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Bold',
        defaultValue: 'False',
        options: [
          { label: 'True', value: {} },
          { label: 'False', value: {} },
        ],
      },
    ],
    render: (value) => {
      const tight = value['Tight'] === 'True';
      const size = value['Size'].toLowerCase();
      const bold = value['Bold'] === 'True';

      const gap = tight ? '10px' : '8px';

      return `
        <FormControl sx={{ width: '75%' }} flexDirection="row" gap="${gap}" alignItems="center" justifyContent="center">
          <FormControlField>
            <Checkbox
              size="${size}"
              bold={${bold}}
              tight={${tight}}
            />
          </FormControlField>
          <FormControlLabel>Checkbox</FormControlLabel>
        </FormControl>
      `;
    },
  },
  hierarchy: [
    {
      components: [
        'FormControl',
        'FormControlField',
        'FormControlLabel',
        'Checkbox',
      ],
      render: `<FormControl flexDirection="row" gap="8px" sx={{ width:'88px' }}><FormControlField><Checkbox defaultChecked /></FormControlField><FormControlLabel sx={{ padding: "1px 0px" }}>Medium</FormControlLabel></FormControl>`,
    },
    {
      components: [
        'FormControl',
        'FormControlField',
        'FormControlLabel',
        'Checkbox',
      ],
      render: `<FormControl flexDirection="row" gap="8px" sx={{ width:'88px' }}><FormControlField><Checkbox size="small" defaultChecked /></FormControlField><FormControlLabel>Small</FormControlLabel></FormControl>`,
    },
  ],
};
