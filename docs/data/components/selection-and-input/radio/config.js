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
      'RadioGroup',
      'RadioGroupItem',
    ],
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

      const gap = tight ? '10px' : '8px';

      return `
        <RadioGroup name="radio">
          <FormControl flexDirection="row" gap="${gap}" alignItems="center">
            <FormControlField>
              <RadioGroupItem
                value="radio"
                size="${size}"
                tight={${tight}}
              />
            </FormControlField>
            <FormControlLabel>Radio</FormControlLabel>
          </FormControl>
        </RadioGroup>
      `;
    },
  },
};
