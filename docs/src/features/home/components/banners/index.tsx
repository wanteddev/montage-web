'use client';
import {
  Box,
  FlexBox,
  IconButton,
  PaginationDots,
  Thumbnail,
} from '@wanteddev/wds';
import { useId } from 'react';
import { IconArrowLeft, IconArrowRight } from '@wanteddev/wds-icon';

import { breakWordStyle } from '@/styles/text';

import { homeTitleStyle } from '../../helpers';

import {
  bannerContentWrapperStyle,
  bannerSliderButtonStyle,
  bannerSliderButtonWrapperStyle,
  bannerSliderContentStyle,
  bannerSliderDotStyle,
  bannerSliderItemContentStyle,
  bannerSliderItemDescriptionStyle,
  bannerSliderItemImageStyle,
  bannerSliderItemStyle,
  bannerSliderItemTitleStyle,
  bannerSliderStyle,
  bannerTitleStyle,
  bannerWrapperStyle,
} from './style';
import { BANNER_ITEMS } from './constants';
import { useBannerCarousel } from './hooks';

const Banners = () => {
  const id = useId();

  const {
    carouselRef,
    currentSlide,
    handleClickPrev,
    handleClickNext,
    handleClickDot,
  } = useBannerCarousel();

  return (
    <FlexBox
      as="section"
      flexDirection="column"
      sx={bannerWrapperStyle}
      alignItems="center"
    >
      <Box as="h2" sx={[homeTitleStyle, bannerTitleStyle, breakWordStyle]}>
        wanted design system
      </Box>
      <FlexBox flexDirection="column" sx={bannerContentWrapperStyle}>
        <FlexBox
          role="region"
          aria-roledescription="carousel"
          flexDirection="row"
          ref={carouselRef}
          sx={bannerSliderStyle}
        >
          <FlexBox sx={bannerSliderContentStyle}>
            {BANNER_ITEMS.map((item, idx) => (
              <FlexBox
                key={item.title}
                flex="0 0 100%"
                sx={bannerSliderItemStyle}
                flexDirection="column"
                role="group"
                aria-roledescription="slide"
                aria-labelledby={`banner-${id}-${idx}`}
                aria-describedby={`banner-${id}-${idx}-description`}
              >
                <Thumbnail
                  src={item.image}
                  alt={item.title}
                  width="1500px"
                  ratio="1:1"
                  sm={{
                    ratio: '21:9',
                  }}
                  sx={bannerSliderItemImageStyle}
                />

                <FlexBox sx={bannerSliderItemContentStyle}>
                  <Box
                    as="p"
                    sx={[bannerSliderItemTitleStyle, breakWordStyle]}
                    id={`banner-${id}-${idx}`}
                  >
                    {item.title}
                  </Box>
                  <Box
                    as="p"
                    sx={[bannerSliderItemDescriptionStyle, breakWordStyle]}
                    id={`banner-${id}-${idx}-description`}
                  >
                    {item.description}
                  </Box>
                </FlexBox>
              </FlexBox>
            ))}
          </FlexBox>
        </FlexBox>

        <FlexBox sx={bannerSliderButtonWrapperStyle} gap="8px">
          <IconButton
            size={40}
            variant="outlined"
            sx={bannerSliderButtonStyle}
            onClick={handleClickPrev}
            aria-label="prev slide"
          >
            <IconArrowLeft />
          </IconButton>
          <IconButton
            size={40}
            variant="outlined"
            sx={bannerSliderButtonStyle}
            onClick={handleClickNext}
            aria-label="next slide"
          >
            <IconArrowRight />
          </IconButton>
        </FlexBox>
      </FlexBox>
      <PaginationDots
        size="small"
        totalPages={BANNER_ITEMS.length}
        currentPage={currentSlide}
        onClickDot={handleClickDot}
        sx={bannerSliderDotStyle}
      />
    </FlexBox>
  );
};

export default Banners;
