import { FlexBox, Thumbnail, Typography } from '@wanteddev/wds';

import { Heading2 } from '../layout';
import { sectionLayoutStyle } from '../style';

import {
  anatomyItemPinStyle,
  anatomyItemStyle,
  anatomyThumbnailStyle,
} from './style';

import type { ThumbnailProps } from '@wanteddev/wds';

type Props = {
  data: Array<string>;
  src?: string;
  portrait?: ThumbnailProps['portrait'];
  ratio?: ThumbnailProps['ratio'];
};

const SectionAnatomy = ({ ratio = '21:9', portrait, data, src }: Props) => {
  return (
    <FlexBox flexDirection="column" sx={sectionLayoutStyle}>
      <Heading2 content="Anatomy" />

      <FlexBox flexDirection="column" gap="24px">
        {src && (
          <Thumbnail
            src={src}
            portrait={portrait}
            alt="thumbnail"
            width="100%"
            sx={anatomyThumbnailStyle}
            ratio={ratio}
            loading="lazy"
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

export default SectionAnatomy;
