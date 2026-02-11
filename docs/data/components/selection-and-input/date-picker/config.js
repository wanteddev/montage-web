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
      'DatePicker',
      'PickerActionArea',
      'PickerActionAreaButton',
      'ContentBadge',
      'Button',
      'Checkbox',
    ],
    icons: ['IconSparkle', 'IconRefresh'],
    states: 'const [value, setValue] = React.useState(null);',
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'YYYY.MM.DD', value: {} },
          { label: 'YYYY.MM', value: {} },
        ],
      },
      {
        key: 'Action area',
        options: [
          { label: 'True', value: {} },
          { label: 'False', value: {} },
        ],
      },
      {
        key: 'Action area/Leading contents',
        disabled: (value) => value['Action area'] === 'False',
        options: [
          { label: 'None', value: {} },
          { label: 'Badge', value: {} },
          { label: 'Button', value: {} },
          { label: 'Checkbox', value: {} },
          { label: 'Icon', value: {} },
          { label: 'Icon button', value: {} },
        ],
      },
    ],
    render: (value) => {
      const props = {};

      switch (value['Variants']) {
        case 'YYYY.MM.DD':
          props.format = 'YYYY.MM.DD';
          break;
        case 'YYYY.MM':
          props.format = 'YYYY.MM';
          props.views = ['year', 'month'];
          break;
      }

      let actionArea = 'null';

      if (value['Action area'] === 'True') {
        props.disableLastUnitClickClose = true;
        switch (value['Action area/Leading contents']) {
          case 'Badge':
            actionArea = `
            <PickerActionArea>
              <ContentBadge color="neutral">가능</ContentBadge>
              <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>
            </PickerActionArea>`;
            break;
          case 'Button':
            actionArea = `
            <PickerActionArea>
              <PickerActionAreaButton variant="now">오늘</PickerActionAreaButton>
              <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>
            </PickerActionArea>`;
            break;
          case 'Checkbox':
            actionArea = `
            <PickerActionArea>
              <FormField gap="8px" flexDirection="row" alignItems="center">
                <FormControl>
                  <Checkbox size="medium" />
                </FormControl>
                <FormLabel>휴일 제외</FormLabel>
              </FormField>
              <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>
            </PickerActionArea>`;
            break;
          case 'Icon':
            actionArea = `
            <PickerActionArea>
              <IconSparkle sx={theme => ({ fontSize: 24, color: theme.semantic.label.normal })} />
              <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>
            </PickerActionArea>`;
            break;
          case 'Icon button':
            actionArea = `
            <PickerActionArea>
              <Button variant="outlined" iconOnly size="small" color="assistive" onClick={() => setValue(null)}>
                <IconRefresh />
              </Button>
              <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>
            </PickerActionArea>`;
            break;
          case 'None':
            actionArea = `
            <PickerActionArea>
              <div />
              <PickerActionAreaButton variant="accept">적용</PickerActionAreaButton>
            </PickerActionArea>`;
            break;
        }
      }

      return `
      <FormField sx={{ width: '75%' }}>
        <FormLabel required>Heading</FormLabel>
        <FormControl>
          <DatePicker
            width="100%"
            onChange={setValue}
            value={value}
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
      title: 'Date picker field',
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
      title: 'Year and month view',
      contents: [
        {
          keys: ['ArrowRight'],
          description: '다음 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['ArrowLeft'],
          description: '이전 값으로 포커스를 이동합니다.',
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
          keys: ['Home'],
          description: '첫 번째 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['End'],
          description: '마지막 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['Escape'],
          description: 'Picker를 닫습니다.',
        },
      ],
    },
    {
      title: 'Day view',
      contents: [
        {
          keys: ['ArrowRight'],
          description: '다음 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['ArrowLeft'],
          description: '이전 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['ArrowUp'],
          description: '일주일 전 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['ArrowDown'],
          description: '일주일 후 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['Home'],
          description: '첫 번째 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['End'],
          description: '마지막 값으로 포커스를 이동합니다.',
        },
        {
          keys: ['PageUp'],
          description: '다음 달로 포커스를 이동합니다.',
        },
        {
          keys: ['PageDown'],
          description: '이전 달로 포커스를 이동합니다.',
        },
        {
          keys: ['Escape'],
          description: 'Picker를 닫습니다.',
        },
      ],
    },
  ],
};
