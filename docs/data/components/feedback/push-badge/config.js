/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['PushBadge', 'Box'],
    icons: [],
    variants: [
      {
        key: 'Variants',
        options: [
          {
            label: 'Dot',
            value: {
              variant: 'dot',
              children: '<Box data-role="content" />',
              sx: (theme) => ({
                ['[data-role="content"]']: {
                  width: 64,
                  height: 64,
                  boxShadow: `inset 0 0 0 1px ${theme.semantic.line.neutral.primary}`,
                },
              }),
            },
          },
          {
            label: 'Text',
            value: {
              variant: 'text',
              text: 5,
              children: '<Box data-role="content" />',
              sx: (theme) => ({
                ['[data-role="content"]']: {
                  width: 64,
                  height: 64,
                  boxShadow: `inset 0 0 0 1px ${theme.semantic.line.neutral.primary}`,
                },
              }),
            },
          },
          {
            label: 'Max count',
            value: {
              variant: 'max-count',
              text: 100,
              children: '<Box data-role="content" />',
              sx: (theme) => ({
                ['[data-role="content"]']: {
                  width: 64,
                  height: 64,
                  boxShadow: `inset 0 0 0 1px ${theme.semantic.line.neutral.primary}`,
                },
              }),
            },
          },
        ],
      },
      {
        key: 'Size',
        options: [
          { label: 'Xsmall', value: { size: 'xsmall' } },
          { label: 'Small', value: { size: 'small' } },
          { label: 'Medium', value: { size: 'medium' } },
        ],
      },
      {
        key: 'Outline border',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: { outlineBorder: true } },
        ],
      },
    ],
  },
};
