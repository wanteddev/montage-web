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
      'CheckMark',
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
    ],
    render: (value) => {
      const tight = value['Tight'] === 'True';
      const size = value['Size'].toLowerCase();

      const gap = tight ? '6px' : '4px';

      return `
        <FormField sx={{ width: '75%' }} flexDirection="row" gap="${gap}" alignItems="center" justifyContent="center">
          <FormControl>
            <CheckMark
              defaultChecked
              size="${size}"
              tight={${tight}}
            />
          </FormControl>
          <FormLabel>Check mark</FormLabel>
        </FormField>
      `;
    },
  },
};
