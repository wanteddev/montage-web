/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'ProgressTracker',
      'ProgressTrackerItem',
      'Stepper',
      'StepperItem',
      'ContentBadge',
      'ProgressTrackerLabelContent',
      'Box',
    ],
    icons: [],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Normal horizontal', value: {} },
          { label: 'Normal vertical', value: {} },
          { label: 'Stepper', value: {} },
        ],
      },
      {
        key: 'Label',
        options: [
          { label: 'True', value: {} },
          { label: 'False', value: {} },
        ],
      },
      {
        key: 'Label contents',
        disabled: (value) =>
          value['Label'] === 'False' || value['Variants'] !== 'Normal vertical',
        options: [
          { label: 'Badge', value: {} },
          { label: 'Label', value: {} },
        ],
      },
    ],
    render: (value) => {
      const label = value['Label'] === 'True' ? '"Label"' : 'null';

      if (value['Variants'] === 'Stepper') {
        return `
        <Stepper value="0">
          <StepperItem value="0" label={${label}} />
          <StepperItem value="1" label={${label}} />
          <StepperItem value="2" label={${label}} />
        </Stepper>
      `;
      }

      const direction = value['Variants'].toLowerCase().includes('vertical')
        ? 'vertical'
        : 'horizontal';
      let labelContent = 'null';
      let children = 'null';

      if (direction === 'vertical') {
        switch (value['Label contents']) {
          case 'Badge':
            labelContent = `<ProgressTrackerLabelContent variant="badge"><ContentBadge color="neutral" variant="solid">Badge</ContentBadge></ProgressTrackerLabelContent>`;
            break;
          case 'Label':
            labelContent = `<ProgressTrackerLabelContent variant="caption">Label</ProgressTrackerLabelContent>`;
            break;
        }

        children = `<Box
        sx={theme => ({
          width: '100%',
          height: '24px',
          background: theme.semantic.accent.background.violet,
          opacity: 0.08,
        })}
      />`;
      }

      return `
      <ProgressTracker value="0" direction="${direction}" sx={{ width: '80%' }}>
        <ProgressTrackerItem value="0" label={${label}} labelContent={${labelContent}} children={${children}} />
        <ProgressTrackerItem value="1" label={${label}} labelContent={${labelContent}} children={${children}} />
        <ProgressTrackerItem value="2" label={${label}} labelContent={${labelContent}} children={${children}} />
      </ProgressTracker>
    `;
    },
  },
  accessibility: [
    {
      keys: ['ArrowRight'],
      description: '다음 요소로 값을 변경합니다. (Dots 내부에서 순환)',
    },
    {
      keys: ['ArrowLeft'],
      description: '이전 요소로 값을 변경합니다. (Dots 내부에서 순환)',
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
