import { useCallback, useEffect, useRef } from 'react';

import { useLnbContext } from '@/features/docs/components/lnb/contexts';

export const useIntroAnimate = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      ref.current?.style.setProperty('--intro-scroll-y', `${scrollY}px`);
    };

    handleScroll();

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  const lnbHide = useLnbContext().hide;

  const prevLnbHide = useRef(lnbHide);

  const getLnbAnimationStyle = useCallback((isLnbHidden: boolean): Keyframe => {
    if (isLnbHidden) {
      return {
        padding:
          '0px var(--intro-background-padding-inline) var(--intro-background-padding-inline)',
        height: 'var(--intro-background-height)',
        borderRadius: 'var(--intro-background-border-radius)',
      };
    }

    return {
      padding:
        '0px var(--intro-background-origin-padding-inline) var(--intro-background-origin-padding-inline)',
      height: 'var(--intro-background-origin-height)',
      borderRadius: 'var(--intro-background-origin-border-radius)',
    };
  }, []);

  useEffect(() => {
    if (prevLnbHide.current !== lnbHide && ref.current) {
      const prevLnbAnimationKeyframe = getLnbAnimationStyle(
        prevLnbHide.current,
      );
      const currentLnbAnimationKeyframe = getLnbAnimationStyle(lnbHide);

      ref.current.animate(
        [prevLnbAnimationKeyframe, currentLnbAnimationKeyframe],
        {
          duration: 200,
          easing: 'ease-in-out',
        },
      );
    }

    prevLnbHide.current = lnbHide;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lnbHide]);

  return {
    ref,
    lnbHide,
  };
};
