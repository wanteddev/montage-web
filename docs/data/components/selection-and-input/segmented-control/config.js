/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['SegmentedControl', 'SegmentedControlItem'],
    icons: ['IconList'],
    variants: [
      {
        key: 'Size',
        defaultValue: 'Medium',
        options: [
          { label: 'Small', value: {} },
          { label: 'Medium', value: {} },
          { label: 'Large', value: {} },
        ],
      },
      {
        key: 'Icon only',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Icon',
        disabled: (value) => value['Icon only'] === 'True',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
    ],
    render: (value) => {
      const size = value['Size'].toLowerCase();

      if (value['Icon only'] === 'True') {
        return `
          <SegmentedControl value="active" size="${size}" iconOnly>
            <SegmentedControlItem value="active" aria-label="Active">
              <IconList />
            </SegmentedControlItem>
            <SegmentedControlItem value="inactive1" aria-label="Inactive">
              <IconList />
            </SegmentedControlItem>
            <SegmentedControlItem value="inactive2" aria-label="Inactive">
              <IconList />
            </SegmentedControlItem>
          </SegmentedControl>
        `;
      }

      const leadingIcon = value['Icon'] === 'True' ? '<IconList />' : 'null';

      return `
        <SegmentedControl value="active" size="${size}" sx={{maxWidth: 335}}>
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
