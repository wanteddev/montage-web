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
      'Select',
      'SelectContent',
      'SelectMultiple',
      'Option',
      'Chip',
    ],
    icons: ['IconGlobe', 'IconCloseThick'],
    states:
      'const [value, setValue] = React.useState([]);\nconst ref = React.useRef(null);',
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Single', value: {} },
          { label: 'Multiple', value: {} },
        ],
      },
      {
        key: 'Leading icon',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Render',
        disabled: (value) => value['Variants'] === 'Single',
        options: [
          { label: 'Text', value: {} },
          { label: 'Chip', value: {} },
        ],
      },
      {
        key: 'Overflow',
        disabled: (value) => value['Variants'] === 'Single',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
    ],
    render: (value) => {
      const props = {};
      const component =
        value['Variants'] === 'Single' ? 'Select' : 'SelectMultiple';

      let render = undefined;
      let leadingContent = undefined;

      let optionVariant = 'radio';

      if (component === 'SelectMultiple') {
        props.overflow = value['Overflow'] === 'True';
        optionVariant = 'checkbox';

        if (value['Render'] === 'Chip') {
          render = `() => (
            value.map((v) => (
              <Chip
                key={v}
                size="xsmall"
                variant="solid"
                trailingContent={<IconCloseThick />}
                onClick={(e) => {
                  e.stopPropagation();
                  setValue(value.filter(data => data !== v))
                  ref.current?.focus();
                }}
              >
                {v}
              </Chip>
            ))
          )`;
        }
      }

      if (value['Leading icon'] === 'True') {
        leadingContent =
          '<SelectContent variant="icon"><IconGlobe /></SelectContent>';
      }

      return `
        <FormField sx={{ width: '75%' }}>
          <FormLabel required>Heading</FormLabel>
          <FormControl>
            <${component}
              width="100%"
              ref={ref}
              placeholder="Placeholder"
              leadingContent={${leadingContent}}
              {...${JSON.stringify(props)}}
              ${component === 'SelectMultiple' ? `onChange={setValue} value={value} render={${render}}` : ''}
            >
              <Option value="Option 1" variant="${optionVariant}">Option 1</Option>
              <Option value="Option 2" variant="${optionVariant}">Option 2</Option>
              <Option value="Option 3" variant="${optionVariant}">Option 3</Option>
              <Option value="Option 4" variant="${optionVariant}">Option 4</Option>
              <Option value="Option 5" variant="${optionVariant}">Option 5</Option>
            </${component}>
          </FormControl>
          <FormMessage>Description</FormMessage>
        </FormField>
      `;
    },
  },
  accessibility: [
    {
      keys: ['ArrowDown'],
      description: '다음 요소로 포커스를 이동합니다.',
    },
    {
      keys: ['ArrowUp'],
      description: '이전 요소로 포커스를 이동합니다.',
    },
    {
      keys: ['Home', 'PageUp'],
      description: '첫 번째 요소로 포커스를 이동합니다.',
    },
    {
      keys: ['End', 'PageDown'],
      description: '마지막 요소로 포커스를 이동합니다.',
    },
    {
      keys: ['Enter'],
      description: '현재 포커스된 요소를 클릭합니다.',
    },
  ],
};
