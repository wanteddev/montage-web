/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Avatar', 'AvatarButton', 'PushBadge'],
    icons: [],
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
        key: 'Interaction',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Push badge',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
    ],
    render: (value) => {
      const variant = value['Variants'].toLowerCase();
      const interaction = value['Interaction'] === 'True';
      const pushBadge = value['Push badge'] === 'True';

      const avatar = `<Avatar size="xlarge" variant="${variant}" />`;

      if (interaction) {
        return `
          <AvatarButton>
            ${pushBadge ? `<PushBadge size="small" variant="dot">` : ''}
            ${avatar}
            ${pushBadge ? `</PushBadge>` : ''}
          </AvatarButton>
        `;
      }

      return `
        ${pushBadge ? `<PushBadge size="small" variant="dot">` : ''}
          ${avatar}
        ${pushBadge ? `</PushBadge>` : ''}
      `;
    },
  },
};
