import { FlexBox, PaginationDots, Thumbnail } from '@wanteddev/wds';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import AutoPlayPlugin from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

import { getImageUrl } from '@/helpers/image';

import { carouselContentStyle, carouselStyle } from './style';

import type { PaginationDotsProps } from '@wanteddev/wds';

type Props = {
  paginationDots?: PaginationDotsProps;
  sources: Array<string>;
};

const Carousel = ({ paginationDots, sources }: Props) => {
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
    ],
  );

  const handleClickDot = (page: number) => {
    emblaApi?.scrollTo(page - 1);
  };

  useEffect(() => {
    if (!emblaApi) return;

    const handleSlideSelect = (api: ReturnType<typeof useEmblaCarousel>[1]) => {
      setCurrentSlide((api?.selectedScrollSnap() ?? 0) + 1);
      emblaApi.plugins().autoplay.reset();
    };

    emblaApi.on('select', handleSlideSelect);

    return () => {
      emblaApi.off('select', handleSlideSelect);
    };
  }, [emblaApi]);

  return (
    <FlexBox
      flexDirection="column"
      gap="20px"
      alignItems="center"
      sx={{ width: '100%' }}
    >
      <FlexBox
        role="region"
        aria-roledescription="carousel"
        ref={carouselRef}
        sx={carouselStyle}
      >
        <FlexBox sx={carouselContentStyle}>
          {sources.map((source, idx) => (
            <FlexBox
              role="group"
              aria-roledescription="slide"
              key={idx}
              flex="0 0 100%"
              sx={{ paddingLeft: '20px', transform: 'translate3d(0, 0, 0)' }}
            >
              <Thumbnail
                radius
                src={getImageUrl(source)}
                ratio="1:1"
                width="100%"
                alt={`carousel example image ${idx + 1}`}
              />
            </FlexBox>
          ))}
        </FlexBox>
      </FlexBox>

      <PaginationDots
        {...paginationDots}
        onClickDot={handleClickDot}
        currentPage={currentSlide}
        totalPages={sources.length}
      />
    </FlexBox>
  );
};

export default Carousel;
