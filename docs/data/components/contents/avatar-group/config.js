/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['AvatarGroup', 'AvatarGroupContent', 'Avatar', 'TextButton'],
    icons: [],
    render: (value) => {
      let trailingContent = 'null';

      switch (value['Trailing content']) {
        case 'Text button':
          trailingContent =
            '<AvatarGroupContent variant="text-button"><TextButton color="assistive">외 0명</TextButton></AvatarGroupContent>';
          break;
        case 'Text':
          trailingContent =
            '<AvatarGroupContent variant="text">외 0명</AvatarGroupContent>';
          break;
      }

      return `
        <AvatarGroup size="small" trailingContent={${trailingContent}}>
          <Avatar size="small" />
          <Avatar size="small" />
          <Avatar size="small" />
          <Avatar size="small" />
          <Avatar size="small" />
        </AvatarGroup>
      `;
    },
    variants: [
      {
        key: 'Trailing content',
        options: [
          { label: 'None', value: {} },
          { label: 'Text button', value: {} },
          { label: 'Text', value: {} },
        ],
      },
    ],
  },
};
