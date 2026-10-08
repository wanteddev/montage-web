/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FormControl',
      'Select',
      'Option',
      'TextArea',
      'TextField',
      'FormControlField',
      'FormControlMessage',
      'FormControlNegativeMessage',
      'FormControlPositiveMessage',
      'FormControlMessageAccessory',
      'FormControlLabel',
    ],
    states: "const [value, setValue] = React.useState('');",
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
        key: 'Status',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Positive', value: {} },
          { label: 'Negative', value: {} },
        ],
      },
      {
        key: 'Label placement',
        options: [
          { label: 'Top', value: {} },
          { label: 'Leading', value: {} },
        ],
      },
      {
        key: 'Input',
        options: [
          { label: 'Text field', value: {} },
          { label: 'Text area', value: {} },
          { label: 'Select', value: {} },
        ],
      },
    ],
    render: (value) => {
      const size = value['Size'].toLowerCase();
      const status = value['Status'].toLowerCase();
      const labelPlacement = value['Label placement'].toLowerCase();
      const inputType = value['Input'];

      let inputComponent = 'null';

      switch (inputType) {
        case 'Text field':
          inputComponent = `<TextField status="${status}" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Placeholder" width="100%" />`;
          break;
        case 'Text area':
          inputComponent = `<TextArea status="${status === 'positive' ? 'normal' : status}" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Placeholder" width="100%" />`;
          break;
        case 'Select':
          inputComponent = `
            <Select status="${status === 'positive' ? 'normal' : status}" placeholder="Placeholder" width="100%">
              <Option value="option1">Option 1</Option>
              <Option value="option2">Option 2</Option>
              <Option value="option3">Option 3</Option>
            </Select>`;
          break;
      }

      let messageComponent = 'null';

      switch (status) {
        case 'positive':
          messageComponent = `<FormControlPositiveMessage ${inputType !== 'Select' ? 'accessory={<FormControlMessageAccessory variant="character-counter" length={value.length} maxLength={20} />}' : ''}>Positive message</FormControlPositiveMessage>`;
          break;
        case 'negative':
          messageComponent = `<FormControlNegativeMessage ${inputType !== 'Select' ? 'accessory={<FormControlMessageAccessory variant="character-counter" length={value.length} maxLength={20} />}' : ''}>Negative message</FormControlNegativeMessage>`;
          break;
        case 'normal':
          messageComponent = `<FormControlMessage ${inputType !== 'Select' ? 'accessory={<FormControlMessageAccessory variant="character-counter" length={value.length} maxLength={20} />}' : ''}>Message</FormControlMessage>`;
          break;
      }

      return `
      <FormControl size="${size}" sx={{ width: '75%' }} labelPlacement="${labelPlacement}">
        <FormControlLabel required>Label</FormControlLabel>
        <FormControlField>
          ${inputComponent}
        </FormControlField>
        ${messageComponent}
      </FormControl>
    `;
    },
  },
};
