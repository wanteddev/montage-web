/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['SegmentedControl', 'SegmentedControlItem'],
    icons: ['IconList'],
    variants: [
      {
        key: 'Icon',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
    ],
    render: (value) => {
      const leadingIcon = value['Icon'] === 'True' ? '<IconList />' : 'null';

      return `
        <SegmentedControl value="active" sx={{maxWidth: 335}}>
          <SegmentedControlItem value="active" leadingIcon={${leadingIcon}}>
            Active
          </SegmentedControlItem>
          <SegmentedControlItem value="inactive1" leadingIcon={${leadingIcon}}>
            Inactive
          </SegmentedControlItem>
          <SegmentedControlItem value="inactive2" leadingIcon={${leadingIcon}}>
            Inactive
          </SegmentedControlItem>
        </SegmentedControl>
      `;
    },
  },
  hierarchy: [
    {
      components: ['SegmentedControl', 'SegmentedControlItem'],
      render: `<SegmentedControl value="active" sx={{width:180}}><SegmentedControlItem value="active">Active</SegmentedControlItem><SegmentedControlItem value="inactive">Inactive</SegmentedControlItem></SegmentedControl>`,
    },
    {
      components: ['SegmentedControl', 'SegmentedControlItem'],
      render: `<SegmentedControl value="active" sx={{width:180}}><SegmentedControlItem value="active">Active</SegmentedControlItem><SegmentedControlItem value="inactive">Inactive</SegmentedControlItem></SegmentedControl>`,
    },
  ],
  accessibility: [
    {
      keys: ['ArrowRight'],
      description:
        '다음 요소로 값을 변경합니다. (Segmented control 내부에서 순환)',
    },
    {
      keys: ['ArrowLeft'],
      description:
        '이전 요소로 값을 변경합니다. (Segmented control 내부에서 순환)',
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
