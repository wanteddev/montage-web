/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FlexBox',
      'ListCard',
      'ListCardThumbnail',
      'ListCardTitle',
      'ListCardCaption',
      'ListCardBody',
    ],
    icons: [],
    render: (value) => {
      return `
        <FlexBox
          sx={(theme) => ({
            width: '80%',
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: theme.semantic.background.neutral.primary
          })}
        >
          <ListCard platform="${value['Platform'].toLowerCase()}">
            <ListCardThumbnail />
            <ListCardBody>
              <ListCardTitle>Heading</ListCardTitle>
              <ListCardCaption>Caption</ListCardCaption>
            </ListCardBody>
          </ListCard>
        </FlexBox>
      `;
    },
    variants: [
      {
        key: 'Platform',
        options: [
          { label: 'Desktop', value: { platform: 'desktop' } },
          { label: 'Mobile', value: { platform: 'mobile' } },
        ],
      },
    ],
  },
};
