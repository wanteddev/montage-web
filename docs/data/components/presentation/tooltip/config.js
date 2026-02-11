/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'Box'],
    icons: [],
    variants: [
      {
        key: 'Size',
        options: [
          { label: 'Medium', value: {} },
          { label: 'Small', value: {} },
        ],
      },
      {
        key: 'Position',
        options: [
          { label: 'Bottom', value: {} },
          { label: 'Top', value: {} },
          { label: 'Right', value: {} },
          { label: 'Left', value: {} },
        ],
      },
      {
        key: 'Shortcut',
        options: [
          { label: 'False', value: {} },
          { label: 'True', value: {} },
        ],
      },
    ],
    render: (value) => {
      let position;

      switch (value['Position']) {
        case 'Bottom':
          position = 'bottom-start';
          break;
        case 'Top':
          position = 'top-start';
          break;
        case 'Right':
          position = 'right-center';
          break;
        case 'Left':
          position = 'left-center';
          break;
      }

      const shortcut = value['Shortcut'] === 'True' ? '"⌘C"' : 'null';
      const size = value['Size'].toLowerCase();

      return `
      <Tooltip open>
        <TooltipTrigger>
          <Box sx={{ width: 0 }} />
        </TooltipTrigger>
        <TooltipContent
          disablePortal
          sx={{
            position: 'relative !important',
            zIndex: '1 !important',
            transform: 'none !important',
          }}
          size="${size}"
          position="${position}"
          shortcut={${shortcut}}
        >
          Label
        </TooltipContent>
      </Tooltip>
    `;
    },
  },
};
