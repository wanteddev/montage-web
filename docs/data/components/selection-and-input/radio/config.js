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
          <FormField flexDirection="row" gap="${gap}" alignItems="center">
            <FormControl>
              <RadioGroupItem
                value="radio"
                size="${size}"
                tight={${tight}}
              />
            </FormControl>
            <FormLabel>Radio</FormLabel>
          </FormField>
        </RadioGroup>
      `;
    },
  },
};
