'use client';
import { Box, FlexBox, TextButton } from '@wanteddev/wds';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { IconExternalLink } from '@wanteddev/wds-icon';

import { breakWordStyle } from '@/styles/text';

import { homeTitleStyle } from '../../helpers';

import { ARTICLE_ITEMS } from './constants';
import {
  articleContentStyle,
  articleIconStyle,
  articleItemContentStyle,
  articleItemDescriptionStyle,
  articleItemImageStyle,
  articleItemLinkStyle,
  articleItemStyle,
  articleItemTitleStyle,
  articleWrapperStyle,
} from './style';

const Articles = () => {
  const [carouselRef] = useEmblaCarousel(
    {
      dragFree: true,
    },
    [WheelGesturesPlugin()],
  );

  return (
    <FlexBox flexDirection="column" as="section" sx={{ width: '100%' }}>
      <Box as="h2" sx={[homeTitleStyle, breakWordStyle]}>
        Articles
      </Box>

      <FlexBox
        ref={carouselRef}
        sx={articleWrapperStyle}
        role="region"
        aria-roledescription="carousel"
      >
        <FlexBox flexDirection="row" sx={articleContentStyle}>
          {ARTICLE_ITEMS.map((item) => (
            <FlexBox
              key={item.title}
              sx={articleItemStyle}
              flexDirection="column"
              justifyContent="flex-end"
              role="group"
              aria-roledescription="article slide"
            >
              <Box
                as="img"
                src="/home/Article1.png"
                alt={item.title}
                sx={articleItemImageStyle}
              />

              <FlexBox role="presentation" sx={articleIconStyle}>
                {item.icon}
              </FlexBox>

              <FlexBox
                flexDirection="column"
                sx={articleItemContentStyle}
                gap="20px"
              >
                <FlexBox flexDirection="column" gap="8px">
                  <Box as="p" sx={[articleItemTitleStyle, breakWordStyle]}>
                    {item.title}
                  </Box>

                  <Box
                    as="p"
                    sx={[articleItemDescriptionStyle, breakWordStyle]}
                  >
                    {item.description}
                  </Box>
                </FlexBox>

                <TextButton
                  size="small"
                  variant="assistive"
                  trailingContent={<IconExternalLink />}
                  sx={articleItemLinkStyle}
                >
                  view more
                </TextButton>
              </FlexBox>
            </FlexBox>
          ))}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Articles;
