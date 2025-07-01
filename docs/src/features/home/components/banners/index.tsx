'use client';
import { Box, FlexBox, IconButton, PaginationDot } from '@wanteddev/wds';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlayPlugin from 'embla-carousel-autoplay';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import FadePlugin from 'embla-carousel-fade';
import { useEffect, useState } from 'react';
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
import { BANNER_SLIDES } from './constants';

const Banners = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [carouselRef, emblaApi] = useEmblaCarousel(
    {
      axis: 'x',
      loop: true,
    },
    [
      AutoPlayPlugin({
        playOnInit: true,
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
      WheelGesturesPlugin(),
      FadePlugin(),
    ],
  );

  useEffect(() => {
    const handleSlideSelect = (api: ReturnType<typeof useEmblaCarousel>[1]) => {
      setCurrentSlide((api?.selectedScrollSnap() ?? 0) + 1);
      emblaApi?.plugins().autoplay.reset();
    };

    emblaApi?.on('select', handleSlideSelect);

    return () => {
      emblaApi?.off('select', handleSlideSelect);
    };
  }, [emblaApi]);

  const handleClickPrev = () => {
    emblaApi?.scrollPrev();
  };

  const handleClickNext = () => {
    emblaApi?.scrollNext();
  };

  const handleClickDot = (page: number) => {
    emblaApi?.scrollTo(page - 1);
  };

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
        <FlexBox role="region" aria-roledescription="carousel">
          <FlexBox flexDirection="row" ref={carouselRef} sx={bannerSliderStyle}>
            <FlexBox sx={bannerSliderContentStyle}>
              {BANNER_SLIDES.map(({ title, description }) => (
                <FlexBox
                  key={title}
                  flex="0 0 100%"
                  sx={bannerSliderItemStyle}
                  role="group"
                  aria-roledescription="slide"
                  flexDirection="column"
                >
                  <FlexBox
                    sx={[
                      bannerSliderItemImageStyle,
                      (theme) => ({
                        backgroundColor:
                          theme.semantic.accent.background.lightBlue,
                      }),
                    ]}
                  />
                  <FlexBox sx={bannerSliderItemContentStyle}>
                    <Box
                      as="p"
                      sx={[bannerSliderItemTitleStyle, breakWordStyle]}
                    >
                      {title}
                    </Box>
                    <Box
                      as="p"
                      sx={[bannerSliderItemDescriptionStyle, breakWordStyle]}
                    >
                      {description}
                    </Box>
                  </FlexBox>
                </FlexBox>
              ))}
            </FlexBox>
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

      <PaginationDot
        size="small"
        totalPage={BANNER_SLIDES.length}
        currentPage={currentSlide}
        onClickDot={handleClickDot}
        sx={bannerSliderDotStyle}
      />
    </FlexBox>
  );
};

export default Banners;
