/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Box', 'framedStyle'],
    variants: [
      {
        key: 'Size',
        defaultValue: 'Medium',
        options: [
          { label: 'Small', value: {} },
          { label: 'Medium', value: {} },
          { label: 'Large', value: {} },
          { label: 'Xlarge', value: {} },
        ],
      },
      {
        key: 'Status',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Negative', value: {} },
        ],
      },
      {
        key: 'Selected',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Disabled',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Shadow',
        options: [
          { label: 'None', value: {} },
          { label: 'Xsmall', value: {} },
          { label: 'Small', value: {} },
          { label: 'Medium', value: {} },
          { label: 'Large', value: {} },
          { label: 'Xlarge', value: {} },
        ],
      },
    ],
    render: (value) => {
      const status = value['Status'] === 'Negative' ? 'negative' : 'normal';
      const size = value['Size'].toLowerCase();
      const selected = value['Selected'] === 'True';
      const disabled = value['Disabled'] === 'True';
      const shadow =
        value['Shadow'] === 'None'
          ? ''
          : `shadow: 'semantic.elevation.shadow.normal.${value['Shadow'].toLowerCase()}',`;

      return `
        <Box
          tabIndex={${disabled ? -1 : 0}}
          sx={[
            framedStyle({
              size: '${size}',
              status: '${status}',
              disabled: ${disabled},
              selected: ${selected},
              ${shadow}
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
