/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FormField',
      'FormControl',
      'FormMessage',
      'FormLabel',
      'TimePicker',
      'PickerActionArea',
      'PickerActionAreaButton',
    ],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'HH:mm', value: {} },
          { label: 'A mm', value: {} },
          { label: 'A hh:mm', value: {} },
          { label: 'A hh:mm:ss', value: {} },
        ],
      },
      {
        key: 'Action area',
        options: [
          { label: 'True', value: {} },
          { label: 'False', value: {} },
        ],
      },
    ],
    render: (value) => {
      const props = {
        format: value['Variants'],
      };

      let actionArea = 'null';

      if (value['Action area'] === 'True') {
        props.disableLastUnitClickClose = true;
        actionArea = `
          <PickerActionArea>
            <PickerActionAreaButton variant="now">현재</PickerActionAreaButton>
            <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>
          </PickerActionArea>`;
      }

      return `
        <FormField sx={{ width: '75%' }}>
          <FormLabel required>Heading</FormLabel>
          <FormControl>
            <TimePicker
              width="100%"
              {...${JSON.stringify(props)}}
              actionArea={${actionArea}}
            />
          </FormControl>
          <FormMessage>Description</FormMessage>
        </FormField>
      `;
    },
  },
  accessibility: [
    {
      title: 'Time picker field',
      contents: [
        {
          keys: ['ArrowRight'],
          description: '다음 항목으로 포커스를 이동합니다.',
        },
        {
          keys: ['ArrowLeft'],
          description: '이전 항목으로 포커스를 이동합니다.',
        },
        {
          keys: ['ArrowUp'],
          description: '선택된 항목을 다음 값으로 변경합니다.',
        },
        {
          keys: ['ArrowDown'],
          description: '선택된 항목을 이전 값으로 변경합니다.',
        },
        {
          keys: ['End'],
          description: '선택된 항목을 마지막 값으로 변경합니다.',
        },
        {
          keys: ['Home'],
          description: '선택된 항목을 첫 번째 값으로 변경합니다.',
        },
      ],
    },
    {
      title: 'Time view',
      contents: [
        {
          keys: ['ArrowRight'],
          description: '다음 항목으로 포커스를 이동합니다.',
        },
        {
          keys: ['ArrowLeft'],
          description: '이전 항목으로 포커스를 이동합니다.',
        },
        {
          keys: ['ArrowUp'],
          description: '상단 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['ArrowDown'],
          description: '하단 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['Home', 'PageUp'],
          description: '첫 번째 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['End', 'PageDown'],
          description: '마지막 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['Escape'],
          description: 'Picker를 닫습니다.',
        },
      ],
    },
  ],
};
