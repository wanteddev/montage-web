import { FlexBox, Thumbnail, Typography } from '@wanteddev/wds';

import HeadingLink from '../heading-link';

import {
  anatomyItemPinStyle,
  anatomyItemStyle,
  anatomyThumbnailStyle,
  anatomyWrapperStyle,
} from './style';

import type { ThumbnailProps } from '@wanteddev/wds';

type Props = {
  data: Array<string>;
  src?: string;
  portrait?: ThumbnailProps['portrait'];
  ratio?: ThumbnailProps['ratio'];
};

const Anatomy = ({ ratio = '21:9', portrait, data, src }: Props) => {
  return (
    <FlexBox flexDirection="column" sx={anatomyWrapperStyle}>
      <Typography
        as="h2"
        data-heading=""
        variant="title3"
        weight="bold"
        display="block"
        id="anatomy"
        sx={{ marginBottom: 24 }}
      >
        <HeadingLink id="anatomy">Anatomy</HeadingLink>
      </Typography>
      <FlexBox flexDirection="column" gap="24px">
        {src && (
          <Thumbnail
            src={src}
            portrait={portrait}
            alt="thumbnail"
            width="100%"
            sx={anatomyThumbnailStyle}
            ratio={ratio}
          />
        )}

        <FlexBox flexWrap="wrap" flex="1 0 auto" rowGap="8px" columnGap="80px">
          {data.map((value, i) => (
            <FlexBox
              key={value + i}
              sx={anatomyItemStyle}
              alignItems="center"
              gap="12px"
            >
              <Typography
                variant="caption1"
                weight="bold"
                sx={anatomyItemPinStyle}
              >
                <span>{i + 1}</span>
              </Typography>
              <Typography
                variant="label1"
                weight="bold"
                color="semantic.label.normal"
              >
                {value}
              </Typography>
            </FlexBox>
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Anatomy;
