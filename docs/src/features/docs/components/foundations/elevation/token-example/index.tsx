import {
  Box,
  FlexBox,
  Popover,
  PopoverTrigger,
  Thumbnail,
  Typography,
} from '@wanteddev/wds';
import { pathCase, sentenceCase } from 'change-case';

import Carousel from '@/components/carousel';
import TokenPopover from '@/features/docs/components/custom-render/token-popover';
import { getImageUrl } from '@/helpers/image';

import {
  carouselWrapperStyle,
  tokenThumbnailStyle,
  triggerStyle,
} from './style';

import type { ReactNode } from 'react';

type Props = {
  items: Array<{
    key: string;
    token: string;
    src: string;
    render?: ReactNode;
  }>;
};

const TokenExample = ({ items }: Props) => {
  return (
    <Carousel
      sx={carouselWrapperStyle}
      items={items.map((item) => (
        <FlexBox
          flexDirection="column"
          gap="8px"
          sx={{ position: 'relative' }}
          key={item.token}
        >
          <Popover>
            <PopoverTrigger>
              <Box as="button" sx={triggerStyle} disabled={item.key === 'none'}>
                <Thumbnail
                  radius
                  border
                  width="110px"
                  ratio="1:1"
                  src={getImageUrl(item.src)}
                  sx={tokenThumbnailStyle}
                />
              </Box>
            </PopoverTrigger>

            <Typography
              variant="caption2"
              weight="bold"
              color="semantic.label.normal"
              align="center"
            >
              {sentenceCase(item.key)}
            </Typography>
            <TokenPopover
              leadingContent={null}
              offset={8}
              title={pathCase(item.token).replace(/^./, (c) => c.toUpperCase())}
            >
              {item.render}
            </TokenPopover>
          </Popover>
        </FlexBox>
      ))}
    ></Carousel>
  );
};

export default TokenExample;
