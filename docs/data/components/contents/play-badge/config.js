/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['PlayBadge', 'Thumbnail'],
    icons: [],
    render: (value) => {
      const alternative = (value['Variants'] === 'Alternative').toString();

      return `
      <Thumbnail
        src="https://static.wanted.co.kr/images/company/79/elpzxpmgh94xesrf__1080_790.png"
        alt="Wanted Company Image"
        ratio="1:1"
        width="50%"
        radius
        overlay={<PlayBadge size="medium" alternative={${alternative}} />}
      />
    `;
    },
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Alternative', value: {} },
        ],
      },
    ],
  },
};
