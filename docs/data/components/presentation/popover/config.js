/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'Popover',
      'PopoverTrigger',
      'PopoverContent',
      'Box',
      'TextButton',
    ],
    icons: [],
    variants: [
      {
        key: 'Close button',
        options: [
          { label: 'True', value: {} },
          { label: 'False', value: {} },
        ],
      },
      {
        key: 'Heading',
        options: [
          { label: 'True', value: {} },
          { label: 'False', value: {} },
        ],
      },
      {
        key: 'Action',
        options: [
          { label: 'Action', value: {} },
          { label: 'With sub action', value: {} },
          { label: 'None', value: {} },
        ],
      },
    ],
    render: (value) => {
      const heading = value['Heading'] === 'True' ? '"Heading"' : 'null';
      const closeButton = value['Close button'] === 'True' ? 'true' : 'false';

      const mainAction = `<TextButton color="primary" size="small">Action</TextButton>`;
      const subAction = `<TextButton color="assistive" size="small">Sub action</TextButton>`;

      let action = 'null';

      switch (value['Action']) {
        case 'Action':
          action = mainAction;
          break;
        case 'With sub action':
          action = `<>${subAction}${mainAction}</>`;
      }

      return `
        <Popover open>
          <PopoverTrigger>
            <Box sx={{ width: 0 }} />
          </PopoverTrigger>
          <PopoverContent
            disablePortal
            disableFocusScope
            disableOutsidePointerEvents={false}
            heading={${heading}}
            action={${action}}
            closeButton={${closeButton}}
            wrapperProps={{
              sx: {
                width: '80%',
                maxWidth: '240px',
                position: 'relative !important',
                zIndex: '1 !important',
                transform: 'none !important',
              },
            }}
          >
            Description
          </PopoverContent>
        </Popover>
      `;
    },
  },
};
