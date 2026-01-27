/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'Snackbar',
      'SnackbarContent',
      'SnackbarHeading',
      'SnackbarDescription',
      'SnackbarAction',
      'SnackbarExtraContent',
      'SnackbarCloseButton',
    ],
    icons: ['IconBlank'],
    variants: [
      {
        key: 'Contents',
        options: [
          { label: 'Heading only', value: {} },
          { label: 'Heading with description', value: {} },
          { label: 'Description only', value: {} },
        ],
      },
      {
        key: 'Leading content',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
      {
        key: 'Close button',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
    ],
    render: (value) => {
      const extraContent =
        value['Leading content'] === 'True'
          ? '<SnackbarExtraContent><IconBlank sx={theme => ({ color: theme.semantic.static.white })} /></SnackbarExtraContent>'
          : 'null';
      const shouldRenderHeading = value['Contents']
        .toLowerCase()
        .includes('heading');
      const shouldRenderDescription = value['Contents']
        .toLowerCase()
        .includes('description');

      return `
        <Snackbar open disablePortal disableAnimation>
          <SnackbarContent
            extraContent={${extraContent}}
          >
            ${shouldRenderHeading ? '<SnackbarHeading>Heading</SnackbarHeading>' : ''}
            ${shouldRenderDescription ? '<SnackbarDescription>Description</SnackbarDescription>' : ''}
          </SnackbarContent>
  
          <SnackbarAction>Button</SnackbarAction>
  
          ${value['Close button'] === 'True' ? '<SnackbarCloseButton />' : ''}
        </Snackbar>
      `;
    },
  },
};
