import { useCallback, useEffect, useRef, useState } from 'react';

export const useCarouselAnimation = () => {
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startAnimation = useCallback(() => {
    const keyframes: Array<Keyframe> = [
      { transform: `translate3d(0, 20px, 0)`, opacity: 0 },
      { transform: 'none', opacity: 1 },
    ];

    containerRef.current?.childNodes.forEach((child, index) => {
      if (child instanceof HTMLElement) {
        child
          .animate(keyframes, {
            easing: 'cubic-bezier(0.4, 0.14, 0.3, 1)',
            fill: 'both',
            duration: 600,
            delay: (index + 1) * 100,
          })
          .addEventListener('finish', () => {
            child.setAttribute('data-animation-state', 'animation-end');
          });
      }
    });

    setIsAnimationEnd(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || isAnimationEnd) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      });
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isAnimationEnd, startAnimation]);

  return {
    containerRef,
  };
};
