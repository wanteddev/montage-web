'use client';
import { Box, FlexBox, PaginationDot } from '@wanteddev/wds';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlayPlugin from 'embla-carousel-autoplay';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import { useEffect, useState } from 'react';

import { breakWordStyle } from '@/styles/text';

import {
  bannerContentWrapperStyle,
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

const title = '협업이 필요한 어디든, Open Source.';
const description =
  'Montage는 적은 인원으로도 효율적인 협업이 가능하도록, 각 플랫폼의 사용성을 높게 반영하고 운영의 효율성과 유연한 확장을 고려한 구조 위에 설계된 원티드의 오픈소스 디자인 시스템입니다.';

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
      }),
      WheelGesturesPlugin(),
    ],
  );

  useEffect(() => {
    const handleSlideSelect = (api: ReturnType<typeof useEmblaCarousel>[1]) => {
      setCurrentSlide((api?.selectedScrollSnap() ?? 0) + 1);
    };

    emblaApi?.on('select', handleSlideSelect);

    return () => {
      emblaApi?.off('select', handleSlideSelect);
    };
  }, [emblaApi]);

  return (
    <FlexBox flexDirection="column" sx={bannerWrapperStyle} alignItems="center">
      <Box as="h2" sx={[bannerTitleStyle, breakWordStyle]}>
        wanted design system
      </Box>

      <FlexBox flexDirection="column" sx={bannerContentWrapperStyle}>
        <FlexBox role="region" aria-roledescription="carousel">
          <FlexBox flexDirection="row" ref={carouselRef} sx={bannerSliderStyle}>
            <FlexBox sx={bannerSliderContentStyle}>
              <FlexBox
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
                  <Box as="p" sx={[bannerSliderItemTitleStyle, breakWordStyle]}>
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
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>

      <PaginationDot
        size="small"
        totalPage={3}
        currentPage={currentSlide}
        onClickDot={(page) => emblaApi?.scrollTo(page - 1)}
        sx={bannerSliderDotStyle}
      />
    </FlexBox>
  );
};

export default Banners;
