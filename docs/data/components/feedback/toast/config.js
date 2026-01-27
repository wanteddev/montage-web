/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Toast', 'ToastContainer', 'ToastContent', 'ToastIcon'],
    icons: ['IconBlank'],
    variants: [
      {
        key: 'Variants',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Positive', value: {} },
          { label: 'Cautionary', value: {} },
          { label: 'Negative', value: {} },
        ],
      },
      {
        key: 'Leading icon',
        disabled: (value) => value['Variants'] !== 'Normal',
        options: [
          { label: 'True', value: {} },
          { label: 'False', value: {} },
        ],
      },
    ],
    render: (value) => {
      return `
      <Toast open disablePortal disableAnimation variant="${value['Variants'].toLowerCase()}">
        <ToastContainer>
          <ToastIcon>${value['Leading icon'] === 'True' && value['Variants'] === 'Normal' ? '<IconBlank sx={theme => ({ color: theme.semantic.static.white })} />' : ''}</ToastIcon>
          <ToastContent>Message</ToastContent>
        </ToastContainer>
      </Toast>
    `;
    },
  },
};
