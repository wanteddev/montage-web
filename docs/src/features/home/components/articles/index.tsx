'use client';
import { Box, FlexBox, TextButton } from '@wanteddev/wds';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { IconExternalLink } from '@wanteddev/wds-icon';
import { useId } from 'react';
import Link from 'next/link';

import { breakWordStyle } from '@/styles/text';

import { homeTitleStyle } from '../../helpers';

import { ARTICLE_ITEMS } from './constants';
import {
  articleContentStyle,
  articleIconStyle,
  articleItemContentStyle,
  articleItemDescriptionStyle,
  articleItemLinkStyle,
  articleItemStyle,
  articleItemTitleStyle,
  articleItemVideoStyle,
  articleWrapperStyle,
} from './style';

const Articles = () => {
  const [carouselRef] = useEmblaCarousel(
    {
      dragFree: true,
    },
    [WheelGesturesPlugin()],
  );

  const id = useId();

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
          {ARTICLE_ITEMS.map((item, idx) => (
            <FlexBox
              key={item.title}
              as={Link}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={articleItemStyle}
              flexDirection="column"
              justifyContent="flex-end"
              role="group"
              aria-roledescription="article slide"
              aria-labelledby={`article-${id}-${idx}`}
              aria-describedby={`article-${id}-${idx}-description`}
            >
              <Box
                as="video"
                data-role="article-video"
                sx={articleItemVideoStyle}
                autoPlay
                muted
                loop
              >
                <source src={item.source} type="video/mp4" />
              </Box>

              <FlexBox
                role="presentation"
                aria-label={item.title}
                data-role="article-icon"
                sx={articleIconStyle}
              >
                {item.icon}
              </FlexBox>

              <FlexBox
                flexDirection="column"
                sx={articleItemContentStyle}
                gap="20px"
              >
                <FlexBox flexDirection="column" gap="8px">
                  <Box
                    as="p"
                    sx={[articleItemTitleStyle, breakWordStyle]}
                    id={`article-${id}-${idx}`}
                  >
                    {item.title}
                  </Box>

                  <Box
                    as="p"
                    sx={[articleItemDescriptionStyle, breakWordStyle]}
                    id={`article-${id}-${idx}-description`}
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
