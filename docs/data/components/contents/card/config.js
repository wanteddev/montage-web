/**
 * @type {SectionConfig}
 */
module.exports = {
  variants: {
    components: [
      'FlexBox',
      'Card',
      'CardThumbnail',
      'CardTitle',
      'CardCaption',
      'CardBody',
      'CardThumbnailContent',
      'ToggleIcon',
    ],
    icons: ['IconBookmark'],
    render: (value) => {
      const platform = value['Platform'].toLowerCase();

      return `
        <FlexBox
          sx={(theme) => ({
            width: "${platform === 'desktop' ? '60%' : '45%'}",
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: theme.semantic.background.normal.normal
          })}
        >
          <Card platform="${platform}">
            <CardThumbnail
              leadingContent={(
                <CardThumbnailContent variant="text">
                  Overlay caption
                </CardThumbnailContent>
              )}
              trailingContent={(
                <CardThumbnailContent variant="toggle-icon">
                  <ToggleIcon 
                    active={false} 
                  >
                    <IconBookmark />
                  </ToggleIcon>
                </CardThumbnailContent>
              )}
            />
            <CardBody>
              <CardTitle>Heading</CardTitle>
              <CardCaption>Caption</CardCaption>
            </CardBody>
          </Card>
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
