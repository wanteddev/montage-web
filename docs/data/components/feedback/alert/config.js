/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'Alert',
      'AlertContainer',
      'AlertContent',
      'AlertHeading',
      'AlertDescription',
      'AlertActionArea',
      'AlertActionAreaButton',
    ],
    icons: [],
    variants: [
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
          { label: 'Normal button', value: {} },
          { label: 'Negative button', value: {} },
        ],
      },
    ],
    render: (value) => {
      const heading =
        value['Heading'] === 'True'
          ? '<AlertHeading>Heading</AlertHeading>'
          : '';
      const buttonVariant =
        value['Action'] === 'Normal button' ? 'normal' : 'negative';

      return `
      <Alert open>
        <AlertContainer
          disablePortal
          disableOutsideClickClose
          disableEscapeKeyDownClose
          disableRemoveScroll
          disableAriaHiddenOthers
          disableFocusScope
          wrapperProps={{
            sx: {
              zIndex: 1,
              position: 'relative',
              height: '85% !important',
              width: '85%',
              ['[data-role="alert-dimmer"]']: {
                position: 'absolute',
                display: 'none',
              }
            }
          }}
        >
          <AlertContent>
            ${heading}
            <AlertDescription>Body</AlertDescription>
          </AlertContent>
          <AlertActionArea>
            <AlertActionAreaButton variant="assistive">Button</AlertActionAreaButton>
            <AlertActionAreaButton variant="${buttonVariant}">Button</AlertActionAreaButton>
          </AlertActionArea>
        </AlertContainer>
      </Alert>
    `;
    },
  },
  accessibility: [
    {
      keys: ['Tab'],
      description: '다음 요소로 포커스를 이동합니다. (Alert 내부에서 순환)',
    },
    {
      keys: ['Shift + Tab'],
      description: '이전 요소로 포커스를 이동합니다. (Alert 내부에서 순환)',
    },
    {
      keys: ['Enter'],
      description: '현재 포커스된 요소를 클릭합니다.',
    },
    {
      keys: ['Escape'],
      description: 'Alert을 닫고 이전 요소로 포커스를 이동합니다.',
    },
  ],
};
