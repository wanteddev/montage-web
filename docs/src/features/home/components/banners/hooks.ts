import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import AutoPlayPlugin from 'embla-carousel-autoplay';
import FadePlugin from 'embla-carousel-fade';
import { useEffect, useState } from 'react';

export const useBannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [carouselRef, emblaApi] = useEmblaCarousel(
    {
      axis: 'x',
      loop: true,
      duration: 20,
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

  const handleClickPrev = () => {
    emblaApi?.scrollPrev();
  };

  const handleClickNext = () => {
    emblaApi?.scrollNext();
  };

  const handleClickDot = (page: number) => {
    emblaApi?.scrollTo(page - 1);
  };

  return {
    carouselRef,
    currentSlide,
    handleClickPrev,
    handleClickNext,
    handleClickDot,
  };
};
