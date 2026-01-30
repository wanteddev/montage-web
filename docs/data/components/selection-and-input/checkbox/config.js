/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FormField',
      'FlexBox',
      'FormControl',
      'FormLabel',
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
        <FormField sx={{ width: '75%' }} flexDirection="row" gap="${gap}" alignItems="center" justifyContent="center">
          <FormControl>
            <Checkbox
              size="${size}"
              bold={${bold}}
              tight={${tight}}
            />
          </FormControl>
          <FormLabel>Checkbox</FormLabel>
        </FormField>
      `;
    },
  },
  hierarchy: [
    {
      components: ['FormField', 'FormControl', 'FormLabel', 'Checkbox'],
      render: `<FormField flexDirection="row" gap="8px" sx={{ width:'88px' }}><FormControl><Checkbox defaultChecked /></FormControl><FormLabel sx={{ padding: "1px 0px" }}>Medium</FormLabel></FormField>`,
    },
    {
      components: ['FormField', 'FormControl', 'FormLabel', 'Checkbox'],
      render: `<FormField flexDirection="row" gap="8px" sx={{ width:'88px' }}><FormControl><Checkbox size="small" defaultChecked /></FormControl><FormLabel>Small</FormLabel></FormField>`,
    },
  ],
};
