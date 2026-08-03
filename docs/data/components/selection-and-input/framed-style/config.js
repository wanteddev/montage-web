/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Box', 'framedStyle'],
    states: 'const [selected, setSelected] = React.useState(false);',
    variants: [
      {
        key: 'Status',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Negative', value: {} },
        ],
      },
    ],
    render: (value) => {
      const status = value['Status'] === 'Negative' ? 'negative' : 'normal';

      return `
        <Box
          tabIndex={0}
          onClick={() => setSelected(!selected)}
          sx={[
            framedStyle({
              status: '${status}',
              selected,
            }),
            {
              width: '80%',
            },
          ]}
        >
          <Box
            sx={theme => ({
              width: '100%',
              height: '64px',
              backgroundColor: theme.semantic.surface.accent.violetOpaque,
              opacity: theme.opacity[8]
            })}
          />
        </Box>
      `;
    },
  },
};
