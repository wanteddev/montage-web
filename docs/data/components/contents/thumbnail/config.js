/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Thumbnail', 'PlayBadge'],
    icons: [],
    variants: [
      {
        key: 'Radius',
        options: [
          { label: 'False', value: { ratio: '1:1', width: '50%' } },
          {
            label: 'True',
            value: { ratio: '1:1', width: '50%', radius: true },
          },
        ],
      },
      {
        key: 'Border',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: { border: true } },
        ],
      },
      {
        key: 'Play icon',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: { overlay: '<PlayBadge />' } },
        ],
      },
    ],
  },
};
