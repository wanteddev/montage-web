import { FlexBox, Thumbnail, Typography } from '@wanteddev/wds';

import { tokenThumbnailStyle, tokenTypographyStyle } from './style';

type Props = {
  items: Array<{
    token: string;
    src: string;
  }>;
};

const TokenExample = ({ items }: Props) => {
  return (
    <FlexBox flexWrap="wrap" gap="20px">
      {items.map((item) => (
        <FlexBox
          key={item.token}
          flexDirection="column"
          gap="8px"
          sx={{ position: 'relative' }}
        >
          <Thumbnail
            radius
            border
            width="120px"
            ratio="1:1"
            src={item.src}
            sx={tokenThumbnailStyle}
          />

          <Typography
            variant="caption2"
            weight="bold"
            color="semantic.label.normal"
            align="center"
            sx={tokenTypographyStyle}
          >
            {item.token}
          </Typography>
        </FlexBox>
      ))}
    </FlexBox>
  );
};

export default TokenExample;
