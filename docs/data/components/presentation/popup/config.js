/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FlexBox',
      'Button',
      'Box',
      'Modal',
      'ModalTrigger',
      'ModalClose',
      'ModalContainer',
      'ModalContent',
      'ModalContentItem',
      'ModalNavigation',
      'SearchField',
      'ActionArea',
      'ActionAreaButton',
    ],
    icons: [],
    variants: [
      {
        key: 'Navigation',
        options: [
          { label: 'Normal', value: {} },
          { label: 'Emphasized', value: {} },
          { label: 'Display', value: {} },
          { label: 'Floating', value: {} },
          { label: 'Search', value: {} },
        ],
      },
      {
        key: 'Action area',
        defaultValue: 'Strong',
        options: [
          { label: 'None', value: {} },
          { label: 'Strong', value: {} },
          { label: 'Neutral', value: {} },
          { label: 'Compact', value: {} },
          { label: 'Cancel', value: {} },
        ],
      },
    ],
    render: (value) => {
      let actionArea = '';

      switch (value['Action area']) {
        case 'Strong':
          actionArea =
            '<ActionArea variant="strong"><ActionAreaButton>Main action</ActionAreaButton></ActionArea>';
          break;
        case 'Neutral':
          actionArea =
            '<ActionArea variant="neutral"><ActionAreaButton variant="alternative">Alternative</ActionAreaButton><ActionAreaButton>Main</ActionAreaButton></ActionArea>';
          break;
        case 'Compact':
          actionArea =
            '<ActionArea variant="compact"><ActionAreaButton variant="alternative">Alternative</ActionAreaButton><ActionAreaButton>Main</ActionAreaButton></ActionArea>';
          break;
        case 'Cancel':
          actionArea =
            '<ActionArea variant="cancel"><ActionAreaButton>Cancel</ActionAreaButton></ActionArea>';
          break;
      }

      let navigation = '';

      switch (value['Navigation']) {
        case 'Normal':
        case 'Emphasized':
        case 'Display':
          navigation = `<ModalNavigation variant="${value['Navigation'].toLowerCase()}">Title</ModalNavigation>`;
          break;
        case 'Floating':
          navigation = '<ModalNavigation variant="floating" />';
          break;
        case 'Search':
          navigation = `
            <ModalNavigation
              variant="search"
              trailingContent={<ModalClose variant="text">취소</ModalClose>}
            >
              <SearchField placeholder="Enter search keyword." size="small" />
            </ModalNavigation>
          `;
          break;
      }

      const getModalContainer = (size) => `
        <ModalContainer
          size="${size}"
          resize="hug"
          sx={{ maxHeight: 'unset' }}
        >
          ${navigation}
          <ModalContent>
            <ModalContentItem>
              <Box
                sx={theme => ({
                  backgroundColor: theme.semantic.accent.background.violet,
                  opacity: theme.opacity[8],
                  height: '240px',
                })}
              />
            </ModalContentItem>
          </ModalContent>
          
          ${actionArea}
        </ModalContainer>
      `;

      return `
        <FlexBox gap="24px" flexDirection="column">
          <Modal>
            <ModalTrigger>
              <Button sx={{ width: '188px' }}>Open medium popup</Button>
            </ModalTrigger>
  
            ${getModalContainer('medium')}
          </Modal>
  
          <Modal>
            <ModalTrigger>
              <Button sx={{ width: '188px' }}>Open large popup</Button>
            </ModalTrigger>
  
            ${getModalContainer('large')}
          </Modal>
  
          <Modal>
            <ModalTrigger>
              <Button sx={{ width: '188px' }}>Open xlarge popup</Button>
            </ModalTrigger>
  
            ${getModalContainer('xlarge')}
          </Modal>
        </FlexBox>
      `;
    },
  },
};
