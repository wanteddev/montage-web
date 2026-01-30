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
      const invalid = value['Status'] === 'Negative';

      return `
        <Box
          tabIndex={0}
          onClick={() => setSelected(!selected)}
          sx={[
            framedStyle({
              invalid: ${invalid},
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
              backgroundColor: theme.semantic.accent.background.violet,
              opacity: theme.opacity[8]
            })}
          />
        </Box>
      `;
    },
  },
};
