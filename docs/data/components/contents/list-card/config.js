/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FlexBox',
      'CardList',
      'CardThumbnail',
      'CardTitle',
      'CardCaption',
      'CardContent',
    ],
    icons: [],
    render: (value) => {
      return `
        <FlexBox
          sx={(theme) => ({
            width: '80%',
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: theme.semantic.background.normal.normal
          })}
        >
          <CardList platform="${value['Platform'].toLowerCase()}">
            <CardThumbnail />
            <CardContent>
              <CardTitle>Heading</CardTitle>
              <CardCaption>Caption</CardCaption>
            </CardContent>
          </CardList>
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
