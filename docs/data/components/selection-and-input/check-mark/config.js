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
        <FormControl sx={{ width: '75%' }} flexDirection="row" gap="${gap}" alignItems="center" justifyContent="center">
          <FormControlField>
            <CheckMark
              defaultChecked
              size="${size}"
              tight={${tight}}
            />
          </FormControlField>
          <FormControlLabel>Check mark</FormControlLabel>
        </FormControl>
      `;
    },
  },
};
