/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Slider'],
    variants: [
      {
        key: 'Range',
        options: [
          {
            label: 'False',
            value: { defaultValue: [45], sx: { width: '75%' } },
          },
          {
            label: 'True',
            value: { defaultValue: [0, 45], sx: { width: '75%' } },
          },
        ],
      },
      {
        key: 'Heading',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: { title: 'Heading' } },
        ],
      },
      {
        key: 'Label',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: { label: 'Label' } },
        ],
      },
    ],
  },
  accessibility: [
    {
      keys: ['ArrowRight', 'ArrowUp'],
      description: 'step 옵션만큼 값을 증가시킵니다.',
    },
    {
      keys: ['ArrowLeft', 'ArrowDown'],
      description: 'step 옵션만큼 값을 감소시킵니다.',
    },
    {
      keys: ['PageUp'],
      description: '10만큼 값을 증가시킵니다.',
    },
    {
      keys: ['PageDown'],
      description: '10만큼 값을 감소시킵니다.',
    },
    {
      keys: ['Home'],
      description: '지정된 최소값으로 값을 변경합니다.',
    },
    {
      keys: ['End'],
      description: '지정된 최대값으로 값을 변경합니다.',
    },
  ],
};
