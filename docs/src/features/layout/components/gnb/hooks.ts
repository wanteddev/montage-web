import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';

import { useLnbContext } from '@/features/docs/components/lnb/contexts';

import { GNB_HEIGHT } from './constants';
import { getBodyScrollTop } from './helpers';

import type { FocusEvent } from 'react';

export const useSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: false });

    return () =>
      window.removeEventListener('keydown', handleKeyDown, { capture: false });
  }, [setIsOpen]);

  return {
    isOpen,
    handleOpen,
    handleOpenChange,
  };
};

export const useFloatingGnb = () => {
  const lnbContext = useLnbContext();
  const segments = useSelectedLayoutSegments();
  const isRootPage = segments.length === 0;

  const ref = useRef<HTMLDivElement>(null);

  const [focused, setFocused] = useState(false);
  const [translateY, setTranslateY] = useState(0);

  const prevScrollTop = useRef(0);
  const scrollDirection = useRef<'up' | 'down'>('down');
  const transitionPoint = useRef(GNB_HEIGHT);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(max-width: 500px)`);

    const handleChange = () => {
      setIsMobile(mediaQueryList.matches);
    };

    handleChange();
    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [setIsMobile]);

  const handleFocusCapture = useCallback((e: FocusEvent<HTMLDivElement>) => {
    if (e.target.matches(':focus-visible')) {
      setFocused(true);
    }
  }, []);

  const handleBlurCapture = useCallback(() => {
    setFocused(false);
  }, []);

  useEffect(() => {
    if (!lnbContext.hide || focused || isMobile) {
      const scrollTop = getBodyScrollTop();

      transitionPoint.current = scrollTop + GNB_HEIGHT;

      setTranslateY(0);
    }
  }, [lnbContext.hide, focused, isRootPage, isMobile]);

  const handleScroll = useCallback(() => {
    const scrollTop = getBodyScrollTop();
    const nextDirection = prevScrollTop.current > scrollTop ? 'up' : 'down';

    if (
      scrollDirection.current === 'down' &&
      nextDirection === 'up' &&
      transitionPoint.current - scrollTop < 0
    ) {
      transitionPoint.current = scrollTop;
    }

    if (
      scrollDirection.current === 'up' &&
      nextDirection === 'down' &&
      scrollTop - transitionPoint.current < -GNB_HEIGHT
    ) {
      transitionPoint.current = scrollTop + GNB_HEIGHT;
    }

    const newTranslateY = Math.min(
      0,
      -GNB_HEIGHT + transitionPoint.current - scrollTop,
    );

    if (lnbContext.hide && !focused) {
      setTranslateY(newTranslateY);
    }

    scrollDirection.current = nextDirection;
    prevScrollTop.current = scrollTop;
  }, [lnbContext.hide, focused]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    ref,
    translateY: !isRootPage || isMobile ? 0 : translateY,
    handleFocusCapture,
    handleBlurCapture,
  };
};
