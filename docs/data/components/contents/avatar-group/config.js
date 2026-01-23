/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['AvatarGroup', 'Avatar', 'TextButton'],
    icons: [],
    render: (value) => {
      const variant = value['Variants'].toLowerCase();
      const trailingContent =
        value['Trailing content'] === 'True'
          ? '<TextButton color="assistive" size="small">외 0명</TextButton>'
          : 'null';

      return `
        <AvatarGroup size="small" trailingContent={${trailingContent}}>
          <Avatar size="small" variant="${variant}" />
          <Avatar size="small" variant="${variant}" />
          <Avatar size="small" variant="${variant}" />
          <Avatar size="small" variant="${variant}" />
          <Avatar size="small" variant="${variant}" />
        </AvatarGroup>
      `;
    },
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Person', value: {} },
          { label: 'Company', value: {} },
          { label: 'Academy', value: {} },
        ],
      },
      {
        key: 'Trailing content',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
    ],
  },
};
