import { FlexBox, Thumbnail, Typography } from '@wanteddev/wds';

import HeadingLink from '../heading-link';

import {
  anatomyItemPinStyle,
  anatomyItemStyle,
  anatomyStyle,
  anatomyThumbnailStyle,
  anatomyWrapperStyle,
} from './style';

import type { ComponentProps } from 'react';

type Props = {
  data: Array<string>;
  src?: string;
  portrait?: ComponentProps<typeof Thumbnail>['portrait'];
  ratio?: ComponentProps<typeof Thumbnail>['ratio'];
};

const Anatomy = ({ ratio = '2:1', portrait, data, src }: Props) => {
  return (
    <FlexBox flexDirection="column" sx={anatomyWrapperStyle}>
      <Typography
        as="h2"
        data-heading=""
        variant="title2"
        weight="bold"
        display="block"
        id="구성-요소"
      >
        <HeadingLink id="구성-요소">구성 요소</HeadingLink>
      </Typography>
      <FlexBox flexDirection="column" gap="24px">
        {src && (
          <Thumbnail
            src={src}
            portrait={portrait}
            alt="thumbnail"
            disableOptimize
            width="100%"
            sx={anatomyThumbnailStyle}
            ratio={ratio}
          />
        )}

        <FlexBox flexWrap="wrap" sx={anatomyStyle} gap="8px">
          {data.map((value, i) => (
            <FlexBox
              key={value + i}
              sx={anatomyItemStyle}
              alignItems="center"
              gap="12px"
            >
              <Typography
                variant="body1"
                weight="regular"
                sx={anatomyItemPinStyle}
              >
                <span>{i + 1}</span>
              </Typography>
              <Typography
                variant="body1"
                weight="medium"
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
